// components/MobileDayView.tsx
import React from 'react';
import type { AppointmentData } from '../types/appointments'; // adjust if needed
 // adjust if needed

interface MobileDayViewProps {
  date: string;
  appointments: AppointmentData[];
  onSelectDate: (date: string) => void;
  onDayClick: (date: string) => void;
}

const MobileDayView: React.FC<MobileDayViewProps> = ({ date, appointments, onSelectDate }) => {
  return (
    <div className="space-y-4">
      <input
        type="date"
        value={date}
        onChange={(e) => onSelectDate(e.target.value)}
        className="border px-3 py-1 rounded"
      />

      <div className="space-y-2">
        {appointments.length > 0 ? (
          appointments.map((appt, idx) => (
            <div key={idx} className="border p-2 rounded shadow-sm">
              <div className="font-medium">{appt.patient}</div>
              <div className="text-sm text-gray-600">{appt.time} - {appt.type}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm">No appointments</div>
        )}
      </div>
    </div>
  );
};

export default MobileDayView;
