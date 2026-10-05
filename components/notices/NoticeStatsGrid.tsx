'use client';

import React from 'react';
import { StatsCard } from '@/components/ui/StatsCard';
import { NoticeStats } from '@/types/notice';
import { Bell, AlertTriangle, Users, Calendar } from 'lucide-react';

export interface NoticeStatsGridProps {
  stats: NoticeStats;
}

export const NoticeStatsGrid: React.FC<NoticeStatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Active Circulars"
        value={stats.totalNotices}
        icon={<Bell className="w-6 h-6" />}
        color="indigo"
        description="Broadcasted announcements"
      />
      <StatsCard
        title="Urgent Pinned Notices"
        value={stats.urgentNoticesCount}
        icon={<AlertTriangle className="w-6 h-6" />}
        color="rose"
        description="High priority alerts"
      />
      <StatsCard
        title="Parent Circulars"
        value={stats.parentNoticesCount}
        icon={<Users className="w-6 h-6" />}
        color="emerald"
        description="Targeted to guardians"
      />
      <StatsCard
        title="Published Today"
        value={stats.publishedTodayCount}
        icon={<Calendar className="w-6 h-6" />}
        color="sky"
        description="Newly posted circulars"
      />
    </div>
  );
};
