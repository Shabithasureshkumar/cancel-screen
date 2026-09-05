import React from 'react';
import { 
  Video, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  Edit3 
} from 'lucide-react';
import { Appointment } from '../types';

interface BookingDetailsCardProps {
  appointment: Appointment;
  onEditBooking?: () => void;
}

export const BookingDetailsCard: React.FC<BookingDetailsCardProps> = ({ 
  appointment, 
  onEditBooking 
}) => {
  const { doctor } = appointment;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Booking Details
        </h3>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EEF2FF] text-[#6366F1] text-xs font-semibold">
          <Video className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>{doctor.consultationType}</span>
        </div>
      </div>

      {/* Doctor Info Section */}
      <div className="flex items-start gap-3.5 mb-4">
        <div className="relative flex-shrink-0">
          <img
            src={doctor.avatarUrl}
            alt={doctor.name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-indigo-50"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&crop=face';
            }}
          />
          {doctor.isVerified && (
            <div className="absolute -bottom-0.5 -right-0.5 bg-[#6C5CE7] text-white rounded-full p-1 border-2 border-white shadow-xs">
              <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {doctor.name}
            </h4>
            {doctor.isVerified && (
              <CheckCircle2 className="w-4 h-4 text-[#6C5CE7] fill-[#6C5CE7]/20 flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {doctor.specialty}
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5 text-xs">
            <div className="flex items-center gap-1 text-slate-700 font-semibold">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{doctor.rating}</span>
              <span className="text-slate-400 font-normal">({doctor.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-1 text-[#6C5CE7] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{doctor.matchScore}% Match</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Metadata Pills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-4">
        <div className="bg-[#F0F5FF] rounded-xl p-2.5 text-center flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            DATE
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
            {appointment.date}
          </span>
        </div>

        <div className="bg-[#F0F5FF] rounded-xl p-2.5 text-center flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            TIME
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
            {appointment.time}
          </span>
        </div>

        <div className="bg-[#F0F5FF] rounded-xl p-2.5 text-center flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            DURATION
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
            {appointment.duration}
          </span>
        </div>

        <div className="bg-[#F0F5FF] rounded-xl p-2.5 text-center flex flex-col justify-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            FEE
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#6C5CE7] mt-0.5">
            {appointment.fee}
          </span>
        </div>
      </div>

      {/* Edit Booking Status Button */}
      <button
        type="button"
        onClick={onEditBooking}
        className="w-full py-2.5 px-4 rounded-xl bg-[#F0EDFF] hover:bg-[#E5E0FF] text-[#6C5CE7] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.99] cursor-pointer"
      >
        <Edit3 className="w-3.5 h-3.5 stroke-[2.2]" />
        <span>Edit Booking Status</span>
      </button>
    </div>
  );
};
