import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', text, className }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-6 space-y-3', className)}>
      <Loader2 className={cn('animate-spin text-indigo-600 dark:text-indigo-400', sizes[size])} />
      {text && <p className="text-xs font-medium text-slate-500 dark:text-slate-400 animate-pulse">{text}</p>}
    </div>
  );
};

export interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, cols = 6 }) => {
  return (
    <div className="w-full space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, rIndex) => (
        <div key={rIndex} className="flex items-center space-x-4 p-4 bg-slate-50/70 dark:bg-slate-800/40 rounded-lg">
          {Array.from({ length: cols }).map((_, cIndex) => (
            <div
              key={cIndex}
              className={cn(
                'h-4 bg-slate-200 dark:bg-slate-700 rounded-md',
                cIndex === 0 ? 'w-12' : cIndex === 1 ? 'w-36' : 'w-24'
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
