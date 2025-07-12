// components/Appointment.tsx
import React, { useState, useEffect } from 'react';
import { LogOut, Calendar } from 'lucide-react';
import { DashboardSkeleton } from './SkeletonLoader';
import { useIsMobile } from '../hooks/useIsMobile';
import DesktopMonthView from './DesktopMonthView';
import MobileDayView from './MobileDayView';
import AppointmentModal from './AppointmentModal';
import type { AppointmentData } from '../types/appointments';

interface AppointmentProps {
  onLogout: () => void;
}

const Appointment: React.FC<AppointmentProps> = ({ onLogout }) => {
  const [appointments, setAppointments] = useState<Record<string, AppointmentData[]>>({
    '2025-07-12': [
      { time: '10:00', patient: 'Alice', type: 'Checkup' },
      { time: '14:00', patient: 'Bob', type: 'Dental' },
    ],
    '2025-07-13': [
      { time: '09:30', patient: 'Charlie', type: 'Surgery' },
    ],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(getToday());
  const [modalDate, setModalDate] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleDayClick = (date: string) => {
    setModalDate(date);
  };

  const handleAddAppointment = (newAppt: AppointmentData) => {
    setAppointments(prev => ({
      ...prev,
      [modalDate!]: [...(prev[modalDate!] || []), newAppt]
    }));
  };

  const handleRemoveAppointment = (index: number) => {
    setAppointments(prev => {
      const updated = [...(prev[modalDate!] || [])];
      updated.splice(index, 1);
      return {
        ...prev,
        [modalDate!]: updated,
      };
    });
  };

  const getAppointmentsForDate = (date: string) => appointments[date] || [];

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          <h1 className="text-xl font-semibold">Appointments</h1>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 text-red-600">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </header>

      {isLoading ? (
        <DashboardSkeleton />
      ) : isMobile ? (
        <MobileDayView
          date={selectedDate}
          onSelectDate={setSelectedDate}
          appointments={getAppointmentsForDate(selectedDate)}
          onDayClick={handleDayClick}
        />
      ) : (
        <DesktopMonthView
          currentMonth={getCurrentMonth()}
          appointments={appointments}
          onDayClick={handleDayClick}
        />
      )}

      {modalDate && (
        <AppointmentModal
          date={modalDate}
          appointments={appointments[modalDate] || []}
          onClose={() => setModalDate(null)}
          onAdd={handleAddAppointment}
          onRemove={handleRemoveAppointment}
          onLogout={onLogout}
        />
      )}
    </div>
  );
};

const getToday = () => new Date().toISOString().split('T')[0];
const getCurrentMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

export default Appointment;
