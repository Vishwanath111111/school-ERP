'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '@/services/dashboard.service';
import { DashboardMetrics, ActivityItem, SchoolEvent, ClassEnrollmentSummary } from '@/types/dashboard';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { QuickActionsBar } from '@/components/dashboard/QuickActionsBar';
import { RecentActivityFeed } from '@/components/dashboard/RecentActivityFeed';
import { UpcomingEventsWidget } from '@/components/dashboard/UpcomingEventsWidget';
import { EnrollmentChartWidget } from '@/components/dashboard/EnrollmentChartWidget';
import { StatsCard } from '@/components/ui/StatsCard';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { useToast } from '@/components/ui/Toast';
import { Users, UserCheck, CalendarCheck, DollarSign, RefreshCw, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const { showToast } = useToast();

  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [enrollments, setEnrollments] = useState<ClassEnrollmentSummary[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [metricsData, activityData, eventData, enrollmentData] = await Promise.all([
        dashboardService.getDashboardMetrics(),
        dashboardService.getRecentActivities(),
        dashboardService.getUpcomingEvents(),
        dashboardService.getClassEnrollments(),
      ]);

      setMetrics(metricsData);
      setActivities(activityData);
      setEvents(eventData);
      setEnrollments(enrollmentData);
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to load dashboard statistics';
      setError(msg);
      showToast(msg, 'error', 'Dashboard Error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Loader size="lg" text="Loading Greenwood Dashboard Analytics..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-center space-y-4 my-6">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-rose-900 dark:text-rose-200">Dashboard Failed to Load</h3>
        <p className="text-xs text-rose-700 dark:text-rose-400 max-w-md mx-auto">{error}</p>
        <Button variant="danger" size="sm" onClick={fetchDashboardData} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Retry Fetching Analytics
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Top Banner with Refresh Action */}
      <div className="relative">
        <WelcomeBanner
          totalStudents={metrics?.totalStudents || 0}
          todayAttendance={metrics?.todayAttendancePercentage || 0}
        />
        <div className="absolute top-4 right-4 z-20 hidden sm:block">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDashboardData}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 shadow-none backdrop-blur-md"
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Sync Data
          </Button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Students"
          value={metrics?.totalStudents || 0}
          icon={<Users className="w-6 h-6" />}
          color="indigo"
          description="Enrolled in current session"
          trend={{ value: '12%', isPositive: true }}
        />
        <StatsCard
          title="Teaching Staff"
          value={metrics?.totalTeachers || 24}
          icon={<UserCheck className="w-6 h-6" />}
          color="emerald"
          description="Active educators"
          trend={{ value: '100% active', isPositive: true }}
        />
        <StatsCard
          title="Today's Attendance"
          value={`${metrics?.todayAttendancePercentage || 94.2}%`}
          icon={<CalendarCheck className="w-6 h-6" />}
          color="sky"
          description="Present across all classes"
          trend={{ value: '2.4%', isPositive: true }}
        />
        <StatsCard
          title="Monthly Fee Collected"
          value={`₹${(metrics?.monthlyFeeCollected || 485000).toLocaleString('en-IN')}`}
          icon={<DollarSign className="w-6 h-6" />}
          color="amber"
          description={`₹${(metrics?.pendingFeeDues || 32000).toLocaleString('en-IN')} pending dues`}
        />
      </div>

      {/* Quick Shortcuts Bar */}
      <QuickActionsBar />

      {/* Main Grid: 2 Columns for Activity Feed, Events & Class Distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Recent Activity & Class Enrollment */}
        <div className="lg:col-span-7 space-y-6">
          <RecentActivityFeed activities={activities} />
          <EnrollmentChartWidget enrollments={enrollments} />
        </div>

        {/* Right Column (5 cols): Upcoming Events */}
        <div className="lg:col-span-5 space-y-6">
          <UpcomingEventsWidget events={events} />
        </div>
      </div>
    </div>
  );
}