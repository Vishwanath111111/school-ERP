'use client';

import React from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { HomeworkFilter } from '@/types/homework';
import { FilterX } from 'lucide-react';

export interface HomeworkFiltersProps {
  filters: HomeworkFilter;
  onFilterChange: (filters: HomeworkFilter) => void;
  onReset: () => void;
}

const CLASS_OPTIONS = [
  { value: 'ALL', label: 'All Classes' },
  { value: 'Class 11', label: 'Class 11' },
  { value: 'Class 10', label: 'Class 10' },
  { value: 'Class 9', label: 'Class 9' },
  { value: 'Class 8', label: 'Class 8' },
  { value: 'Class 7', label: 'Class 7' },
];

const SUBJECT_OPTIONS = [
  { value: 'ALL', label: 'All Subjects' },
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'English', label: 'English' },
];

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'ACTIVE', label: 'Active Assignments' },
  { value: 'COMPLETED', label: 'Completed / Graded' },
  { value: 'EXPIRED', label: 'Expired Tasks' },
];

export const HomeworkFilters: React.FC<HomeworkFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const hasActiveFilters =
    !!filters.searchQuery ||
    (filters.className && filters.className !== 'ALL') ||
    (filters.subject && filters.subject !== 'ALL') ||
    (filters.status && filters.status !== 'ALL');

  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        {/* Search Bar */}
        <div className="lg:col-span-4">
          <SearchBar
            value={filters.searchQuery || ''}
            onChange={(val) => onFilterChange({ ...filters, searchQuery: val })}
            placeholder="Search assignments by title, subject, or teacher..."
          />
        </div>

        {/* Class Filter */}
        <div className="lg:col-span-3">
          <Select
            value={filters.className || 'ALL'}
            onChange={(e) => onFilterChange({ ...filters, className: e.target.value })}
            options={CLASS_OPTIONS}
          />
        </div>

        {/* Subject Filter */}
        <div className="lg:col-span-3">
          <Select
            value={filters.subject || 'ALL'}
            onChange={(e) => onFilterChange({ ...filters, subject: e.target.value })}
            options={SUBJECT_OPTIONS}
          />
        </div>

        {/* Status Filter */}
        <div className="lg:col-span-2">
          <Select
            value={filters.status || 'ALL'}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            options={STATUS_OPTIONS}
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
