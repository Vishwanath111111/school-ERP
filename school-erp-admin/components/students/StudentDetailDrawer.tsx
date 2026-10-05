import React from 'react';
import { Dialog } from '@/components/ui/Dialog';
import { Badge } from '@/components/ui/Badge';
import { Student } from '@/types/student';
import { formatDate } from '@/lib/utils';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, ShieldCheck, HeartPulse } from 'lucide-react';

export interface StudentDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

export const StudentDetailDrawer: React.FC<StudentDetailDrawerProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  if (!student) return null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Student Profile & Detail Record" maxWidth="lg">
      <div className="space-y-6 text-sm">
        {/* Profile Header Banner */}
        <div className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
            {student.firstName.charAt(0)}
            {student.lastName ? student.lastName.charAt(0) : ''}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {student.fullName || `${student.firstName} ${student.lastName || ''}`}
              </h3>
              <Badge variant={student.isActive ? 'success' : 'danger'} dot>
                {student.isActive ? 'Active Student' : 'Inactive'}
              </Badge>
            </div>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-medium mt-0.5">
              Admission ID: {student.admissionNo}
            </p>
          </div>
        </div>

        {/* Academic Details Section */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            Academic Details
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <div>
              <span className="text-[11px] text-slate-400 block">Class & Section</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Class {student.className} ({student.section || 'A'})
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Roll Number</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{student.rollNo || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">School House</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{student.house || 'Unassigned'}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Academic Year</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{student.academicYear || '2025-2026'}</span>
            </div>
          </div>
        </div>

        {/* Personal & Demographic Section */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
            <User className="w-4 h-4 text-indigo-500" />
            Personal Profile
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <div>
              <span className="text-[11px] text-slate-400 block">Gender</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{student.gender || 'Not specified'}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Date of Birth</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{formatDate(student.dateOfBirth)}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Blood Group</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">{student.bloodGroup || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Nationality</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{student.nationality || 'Indian'}</span>
            </div>
          </div>
        </div>

        {/* Guardian Contact Information */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-indigo-500" />
            Guardian Contact Information
          </h4>
          <div className="space-y-2.5 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{student.parentEmail || 'No parent email registered'}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{student.parentPhone || 'No parent phone registered'}</span>
            </div>
            <div className="flex items-start space-x-2 text-slate-700 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{student.address || 'No residential address recorded'}</span>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
