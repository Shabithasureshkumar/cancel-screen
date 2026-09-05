import React from 'react';
import { AlertCircle } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="w-full pt-3 pb-2">
      <div className="fluid-container fluid-page-padding grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-stretch">
        {/* Left Hero Banner - Cancel Appointment */}
        <div className="lg:col-span-6 relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#8C5BF8] via-[#7448EC] to-[#5C2DEF] p-5 sm:p-6 text-white shadow-xs flex flex-col justify-between min-h-[130px]">
          <div className="relative z-10 max-w-[70%] sm:max-w-[72%]">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
              Cancel Appointment
            </h1>
            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed font-normal">
              We're sorry to see you go. Before cancelling, please review the impact and available alternatives.
            </p>
          </div>

          {/* 3D Calendar/Heart illustration */}
          <div className="absolute right-2 sm:right-3 -bottom-0.5 sm:bottom-0 w-26 sm:w-28 md:w-32 pointer-events-none select-none flex items-end justify-end">
            <img
              src="/assets/calendar_heart.png"
              alt="Calendar & Medical status"
              className="w-full h-auto object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* Right Notification Banner - Warning / Impact */}
        <div className="lg:col-span-6 rounded-2xl bg-[#FCF8DD] border border-[#F3E8A0] p-4 sm:p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-6 h-6 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-600">
                <AlertCircle className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-1">
                Please review the impact before cancelling.
              </h2>
              <p className="text-xs sm:text-xs text-slate-600 leading-relaxed">
                Cancelling this high-demand slot may affect your treatment continuity. Our next availability for Dr. Vance is significantly delayed.
              </p>
            </div>
          </div>

          {/* Pill for Next Availability */}
          <div className="mt-3 sm:mt-2 self-start ml-9">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-amber-200/70 shadow-xs text-xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                NEXT AVAILABLE:
              </span>
              <span className="font-bold text-[#6C5CE7]">
                15 May 2026, 11:00 AM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
