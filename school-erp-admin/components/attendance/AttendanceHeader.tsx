'use client';

import React from 'react';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Save, Calendar as CalendarIcon, Filter } from 'lucide-react';

export interface AttendanceHeaderProps {
  selectedClass: string;
  onClassChange: (className: string) => void;
  selectedDate: string;
  onDateChange: (date: string) => void;
  onMarkAllPresent: () => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
}

const CLASS_OPTIONS = [
  { value: 'ALL', label: 'All Classes' },
  { value: 'Class 10', label: 'Class 10' },
  { value: 'Class 9', label: 'Class 9' },
  { value: 'Class 8', label: 'Class 8' },
  { value: 'Class 7', label: 'Class 7' },
  { value: 'Class 6', label: 'Class 6' },
];

export const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
  selectedClass,
  onClassChange,
  selectedDate,
  onDateChange,
  onMarkAllPresent,
  onSave,
  isSaving,
}) => {
  return (
    <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Controls: Class Selector & Date Picker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 max-w-xl">
          <Select
            label="Select Grade / Class"
            value={selectedClass}
            onChange={(e) => onClassChange(e.target.value)}
            options={CLASS_OPTIONS}
          />
          <Input
            label="Attendance Date"
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            leftIcon={<CalendarIcon className="w-4 h-4 text-indigo-500" />}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 self-end pt-2 lg:pt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllPresent}
            leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          >
            Mark All Present
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onSave}
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
            className="shadow-md shadow-indigo-600/20"
          >
            Submit Attendance
          </Button>
        </div>
      </div>
    </div>
  );
};
