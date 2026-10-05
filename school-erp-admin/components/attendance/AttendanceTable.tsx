'use client';

import React from 'react';
import { AttendanceRecord, AttendanceStatus } from '@/types/attendance';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Check, X, Clock, AlertCircle } from 'lucide-react';

export interface AttendanceTableProps {
  records: AttendanceRecord[];
  onStatusChange: (studentId: number, status: AttendanceStatus) => void;
  onRemarksChange: (studentId: number, remarks: string) => void;
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  records,
  onStatusChange,
  onRemarksChange,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">Roll No</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>Class / Section</TableHead>
          <TableHead className="text-center">Attendance Status</TableHead>
          <TableHead className="w-64">Remarks / Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record, index) => (
          <TableRow key={record.studentId}>
            {/* Roll Number */}
            <TableCell className="font-mono font-bold text-slate-500">
              {record.rollNo || index + 1}
            </TableCell>

            {/* Student Name & Avatar */}
            <TableCell>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center border border-indigo-200 dark:border-indigo-800 shrink-0">
                  {record.studentName.charAt(0)}
                </div>
                <span className="font-bold text-xs text-slate-900 dark:text-white">
                  {record.studentName}
                </span>
              </div>
            </TableCell>

            {/* Class & Section */}
            <TableCell>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {record.className} - {record.section || 'A'}
              </span>
            </TableCell>

            {/* Status Toggle Button Chips */}
            <TableCell>
              <div className="flex items-center justify-center space-x-1.5">
                <button
                  type="button"
                  onClick={() => onStatusChange(record.studentId, 'PRESENT')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                    record.status === 'PRESENT'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Present</span>
                </button>

                <button
                  type="button"
                  onClick={() => onStatusChange(record.studentId, 'ABSENT')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                    record.status === 'ABSENT'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Absent</span>
                </button>

                <button
                  type="button"
                  onClick={() => onStatusChange(record.studentId, 'LATE')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                    record.status === 'LATE'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Late</span>
                </button>

                <button
                  type="button"
                  onClick={() => onStatusChange(record.studentId, 'HALF_DAY')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                    record.status === 'HALF_DAY'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Half-Day</span>
                </button>
              </div>
            </TableCell>

            {/* Remarks Input */}
            <TableCell>
              <input
                type="text"
                value={record.remarks || ''}
                onChange={(e) => onRemarksChange(record.studentId, e.target.value)}
                placeholder="Add optional note..."
                className="w-full bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg text-xs px-2.5 py-1 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
