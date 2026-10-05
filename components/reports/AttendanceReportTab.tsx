'use client';

import React from 'react';
import { ClassAttendanceStat } from '@/types/report';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, UserCheck, UserX, Award } from 'lucide-react';

export interface AttendanceReportTabProps {
  stats: ClassAttendanceStat[];
}

export const AttendanceReportTab: React.FC<AttendanceReportTabProps> = ({ stats }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-500" /> Class-wise Attendance Performance Analytics
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Real-time daily presence percentages and absence distribution across grade sections.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-3">Class & Stream Section</th>
                <th className="p-3 text-center">Enrolled Students</th>
                <th className="p-3 text-center">Present Count</th>
                <th className="p-3 text-center">Absent Count</th>
                <th className="p-3 text-center">Attendance Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {stats.map((row) => (
                <tr key={row.className} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{row.className}</td>
                  <td className="p-3 text-center text-slate-600 dark:text-slate-300 font-medium">
                    {row.enrolledStudents} Students
                  </td>
                  <td className="p-3 text-center text-emerald-600 dark:text-emerald-400 font-bold">
                    {row.presentCount}
                  </td>
                  <td className="p-3 text-center text-rose-600 dark:text-rose-400 font-bold">
                    {row.absentCount}
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                      {row.attendancePercentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
