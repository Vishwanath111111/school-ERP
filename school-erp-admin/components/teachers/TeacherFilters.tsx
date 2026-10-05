'use client';

import React from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { TeacherFilter } from '@/types/teacher';
import { FilterX } from 'lucide-react';

export interface TeacherFiltersProps {
  filters: TeacherFilter;
  onFilterChange: (filters: TeacherFilter) => void;
  onReset: () => void;
}

const DEPARTMENT_OPTIONS = [
  { value: 'ALL', label: 'All Departments' },
  { value: 'SCIENCE', label: 'Science' },
  { value: 'MATHEMATICS', label: 'Mathematics' },
  { value: 'ENGLISH', label: 'English' },
  { value: 'COMPUTER_SCIENCE', label: 'Computer Science' },
  { value: 'SOCIAL_STUDIES', label: 'Social Studies' },
  { value: 'ARTS', label: 'Arts' },
  { value: 'PHYSICAL_EDUCATION', label: 'Physical Education' },
  { value: 'LANGUAGES', label: 'Languages' },
];

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'All Statuses' },
  { value: 'true', label: 'Active Teachers' },
  { value: 'false', label: 'Inactive / On Leave' },
];

export const TeacherFilters: React.FC<TeacherFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const hasActiveFilters =
    !!filters.searchQuery ||
    (filters.department && filters.department !== 'ALL') ||
    (filters.isActive && filters.isActive !== 'ALL');

  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        {/* Search Bar */}
        <div className="lg:col-span-5">
          <SearchBar
            value={filters.searchQuery || ''}
            onChange={(val) => onFilterChange({ ...filters, searchQuery: val })}
            placeholder="Search by teacher name, ID, email, or subject..."
          />
        </div>

        {/* Department Filter */}
        <div className="lg:col-span-4">
          <Select
            value={filters.department || 'ALL'}
            onChange={(e) => onFilterChange({ ...filters, department: e.target.value })}
            options={DEPARTMENT_OPTIONS}
          />
        </div>

        {/* Status Filter */}
        <div className="lg:col-span-3">
          <Select
            value={filters.isActive || 'ALL'}
            onChange={(e) => onFilterChange({ ...filters, isActive: e.target.value })}
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
