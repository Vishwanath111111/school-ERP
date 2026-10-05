'use client';

import React, { useState, useEffect } from 'react';
import { TimetableEntry, TimetableRequest } from '@/types/timetable';
import { Dialog } from '@/components/ui/Dialog';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { UserCheck, Clock, MapPin, User, AlertCircle } from 'lucide-react';

export interface TeacherSubstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, data: TimetableRequest) => Promise<void>;
  entry: TimetableEntry | null;
}

const SUBSTITUTE_TEACHER_OPTIONS = [
  { value: 'Dr. Robert Chen', label: 'Dr. Robert Chen (Physics)' },
  { value: 'Meera Kulkarni', label: 'Meera Kulkarni (English)' },
  { value: 'Sanjay Rao', label: 'Sanjay Rao (Chemistry)' },
  { value: 'Vikram Deshmukh', label: 'Vikram Deshmukh (Computer Science)' },
  { value: 'Anita Sharma', label: 'Anita Sharma (Mathematics)' },
];

export const TeacherSubstitutionModal: React.FC<TeacherSubstitutionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  entry,
}) => {
  const [substituteTeacher, setSubstituteTeacher] = useState<string>('Dr. Robert Chen');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (entry?.substituteTeacherName) {
      setSubstituteTeacher(entry.substituteTeacherName);
    } else {
      setSubstituteTeacher('Dr. Robert Chen');
    }
  }, [entry, isOpen]);

  if (!entry) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updateData: TimetableRequest = {
        className: entry.className,
        dayOfWeek: entry.dayOfWeek,
        periodNumber: entry.periodNumber,
        subject: entry.subject,
        teacherName: entry.teacherName,
        substituteTeacherName: substituteTeacher,
        roomNumber: entry.roomNumber,
        startTime: entry.startTime,
        endTime: entry.endTime,
        isSubstituted: true,
      };
      await onSave(entry.id, updateData);
      onClose();
    } catch {
      // Handled in parent toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Teacher Substitution"
      description={`Reassign period slot #${entry.periodNumber} (${entry.subject}) to a substitute educator.`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Period Details Box */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Regular Educator:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {entry.teacherName || 'Unassigned'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Day & Period:</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {entry.dayOfWeek} - Period {entry.periodNumber} ({entry.startTime} - {entry.endTime})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Class & Room:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {entry.className} ({entry.roomNumber})
            </span>
          </div>
        </div>

        {/* Substitute Teacher Selector */}
        <Select
          label="Select Available Substitute Educator"
          required
          value={substituteTeacher}
          onChange={(e) => setSubstituteTeacher(e.target.value)}
          options={SUBSTITUTE_TEACHER_OPTIONS}
        />

        {/* Actions Bar */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Assign Substitute
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
