import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ActivityItem } from '@/types/dashboard';
import { UserPlus, DollarSign, CalendarCheck, Bell, Clock } from 'lucide-react';

export interface RecentActivityFeedProps {
  activities: ActivityItem[];
}

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activities }) => {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'ADMISSION':
        return <UserPlus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'FEE':
        return <DollarSign className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case 'ATTENDANCE':
        return <CalendarCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'NOTICE':
        return <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const getBgColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'ADMISSION':
        return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900';
      case 'FEE':
        return 'bg-sky-50 dark:bg-sky-950/40 border-sky-100 dark:border-sky-900';
      case 'ATTENDANCE':
        return 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900';
      case 'NOTICE':
        return 'bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900';
      default:
        return 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700';
    }
  };

  return (
    <Card className="h-full border-slate-200/80 dark:border-slate-800 shadow-xs">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <CardTitle className="text-sm">Recent Activity & Audit Log</CardTitle>
        </div>
        <Badge variant="info" size="sm">Real-time</Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3.5">
          {activities.map((item) => (
            <div key={item.id} className="flex items-start space-x-3 group">
              <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${getBgColor(item.type)}`}>
                {getIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h5>
                  <span className="text-[10px] text-slate-400 font-medium shrink-0">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
