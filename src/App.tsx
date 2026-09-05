import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CancelAppointmentScreen } from './components/CancelAppointmentScreen';
import { ConfirmCancellationScreen } from './components/ConfirmCancellationScreen';
import { 
  AddFamilyModal, 
  EditBookingModal, 
  RescheduleSuccessModal, 
  CancellationReceiptModal 
} from './components/Modals';
import { 
  initialAppointment, 
  betterFitSlot, 
  familyMembers as initialFamilyMembers, 
  cancellationOptions, 
  refundDetails, 
  replacementDoctor 
} from './data/mockData';
import { 
  Appointment, 
  CancellationReasonId, 
  FamilyMember, 
  ReplacementDoctor, 
  ScreenMode 
} from './types';
import { CheckCircle2 } from 'lucide-react';

const getInitialScreen = (): ScreenMode => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('screen') === 'confirm_continuity' || window.location.hash === '#confirm') {
      return 'confirm_continuity';
    }
  }
  return 'cancel';
};

export const App: React.FC = () => {
  // Screen state: 'cancel' (Screen 1) | 'confirm_continuity' (Screen 2)
  const [currentScreen, setCurrentScreenState] = useState<ScreenMode>(getInitialScreen);

  const setCurrentScreen = (screen: ScreenMode) => {
    setCurrentScreenState(screen);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (screen === 'confirm_continuity') {
        url.searchParams.set('screen', 'confirm_continuity');
      } else {
        url.searchParams.delete('screen');
      }
      window.history.replaceState(null, '', url.toString());
    }
  };

  // Appointment & Family data state
  const [appointment, setAppointment] = useState<Appointment>(initialAppointment);
  const [members, setMembers] = useState<FamilyMember[]>(initialFamilyMembers);
  const [selectedMemberId, setSelectedMemberId] = useState<string>(initialFamilyMembers[0].id);

  // Cancellation reasons state (shared & preserved across both screens)
  const [selectedReason, setSelectedReason] = useState<CancellationReasonId | null>('schedule_conflict');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // Modals state
  const [isAddFamilyOpen, setIsAddFamilyOpen] = useState(false);
  const [isEditBookingOpen, setIsEditBookingOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isCancellationReceiptOpen, setIsCancellationReceiptOpen] = useState(false);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handlers
  const handleConfirmCancellationFromScreen1 = () => {
    // Transition from Screen 1 to Screen 2 (Confirm Cancellation / Treatment Continuity)
    setCurrentScreen('confirm_continuity');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeepAppointment = () => {
    showToast('Your appointment with Dr. Michelle Juat remains secured.');
  };

  const handleReschedule = () => {
    setIsRescheduleOpen(true);
  };

  const handleAddFamilyMember = (newMember: FamilyMember) => {
    setMembers((prev) => [...prev, newMember]);
    setSelectedMemberId(newMember.id);
    showToast(`${newMember.name} added to family profiles.`);
  };

  const handleUpdateBooking = (newDate: string, newTime: string) => {
    setAppointment((prev) => ({
      ...prev,
      date: newDate,
      time: newTime,
    }));
    showToast(`Booking updated to ${newDate} at ${newTime}.`);
  };

  const handleKeepCurrentDoctor = () => {
    showToast('Confirmed: Keeping Dr. Michelle Juat as your provider.');
  };

  const handleSwitchAndConfirm = (doctor: ReplacementDoctor) => {
    setAppointment((prev) => ({
      ...prev,
      doctor: {
        ...prev.doctor,
        id: doctor.id,
        name: doctor.name,
        avatarUrl: doctor.avatarUrl,
        rating: 4.9,
        matchScore: doctor.matchScore,
      },
      date: 'Tomorrow',
      time: '10:00 AM',
    }));
    showToast(`Switched successfully to ${doctor.name} for Tomorrow at 10:00 AM.`);
  };

  const handleFinalCancel = () => {
    setIsCancellationReceiptOpen(true);
  };

  const getReasonLabel = () => {
    const found = cancellationOptions.find((o) => o.id === selectedReason);
    return found ? found.label : 'Schedule Conflict';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFD] flex flex-col justify-between text-slate-900 selection:bg-purple-500 selection:text-white pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        {/* Global Navigation Header */}
        <Header 
          activeTab="Appointment" 
          onTabClick={(tab) => {
            if (tab === 'Appointment') setCurrentScreen('cancel');
          }}
        />

        {/* Global Hero & Warning Impact Row */}
        <HeroSection />

        {/* Main Flow Screens */}
        {currentScreen === 'cancel' ? (
          <CancelAppointmentScreen
            appointment={appointment}
            betterFit={betterFitSlot}
            familyMembers={members}
            selectedMemberId={selectedMemberId}
            onSelectMember={setSelectedMemberId}
            onAddMember={() => setIsAddFamilyOpen(true)}
            cancellationOptions={cancellationOptions}
            selectedReason={selectedReason}
            onSelectReason={setSelectedReason}
            additionalNotes={additionalNotes}
            onChangeNotes={setAdditionalNotes}
            refund={refundDetails}
            onEditBooking={() => setIsEditBookingOpen(true)}
            onReschedule={handleReschedule}
            onKeepAppointment={handleKeepAppointment}
            onConfirmCancellation={handleConfirmCancellationFromScreen1}
          />
        ) : (
          <ConfirmCancellationScreen
            appointment={appointment}
            refund={refundDetails}
            cancellationOptions={cancellationOptions}
            selectedReason={selectedReason}
            onSelectReason={setSelectedReason}
            additionalNotes={additionalNotes}
            onChangeNotes={setAdditionalNotes}
            currentDoctor={appointment.doctor}
            replacementDoctor={replacementDoctor}
            onEditBooking={() => setIsEditBookingOpen(true)}
            onKeepCurrent={handleKeepCurrentDoctor}
            onSwitchAndConfirm={handleSwitchAndConfirm}
            onDirectCancel={handleFinalCancel}
          />
        )}
      </div>

      {/* Interactive Modals */}
      <AddFamilyModal
        isOpen={isAddFamilyOpen}
        onClose={() => setIsAddFamilyOpen(false)}
        onAdd={handleAddFamilyMember}
      />

      <EditBookingModal
        isOpen={isEditBookingOpen}
        onClose={() => setIsEditBookingOpen(false)}
        currentDate={appointment.date}
        currentTime={appointment.time}
        onSave={handleUpdateBooking}
      />

      <RescheduleSuccessModal
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        newDate="Tomorrow"
        newTime="11:00 AM"
      />

      <CancellationReceiptModal
        isOpen={isCancellationReceiptOpen}
        onClose={() => setIsCancellationReceiptOpen(false)}
        reason={getReasonLabel()}
        refundAmount={refundDetails.amount}
        returnMethod={refundDetails.returnMethod}
        onRestart={() => {
          setIsCancellationReceiptOpen(false);
          setCurrentScreen('cancel');
        }}
      />
    </div>
  );
};

export default App;
