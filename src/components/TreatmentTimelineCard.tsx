import React from 'react';
import { 
  Calendar, 
  AlertTriangle, 
  ShieldCheck, 
  Trash2 
} from 'lucide-react';

interface TreatmentTimelineCardProps {
  onKeepAppointment: () => void;
  onConfirmCancellation: () => void;
}

export const TreatmentTimelineCard: React.FC<TreatmentTimelineCardProps> = ({
  onKeepAppointment,
  onConfirmCancellation,
}) => {
  return (
    <div className="w-full flex flex-col justify-between">
      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 text-center mb-3">
        Treatment Impact Timeline
      </h3>

      {/* Timeline Graphic Container */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs mb-4">
        <div className="relative flex items-center justify-between max-w-lg mx-auto">
          {/* Horizontal connecting background line */}
          <div className="absolute left-6 right-6 top-5 -translate-y-1/2 h-[2px] bg-slate-200 z-0" />

          {/* Node 1: Original Appointment */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center shadow-sm">
              <Calendar className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-900 mt-2">
              Oct 24
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
              Original
            </span>
          </div>

          {/* Pill Badge: +3 Days Gap */}
          <div className="relative z-10 -mt-6">
            <span className="px-2.5 py-1 rounded-full bg-[#EEF2FF] border border-[#6366F1]/20 text-[#6366F1] text-[10px] sm:text-xs font-bold tracking-tight shadow-2xs">
              +3 Days Gap
            </span>
          </div>

          {/* Node 2: Reschedule */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full border-2 border-slate-300 bg-white text-slate-400 flex items-center justify-center">
              <Calendar className="w-5 h-5 stroke-[1.8]" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-slate-500 mt-2">
              Oct 27
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
              Reschedule
            </span>
          </div>

          {/* Node 3: Cancellation Impact */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative w-10 h-10 rounded-full border-2 border-[#6C5CE7] bg-white text-[#6C5CE7] flex items-center justify-center shadow-2xs">
              <AlertTriangle className="w-5 h-5 stroke-[2]" />
              {/* Red dot notification */}
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-rose-500 rounded-full border-2 border-white" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-rose-600 mt-2">
              May 15, 2026
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
              Cancellation Impact
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Keep Appointment & Confirm Cancellation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Keep Appointment */}
        <button
          type="button"
          onClick={onKeepAppointment}
          className="w-full py-3.5 px-4 rounded-xl bg-[#6C5CE7] hover:bg-[#5C4CD7] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all duration-150 active:scale-[0.99] cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
          <span>Keep Appointment</span>
        </button>

        {/* Confirm Cancellation */}
        <button
          type="button"
          onClick={onConfirmCancellation}
          className="w-full py-3.5 px-4 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all duration-150 active:scale-[0.99] cursor-pointer"
        >
          <Trash2 className="w-4 h-4 stroke-[2.2]" />
          <span>Confirm Cancellation</span>
        </button>
      </div>
    </div>
  );
};
