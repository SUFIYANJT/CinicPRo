// components/MobileDayView.tsx
import React, { useState } from 'react';
import type { AppointmentData } from '../types/appointments';

interface MobileDayViewProps {
  date: string;
  appointments: AppointmentData[];
  onSelectDate: (date: string) => void;
  onDayClick: (date: string) => void;
}

const MobileDayView: React.FC<MobileDayViewProps> = ({ date, appointments, onSelectDate, onDayClick }) => {
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterPatient, setFilterPatient] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const filteredAppointments = appointments.filter((appt) => {
    return (
      (!filterDoctor || appt.type === filterDoctor) &&
      (!filterPatient || appt.patient === filterPatient)
    );
  });

  return (
    <div className={`space-y-4 px-2 py-4 ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => onSelectDate(e.target.value)}
          className="border px-3 py-1 rounded w-full"
        />
        <button
          className="border px-3 py-1 rounded text-sm"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <select
          className="border px-2 py-1 rounded"
          value={filterDoctor}
          onChange={(e) => setFilterDoctor(e.target.value)}
        >
          <option value="">Filter by Doctor</option>
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Johnson">Dr. Johnson</option>
          <option value="Dr. Lee">Dr. Lee</option>
        </select>

        <select
          className="border px-2 py-1 rounded"
          value={filterPatient}
          onChange={(e) => setFilterPatient(e.target.value)}
        >
          <option value="">Filter by Patient</option>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
          <option value="Charlie">Charlie</option>
        </select>
      </div>

      <div className="space-y-2">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appt, idx) => (
            <div
              key={idx}
              className="border p-2 rounded shadow-sm cursor-pointer"
              onClick={() => onDayClick(date)}
            >
              <div className="font-medium">{appt.patient}</div>
              <div className="text-sm text-gray-600">{appt.time} - {appt.type}</div>
            </div>
          ))
        ) : (
          <div
            className="text-gray-500 text-sm border p-3 rounded text-center cursor-pointer"
            onClick={() => onDayClick(date)}
          >
            No appointments — tap to add
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileDayView;
