import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Clock, 
  UserPlus, 
  ShieldCheck, 
  RotateCcw 
} from 'lucide-react';
import { FamilyMember } from '../types';

// 1. Add Family Member Modal
interface AddFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newMember: FamilyMember) => void;
}

export const AddFamilyModal: React.FC<AddFamilyModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Sibling');
  const [birthDate, setBirthDate] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMember: FamilyMember = {
      id: `fam-${Date.now()}`,
      name: name.trim(),
      relation,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      birthDate: birthDate || 'Jan 1, 1995 (31 Years)',
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: phone || '+1 (555) 000-0000',
      metrics: [
        { label: 'BLOOD GROUP', value: bloodGroup, icon: 'blood' },
        { label: 'HEIGHT', value: '170cm', icon: 'height' },
        { label: 'WEIGHT', value: '65kg', icon: 'weight' },
        { label: 'BMI INDEX', value: '22.5', icon: 'bmi' },
      ],
    };

    onAdd(newMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#6C5CE7] flex items-center justify-center">
              <UserPlus className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Add Family Member</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Johnson"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/15"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Relation
              </label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6C5CE7]"
              >
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Sibling">Sibling</option>
                <option value="Parent">Parent</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6C5CE7]"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Date of Birth / Age
            </label>
            <input
              type="text"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="e.g. March 10, 1996 (29 Years)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6C5CE7]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6C5CE7]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#6C5CE7]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#6C5CE7] hover:bg-[#5C4CD7] text-white font-bold text-xs shadow-sm transition-all"
            >
              Save Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. Edit Booking Status Modal
interface EditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDate: string;
  currentTime: string;
  onSave: (date: string, time: string) => void;
}

export const EditBookingModal: React.FC<EditBookingModalProps> = ({
  isOpen,
  onClose,
  currentDate,
  currentTime,
  onSave,
}) => {
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(currentTime);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(date, time);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#6C5CE7] flex items-center justify-center">
              <Calendar className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Edit Booking Details</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 mb-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Date
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Mon, Jun 1', 'Tue, Jun 2', 'Wed, Jun 3', 'Thu, Jun 4'].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDate(d)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    date === d
                      ? 'border-[#6C5CE7] bg-[#EEF2FF] text-[#6C5CE7]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all ${
                    time === t
                      ? 'border-[#6C5CE7] bg-[#EEF2FF] text-[#6C5CE7]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-[#6C5CE7] hover:bg-[#5C4CD7] text-white font-bold text-xs shadow-sm transition-all"
          >
            Update Booking
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Reschedule Success Modal
interface RescheduleSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  newDate: string;
  newTime: string;
}

export const RescheduleSuccessModal: React.FC<RescheduleSuccessModalProps> = ({
  isOpen,
  onClose,
  newDate,
  newTime,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          Appointment Rescheduled!
        </h3>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Your new slot with Dr. Michelle Juat has been confirmed for{' '}
          <strong className="text-slate-800">{newDate} at {newTime}</strong>.
        </p>

        <div className="bg-purple-50 rounded-2xl p-3.5 mb-5 text-left text-xs space-y-1">
          <div className="flex items-center gap-2 text-[#6C5CE7] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Priority Queue Maintained</span>
          </div>
          <p className="text-[11px] text-slate-500 pl-6">
            A confirmation email and SMS have been sent with your calendar invitation.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-[#6C5CE7] hover:bg-[#5C4CD7] text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
        >
          Done
        </button>
      </div>
    </div>
  );
};

// 4. Cancellation Confirmed Receipt Modal
interface CancellationReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: string;
  refundAmount: string;
  returnMethod: string;
  onRestart: () => void;
}

export const CancellationReceiptModal: React.FC<CancellationReceiptModalProps> = ({
  isOpen,
  onClose,
  reason,
  refundAmount,
  returnMethod,
  onRestart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 stroke-[2.2]" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-1">
          Appointment Cancelled
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Your appointment has been cancelled and full refund has been initiated.
        </p>

        {/* Receipt Box */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left space-y-2.5 mb-5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Refund Status</span>
            <span className="font-bold text-emerald-600">Processed (100% Refund)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Refund Amount</span>
            <span className="font-extrabold text-slate-900 text-sm">{refundAmount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Payment Destination</span>
            <span className="font-bold text-slate-800">{returnMethod}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Recorded Reason</span>
            <span className="font-semibold text-slate-800">{reason || 'Schedule Conflict'}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex items-center gap-1.5 text-slate-400 text-[11px]">
            <Clock className="w-3.5 h-3.5" />
            <span>Estimated deposit within 2-3 business days.</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Back to Start</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-[#6C5CE7] hover:bg-[#5C4CD7] text-white font-bold text-xs shadow-sm transition-all"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
