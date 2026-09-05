import React from 'react';
import { 
  Appointment, 
  CancellationOption, 
  CancellationReasonId, 
  Doctor, 
  RefundDetails, 
  ReplacementDoctor 
} from '../types';
import { BookingDetailsCard } from './BookingDetailsCard';
import { RefundEligibleCard } from './RefundEligibleCard';
import { CancellationReasonCard } from './CancellationReasonCard';
import { TreatmentContinuityCard } from './TreatmentContinuityCard';

interface ConfirmCancellationScreenProps {
  appointment: Appointment;
  refund: RefundDetails;
  cancellationOptions: CancellationOption[];
  selectedReason: CancellationReasonId | null;
  onSelectReason: (id: CancellationReasonId) => void;
  additionalNotes: string;
  onChangeNotes: (notes: string) => void;
  currentDoctor: Doctor;
  replacementDoctor: ReplacementDoctor;
  onEditBooking: () => void;
  onKeepCurrent: () => void;
  onSwitchAndConfirm: (doctor: ReplacementDoctor) => void;
  onDirectCancel: () => void;
}

export const ConfirmCancellationScreen: React.FC<ConfirmCancellationScreenProps> = ({
  appointment,
  refund,
  cancellationOptions,
  selectedReason,
  onSelectReason,
  additionalNotes,
  onChangeNotes,
  currentDoctor,
  replacementDoctor,
  onEditBooking,
  onKeepCurrent,
  onSwitchAndConfirm,
  onDirectCancel,
}) => {
  return (
    <main className="w-full pb-8 pt-2">
      <div className="fluid-container fluid-page-padding grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-start">
        {/* Left Column: Booking Details & Full Refund Eligible */}
        <div className="lg:col-span-6 space-y-3 lg:space-y-4 flex flex-col">
          <BookingDetailsCard
            appointment={appointment}
            onEditBooking={onEditBooking}
          />

          <RefundEligibleCard refund={refund} />
        </div>

        {/* Right Column: Cancellation Reason & Treatment Continuity Options */}
        <div className="lg:col-span-6 space-y-3 lg:space-y-4 flex flex-col">
          <CancellationReasonCard
            options={cancellationOptions}
            selectedReason={selectedReason}
            onSelectReason={onSelectReason}
            additionalNotes={additionalNotes}
            onChangeNotes={onChangeNotes}
          />

          <TreatmentContinuityCard
            currentDoctor={currentDoctor}
            replacementDoctor={replacementDoctor}
            onKeepCurrent={onKeepCurrent}
            onSwitchAndConfirm={onSwitchAndConfirm}
            onDirectCancel={onDirectCancel}
          />
        </div>
      </div>
    </main>
  );
};
