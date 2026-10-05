'use client';

import React from 'react';
import { Homework } from '@/types/homework';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { X, Printer, BookOpen, Calendar, Award, User, Users, FileText, CheckCircle2, Clock } from 'lucide-react';

export interface HomeworkDetailDrawerProps {
  homework: Homework | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (homework: Homework) => void;
}

export const HomeworkDetailDrawer: React.FC<HomeworkDetailDrawerProps> = ({
  homework,
  isOpen,
  onClose,
  onEdit,
}) => {
  if (!isOpen || !homework) return null;

  const handlePrint = () => {
    window.print();
  };

  const submissionPercentage = homework.totalStudents > 0
    ? Math.round((homework.submittedCount / homework.totalStudents) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white dark:bg-slate-900 border-l border-slate-200/80 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-indigo-200 font-semibold uppercase tracking-wider block">
                Assignment Details
              </span>
              <h3 className="text-lg font-bold leading-tight line-clamp-1">{homework.title}</h3>
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
            {/* Subject & Class Summary */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                  Subject & Target Grade
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {homework.subject}
                </h4>
                <span className="text-xs text-slate-500 font-medium">
                  {homework.className} - {homework.section || 'A'}
                </span>
              </div>
              <Badge variant="info">{homework.status}</Badge>
            </div>

            {/* Submissions Bar */}
            <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Student Submissions Status
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  <strong className="text-indigo-600 dark:text-indigo-400">{homework.submittedCount}</strong> / {homework.totalStudents} ({submissionPercentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(submissionPercentage, 100)}%` }}
                />
              </div>
            </div>

            {/* Key Metadata */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-500">
                Assignment Metadata
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-500" /> Assigned Educator:
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {homework.teacherName || 'Subject Teacher'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" /> Maximum Marks:
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">{homework.totalMarks} Marks</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Issue Date:
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">{homework.issueDate}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-500" /> Submission Due Date:
                  </span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">{homework.dueDate}</span>
                </div>
              </div>
            </div>

            {/* Description Instructions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-500" /> Task Instructions & Problems
              </h4>
              <div className="p-4 bg-slate-50/70 dark:bg-slate-800/20 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 whitespace-pre-line">
                {homework.description}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handlePrint}
              leftIcon={<Printer className="w-4 h-4" />}
            >
              Print Sheet
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                onClose();
                onEdit(homework);
              }}
            >
              Edit Assignment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
