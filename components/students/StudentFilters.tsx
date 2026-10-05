import React from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { StudentFilter } from '@/types/student';
import { RotateCcw, Filter } from 'lucide-react';

export interface StudentFiltersProps {
  filter: StudentFilter;
  onChange: (filter: StudentFilter) => void;
  onReset: () => void;
  classes: string[];
  sections: string[];
}

export const StudentFilters: React.FC<StudentFiltersProps> = ({
  filter,
  onChange,
  onReset,
  classes,
  sections,
}) => {
  const classOptions = [
    { value: '', label: 'All Classes' },
    ...classes.map((c) => ({ value: c, label: `Class ${c}` })),
  ];

  const sectionOptions = [
    { value: '', label: 'All Sections' },
    ...sections.map((s) => ({ value: s, label: `Section ${s}` })),
  ];

  const statusOptions = [
    { value: 'ALL', label: 'All Status' },
    { value: 'ACTIVE', label: 'Active Only' },
    { value: 'INACTIVE', label: 'Inactive Only' },
  ];

  const genderOptions = [
    { value: '', label: 'All Genders' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  const hasActiveFilters =
    filter.searchQuery !== '' ||
    filter.className !== '' ||
    filter.section !== '' ||
    filter.gender !== '' ||
    filter.status !== 'ALL';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Left: Search Bar */}
        <div className="w-full lg:w-96">
          <SearchBar
            value={filter.searchQuery}
            onChange={(val) => onChange({ ...filter, searchQuery: val })}
            placeholder="Search by student name or admission no..."
          />
        </div>

        {/* Right: Select Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto">
          <Select
            options={classOptions}
            value={filter.className}
            onChange={(e) => onChange({ ...filter, className: e.target.value })}
          />

          <Select
            options={sectionOptions}
            value={filter.section}
            onChange={(e) => onChange({ ...filter, section: e.target.value })}
          />

          <Select
            options={genderOptions}
            value={filter.gender}
            onChange={(e) => onChange({ ...filter, gender: e.target.value })}
          />

          <Select
            options={statusOptions}
            value={filter.status}
            onChange={(e) =>
              onChange({ ...filter, status: e.target.value as StudentFilter['status'] })
            }
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters Applied</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onReset} leftIcon={<RotateCcw className="w-3 h-3" />}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};
