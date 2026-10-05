'use client';

import React from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { NoticeFilter } from '@/types/notice';
import { FilterX } from 'lucide-react';

export interface NoticeFiltersProps {
  filters: NoticeFilter;
  onFilterChange: (filters: NoticeFilter) => void;
  onReset: () => void;
}

const CATEGORY_OPTIONS = [
  { value: 'ALL', label: 'All Categories' },
  { value: 'EXAM', label: 'Examinations' },
  { value: 'EVENT', label: 'Events & Functions' },
  { value: 'ACADEMIC', label: 'Academic & Curriculum' },
  { value: 'EMERGENCY', label: 'Emergency Alerts' },
  { value: 'GENERAL', label: 'General Notices' },
];

const AUDIENCE_OPTIONS = [
  { value: 'ALL', label: 'All Audiences' },
  { value: 'PARENTS', label: 'Parents Only' },
  { value: 'TEACHERS', label: 'Teachers & Staff' },
  { value: 'STUDENTS', label: 'Students Only' },
];

export const NoticeFilters: React.FC<NoticeFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const hasActiveFilters =
    !!filters.searchQuery ||
    (filters.category && filters.category !== 'ALL') ||
    (filters.audience && filters.audience !== 'ALL');

  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        {/* Search Bar */}
        <div className="lg:col-span-5">
          <SearchBar
            value={filters.searchQuery || ''}
            onChange={(val) => onFilterChange({ ...filters, searchQuery: val })}
            placeholder="Search circulars by title, keyword, or author..."
          />
        </div>

        {/* Category Filter */}
        <div className="lg:col-span-4">
          <Select
            value={filters.category || 'ALL'}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            options={CATEGORY_OPTIONS}
          />
        </div>

        {/* Audience Filter */}
        <div className="lg:col-span-3">
          <Select
            value={filters.audience || 'ALL'}
            onChange={(e) => onFilterChange({ ...filters, audience: e.target.value })}
            options={AUDIENCE_OPTIONS}
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
