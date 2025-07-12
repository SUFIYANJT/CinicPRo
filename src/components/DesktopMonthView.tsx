// components/DesktopMonthView.tsx
import React, { useState, type JSX } from 'react';
import type { AppointmentData } from '../types/appointments';

interface DesktopMonthViewProps {
  currentMonth: Date;
  appointments: Record<string, AppointmentData[]>;
  onDayClick: (date: string) => void;
}

const DesktopMonthView: React.FC<DesktopMonthViewProps> = ({ currentMonth, appointments, onDayClick }) => {
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterPatient, setFilterPatient] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const leadingEmptyDays = firstDay.getDay();

  const days: JSX.Element[] = [];

  for (let i = 0; i < leadingEmptyDays; i++) {
    days.push(<div key={`empty-${i}`} className="p-2" />);
  }

  for (let date = 1; date <= lastDay.getDate(); date++) {
    const currentDate = new Date(year, month, date);
    const key = currentDate.toISOString().split('T')[0];
    const dailyAppointments = (appointments[key] || []).filter((appt) => {
      return (
        (!filterDoctor || appt.type === filterDoctor) &&
        (!filterPatient || appt.patient === filterPatient)
      );
    });

    days.push(
      <div
        key={key}
        onClick={() => onDayClick(key)}
        className={`border rounded-md p-2 cursor-pointer hover:${darkMode ? 'bg-gray-800' : 'bg-gray-100'} ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      >
        <div className="font-semibold">{date}</div>
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

  return (
    <div className={`${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'} p-2 space-y-4`}>
      <div className="flex gap-2 items-center">
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

        <button
          className="ml-auto border px-3 py-1 rounded text-sm"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">{days}</div>
    </div>
  );
};

export default DesktopMonthView;
