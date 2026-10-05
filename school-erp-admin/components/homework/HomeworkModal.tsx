'use client';

import React, { useState, useEffect } from 'react';
import { Homework, HomeworkRequest } from '@/types/homework';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { BookOpen, Calendar, Award, User, FileText } from 'lucide-react';

export interface HomeworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: HomeworkRequest) => Promise<void>;
  initialData?: Homework | null;
}

const CLASS_OPTIONS = [
  { value: 'Class 10', label: 'Class 10' },
  { value: 'Class 11', label: 'Class 11' },
  { value: 'Class 9', label: 'Class 9' },
  { value: 'Class 8', label: 'Class 8' },
  { value: 'Class 7', label: 'Class 7' },
  { value: 'Class 6', label: 'Class 6' },
];

const SUBJECT_OPTIONS = [
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'English', label: 'English' },
  { value: 'Social Studies', label: 'Social Studies' },
  { value: 'Biology', label: 'Biology' },
];

export const HomeworkModal: React.FC<HomeworkModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<HomeworkRequest>({
    title: '',
    className: 'Class 10',
    section: 'A',
    subject: 'Mathematics',
    teacherName: 'Anita Sharma',
    description: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    totalMarks: 50,
    status: 'ACTIVE',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        className: initialData.className,
        section: initialData.section || 'A',
        subject: initialData.subject,
        teacherName: initialData.teacherName || 'Anita Sharma',
        description: initialData.description,
        issueDate: initialData.issueDate,
        dueDate: initialData.dueDate,
        totalMarks: initialData.totalMarks || 50,
        status: initialData.status,
      });
    } else {
      setFormData({
        title: '',
        className: 'Class 10',
        section: 'A',
        subject: 'Mathematics',
        teacherName: 'Anita Sharma',
        description: '',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        totalMarks: 50,
        status: 'ACTIVE',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Homework title is required';
    if (!formData.description.trim()) newErrors.description = 'Task instructions are required';
    if (!formData.dueDate) newErrors.dueDate = 'Submission due date is required';

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
      title={initialData ? 'Edit Subject Assignment' : 'Create New Assignment'}
      description={
        initialData
          ? 'Update homework instructions and submission deadline.'
          : 'Assign new coursework task to students in Greenwood School ERP.'
      }
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <Input
          label="Assignment Title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
          placeholder="e.g. Quadratic Equations Practice Sheet"
          leftIcon={<BookOpen className="w-4 h-4 text-indigo-500" />}
        />

        {/* Class & Subject */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Target Class"
            required
            value={formData.className}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
            options={CLASS_OPTIONS}
          />
          <Select
            label="Subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            options={SUBJECT_OPTIONS}
          />
        </div>

        {/* Teacher & Total Marks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Assigned Educator"
            value={formData.teacherName || ''}
            onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
            placeholder="e.g. Mrs. Anita Sharma"
            leftIcon={<User className="w-4 h-4 text-indigo-500" />}
          />
          <Input
            label="Total Marks"
            type="number"
            value={formData.totalMarks || 50}
            onChange={(e) => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
            placeholder="50"
            leftIcon={<Award className="w-4 h-4 text-amber-500" />}
          />
        </div>

        {/* Description Instructions */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
            Task Instructions & Problems <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Specify problem numbers, textbook pages, or lab assignment requirements..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.description && (
            <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Issue & Due Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Issue Date"
            type="date"
            required
            value={formData.issueDate || ''}
            onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
            leftIcon={<Calendar className="w-4 h-4 text-indigo-500" />}
          />
          <Input
            label="Submission Due Date"
            type="date"
            required
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            error={errors.dueDate}
            leftIcon={<Calendar className="w-4 h-4 text-rose-500" />}
          />
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {initialData ? 'Save Changes' : 'Assign Coursework'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
