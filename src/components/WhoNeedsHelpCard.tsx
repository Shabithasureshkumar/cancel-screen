import React from 'react';
import { 
  Check, 
  UserPlus, 
  Mail, 
  Phone, 
  Droplet, 
  Ruler, 
  Scale, 
  Gauge 
} from 'lucide-react';
import { FamilyMember } from '../types';

interface WhoNeedsHelpCardProps {
  members: FamilyMember[];
  selectedMemberId: string;
  onSelectMember: (id: string) => void;
  onAddMember: () => void;
}

export const WhoNeedsHelpCard: React.FC<WhoNeedsHelpCardProps> = ({
  members,
  selectedMemberId,
  onSelectMember,
  onAddMember,
}) => {
  const selectedMember = members.find((m) => m.id === selectedMemberId) || members[0];
  const displayAvatar = selectedMember.largeAvatarUrl || selectedMember.avatarUrl;

  const renderMetricIcon = (icon: string) => {
    switch (icon) {
      case 'blood':
        return <Droplet className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 fill-rose-500/20" />;
      case 'height':
        return <Ruler className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />;
      case 'weight':
        return <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />;
      case 'bmi':
        return <Gauge className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getMetricStyles = (icon: string) => {
    switch (icon) {
      case 'blood':
        return 'border-[#FFECEC] bg-[#FFFBFB]';
      case 'height':
      case 'weight':
        return 'border-[#EBF1FF] bg-[#F9FBFF]';
      case 'bmi':
        return 'border-[#FFF2E2] bg-[#FFFDF9]';
      default:
        return 'border-slate-200 bg-white';
    }
  };

  return (
    <div className="bg-transparent rounded-2xl flex flex-col md:flex-row gap-3.5 items-stretch">
      {/* Left Column: Family Member List */}
      <div className="w-full md:w-[38%] flex flex-col justify-between space-y-2.5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5">
            Who Needs Help?
          </h3>
          
          <div className="space-y-2">
            {members.map((member) => {
              const isSelected = member.id === selectedMemberId;
              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => onSelectMember(member.id)}
                  className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-white border-slate-200 shadow-xs ring-1 ring-[#5C45FD]/20'
                      : 'bg-white/80 hover:bg-white border-slate-200/70'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover object-center shrink-0 shadow-2xs"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/patient_sarah_sm.png';
                      }}
                    />
                    <div className="min-w-0 truncate">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 block truncate">
                        {member.name}
                      </span>
                      <span className="text-[11px] sm:text-xs text-slate-400 font-medium block">
                        {member.relation}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#5C45FD] flex items-center justify-center text-white shrink-0 ml-2 shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Add Family Member Button */}
        <button
          type="button"
          onClick={onAddMember}
          className="w-full py-2.5 px-3 rounded-2xl border border-dashed border-[#C4B5FD] hover:border-[#5C45FD] bg-white/60 hover:bg-white text-[#5C45FD] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Add Family Member</span>
        </button>
      </div>

      {/* Right Column: Selected Member Profile Card */}
      <div className="w-full md:w-[62%] bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
        {/* Top Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            <img
              src={displayAvatar}
              alt={selectedMember.name}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover object-center shadow-xs ring-4 ring-[#F3F0FF]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/assets/sarah_johnson.png';
              }}
            />
            {selectedMember.isVerified && (
              <div className="absolute bottom-0 right-0 bg-[#5C45FD] text-white rounded-full p-1 border-2 border-white shadow-xs flex items-center justify-center">
                <Check className="w-2.5 h-2.5 stroke-[3.5]" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                {selectedMember.name}
              </h4>
              {selectedMember.isPrimary && (
                <span className="px-2 py-0.5 rounded-md bg-[#EEF2FF] text-[#5C45FD] text-[10px] font-extrabold uppercase tracking-wide shrink-0">
                  PRIMARY
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Born: {selectedMember.birthDate}
            </p>

            <div className="mt-2 space-y-1 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#F3F0FF] text-[#5C45FD] flex items-center justify-center shrink-0">
                  <Mail className="w-3 h-3" />
                </div>
                <span className="truncate">{selectedMember.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#F3F0FF] text-[#5C45FD] flex items-center justify-center shrink-0">
                  <Phone className="w-3 h-3" />
                </div>
                <span>{selectedMember.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Health Metric Boxes */}
        {selectedMember.metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-1">
            {selectedMember.metrics.map((metric, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-2 text-center flex flex-col items-center justify-center ${getMetricStyles(
                  metric.icon
                )}`}
              >
                <div className="mb-1">{renderMetricIcon(metric.icon)}</div>
                <span className="text-[9px] font-bold tracking-wider uppercase text-slate-400">
                  {metric.label}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
