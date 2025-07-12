import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

// Base Skeleton Component
export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = "", 
  width = "w-full", 
  height = "h-4" 
}) => {
  return (
    <div 
      className={`${width} ${height} bg-gradient-to-r from-purple-300/20 via-purple-300/30 to-purple-300/20 rounded-lg animate-pulse bg-[length:200%_100%] ${className}`}
      style={{
        animation: 'shimmer 2s infinite linear',
        backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      }}
    />
  );
};

// Login Page Skeleton
export const LoginSkeleton: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black opacity-20"></div>
    
    {/* Animated Background Elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full opacity-10 animate-pulse delay-500"></div>
    </div>

    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-purple-300/30 rounded-full mx-auto mb-4 animate-pulse"></div>
          <Skeleton width="w-48" height="h-8" className="mx-auto mb-2" />
          <Skeleton width="w-32" height="h-5" className="mx-auto" />
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Skeleton width="w-full" height="h-14" />
            </div>
            <div className="relative">
              <Skeleton width="w-full" height="h-14" />
            </div>
          </div>

          <Skeleton width="w-full" height="h-14" />
        </div>

        <div className="mt-8 text-center">
          <Skeleton width="w-64" height="h-4" className="mx-auto" />
        </div>
      </div>
    </div>
  </div>
);

// Dashboard Stats Card Skeleton
export const StatsCardSkeleton: React.FC = () => (
  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-2xl border border-purple-400/20 animate-pulse">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-purple-300/30 rounded-full animate-pulse"></div>
      <div className="flex-1">
        <Skeleton width="w-32" height="h-5" className="mb-2" />
        <Skeleton width="w-20" height="h-4" />
      </div>
    </div>
  </div>
);

// Appointment Item Skeleton
export const AppointmentItemSkeleton: React.FC = () => (
  <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20 animate-pulse">
    <div className="flex items-center space-x-4">
      <div className="w-3 h-3 bg-purple-300/50 rounded-full animate-pulse"></div>
      <div>
        <Skeleton width="w-20" height="h-4" className="mb-2" />
        <Skeleton width="w-16" height="h-3" />
      </div>
    </div>
    <div className="text-right">
      <Skeleton width="w-24" height="h-4" className="mb-2" />
      <Skeleton width="w-12" height="h-3" />
    </div>
  </div>
);

// Dashboard Header Skeleton
export const DashboardHeaderSkeleton: React.FC = () => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <Skeleton width="w-80" height="h-10" className="mb-2" />
      <Skeleton width="w-60" height="h-6" />
    </div>
    <div className="w-24 h-12 bg-red-300/20 rounded-xl animate-pulse"></div>
  </div>
);

// Full Dashboard Skeleton
export const DashboardSkeleton: React.FC = () => (
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
        <DashboardHeaderSkeleton />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
        </div>

        {/* Skeleton Main Content Area */}
        <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-white/10">
          <Skeleton width="w-64" height="h-8" className="mb-6" />
          
          <div className="space-y-4">
            <AppointmentItemSkeleton />
            <AppointmentItemSkeleton />
            <AppointmentItemSkeleton />
            <AppointmentItemSkeleton />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Loading Button Skeleton
export const LoadingButton: React.FC<{ text?: string }> = ({ text = "Loading..." }) => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    <span>{text}</span>
  </div>
);

// App Loading Screen
export const AppLoadingSkeleton: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      <div className="text-center">
        <Skeleton width="w-32" height="h-6" className="mb-2" />
        <Skeleton width="w-24" height="h-4" />
      </div>
    </div>
  </div>
);