import React from 'react';
import { 
  Appointment, 
  BetterFitSlot, 
  CancellationOption, 
  CancellationReasonId, 
  FamilyMember, 
  RefundDetails 
} from '../types';
import { BookingDetailsCard } from './BookingDetailsCard';
import { WhoNeedsHelpCard } from './WhoNeedsHelpCard';
import { RefundEligibleCard } from './RefundEligibleCard';
import { SmartAssistCard } from './SmartAssistCard';
import { CancellationReasonCard } from './CancellationReasonCard';
import { TreatmentTimelineCard } from './TreatmentTimelineCard';

interface CancelAppointmentScreenProps {
  appointment: Appointment;
  betterFit: BetterFitSlot;
  familyMembers: FamilyMember[];
  selectedMemberId: string;
  onSelectMember: (id: string) => void;
  onAddMember: () => void;
  cancellationOptions: CancellationOption[];
  selectedReason: CancellationReasonId | null;
  onSelectReason: (id: CancellationReasonId) => void;
  additionalNotes: string;
  onChangeNotes: (notes: string) => void;
  refund: RefundDetails;
  onEditBooking: () => void;
  onReschedule: () => void;
  onKeepAppointment: () => void;
  onConfirmCancellation: () => void;
}

export const CancelAppointmentScreen: React.FC<CancelAppointmentScreenProps> = ({
  appointment,
  betterFit,
  familyMembers,
  selectedMemberId,
  onSelectMember,
  onAddMember,
  cancellationOptions,
  selectedReason,
  onSelectReason,
  additionalNotes,
  onChangeNotes,
  refund,
  onEditBooking,
  onReschedule,
  onKeepAppointment,
  onConfirmCancellation,
}) => {
  return (
    <main className="w-full pb-8 pt-2">
      <div className="fluid-container fluid-page-padding grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-start">
        {/* Left Column (50% on desktop) */}
        <div className="lg:col-span-6 space-y-3 lg:space-y-4 flex flex-col">
          {/* Card 1: Booking Details */}
          <BookingDetailsCard
            appointment={appointment}
            onEditBooking={onEditBooking}
          />

          {/* Card 2: Who Needs Help? */}
          <WhoNeedsHelpCard
            members={familyMembers}
            selectedMemberId={selectedMemberId}
            onSelectMember={onSelectMember}
            onAddMember={onAddMember}
          />

          {/* Card 3: Full Refund Eligible */}
          <RefundEligibleCard refund={refund} />
        </div>

        {/* Right Column (50% on desktop) */}
        <div className="lg:col-span-6 space-y-3 lg:space-y-4 flex flex-col">
          {/* Card 1: Smart Assist / Better Fit */}
          <SmartAssistCard
            betterFit={betterFit}
            onReschedule={onReschedule}
          />

          {/* Card 2: Cancellation Reason */}
          <CancellationReasonCard
            options={cancellationOptions}
            selectedReason={selectedReason}
            onSelectReason={onSelectReason}
            additionalNotes={additionalNotes}
            onChangeNotes={onChangeNotes}
          />

          {/* Card 3: Treatment Impact Timeline & Actions */}
          <TreatmentTimelineCard
            onKeepAppointment={onKeepAppointment}
            onConfirmCancellation={onConfirmCancellation}
          />
        </div>
      </div>
    </main>
  );
};
