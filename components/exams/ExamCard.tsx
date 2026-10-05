'use client';

import React from 'react';
import { Exam } from '@/types/exam';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GraduationCap, Calendar, Clock, MapPin, Award, Edit2, Trash2, ArrowRight } from 'lucide-react';

export interface ExamCardProps {
  exam: Exam;
  onView: (exam: Exam) => void;
  onEdit: (exam: Exam) => void;
  onDelete: (exam: Exam) => void;
}

export const ExamCard: React.FC<ExamCardProps> = ({
  exam,
  onView,
  onEdit,
  onDelete,
}) => {
  const getExamTypeBadge = (type: Exam['examType']) => {
    switch (type) {
      case 'FINAL_TERM':
        return <Badge variant="danger">Final Term</Badge>;
      case 'MID_TERM':
        return <Badge variant="warning">Mid-Term</Badge>;
      case 'UNIT_TEST':
        return <Badge variant="info">Unit Test</Badge>;
      default:
        return <Badge variant="default">{type}</Badge>;
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      {/* Header Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            {getExamTypeBadge(exam.examType)}
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              {exam.className}
            </span>
          </div>

          <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
            {exam.subject}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
          {exam.examName}
        </h3>

        {/* Details List */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Exam Date:
            </span>
            <strong className="text-slate-900 dark:text-white">{exam.examDate}</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500" /> Timing:
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {exam.startTime || '09:30 AM'} - {exam.endTime || '12:30 PM'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" /> Exam Hall:
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {exam.roomNumber || 'Hall A-1'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" /> Max / Pass Marks:
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {exam.maxMarks} / <span className="text-emerald-600">{exam.passingMarks}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <Badge variant={exam.status === 'COMPLETED' ? 'success' : exam.status === 'ONGOING' ? 'warning' : 'default'}>
          {exam.status}
        </Badge>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(exam)}
            title="View Grades / Report Card"
            className="h-8 px-2.5 text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Report Card
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(exam)}
            title="Edit Exam"
            className="h-8 w-8 p-0 text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(exam)}
            title="Delete Exam"
            className="h-8 w-8 p-0 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
