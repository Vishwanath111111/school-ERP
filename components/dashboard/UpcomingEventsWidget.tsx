import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SchoolEvent } from '@/types/dashboard';
import { Calendar, MapPin, Clock } from 'lucide-react';

export interface UpcomingEventsWidgetProps {
  events: SchoolEvent[];
}

export const UpcomingEventsWidget: React.FC<UpcomingEventsWidgetProps> = ({ events }) => {
  const getBadgeVariant = (category: SchoolEvent['category']) => {
    switch (category) {
      case 'EXAM':
        return 'danger';
      case 'MEETING':
        return 'warning';
      case 'HOLIDAY':
        return 'success';
      case 'EVENT':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Card className="h-full border-slate-200/80 dark:border-slate-800 shadow-xs">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <CardTitle className="text-sm">Upcoming Academic Events</CardTitle>
        </div>
        <Badge variant="default" size="sm">Calendar</Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="p-3 bg-slate-50/70 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {evt.title}
                </h5>
                <Badge variant={getBadgeVariant(evt.category)} size="sm">
                  {evt.category}
                </Badge>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{evt.time}</span>
                </div>
                {evt.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{evt.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
