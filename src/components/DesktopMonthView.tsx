// components/DesktopMonthView.tsx
import React, { type JSX } from 'react';
import type { AppointmentData } from '../types/appointments'; // adjust if needed
 // adjust if needed


interface DesktopMonthViewProps {
  currentMonth: Date;
  appointments: Record<string, AppointmentData[]>;
  onDayClick: (date: string) => void;
}

const DesktopMonthView: React.FC<DesktopMonthViewProps> = ({ currentMonth, appointments, onDayClick }) => {
  const days: JSX.Element[] = [];

  for (let i = 1; i <= 31; i++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
    if (date.getMonth() !== currentMonth.getMonth()) break;

    const key = date.toISOString().split('T')[0];
    const dailyAppointments = appointments[key] || [];

    days.push(
      <div
        key={key}
        onClick={() => onDayClick(key)}
        className="border rounded-md p-2 cursor-pointer hover:bg-gray-100"
      >
        <div className="font-semibold">{date.getDate()}</div>
        <ul className="text-xs mt-1 space-y-1">
          {dailyAppointments.map((appt, idx) => (
            <li key={idx}>
              {appt.time} - {appt.patient}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <div className="grid grid-cols-7 gap-2">{days}</div>;
};

export default DesktopMonthView;
