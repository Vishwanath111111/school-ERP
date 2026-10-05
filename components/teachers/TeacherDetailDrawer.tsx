'use client';

import React from 'react';
import { Teacher } from '@/types/teacher';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { X, Mail, Phone, BookOpen, Award, Building2, Calendar, MapPin, DollarSign, ShieldCheck } from 'lucide-react';

export interface TeacherDetailDrawerProps {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (teacher: Teacher) => void;
}

export const TeacherDetailDrawer: React.FC<TeacherDetailDrawerProps> = ({
  teacher,
  isOpen,
  onClose,
  onEdit,
}) => {
  if (!isOpen || !teacher) return null;

  const formatDepartment = (dept: string) => {
    return dept
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200/80 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-lg text-white border border-white/30">
                {teacher.firstName.charAt(0)}
                {teacher.lastName.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {teacher.firstName} {teacher.lastName}
                </h3>
                <p className="text-xs text-indigo-100 font-mono font-medium">
                  {teacher.employeeId}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Status & Designation Summary */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                  Designation
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block">
                  {teacher.designation.replace(/_/g, ' ')}
                </span>
              </div>
              <Badge variant={teacher.isActive ? 'success' : 'danger'}>
                {teacher.isActive ? 'Active Educator' : 'Inactive'}
              </Badge>
            </div>

            {/* Academic & Department Info */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-500">
                Academic & Department
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-indigo-500" /> Department
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {formatDepartment(teacher.department)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-500" /> Assigned Subject
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {teacher.assignedSubject}
                  </span>
                </div>

                {teacher.assignedClass && (
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-indigo-500" /> Classes Taught
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {teacher.assignedClass}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" /> Qualification
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {teacher.qualification}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-500" /> Joining Date
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {teacher.joiningDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-500">
                Contact Details
              </h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-indigo-500" /> Email
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">
                    {teacher.email}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-indigo-500" /> Phone
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {teacher.phone}
                  </span>
                </div>

                {teacher.address && (
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl space-y-1">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-indigo-500" /> Residential Address
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white block pt-0.5">
                      {teacher.address}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                onClose();
                onEdit(teacher);
              }}
            >
              Edit Profile
            </Button>
            <Button variant="primary" className="flex-1" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
