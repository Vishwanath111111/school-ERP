'use client';

import React from 'react';
import { Homework } from '@/types/homework';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BookOpen, Calendar, Clock, Award, Users, Edit2, Trash2, ArrowRight } from 'lucide-react';

export interface HomeworkCardProps {
  homework: Homework;
  onView: (homework: Homework) => void;
  onEdit: (homework: Homework) => void;
  onDelete: (homework: Homework) => void;
}

export const HomeworkCard: React.FC<HomeworkCardProps> = ({
  homework,
  onView,
  onEdit,
  onDelete,
}) => {
  const submissionPercentage = homework.totalStudents > 0
    ? Math.round((homework.submittedCount / homework.totalStudents) * 100)
    : 0;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      {/* Header Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Badge variant="info">{homework.subject}</Badge>
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              {homework.className} - {homework.section || 'A'}
            </span>
          </div>

          <div className="flex items-center space-x-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>{homework.totalMarks} Marks</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
          {homework.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
          {homework.description}
        </p>
      </div>

      {/* Submission Progress Bar */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-indigo-500" /> Submissions
          </span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            <strong className="text-indigo-600 dark:text-indigo-400">{homework.submittedCount}</strong> / {homework.totalStudents} ({submissionPercentage}%)
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(submissionPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-2 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-1 text-[11px] text-slate-500">
          <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span>Due: <strong className="text-slate-800 dark:text-slate-200 font-semibold">{homework.dueDate}</strong></span>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(homework)}
            title="View Homework Details"
            className="h-8 px-2.5 text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Details
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(homework)}
            title="Edit Homework"
            className="h-8 w-8 p-0 text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(homework)}
            title="Delete Homework"
            className="h-8 w-8 p-0 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
