'use client';

import React from 'react';
import { StudentReportCard } from '@/types/exam';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { X, Printer, GraduationCap, Award, CheckCircle2, User, Calendar } from 'lucide-react';

export interface ReportCardDrawerProps {
  reportCard: StudentReportCard | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportCardDrawer: React.FC<ReportCardDrawerProps> = ({
  reportCard,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !reportCard) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white dark:bg-slate-900 border-l border-slate-200/80 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Printable Header */}
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-indigo-200 font-semibold uppercase tracking-wider block">
                Greenwood High International School
              </span>
              <h3 className="text-lg font-extrabold leading-tight">Official Student Report Card</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Student Profile Info Header */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Student Name:</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                  {reportCard.studentName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Roll No & Class:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {reportCard.rollNumber} ({reportCard.className})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Examination:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {reportCard.examName} ({reportCard.academicYear})
                </span>
              </div>
            </div>

            {/* Overall Aggregate Highlights */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total Marks</span>
                <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5 block">
                  {reportCard.totalObtainedMarks} / {reportCard.totalMaxMarks}
                </span>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-900">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Percentage</span>
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                  {reportCard.percentage}%
                </span>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-100 dark:border-amber-900">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Grade Status</span>
                <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 mt-0.5 block">
                  {reportCard.overallGrade} ({reportCard.resultStatus})
                </span>
              </div>
            </div>

            {/* Subject Marks Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-500">
                Subject Performance Breakdown
              </h4>
              <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="p-2.5">Subject</th>
                      <th className="p-2.5 text-center">Max</th>
                      <th className="p-2.5 text-center">Obtained</th>
                      <th className="p-2.5 text-center">Grade</th>
                      <th className="p-2.5">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {reportCard.marks.map((m) => (
                      <tr key={m.subject}>
                        <td className="p-2.5 font-bold text-slate-900 dark:text-white">{m.subject}</td>
                        <td className="p-2.5 text-center text-slate-500">{m.maxMarks}</td>
                        <td className="p-2.5 text-center font-bold text-indigo-600 dark:text-indigo-400">
                          {m.obtainedMarks}
                        </td>
                        <td className="p-2.5 text-center">
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                            {m.grade}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-500 text-[11px]">{m.teacherRemarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Principal Signature Line */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="text-center">
                <div className="w-32 border-b border-slate-400 mb-1" />
                <span className="text-slate-500 font-medium">Class Teacher</span>
              </div>
              <div className="text-center">
                <div className="w-32 border-b border-slate-400 mb-1" />
                <span className="text-slate-500 font-medium">Principal Seal</span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="primary"
              className="w-full shadow-md shadow-indigo-600/20"
              onClick={handlePrint}
              leftIcon={<Printer className="w-4 h-4" />}
            >
              Print Official Report Card
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
