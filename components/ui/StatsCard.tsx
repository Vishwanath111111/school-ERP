import React from 'react';
import { Card, CardContent } from './Card';
import { cn } from '@/lib/utils';

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky';
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  color = 'indigo',
  className,
}) => {
  const iconColors = {
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
    sky: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400',
  };

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {title}
            </p>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
              {value}
            </h4>
            {trend && (
              <div className="flex items-center space-x-1 mt-2 text-xs font-medium">
                <span className={trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}>
                  {trend.isPositive ? '↑' : '↓'} {trend.value}
                </span>
                {description && <span className="text-slate-400 dark:text-slate-500">{description}</span>}
              </div>
            )}
            {!trend && description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{description}</p>
            )}
          </div>
          <div className={cn('p-3 rounded-xl shadow-2xs shrink-0', iconColors[color])}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
