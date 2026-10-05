'use client';

import React, { useState } from 'react';
import { SchoolProfileSettings } from '@/types/settings';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Calendar, Save, CheckCircle2 } from 'lucide-react';

export interface AcademicYearTabProps {
  settings: SchoolProfileSettings;
  onSave: (settings: SchoolProfileSettings) => Promise<void>;
  isLoading: boolean;
}

const YEAR_OPTIONS = [
  { value: '2025-2026', label: 'Academic Year 2025-2026 (Active)' },
  { value: '2026-2027', label: 'Academic Year 2026-2027 (Upcoming)' },
  { value: '2024-2025', label: 'Academic Year 2024-2025 (Archived)' },
];

export const AcademicYearTab: React.FC<AcademicYearTabProps> = ({
  settings,
  onSave,
  isLoading,
}) => {
  const [formData, setFormData] = useState<SchoolProfileSettings>(settings);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Academic Session & Term Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Active Academic Year Session"
            value={formData.currentAcademicYear}
            onChange={(e) => setFormData({ ...formData, currentAcademicYear: e.target.value })}
            options={YEAR_OPTIONS}
          />
          <Input
            label="Active Terms Structure"
            value={formData.activeTerms || ''}
            onChange={(e) => setFormData({ ...formData, activeTerms: e.target.value })}
            placeholder="e.g. Term 1, Term 2, Final Term"
            leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Session Opening Date"
            type="date"
            value={formData.sessionStartDate || ''}
            onChange={(e) => setFormData({ ...formData, sessionStartDate: e.target.value })}
            leftIcon={<Calendar className="w-4 h-4 text-indigo-500" />}
          />
          <Input
            label="Session Concluding Date"
            type="date"
            value={formData.sessionEndDate || ''}
            onChange={(e) => setFormData({ ...formData, sessionEndDate: e.target.value })}
            leftIcon={<Calendar className="w-4 h-4 text-rose-500" />}
          />
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSaving || isLoading}
            leftIcon={<Save className="w-4 h-4" />}
            className="shadow-md shadow-indigo-600/20"
          >
            Update Session Setup
          </Button>
        </div>
      </div>
    </form>
  );
};
