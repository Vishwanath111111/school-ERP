'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { settingsService } from '@/services/settings.service';
import { SchoolProfileSettings, RolePermissionConfig, SystemBackupConfig } from '@/types/settings';
import { SchoolProfileTab } from '@/components/settings/SchoolProfileTab';
import { AcademicYearTab } from '@/components/settings/AcademicYearTab';
import { RolePermissionsTab } from '@/components/settings/RolePermissionsTab';
import { SystemBackupTab } from '@/components/settings/SystemBackupTab';
import { TableSkeleton } from '@/components/ui/Loader';
import { useToast } from '@/components/ui/Toast';
import { Settings, Building, Calendar, ShieldCheck, Database } from 'lucide-react';

export default function SettingsPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'PROFILE' | 'ACADEMIC' | 'ROLES' | 'BACKUP'>('PROFILE');

  const [settings, setSettings] = useState<SchoolProfileSettings | null>(null);
  const [roles, setRoles] = useState<RolePermissionConfig[]>([]);
  const [backupConfig, setBackupConfig] = useState<SystemBackupConfig | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
      setRoles(settingsService.getRolePermissions());
      setBackupConfig(settingsService.getBackupConfig());
    } catch {
      showToast('Failed to load school settings', 'error', 'Settings Error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSaveSettings = async (updated: SchoolProfileSettings) => {
    try {
      const saved = await settingsService.updateSettings(updated);
      setSettings(saved);
      showToast('School settings saved & updated in PostgreSQL backend!', 'success', 'Settings Saved');
    } catch {
      showToast('Failed to save settings.', 'error', 'Save Failed');
    }
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Settings className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          Settings & System Configuration
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage Greenwood High profile identity, academic session start dates, RBAC role permissions, and database backup snapshots.
        </p>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 mt-6 border-b border-slate-100 dark:border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('PROFILE')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'PROFILE'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Building className="w-4 h-4" /> School Profile
          </button>

          <button
            onClick={() => setActiveTab('ACADEMIC')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'ACADEMIC'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" /> Academic Session
          </button>

          <button
            onClick={() => setActiveTab('ROLES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'ROLES'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Role Permissions
          </button>

          <button
            onClick={() => setActiveTab('BACKUP')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'BACKUP'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Database className="w-4 h-4" /> Database & Backup
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {isLoading || !settings ? (
        <TableSkeleton rows={4} />
      ) : (
        <>
          {activeTab === 'PROFILE' && (
            <SchoolProfileTab settings={settings} onSave={handleSaveSettings} isLoading={isLoading} />
          )}

          {activeTab === 'ACADEMIC' && (
            <AcademicYearTab settings={settings} onSave={handleSaveSettings} isLoading={isLoading} />
          )}

          {activeTab === 'ROLES' && <RolePermissionsTab roles={roles} />}

          {activeTab === 'BACKUP' && backupConfig && <SystemBackupTab config={backupConfig} />}
        </>
      )}
    </div>
  );
}
