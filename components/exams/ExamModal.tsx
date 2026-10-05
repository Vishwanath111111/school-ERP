'use client';

import React, { useState, useEffect } from 'react';
import { Exam, ExamRequest, ExamType, ExamStatus } from '@/types/exam';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { GraduationCap, Calendar, Clock, MapPin, Award } from 'lucide-react';

export interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ExamRequest) => Promise<void>;
  initialData?: Exam | null;
}

const CLASS_OPTIONS = [
  { value: 'Class 10', label: 'Class 10' },
  { value: 'Class 11', label: 'Class 11' },
  { value: 'Class 9', label: 'Class 9' },
  { value: 'Class 8', label: 'Class 8' },
  { value: 'Class 7', label: 'Class 7' },
];

const EXAM_TYPE_OPTIONS = [
  { value: 'MID_TERM', label: 'Mid-Term Examination' },
  { value: 'FINAL_TERM', label: 'Final Term Examination' },
  { value: 'UNIT_TEST', label: 'Unit Test' },
  { value: 'PRELIM', label: 'Prelim Mock Exam' },
];

const SUBJECT_OPTIONS = [
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'English', label: 'English' },
  { value: 'Social Studies', label: 'Social Studies' },
];

export const ExamModal: React.FC<ExamModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<ExamRequest>({
    examName: '',
    examType: 'MID_TERM',
    className: 'Class 10',
    subject: 'Mathematics',
    examDate: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0],
    startTime: '09:30 AM',
    endTime: '12:30 PM',
    maxMarks: 100,
    passingMarks: 35,
    roomNumber: 'Hall A-1',
    status: 'SCHEDULED',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        examName: initialData.examName,
        examType: initialData.examType,
        className: initialData.className,
        subject: initialData.subject,
        examDate: initialData.examDate,
        startTime: initialData.startTime || '09:30 AM',
        endTime: initialData.endTime || '12:30 PM',
        maxMarks: initialData.maxMarks || 100,
        passingMarks: initialData.passingMarks || 35,
        roomNumber: initialData.roomNumber || 'Hall A-1',
        status: initialData.status,
      });
    } else {
      setFormData({
        examName: '',
        examType: 'MID_TERM',
        className: 'Class 10',
        subject: 'Mathematics',
        examDate: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0],
        startTime: '09:30 AM',
        endTime: '12:30 PM',
        maxMarks: 100,
        passingMarks: 35,
        roomNumber: 'Hall A-1',
        status: 'SCHEDULED',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.examName.trim()) newErrors.examName = 'Exam name is required';
    if (!formData.examDate) newErrors.examDate = 'Exam date is required';

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
      // Handled in parent toast alert
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Exam Timetable' : 'Schedule New Examination'}
      description={
        initialData
          ? 'Update exam timing, max marks, or hall allocation.'
          : 'Schedule a term examination or unit test in Greenwood School ERP.'
      }
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Exam Name */}
        <Input
          label="Examination Title"
          required
          value={formData.examName}
          onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
          error={errors.examName}
          placeholder="e.g. Mid-Term Mathematics Assessment"
          leftIcon={<GraduationCap className="w-4 h-4 text-indigo-500" />}
        />

        {/* Exam Type & Target Class */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Examination Type"
            required
            value={formData.examType}
            onChange={(e) => setFormData({ ...formData, examType: e.target.value as ExamType })}
            options={EXAM_TYPE_OPTIONS}
          />
          <Select
            label="Target Class"
            required
            value={formData.className}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
            options={CLASS_OPTIONS}
          />
        </div>

        {/* Subject & Hall Room */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            options={SUBJECT_OPTIONS}
          />
          <Input
            label="Exam Hall / Room Number"
            value={formData.roomNumber || ''}
            onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
            placeholder="e.g. Hall A-1 or Science Lab"
            leftIcon={<MapPin className="w-4 h-4 text-rose-500" />}
          />
        </div>

        {/* Date & Timings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Exam Date"
            type="date"
            required
            value={formData.examDate}
            onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
            error={errors.examDate}
            leftIcon={<Calendar className="w-4 h-4 text-indigo-500" />}
          />
          <Input
            label="Start Time"
            value={formData.startTime || ''}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            placeholder="09:30 AM"
            leftIcon={<Clock className="w-4 h-4 text-indigo-500" />}
          />
          <Input
            label="End Time"
            value={formData.endTime || ''}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            placeholder="12:30 PM"
            leftIcon={<Clock className="w-4 h-4 text-indigo-500" />}
          />
        </div>

        {/* Marks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Maximum Marks"
            type="number"
            value={formData.maxMarks || 100}
            onChange={(e) => setFormData({ ...formData, maxMarks: Number(e.target.value) })}
            leftIcon={<Award className="w-4 h-4 text-amber-500" />}
          />
          <Input
            label="Passing Cutoff Marks"
            type="number"
            value={formData.passingMarks || 35}
            onChange={(e) => setFormData({ ...formData, passingMarks: Number(e.target.value) })}
            leftIcon={<Award className="w-4 h-4 text-emerald-500" />}
          />
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {initialData ? 'Save Changes' : 'Schedule Exam'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
