import React from 'react';
import { LogOut, Calendar, User } from 'lucide-react';

interface AppointmentProps {
  onLogout: () => void;
}

interface AppointmentData {
  time: string;
  patient: string;
  type: string;
}

const Appointment: React.FC<AppointmentProps> = ({ onLogout }) => {
  const appointments: AppointmentData[] = [
    { time: '09:00 AM', patient: 'John Smith', type: 'Consultation' },
    { time: '10:30 AM', patient: 'Sarah Johnson', type: 'Follow-up' },
    { time: '02:00 PM', patient: 'Mike Brown', type: 'Check-up' },
    { time: '03:30 PM', patient: 'Emma Davis', type: 'Consultation' },
  ];

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome to <span className="text-purple-300">ClinicPro</span>
              </h1>
              <p className="text-purple-200">Manage your appointments with ease</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 border border-red-400/30"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-2xl border border-purple-400/30">
              <div className="flex items-center space-x-3">
                <Calendar className="w-8 h-8 text-purple-300" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Today's Appointments</h3>
                  <p className="text-purple-200">12 scheduled</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-6 rounded-2xl border border-blue-400/30">
              <div className="flex items-center space-x-3">
                <User className="w-8 h-8 text-blue-300" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Active Patients</h3>
                  <p className="text-blue-200">248 registered</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 rounded-2xl border border-green-400/30">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Completed Today</h3>
                  <p className="text-green-200">8 appointments</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Appointment Management</h2>
            
            <div className="space-y-4">
              {appointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div>
                      <p className="text-white font-medium">{appointment.time}</p>
                      <p className="text-purple-200 text-sm">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{appointment.patient}</p>
                    <p className="text-purple-200 text-sm">Patient</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;