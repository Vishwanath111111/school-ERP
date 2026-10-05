'use client';

import React, { useState } from 'react';
import { RolePermissionConfig } from '@/types/settings';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, CheckCircle, XCircle, Save } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export interface RolePermissionsTabProps {
  roles: RolePermissionConfig[];
}

export const RolePermissionsTab: React.FC<RolePermissionsTabProps> = ({ roles: initialRoles }) => {
  const { showToast } = useToast();
  const [roles, setRoles] = useState<RolePermissionConfig[]>(initialRoles);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const togglePermission = (roleIndex: number, key: keyof RolePermissionConfig) => {
    const updated = [...roles];
    const roleObj = { ...updated[roleIndex] };
    if (typeof roleObj[key] === 'boolean') {
      (roleObj[key] as boolean) = !(roleObj[key] as boolean);
      updated[roleIndex] = roleObj;
      setRoles(updated);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Role permissions saved successfully!', 'success', 'Permissions Updated');
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-500" /> Role-Based Access Control (RBAC) Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Configure system module permissions for administrative and teaching personnel roles.
            </p>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-3">User Role</th>
                <th className="p-3 text-center">Manage Students</th>
                <th className="p-3 text-center">Manage Faculty</th>
                <th className="p-3 text-center">Collect Fees</th>
                <th className="p-3 text-center">Attendance</th>
                <th className="p-3 text-center">Circular Notices</th>
                <th className="p-3 text-center">Homework</th>
                <th className="p-3 text-center">System Config</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {roles.map((r, idx) => (
                <tr key={r.role} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{r.role}</td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={r.canManageStudents}
                      onChange={() => togglePermission(idx, 'canManageStudents')}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={r.canManageTeachers}
                      onChange={() => togglePermission(idx, 'canManageTeachers')}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={r.canCollectFees}
                      onChange={() => togglePermission(idx, 'canCollectFees')}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={r.canMarkAttendance}
                      onChange={() => togglePermission(idx, 'canMarkAttendance')}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={r.canBroadcastNotices}
                      onChange={() => togglePermission(idx, 'canBroadcastNotices')}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={r.canAssignHomework}
                      onChange={() => togglePermission(idx, 'canAssignHomework')}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={r.canModifySettings}
                      onChange={() => togglePermission(idx, 'canModifySettings')}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Button
            type="button"
            variant="primary"
            onClick={handleSave}
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
            className="shadow-md shadow-indigo-600/20"
          >
            Save Access Matrix
          </Button>
        </div>
      </div>
    </div>
  );
};
