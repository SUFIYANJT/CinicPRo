import React, { useState } from 'react';
import { Calendar, Filter, Plus, Moon, Sun, Clock, User, Stethoscope } from 'lucide-react';

interface AppointmentData {
  patient: string;
  time: string;
  type: string;
  status?: 'confirmed' | 'pending' | 'completed';
  priority?: 'high' | 'medium' | 'low';
}

interface MobileDayViewProps {
  date: string;
  appointments: AppointmentData[];
  onSelectDate: (date: string) => void;
  onDayClick: (date: string) => void;
}

const MobileDayView: React.FC<MobileDayViewProps> = ({ 
  date, 
  appointments = [], 
  onSelectDate, 
  onDayClick 
}) => {
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterPatient, setFilterPatient] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const sampleAppointments: AppointmentData[] = [
    { patient: 'Alice Johnson', time: '09:00 AM', type: 'Dr. Smith', status: 'confirmed', priority: 'high' },
    { patient: 'Bob Wilson', time: '10:30 AM', type: 'Dr. Johnson', status: 'pending', priority: 'medium' },
    { patient: 'Charlie Brown', time: '02:00 PM', type: 'Dr. Lee', status: 'completed', priority: 'low' },
    { patient: 'Diana Prince', time: '03:30 PM', type: 'Dr. Smith', status: 'confirmed', priority: 'high' },
  ];

  const displayAppointments = appointments.length > 0 ? appointments : sampleAppointments;

  const filteredAppointments = displayAppointments.filter((appt) => {
    return (
      (!filterDoctor || appt.type === filterDoctor) &&
      (!filterPatient || appt.patient.toLowerCase().includes(filterPatient.toLowerCase()))
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

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
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      <div className={`sticky top-0 z-10 backdrop-blur-lg border-b transition-all duration-300 ${
        darkMode 
          ? 'bg-slate-900/80 border-slate-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold">Daily Schedule</h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="relative mb-4">
            <input
              type="date"
              value={date}
              onChange={(e) => onSelectDate(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode 
                  ? 'bg-slate-800 border-slate-600 text-white' 
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            />
            <div className="mt-2 text-sm opacity-70">
              {formatDate(date)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                darkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <div className="flex-1" />
            <span className="text-sm opacity-70">
              {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ${
          showFilters ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pb-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <select
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
                className={`px-3 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-600 text-white' 
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              >
                <option value="">All Doctors</option>
                <option value="Dr. Smith">Dr. Smith</option>
                <option value="Dr. Johnson">Dr. Johnson</option>
                <option value="Dr. Lee">Dr. Lee</option>
              </select>
              <input
                type="text"
                placeholder="Search patients..."
                value={filterPatient}
                onChange={(e) => setFilterPatient(e.target.value)}
                className={`px-3 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appt, idx) => (
            <div
              key={idx}
              onClick={() => onDayClick(date)}
              className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-lg ${
                darkMode 
                  ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600' 
                  : 'bg-white/80 border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-xl'
              } backdrop-blur-sm`}
            >
              <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${getPriorityIndicator(appt.priority || 'medium')}`} />
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{appt.patient}</h3>
                    {appt.status && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appt.status)}`}>
                        {appt.status}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm opacity-80">
                      <Clock className="w-4 h-4" />
                      <span>{appt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm opacity-80">
                      <Stethoscope className="w-4 h-4" />
                      <span>{appt.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))
        ) : (
          <div
            onClick={() => onDayClick(date)}
            className={`group relative p-8 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer text-center ${
              darkMode 
                ? 'border-slate-600 hover:border-slate-500 hover:bg-slate-800/30' 
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className={`p-4 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-gray-100'} group-hover:scale-110 transition-transform duration-300`}>
                <Plus className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">No appointments today</h3>
                <p className="text-sm opacity-70">Tap to add a new appointment</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => onDayClick(date)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-20"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default MobileDayView;
