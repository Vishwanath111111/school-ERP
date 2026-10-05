'use client';

import React from 'react';
import { StatsCard } from '@/components/ui/StatsCard';
import { ReportSummary } from '@/types/report';
import { DollarSign, CheckCircle2, Users, GraduationCap } from 'lucide-react';

export interface ReportStatsGridProps {
  summary: ReportSummary;
}

export const ReportStatsGrid: React.FC<ReportStatsGridProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Revenue Collected"
        value={`₹${summary.totalRevenue.toLocaleString()}`}
        icon={<DollarSign className="w-6 h-6" />}
        color="emerald"
        description="Term fee collections"
      />
      <StatsCard
        title="Overall Attendance Rate"
        value={`${summary.overallAttendanceRate}%`}
        icon={<CheckCircle2 className="w-6 h-6" />}
        color="indigo"
        description="Schoolwide daily average"
      />
      <StatsCard
        title="Enrolled Students"
        value={summary.totalStudents}
        icon={<Users className="w-6 h-6" />}
        color="sky"
        description="Active campus headcount"
      />
      <StatsCard
        title="Teaching Faculty"
        value={summary.totalTeachers}
        icon={<GraduationCap className="w-6 h-6" />}
        color="amber"
        description="Active educators"
      />
    </div>
  );
};
