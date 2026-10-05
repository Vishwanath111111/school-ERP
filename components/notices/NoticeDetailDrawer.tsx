'use client';

import React from 'react';
import { Notice } from '@/types/notice';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { X, Printer, Calendar, User, Tag, AlertTriangle, FileText } from 'lucide-react';

export interface NoticeDetailDrawerProps {
  notice: Notice | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (notice: Notice) => void;
}

export const NoticeDetailDrawer: React.FC<NoticeDetailDrawerProps> = ({
  notice,
  isOpen,
  onClose,
  onEdit,
}) => {
  if (!isOpen || !notice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white dark:bg-slate-900 border-l border-slate-200/80 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-indigo-200 font-semibold uppercase tracking-wider block">
                Official Circular Announcement
              </span>
              <h3 className="text-lg font-bold leading-tight line-clamp-1">{notice.title}</h3>
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
            {/* Badges Bar */}
            <div className="flex items-center space-x-2">
              <Badge variant={notice.category === 'EXAM' || notice.category === 'EMERGENCY' ? 'danger' : 'info'}>
                {notice.category}
              </Badge>
              {notice.isUrgent && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> URGENT PINNED
                </span>
              )}
            </div>

            {/* Metadata Summary Box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-500" /> Author / Department:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {notice.authorName || 'School Administration'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-indigo-500" /> Target Audience:
                </span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {notice.audience === 'ALL' ? 'Everyone (Parents, Teachers, Students)' : notice.audience}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Published Date:
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">{notice.publishDate}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-500" /> Circular Announcement Text
              </h4>
              <div className="p-4 bg-slate-50/70 dark:bg-slate-800/20 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 whitespace-pre-line">
                {notice.content}
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
              Print Notice
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => {
                onClose();
                onEdit(notice);
              }}
            >
              Edit Notice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
