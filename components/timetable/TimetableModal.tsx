'use client';

import React, { useState, useEffect } from 'react';
import { TimetableEntry, TimetableRequest, DayOfWeek } from '@/types/timetable';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, MapPin, User, BookOpen } from 'lucide-react';

export interface TimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TimetableRequest) => Promise<void>;
  initialData?: TimetableEntry | null;
}

const CLASS_OPTIONS = [
  { value: 'Class 10-A', label: 'Class 10-A' },
  { value: 'Class 10-B', label: 'Class 10-B' },
  { value: 'Class 11-A', label: 'Class 11-A (Science)' },
  { value: 'Class 11-B', label: 'Class 11-B (Commerce)' },
  { value: 'Class 9-A', label: 'Class 9-A' },
];

const DAY_OPTIONS = [
  { value: 'MONDAY', label: 'Monday' },
  { value: 'TUESDAY', label: 'Tuesday' },
  { value: 'WEDNESDAY', label: 'Wednesday' },
  { value: 'THURSDAY', label: 'Thursday' },
  { value: 'FRIDAY', label: 'Friday' },
  { value: 'SATURDAY', label: 'Saturday' },
];

const SUBJECT_OPTIONS = [
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'English', label: 'English' },
  { value: 'Social Studies', label: 'Social Studies' },
  { value: 'Physical Education', label: 'Physical Education' },
];

export const TimetableModal: React.FC<TimetableModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<TimetableRequest>({
    className: 'Class 10-A',
    dayOfWeek: 'MONDAY',
    periodNumber: 1,
    subject: 'Mathematics',
    teacherName: 'Anita Sharma',
    roomNumber: 'Room 201',
    startTime: '08:30 AM',
    endTime: '09:15 AM',
    isSubstituted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        className: initialData.className,
        dayOfWeek: initialData.dayOfWeek,
        periodNumber: initialData.periodNumber,
        subject: initialData.subject,
        teacherName: initialData.teacherName || 'Anita Sharma',
        roomNumber: initialData.roomNumber || 'Room 201',
        startTime: initialData.startTime || '08:30 AM',
        endTime: initialData.endTime || '09:15 AM',
        isSubstituted: initialData.isSubstituted,
      });
    } else {
      setFormData({
        className: 'Class 10-A',
        dayOfWeek: 'MONDAY',
        periodNumber: 1,
        subject: 'Mathematics',
        teacherName: 'Anita Sharma',
        roomNumber: 'Room 201',
        startTime: '08:30 AM',
        endTime: '09:15 AM',
        isSubstituted: false,
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.periodNumber || formData.periodNumber < 1) {
      newErrors.periodNumber = 'Valid period number (1 to 8) is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
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
      title={initialData ? 'Edit Timetable Entry' : 'Add Timetable Period Slot'}
      description={
        initialData
          ? 'Update class period timing, subject, or assigned educator.'
          : 'Schedule a new class period in Greenwood School timetable.'
      }
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Class & Day */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Class Section"
            required
            value={formData.className}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
            options={CLASS_OPTIONS}
          />
          <Select
            label="Day of Week"
            required
            value={formData.dayOfWeek}
            onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value as DayOfWeek })}
            options={DAY_OPTIONS}
          />
        </div>

        {/* Period Number & Subject */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Period Number (1 to 8)"
            type="number"
            required
            value={formData.periodNumber}
            onChange={(e) => setFormData({ ...formData, periodNumber: Number(e.target.value) })}
            error={errors.periodNumber}
            leftIcon={<Clock className="w-4 h-4 text-indigo-500" />}
          />
          <Select
            label="Subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            options={SUBJECT_OPTIONS}
          />
        </div>

        {/* Educator & Room Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Assigned Educator"
            value={formData.teacherName || ''}
            onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
            placeholder="e.g. Mrs. Anita Sharma"
            leftIcon={<User className="w-4 h-4 text-indigo-500" />}
          />
          <Input
            label="Classroom / Room Number"
            value={formData.roomNumber || ''}
            onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
            placeholder="e.g. Room 201 or Science Lab 1"
            leftIcon={<MapPin className="w-4 h-4 text-rose-500" />}
          />
        </div>

        {/* Timings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Period Start Time"
            value={formData.startTime || ''}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            placeholder="08:30 AM"
            leftIcon={<Clock className="w-4 h-4 text-indigo-500" />}
          />
          <Input
            label="Period End Time"
            value={formData.endTime || ''}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            placeholder="09:15 AM"
            leftIcon={<Clock className="w-4 h-4 text-indigo-500" />}
          />
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {initialData ? 'Save Changes' : 'Schedule Slot'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
