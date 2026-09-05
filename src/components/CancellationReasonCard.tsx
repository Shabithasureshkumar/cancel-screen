import React from 'react';
import { HelpCircle } from 'lucide-react';
import { CancellationOption, CancellationReasonId } from '../types';

interface CancellationReasonCardProps {
  options: CancellationOption[];
  selectedReason: CancellationReasonId | null;
  onSelectReason: (id: CancellationReasonId) => void;
  additionalNotes: string;
  onChangeNotes: (notes: string) => void;
}

export const CancellationReasonCard: React.FC<CancellationReasonCardProps> = ({
  options,
  selectedReason,
  onSelectReason,
  additionalNotes,
  onChangeNotes,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg bg-[#EEF2FF] text-[#6C5CE7] flex items-center justify-center">
            <HelpCircle className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Cancellation Reason
          </h3>
        </div>

        {/* 2x2 Grid of Radio Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          {options.map((opt) => {
            const isSelected = selectedReason === opt.id;
            return (
              <label
                key={opt.id}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'border-[#6C5CE7] bg-[#F9F8FE] shadow-2xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="cancellationReason"
                  value={opt.id}
                  checked={isSelected}
                  onChange={() => onSelectReason(opt.id)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                    isSelected
                      ? 'border-[#6C5CE7] bg-[#6C5CE7]'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>

        {/* Additional Notes Textarea */}
        <div>
          <label 
            htmlFor="additional-notes"
            className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5"
          >
            ADDITIONAL NOTES (OPTIONAL)
          </label>
          <textarea
            id="additional-notes"
            rows={3}
            value={additionalNotes}
            onChange={(e) => onChangeNotes(e.target.value)}
            placeholder="Tell us more to help us improve..."
            className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/15 transition-all resize-none bg-slate-50/30"
          />
        </div>
      </div>
    </div>
  );
};
