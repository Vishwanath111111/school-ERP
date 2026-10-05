'use client';

import React, { useState } from 'react';
import { SchoolProfileSettings } from '@/types/settings';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Building, Mail, Phone, MapPin, User, Award, Save } from 'lucide-react';

export interface SchoolProfileTabProps {
  settings: SchoolProfileSettings;
  onSave: (settings: SchoolProfileSettings) => Promise<void>;
  isLoading: boolean;
}

export const SchoolProfileTab: React.FC<SchoolProfileTabProps> = ({
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
          Institution Identity & Contact Info
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="School Name"
            required
            value={formData.schoolName}
            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
            placeholder="e.g. Greenwood High International School"
            leftIcon={<Building className="w-4 h-4 text-indigo-500" />}
          />
          <Input
            label="Affiliation Code"
            value={formData.affiliationCode || ''}
            onChange={(e) => setFormData({ ...formData, affiliationCode: e.target.value })}
            placeholder="e.g. CBSE-AFF-987654"
            leftIcon={<Award className="w-4 h-4 text-amber-500" />}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Principal / Headmaster Name"
            value={formData.principalName || ''}
            onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
            placeholder="e.g. Dr. Sarah Jenkins"
            leftIcon={<User className="w-4 h-4 text-indigo-500" />}
          />
          <Input
            label="Official Contact Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. info@greenwood.edu"
            leftIcon={<Mail className="w-4 h-4 text-indigo-500" />}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Official Phone Line"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +91 98765 00000"
            leftIcon={<Phone className="w-4 h-4 text-indigo-500" />}
          />
          <Input
            label="Campus Address"
            value={formData.address || ''}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="e.g. 100 Academic Boulevard, Knowledge City"
            leftIcon={<MapPin className="w-4 h-4 text-rose-500" />}
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
            Save Profile Settings
          </Button>
        </div>
      </div>
    </form>
  );
};
