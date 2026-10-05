'use client';

import React from 'react';
import { StatsCard } from '@/components/ui/StatsCard';
import { TimetableStats } from '@/types/timetable';
import { Calendar, Clock, UserCheck, Layers } from 'lucide-react';

export interface TimetableStatsGridProps {
  stats: TimetableStats;
}

export const TimetableStatsGrid: React.FC<TimetableStatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Weekly Periods"
        value={stats.totalWeeklyPeriods}
        icon={<Clock className="w-6 h-6" />}
        color="indigo"
        description="Scheduled class slots"
      />
      <StatsCard
        title="Active Class Sections"
        value={stats.activeClassSectionsCount}
        icon={<Layers className="w-6 h-6" />}
        color="emerald"
        description="Class 6 to 12 sections"
      />
      <StatsCard
        title="Substitute Allocations"
        value={stats.substitutedPeriodsCount}
        icon={<UserCheck className="w-6 h-6" />}
        color="amber"
        description="Active faculty substitutes"
      />
      <StatsCard
        title="Available Free Slots"
        value={stats.freePeriodsCount}
        icon={<Calendar className="w-6 h-6" />}
        color="sky"
        description="Unallocated period slots"
      />
    </div>
  );
};
