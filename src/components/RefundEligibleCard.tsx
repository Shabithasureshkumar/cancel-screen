import React from 'react';
import { RefundDetails } from '../types';

interface RefundEligibleCardProps {
  refund: RefundDetails;
}

export const RefundEligibleCard: React.FC<RefundEligibleCardProps> = ({ refund }) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#8C7CF0]/30 shadow-xs flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between">
      {/* 3D Wallet Illustration */}
      <div className="shrink-0 w-28 sm:w-36 flex items-center justify-center">
        <img
          src="/assets/wallet_3d.png"
          alt="Refund Wallet"
          className="w-full max-w-[135px] h-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=160&h=160&fit=crop';
          }}
        />
      </div>

      {/* Refund Details */}
      <div className="flex-1 w-full text-center sm:text-left">
        <h3 className="text-base sm:text-lg font-extrabold text-[#6C5CE7] mb-0.5">
          Full Refund Eligible
        </h3>
        <p className="text-xs text-slate-500 font-medium mb-3">
          You will receive a full refund for this appointment
        </p>

        {/* Status Line */}
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-3.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-xs font-bold text-emerald-600">
            Status: {refund.status}
          </span>
        </div>

        {/* 2 Amount / Method Boxes */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
          <div className="bg-slate-50 border border-slate-100/80 rounded-xl p-2.5 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Refund Amount
            </span>
            <span className="text-sm sm:text-base font-extrabold text-slate-900 block mt-0.5">
              {refund.amount}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-100/80 rounded-xl p-2.5 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Return Method
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 block mt-0.5 truncate">
              {refund.returnMethod}
            </span>
          </div>
        </div>

        <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
          {refund.estimatedArrival}
        </p>
      </div>
    </div>
  );
};
