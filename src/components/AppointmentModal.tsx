// components/AppointmentModal.tsx
import React, { useState, useEffect } from 'react';
import type { AppointmentData } from '../types/appointments';

interface AppointmentModalProps {
  date: string;
  appointments: AppointmentData[];
  onClose: () => void;
  onAdd: (newAppt: AppointmentData) => void;
  onRemove: (index: number) => void;
  onLogout: () => void;
}

const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Lee'];
const patients = ['Alice', 'Bob', 'Charlie', 'David'];

const AppointmentModal: React.FC<AppointmentModalProps> = ({ date, appointments, onClose, onAdd, onRemove, onLogout }) => {
  const [time, setTime] = useState('');
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');

  const handleSubmit = () => {
    if (time && patient && doctor) {
      onAdd({ time, patient, type: doctor });
      setTime('');
      setPatient('');
      setDoctor('');
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Appointments on {date}</h2>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {appointments.map((appt, i) => (
            <div key={i} className="flex justify-between items-center border p-2 rounded">
              <span className="text-sm">{appt.time} - {appt.patient} ({appt.type})</span>
              <button className="text-red-500 text-xs" onClick={() => onRemove(i)}>Remove</button>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          <select
            className="w-full border px-2 py-1 rounded"
            value={patient}
            onChange={e => setPatient(e.target.value)}
          >
            <option value="">Select Patient</option>
            {patients.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select
            className="w-full border px-2 py-1 rounded"
            value={doctor}
            onChange={e => setDoctor(e.target.value)}
          >
            <option value="">Select Doctor</option>
            {doctors.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <input
            className="w-full border px-2 py-1 rounded"
            placeholder="Time (e.g., 10:30)"
            value={time}
            onChange={e => setTime(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-1 rounded w-full hover:bg-blue-600"
          >
            Add Appointment
          </button>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:underline"
          >
            Close
          </button>
          <button
            onClick={onLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
