'use client';

import React from 'react';
import { Notice } from '@/types/notice';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, Calendar, User, Eye, Edit2, Trash2, Tag, ArrowRight } from 'lucide-react';

export interface NoticeCardProps {
  notice: Notice;
  onView: (notice: Notice) => void;
  onEdit: (notice: Notice) => void;
  onDelete: (notice: Notice) => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({
  notice,
  onView,
  onEdit,
  onDelete,
}) => {
  const getCategoryBadge = (category: Notice['category']) => {
    switch (category) {
      case 'EXAM':
        return <Badge variant="danger">Exam</Badge>;
      case 'EMERGENCY':
        return <Badge variant="danger">Emergency</Badge>;
      case 'EVENT':
        return <Badge variant="warning">Event</Badge>;
      case 'ACADEMIC':
        return <Badge variant="info">Academic</Badge>;
      default:
        return <Badge variant="default">{category}</Badge>;
    }
  };

  const getAudienceChip = (audience: Notice['audience']) => {
    switch (audience) {
      case 'PARENTS':
        return 'Parents';
      case 'TEACHERS':
        return 'Staff & Teachers';
      case 'STUDENTS':
        return 'Students';
      default:
        return 'All ERP Users';
    }
  };

  return (
    <div className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all shadow-2xs hover:shadow-md flex flex-col justify-between space-y-4 ${
      notice.isUrgent
        ? 'border-rose-300 dark:border-rose-900/60 ring-1 ring-rose-500/20'
        : 'border-slate-200/80 dark:border-slate-800'
    }`}>
      {/* Top Header Row */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            {getCategoryBadge(notice.category)}
            {notice.isUrgent && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-rose-600" /> URGENT
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            {notice.publishDate}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
          {notice.title}
        </h3>

        {/* Content Preview */}
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
          {notice.content}
        </p>
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400">
          <Tag className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span className="font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md truncate max-w-[120px]">
            {getAudienceChip(notice.audience)}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(notice)}
            title="Read Full Notice"
            className="h-8 px-2.5 text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Read
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(notice)}
            title="Edit Notice"
            className="h-8 w-8 p-0 text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(notice)}
            title="Delete Notice"
            className="h-8 w-8 p-0 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
