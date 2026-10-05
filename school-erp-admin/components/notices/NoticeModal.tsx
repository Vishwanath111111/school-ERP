'use client';

import React, { useState, useEffect } from 'react';
import { Notice, NoticeRequest, NoticeCategory, NoticeAudience } from '@/types/notice';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Bell, AlertTriangle, Calendar, User, FileText } from 'lucide-react';

export interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NoticeRequest) => Promise<void>;
  initialData?: Notice | null;
}

const CATEGORY_OPTIONS = [
  { value: 'EXAM', label: 'Examinations' },
  { value: 'EVENT', label: 'Events & Functions' },
  { value: 'ACADEMIC', label: 'Academic & Curriculum' },
  { value: 'EMERGENCY', label: 'Emergency Alerts' },
  { value: 'GENERAL', label: 'General Notices' },
];

const AUDIENCE_OPTIONS = [
  { value: 'ALL', label: 'All ERP Users (Everyone)' },
  { value: 'PARENTS', label: 'Parents Only' },
  { value: 'TEACHERS', label: 'Teachers & Faculty' },
  { value: 'STUDENTS', label: 'Students Only' },
];

export const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<NoticeRequest>({
    title: '',
    content: '',
    category: 'GENERAL',
    audience: 'ALL',
    authorName: 'Principal Office',
    publishDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    isUrgent: false,
    isActive: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content,
        category: initialData.category,
        audience: initialData.audience,
        authorName: initialData.authorName || 'Principal Office',
        publishDate: initialData.publishDate,
        expiryDate: initialData.expiryDate || '',
        isUrgent: initialData.isUrgent,
        isActive: initialData.isActive,
      });
    } else {
      setFormData({
        title: '',
        content: '',
        category: 'GENERAL',
        audience: 'ALL',
        authorName: 'Principal Office',
        publishDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
        isUrgent: false,
        isActive: true,
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Notice body content is required';

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
      title={initialData ? 'Edit Circular Announcement' : 'Broadcast New Circular'}
      description={
        initialData
          ? 'Update announcement content and target audience.'
          : 'Broadcast official school notice to parents, teachers, or students.'
      }
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <Input
          label="Circular Title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
          placeholder="e.g. Mid-Term Examination Timetable 2026"
          leftIcon={<Bell className="w-4 h-4 text-indigo-500" />}
        />

        {/* Category & Audience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Category"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as NoticeCategory })}
            options={CATEGORY_OPTIONS}
          />
          <Select
            label="Target Audience"
            required
            value={formData.audience}
            onChange={(e) => setFormData({ ...formData, audience: e.target.value as NoticeAudience })}
            options={AUDIENCE_OPTIONS}
          />
        </div>

        {/* Content Body */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
            Notice Body Content <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Type complete circular announcement details here..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.content && (
            <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">{errors.content}</p>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Publish Date"
            type="date"
            required
            value={formData.publishDate}
            onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
            leftIcon={<Calendar className="w-4 h-4 text-indigo-500" />}
          />
          <Input
            label="Expiry Date (Optional)"
            type="date"
            value={formData.expiryDate || ''}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            leftIcon={<Calendar className="w-4 h-4 text-slate-400" />}
          />
        </div>

        {/* Urgent Toggle */}
        <div className="p-3 bg-rose-50/60 dark:bg-rose-950/20 rounded-xl border border-rose-100 dark:border-rose-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Mark as Urgent Notice
              </span>
              <span className="text-[11px] text-slate-500 block">
                Pins notice at the top of the dashboard feed.
              </span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={formData.isUrgent}
            onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
            className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
          />
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {initialData ? 'Save Changes' : 'Broadcast Circular'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
