import { apiClient } from './api.client';
import { SchoolProfileSettings, RolePermissionConfig, SystemBackupConfig } from '@/types/settings';

const DEFAULT_SETTINGS: SchoolProfileSettings = {
  schoolName: 'Greenwood High International School',
  affiliationCode: 'CBSE-AFF-987654',
  principalName: 'Dr. Sarah Jenkins',
  email: 'info@greenwood.edu',
  phone: '+91 98765 00000',
  address: '100 Academic Boulevard, Knowledge City',
  currentAcademicYear: '2025-2026',
  sessionStartDate: '2025-06-01',
  sessionEndDate: '2026-04-30',
  activeTerms: 'Term 1, Term 2',
  logoUrl: '',
};

const DEFAULT_ROLES: RolePermissionConfig[] = [
  {
    role: 'SUPER_ADMIN',
    canManageStudents: true,
    canManageTeachers: true,
    canCollectFees: true,
    canMarkAttendance: true,
    canBroadcastNotices: true,
    canAssignHomework: true,
    canModifySettings: true,
  },
  {
    role: 'ADMIN',
    canManageStudents: true,
    canManageTeachers: true,
    canCollectFees: true,
    canMarkAttendance: true,
    canBroadcastNotices: true,
    canAssignHomework: true,
    canModifySettings: false,
  },
  {
    role: 'TEACHER',
    canManageStudents: false,
    canManageTeachers: false,
    canCollectFees: false,
    canMarkAttendance: true,
    canBroadcastNotices: true,
    canAssignHomework: true,
    canModifySettings: false,
  },
  {
    role: 'STAFF',
    canManageStudents: true,
    canManageTeachers: false,
    canCollectFees: true,
    canMarkAttendance: true,
    canBroadcastNotices: false,
    canAssignHomework: false,
    canModifySettings: false,
  },
];

class SettingsService {
  public async getSettings(): Promise<SchoolProfileSettings> {
    try {
      const data = await apiClient.get<SchoolProfileSettings>('/settings');
      return data || DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public async updateSettings(settings: SchoolProfileSettings): Promise<SchoolProfileSettings> {
    try {
      return await apiClient.post<SchoolProfileSettings>('/settings', settings);
    } catch {
      Object.assign(DEFAULT_SETTINGS, settings);
      return DEFAULT_SETTINGS;
    }
  }

  public getRolePermissions(): RolePermissionConfig[] {
    return DEFAULT_ROLES;
  }

  public getBackupConfig(): SystemBackupConfig {
    return {
      autoBackupEnabled: true,
      backupFrequency: 'DAILY',
      lastBackupDate: new Date().toISOString().split('T')[0],
      databaseSizeMB: 142.8,
      totalRecordsCount: 15420,
    };
  }
}

export const settingsService = new SettingsService();
