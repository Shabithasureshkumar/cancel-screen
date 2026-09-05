import os
import subprocess
import time
import json
import urllib.request
import tempfile
import shutil
import base64
import websocket

DEBUG_PORT = 9223
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "screenshots")
os.makedirs(OUT_DIR, exist_ok=True)

temp_dir = tempfile.mkdtemp()
chrome_proc = subprocess.Popen([
    CHROME_PATH,
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--incognito",
    f"--remote-debugging-port={DEBUG_PORT}",
    "--remote-allow-origins=*",
    f"--user-data-dir={temp_dir}",
    "about:blank"
])

time.sleep(2.0)

# Connect to Chrome
resp = urllib.request.urlopen(f"http://127.0.0.1:{DEBUG_PORT}/json")
targets = json.loads(resp.read().decode())
ws_url = targets[0]["webSocketDebuggerUrl"]
ws = websocket.create_connection(ws_url)

msg_counter = 1
def send_cmd(method, params=None):
    global msg_counter
    msg_id = msg_counter
    msg_counter += 1
    payload = {"id": msg_id, "method": method, "params": params or {}}
    ws.send(json.dumps(payload))
    while True:
        res = json.loads(ws.recv())
        if res.get("id") == msg_id:
            return res

def evaluate_js(expression):
    res = send_cmd("Runtime.evaluate", {"expression": expression, "returnByValue": True})
    return res.get("result", {}).get("value")

# Enable domains
send_cmd("Page.enable")
send_cmd("Runtime.enable")
send_cmd("Console.enable")

print("Navigating to http://localhost:3001/ ...")
send_cmd("Page.navigate", {"url": "http://localhost:3001/"})
time.sleep(2.0)

# Collect console messages
console_errors = []
def handle_incoming():
    ws.settimeout(0.2)
    try:
        while True:
            raw = ws.recv()
            msg = json.loads(raw)
            if msg.get("method") == "Console.messageAdded":
                lvl = msg["params"]["message"]["level"]
                txt = msg["params"]["message"]["text"]
                if lvl in ["error", "warning"]:
                    console_errors.append(f"[{lvl.upper()}] {txt}")
    except:
        pass
    ws.settimeout(None)

handle_incoming()

# 19 Viewports audit
viewports = [
    320, 360, 375, 390, 393, 412, 430, 480, 
    600, 768, 820, 900, 1024, 1280, 1366, 
    1440, 1536, 1600, 1920
]

print("\n--- VIEWPORT OVERFLOW AUDIT (SCREEN 1) ---")
overflow_results_s1 = {}
for w in viewports:
    h = 900
    send_cmd("Emulation.setDeviceMetricsOverride", {
        "width": w,
        "height": h,
        "deviceScaleFactor": 1,
        "mobile": w < 1024
    })
    time.sleep(0.15)
    
    # Check overflow
    has_overflow = evaluate_js("""
        (() => {
            const docW = document.documentElement.scrollWidth;
            const winW = window.innerWidth;
            return docW > winW + 1;
        })()
    """)
    doc_width = evaluate_js("document.documentElement.scrollWidth")
    overflow_results_s1[w] = (has_overflow, doc_width)
    status = "FAIL (Overflow!)" if has_overflow else "PASS"
    print(f"Viewport {w}px: {status} (scrollWidth={doc_width}, winW={w})")

# Capture Screen 1 Key Screenshots
key_captures = [
    ("screen1_desktop_1440", 1440, 900),
    ("screen1_tablet_768", 768, 1024),
    ("screen1_mobile_375", 375, 812),
    ("screen1_mobile_320", 320, 640),
]

for name, w, h in key_captures:
    send_cmd("Emulation.setDeviceMetricsOverride", {
        "width": w,
        "height": h,
        "deviceScaleFactor": 2,
        "mobile": w < 1024
    })
    time.sleep(0.3)
    res = send_cmd("Page.captureScreenshot", {"format": "png", "captureBeyondViewport": True})
    img_bytes = base64.b64decode(res["result"]["data"])
    out_path = os.path.join(OUT_DIR, f"{name}.png")
    with open(out_path, "wb") as f:
        f.write(img_bytes)
    print(f"Captured {name}.png ({w}x{h})")

# TEST INTERACTIONS ON SCREEN 1
print("\n--- TESTING SCREEN 1 INTERACTIONS ---")
# 1. Select personal emergency radio
evaluate_js("""
    const radio = document.querySelector('input[value="personal_emergency"]');
    if (radio) {
        radio.click();
        radio.dispatchEvent(new Event('change', { bubbles: true }));
    }
""")
time.sleep(0.2)
selected_radio = evaluate_js("document.querySelector('input[name=\"cancellationReason\"]:checked')?.value")
print(f"Radio Selection Test: selected='{selected_radio}' (Expected 'personal_emergency')")

# 2. Type notes
evaluate_js("""
    const txt = document.querySelector('textarea');
    if (txt) {
        txt.value = 'Need to reschedule due to family matter.';
        txt.dispatchEvent(new Event('input', { bubbles: true }));
        txt.dispatchEvent(new Event('change', { bubbles: true }));
    }
""")
notes_val = evaluate_js("document.querySelector('textarea')?.value")
print(f"Notes Textarea Test: value='{notes_val}'")

# 3. Transition to Screen 2 by clicking 'Confirm Cancellation'
print("\n--- TRANSITIONING TO SCREEN 2 ---")
evaluate_js("""
    const btns = Array.from(document.querySelectorAll('button'));
    const confirmBtn = btns.find(b => b.textContent.includes('Confirm Cancellation'));
    if (confirmBtn) confirmBtn.click();
""")
time.sleep(0.5)

# Verify Screen 2 is active
screen2_title = evaluate_js("document.querySelector('h3')?.textContent")
print(f"Current Screen Top H3: '{screen2_title}'")
is_treatment_continuity_present = evaluate_js("""
    document.body.innerText.includes('Treatment Continuity Options')
""")
print(f"Is Screen 2 Active? {is_treatment_continuity_present}")

# Verify notes & reason are preserved on Screen 2
s2_radio = evaluate_js("document.querySelector('input[name=\"cancellationReason\"]:checked')?.value")
s2_notes = evaluate_js("document.querySelector('textarea')?.value")
print(f"Screen 2 Preserved Radio: '{s2_radio}'")
print(f"Screen 2 Preserved Notes: '{s2_notes}'")

# Check overflow on Screen 2 across all 19 viewports
print("\n--- VIEWPORT OVERFLOW AUDIT (SCREEN 2) ---")
overflow_results_s2 = {}
for w in viewports:
    h = 900
    send_cmd("Emulation.setDeviceMetricsOverride", {
        "width": w,
        "height": h,
        "deviceScaleFactor": 1,
        "mobile": w < 1024
    })
    time.sleep(0.15)
    
    has_overflow = evaluate_js("""
        (() => {
            const docW = document.documentElement.scrollWidth;
            const winW = window.innerWidth;
            return docW > winW + 1;
        })()
    """)
    doc_width = evaluate_js("document.documentElement.scrollWidth")
    overflow_results_s2[w] = (has_overflow, doc_width)
    status = "FAIL (Overflow!)" if has_overflow else "PASS"
    print(f"Screen 2 Viewport {w}px: {status} (scrollWidth={doc_width}, winW={w})")

# Capture Screen 2 Key Screenshots
key_captures_s2 = [
    ("screen2_desktop_1440", 1440, 900),
    ("screen2_tablet_768", 768, 1024),
    ("screen2_mobile_375", 375, 812),
    ("screen2_mobile_320", 320, 640),
]

for name, w, h in key_captures_s2:
    send_cmd("Emulation.setDeviceMetricsOverride", {
        "width": w,
        "height": h,
        "deviceScaleFactor": 2,
        "mobile": w < 1024
    })
    time.sleep(0.3)
    res = send_cmd("Page.captureScreenshot", {"format": "png", "captureBeyondViewport": True})
    img_bytes = base64.b64decode(res["result"]["data"])
    out_path = os.path.join(OUT_DIR, f"{name}.png")
    with open(out_path, "wb") as f:
        f.write(img_bytes)
    print(f"Captured {name}.png ({w}x{h})")

# TEST SCREEN 2 ACTIONS
print("\n--- TESTING SCREEN 2 ACTIONS ---")
# Click 'Keep Current Doctor'
evaluate_js("""
    const btns = Array.from(document.querySelectorAll('button'));
    const keepDocBtn = btns.find(b => b.textContent.includes('Keep Current Doctor'));
    if (keepDocBtn) keepDocBtn.click();
""")
time.sleep(0.3)
toast_text = evaluate_js("document.querySelector('.fixed.top-5')?.textContent")
print(f"Keep Current Doctor Toast: '{toast_text}'")

# Click 'Cancel Appointment' on Screen 2 to test cancellation receipt modal
evaluate_js("""
    const btns = Array.from(document.querySelectorAll('button'));
    const cancelBtn = btns.find(b => b.textContent.trim() === 'Cancel Appointment');
    if (cancelBtn) cancelBtn.click();
""")
time.sleep(0.3)
modal_title = evaluate_js("document.querySelector('h3.text-xl')?.textContent")
print(f"Cancellation Receipt Modal Title: '{modal_title}'")

# Clean up
handle_incoming()
print("\n--- CONSOLE LOGS ---")
if console_errors:
    for err in console_errors:
        print(err)
else:
    print("Zero console errors/warnings detected!")

ws.close()
chrome_proc.terminate()
shutil.rmtree(temp_dir, ignore_errors=True)
print("\nAudit completed successfully!")
