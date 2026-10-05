'use client';

import React from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { TimetableFilter } from '@/types/timetable';
import { FilterX } from 'lucide-react';

export interface TimetableFiltersProps {
  filters: TimetableFilter;
  onFilterChange: (filters: TimetableFilter) => void;
  onReset: () => void;
}

const CLASS_OPTIONS = [
  { value: 'ALL', label: 'All Classes' },
  { value: 'Class 10-A', label: 'Class 10-A' },
  { value: 'Class 10-B', label: 'Class 10-B' },
  { value: 'Class 11-A', label: 'Class 11-A (Science)' },
  { value: 'Class 11-B', label: 'Class 11-B (Commerce)' },
  { value: 'Class 9-A', label: 'Class 9-A' },
];

const DAY_OPTIONS = [
  { value: 'ALL', label: 'All Weekdays' },
  { value: 'MONDAY', label: 'Monday' },
  { value: 'TUESDAY', label: 'Tuesday' },
  { value: 'WEDNESDAY', label: 'Wednesday' },
  { value: 'THURSDAY', label: 'Thursday' },
  { value: 'FRIDAY', label: 'Friday' },
  { value: 'SATURDAY', label: 'Saturday' },
];

export const TimetableFilters: React.FC<TimetableFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const hasActiveFilters =
    !!filters.searchQuery ||
    (filters.className && filters.className !== 'ALL') ||
    (filters.dayOfWeek && filters.dayOfWeek !== 'ALL');

  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        {/* Search Bar */}
        <div className="lg:col-span-5">
          <SearchBar
            value={filters.searchQuery || ''}
            onChange={(val) => onFilterChange({ ...filters, searchQuery: val })}
            placeholder="Search schedule by subject, teacher, or room number..."
          />
        </div>

        {/* Class Filter */}
        <div className="lg:col-span-4">
          <Select
            value={filters.className || 'ALL'}
            onChange={(e) => onFilterChange({ ...filters, className: e.target.value })}
            options={CLASS_OPTIONS}
          />
        </div>

        {/* Day Filter */}
        <div className="lg:col-span-3">
          <Select
            value={filters.dayOfWeek || 'ALL'}
            onChange={(e) => onFilterChange({ ...filters, dayOfWeek: e.target.value })}
            options={DAY_OPTIONS}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-medium text-slate-500">
            Active filters applied
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            leftIcon={<FilterX className="w-3.5 h-3.5" />}
            className="text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};
