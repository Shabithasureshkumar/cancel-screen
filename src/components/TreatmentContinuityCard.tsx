import React, { useState } from 'react';
import { 
  Bot, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Star 
} from 'lucide-react';
import { Doctor, ReplacementDoctor } from '../types';

interface TreatmentContinuityCardProps {
  currentDoctor: Doctor;
  replacementDoctor: ReplacementDoctor;
  onKeepCurrent: () => void;
  onSwitchAndConfirm: (doctor: ReplacementDoctor) => void;
  onDirectCancel: () => void;
}

export const TreatmentContinuityCard: React.FC<TreatmentContinuityCardProps> = ({
  currentDoctor,
  replacementDoctor,
  onKeepCurrent,
  onSwitchAndConfirm,
  onDirectCancel,
}) => {
  const [selectedDoctorType, setSelectedDoctorType] = useState<'current' | 'replacement'>('replacement');

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div>
        {/* Heading & Subtitle */}
        <div className="text-center mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
            Treatment Continuity Options
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Your current doctor is unavailable until {currentDoctor.nextAvailable}. Choose the option that best supports your ongoing treatment.
          </p>
        </div>

        {/* AI Care Recommendation Banner */}
        <div className="bg-[#EEF2FF] border border-[#C7D2FE]/70 rounded-xl p-3 sm:p-3.5 mb-5 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-[#6C5CE7] shrink-0 mt-0.5">
            <Bot className="w-5 h-5 stroke-[2]" />
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            <strong className="text-[#4F46E5] font-bold">AI Care Recommendation:</strong>{' '}
            Because your current doctor is unavailable until May 27, we found a highly compatible provider available tomorrow. Switching doctors may help maintain treatment continuity and avoid delays in care.
          </p>
        </div>

        {/* Two Doctor Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
          {/* Card 1: Current Doctor */}
          <div 
            onClick={() => setSelectedDoctorType('current')}
            className={`rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
              selectedDoctorType === 'current'
                ? 'border-2 border-[#6C5CE7] shadow-sm bg-[#F9F8FE]'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div>
              {/* Doctor Header */}
              <div className="flex items-center gap-3 mb-3.5">
                <img
                  src="/assets/dr_michelle_comp.png"
                  alt={currentDoctor.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/dr_michelle.png';
                  }}
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {currentDoctor.name}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Current Provider
                  </span>
                </div>
              </div>

              {/* Wait Info */}
              <div className="space-y-1.5 text-xs mb-3.5 pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Next Available</span>
                  <span className="font-bold text-slate-800">{currentDoctor.nextAvailable}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Wait Duration</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-extrabold text-[10px]">
                    {currentDoctor.waitDays} Days
                  </span>
                </div>
              </div>

              {/* Bullets */}
              <ul className="space-y-1.5 text-[11px] text-slate-600 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Full treatment continuity & history</span>
                </li>
                <li className="flex items-center gap-2">
                  <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>Significant delay in care plan</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDoctorType('current');
                onKeepCurrent();
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Keep Current Doctor
            </button>
          </div>

          {/* Card 2: Recommended Doctor (Dr. Sarah Wilson) */}
          <div 
            onClick={() => setSelectedDoctorType('replacement')}
            className={`rounded-2xl p-4 border relative transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
              selectedDoctorType === 'replacement'
                ? 'border-2 border-[#6C5CE7] shadow-sm bg-[#F9F8FE]'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            {/* Top Right AI Recommended Badge */}
            <div className="absolute top-0 right-0">
              <span className="px-2.5 py-0.5 rounded-bl-xl bg-[#6C5CE7] text-white text-[9px] font-extrabold tracking-wider uppercase block">
                AI RECOMMENDED
              </span>
            </div>

            <div>
              {/* Doctor Header */}
              <div className="flex items-center gap-3 mb-3.5 pt-1">
                <img
                  src={replacementDoctor.avatarUrl}
                  alt={replacementDoctor.name}
                  className="w-10 h-10 rounded-full object-cover border border-purple-200 shadow-2xs"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1594824813575-c0a76986518a?w=100&h=100&fit=crop&crop=face';
                  }}
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      {replacementDoctor.name}
                    </h4>
                    <span className="text-amber-500 text-xs">⚡</span>
                  </div>
                  <span className="inline-block px-1.5 py-0.5 rounded bg-purple-100 text-[#6C5CE7] text-[10px] font-bold mt-0.5">
                    {replacementDoctor.matchScore}% Match Score
                  </span>
                </div>
              </div>

              {/* Wait Info */}
              <div className="space-y-1.5 text-xs mb-3.5 pb-3 border-b border-purple-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Availability</span>
                  <span className="font-bold text-emerald-600">{replacementDoctor.availability}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Experience</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                    4.9 (12+ Years)
                  </span>
                </div>
              </div>

              {/* Bullets */}
              <ul className="space-y-1.5 text-[11px] text-slate-600 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6C5CE7] shrink-0" />
                  <span>{replacementDoctor.specialtyText}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#6C5CE7] shrink-0" />
                  <span>{replacementDoctor.delayText}</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDoctorType('replacement');
                onSwitchAndConfirm(replacementDoctor);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-[#8C7CF0] hover:bg-[#7C6CE0] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Switch Doctor
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onDirectCancel}
          className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer py-1"
        >
          Cancel Appointment
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onKeepCurrent}
            className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Keep Current
          </button>

          <button
            type="button"
            onClick={() => onSwitchAndConfirm(replacementDoctor)}
            className="flex-1 sm:flex-initial py-2.5 px-6 rounded-xl bg-[#6C5CE7] hover:bg-[#5C4CD7] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
          >
            Switch & Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
