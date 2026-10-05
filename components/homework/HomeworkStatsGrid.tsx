'use client';

import React from 'react';
import { StatsCard } from '@/components/ui/StatsCard';
import { HomeworkStats } from '@/types/homework';
import { BookOpen, Clock, CheckCircle2, FileCheck } from 'lucide-react';

export interface HomeworkStatsGridProps {
  stats: HomeworkStats;
}

export const HomeworkStatsGrid: React.FC<HomeworkStatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Assignments"
        value={stats.totalAssignments}
        icon={<BookOpen className="w-6 h-6" />}
        color="indigo"
        description="Assigned coursework"
      />
      <StatsCard
        title="Active Course Tasks"
        value={stats.activeAssignmentsCount}
        icon={<Clock className="w-6 h-6" />}
        color="emerald"
        description="Open for submission"
      />
      <StatsCard
        title="Due Today"
        value={stats.dueTodayCount}
        icon={<CheckCircle2 className="w-6 h-6" />}
        color="amber"
        description="Submission deadline today"
      />
      <StatsCard
        title="Submissions Received"
        value={stats.totalSubmissionsReceived}
        icon={<FileCheck className="w-6 h-6" />}
        color="sky"
        description="Total student hand-ins"
      />
    </div>
  );
};
