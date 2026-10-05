'use client';

import React from 'react';
import { StatsCard } from '@/components/ui/StatsCard';
import { ExamStats } from '@/types/exam';
import { GraduationCap, Calendar, Clock, FileCheck } from 'lucide-react';

export interface ExamStatsGridProps {
  stats: ExamStats;
}

export const ExamStatsGrid: React.FC<ExamStatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Scheduled Exams"
        value={stats.totalExams}
        icon={<GraduationCap className="w-6 h-6" />}
        color="indigo"
        description="Term assessments"
      />
      <StatsCard
        title="Upcoming Exams"
        value={stats.scheduledCount}
        icon={<Calendar className="w-6 h-6" />}
        color="emerald"
        description="Scheduled in timetable"
      />
      <StatsCard
        title="Ongoing Exams"
        value={stats.ongoingCount}
        icon={<Clock className="w-6 h-6" />}
        color="amber"
        description="In progress today"
      />
      <StatsCard
        title="Completed Evaluations"
        value={stats.completedCount}
        icon={<FileCheck className="w-6 h-6" />}
        color="sky"
        description="Grading complete"
      />
    </div>
  );
};
