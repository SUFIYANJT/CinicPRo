// components/DesktopMonthView.tsx
import React, { useState, type JSX } from 'react';
import { Filter, Sun, Moon, Calendar, ChevronLeft, ChevronRight, Users, Stethoscope } from 'lucide-react';
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

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days: JSX.Element[] = [];

  // Add empty days
  for (let i = 0; i < leadingEmptyDays; i++) {
    days.push(
      <div key={`empty-${i}`} className="p-2 min-h-[100px] opacity-50" />
    );
  }

  // Add actual days
  for (let date = 1; date <= lastDay.getDate(); date++) {
    const currentDate = new Date(year, month, date);
    const key = currentDate.toISOString().split('T')[0];
    const dailyAppointments = (appointments[key] || []).filter((appt) => {
      return (
        (!filterDoctor || appt.type === filterDoctor) &&
        (!filterPatient || appt.patient === filterPatient)
      );
    });

    const isToday = new Date().toDateString() === currentDate.toDateString();
    const hasAppointments = dailyAppointments.length > 0;

    days.push(
      <div
        key={key}
        onClick={() => onDayClick(key)}
        className={`
          group relative min-h-[100px] p-3 cursor-pointer rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg
          ${darkMode 
            ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/70 hover:border-gray-600' 
            : 'bg-white/80 backdrop-blur-sm border border-white/30 hover:bg-white/90 hover:border-blue-200 hover:shadow-xl'
          }
          ${isToday ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        `}
      >
        {/* Date number */}
        <div className={`
          flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm mb-2 transition-all duration-300
          ${isToday 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
            : hasAppointments 
              ? darkMode ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
              : darkMode ? 'text-gray-300' : 'text-gray-700'
          }
        `}>
          {date}
        </div>

        {/* Appointment count badge */}
        {hasAppointments && (
          <div className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full animate-pulse">
            {dailyAppointments.length}
          </div>
        )}

        {/* Appointments list */}
        <div className="space-y-1">
          {dailyAppointments.slice(0, 3).map((appt, idx) => (
            <div
              key={idx}
              className={`
                text-xs p-2 rounded-lg transition-all duration-300 group-hover:scale-105
                ${darkMode 
                  ? 'bg-gray-700/80 text-gray-200 border border-gray-600/50' 
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 border border-blue-100'
                }
              `}
            >
              <div className="font-semibold text-blue-600 dark:text-blue-400">{appt.time}</div>
              <div className="truncate">{appt.patient}</div>
              <div className="text-xs opacity-75">{appt.type}</div>
            </div>
          ))}
          {dailyAppointments.length > 3 && (
            <div className={`
              text-xs text-center py-1 rounded-lg font-medium
              ${darkMode ? 'text-gray-400 bg-gray-700/50' : 'text-gray-500 bg-gray-100/80'}
            `}>
              +{dailyAppointments.length - 3} more
            </div>
          )}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-300" />
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-white/30'} backdrop-blur-sm rounded-2xl p-6 transition-all duration-300`}>
      {/* Header with month/year and controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {monthNames[month]} {year}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg
            ${darkMode 
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600' 
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'
            }
          `}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span className="font-medium">{darkMode ? 'Light' : 'Dark'}</span>
        </button>
      </div>

      {/* Enhanced Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/50">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-blue-500" />
          <select
            className={`
              px-3 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${darkMode 
                ? 'bg-gray-800 border-gray-600 text-white focus:bg-gray-700' 
                : 'bg-white/80 border-gray-300 text-gray-700 focus:bg-white'
              }
            `}
            value={filterDoctor}
            onChange={(e) => setFilterDoctor(e.target.value)}
          >
            <option value="">All Doctors</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            <option value="Dr. Lee">Dr. Lee</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-green-500" />
          <select
            className={`
              px-3 py-2 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-transparent
              ${darkMode 
                ? 'bg-gray-800 border-gray-600 text-white focus:bg-gray-700' 
                : 'bg-white/80 border-gray-300 text-gray-700 focus:bg-white'
              }
            `}
            value={filterPatient}
            onChange={(e) => setFilterPatient(e.target.value)}
          >
            <option value="">All Patients</option>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
            <option value="Charlie">Charlie</option>
          </select>
        </div>

        {/* Clear filters button */}
        {(filterDoctor || filterPatient) && (
          <button
            onClick={() => {
              setFilterDoctor('');
              setFilterPatient('');
            }}
            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayNames.map((day) => (
          <div
            key={day}
            className={`
              text-center py-3 font-semibold text-sm rounded-lg
              ${darkMode 
                ? 'text-gray-300 bg-gray-800/50' 
                : 'text-gray-600 bg-blue-50/80'
              }
            `}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/50 rounded-full">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Today</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/50 rounded-full">
          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
          <span className="text-xs font-medium text-green-700 dark:text-green-300">Has Appointments</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/50 rounded-full">
          <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-red-700 dark:text-red-300">Appointment Count</span>
        </div>
      </div>
    </div>
  );
};

export default DesktopMonthView;