// components/AppointmentModal.tsx
import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Clock, User, Stethoscope, Calendar, LogOut, Check } from 'lucide-react';
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

const AppointmentModal: React.FC<AppointmentModalProps> = ({ 
  date, 
  appointments, 
  onClose, 
  onAdd, 
  onRemove, 
  onLogout 
}) => {
  const [time, setTime] = useState('');
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    if (time && patient && doctor) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      onAdd({ time, patient, type: doctor });
      setTime('');
      setPatient('');
      setDoctor('');
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const handleRemove = async (index: number) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    onRemove(index);
    setIsLoading(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 dark:bg-gray-900/90 text-black dark:text-white backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden border border-white/20 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-300">

        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Appointments</h2>
                <p className="text-blue-100 text-sm font-medium">{formatDate(date)}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-h-[65vh] overflow-y-auto">
          {showSuccess && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
              <div className="p-2 bg-green-500 rounded-full">
                <Check className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-700 dark:text-green-200 font-medium">Appointment added successfully!</span>
            </div>
          )}

          {/* Existing Appointments */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Current Appointments ({appointments.length})
            </h3>
            {appointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No appointments scheduled for this day</p>
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.map((appt, i) => (
                  <div 
                    key={i}
                    className="group flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-blue-100 dark:border-gray-600 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                        <Clock className="w-4 h-4" />
                        {appt.time}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <User className="w-4 h-4" />
                        {appt.patient}
                      </div>
                      <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                        <Stethoscope className="w-4 h-4" />
                        {appt.type}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(i)}
                      disabled={isLoading}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add New Appointment Form */}
          <div className="p-8 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
              <Plus className="w-6 h-6 text-green-500" />
              Add New Appointment
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Patient Selection */}
              <div className="space-y-3">
                <label className="block text-base font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Patient
                </label>
                <select
                  className="w-full px-4 py-4 text-base rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={patient}
                  onChange={e => setPatient(e.target.value)}
                >
                  <option value="">Select Patient</option>
                  {patients.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Doctor Selection */}
              <div className="space-y-3">
                <label className="block text-base font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-purple-500" />
                  Doctor
                </label>
                <select
                  className="w-full px-4 py-4 text-base rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  value={doctor}
                  onChange={e => setDoctor(e.target.value)}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Input */}
            <div className="space-y-3 mb-6">
              <label className="block text-base font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-500" />
                Time
              </label>
              <input
                type="time"
                className="w-full px-4 py-4 text-base rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                value={time}
                onChange={e => setTime(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!time || !patient || !doctor || isLoading}
              className="w-full py-4 px-6 text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" />
                  Add Appointment
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Close
          </button>
          
          <button
            onClick={onLogout}
            className="px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
