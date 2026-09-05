import React from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronRight, 
  CheckCircle2 
} from 'lucide-react';
import { BetterFitSlot } from '../types';

interface SmartAssistCardProps {
  betterFit: BetterFitSlot;
  onReschedule: () => void;
}

export const SmartAssistCard: React.FC<SmartAssistCardProps> = ({ 
  betterFit, 
  onReschedule 
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#8C7CF0]/30 shadow-xs flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#6C5CE7]">
            {betterFit.badge}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[#EEF2FF] text-[#6366F1] text-[10px] font-bold">
            {betterFit.matchScore}% MATCH
          </span>
        </div>

        {/* Heading */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
          We found a better fit!
        </h3>

        {/* Recommended Slot Card */}
        <div 
          onClick={onReschedule}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onReschedule(); }}
          className="bg-[#F8F9FE] hover:bg-[#F0F2FD] border border-purple-100 rounded-xl p-3 sm:p-3.5 mb-4 flex items-center justify-between transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#6C5CE7] shadow-xs group-hover:scale-105 transition-transform">
              <CalendarIcon className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                {betterFit.title}
              </h4>
              <p className="text-[11px] text-slate-500 font-medium">
                {betterFit.subtitle}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#6C5CE7] group-hover:translate-x-1 transition-transform" />
        </div>

        {/* 3 Benefits */}
        <ul className="space-y-2 mb-4">
          {betterFit.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
              <CheckCircle2 className="w-4 h-4 text-[#6C5CE7] shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reschedule CTA */}
      <button
        type="button"
        onClick={onReschedule}
        className="w-full py-3 px-4 rounded-xl bg-[#6C5CE7] hover:bg-[#5C4CD7] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-150 active:scale-[0.99] cursor-pointer"
      >
        Reschedule Instead
      </button>
    </div>
  );
};
