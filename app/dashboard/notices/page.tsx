'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { noticeService } from '@/services/notice.service';
import { Notice, NoticeFilter, NoticeStats, NoticeRequest } from '@/types/notice';
import { NoticeStatsGrid } from '@/components/notices/NoticeStatsGrid';
import { NoticeFilters } from '@/components/notices/NoticeFilters';
import { NoticeCard } from '@/components/notices/NoticeCard';
import { NoticeModal } from '@/components/notices/NoticeModal';
import { NoticeDetailDrawer } from '@/components/notices/NoticeDetailDrawer';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Bell, Plus, RefreshCw, AlertCircle } from 'lucide-react';

export default function NoticesPage() {
  const { showToast } = useToast();

  const [notices, setNotices] = useState<Notice[]>([]);
  const [stats, setStats] = useState<NoticeStats>({
    totalNotices: 0,
    urgentNoticesCount: 0,
    parentNoticesCount: 0,
    publishedTodayCount: 0,
  });
  const [filters, setFilters] = useState<NoticeFilter>({});

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modals & Drawers State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [viewingNotice, setViewingNotice] = useState<Notice | null>(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [deletingNotice, setDeletingNotice] = useState<Notice | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const fetchNotices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [data, statsData] = await Promise.all([
        noticeService.getAllNotices(filters),
        noticeService.getNoticeStats(),
      ]);
      setNotices(data);
      setStats(statsData);
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to fetch circular announcements';
      setError(msg);
      showToast(msg, 'error', 'Noticeboard Error');
    } finally {
      setIsLoading(false);
    }
  }, [filters, showToast]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handleCreateOrUpdate = async (formData: NoticeRequest) => {
    try {
      if (selectedNotice) {
        await noticeService.updateNotice(selectedNotice.id, formData);
        showToast('Circular announcement updated successfully!', 'success', 'Notice Updated');
      } else {
        await noticeService.createNotice(formData);
        showToast('New circular announcement broadcasted successfully!', 'success', 'Notice Broadcasted');
      }
      fetchNotices();
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to save circular announcement';
      showToast(msg, 'error', 'Broadcast Failed');
      throw err;
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingNotice) return;
    setIsDeleting(true);
    try {
      await noticeService.deleteNotice(deletingNotice.id);
      showToast('Circular announcement removed.', 'info', 'Notice Deleted');
      setIsConfirmOpen(false);
      setDeletingNotice(null);
      fetchNotices();
    } catch {
      showToast('Failed to delete circular announcement.', 'error', 'Delete Failed');
    } finally {
      setIsDeleting(false);
    }
  };

  // Paginated data slicing
  const totalItems = notices.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedNotices = notices.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6 pb-6">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Bell className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Noticeboard & Circulars
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Broadcast school announcements, exam timetables, event circulars, and emergency alerts.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setSelectedNotice(null);
            setIsModalOpen(true);
          }}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shrink-0 shadow-md shadow-indigo-600/20"
        >
          Broadcast New Circular
        </Button>
      </div>

      {/* Overview Stats Cards */}
      <NoticeStatsGrid stats={stats} />

      {/* Filter Toolbar */}
      <NoticeFilters
        filters={filters}
        onFilterChange={(f) => {
          setFilters(f);
          setCurrentPage(1);
        }}
        onReset={handleResetFilters}
      />

      {/* Content Feed Grid */}
      <div className="space-y-4">
        {isLoading ? (
          <TableSkeleton rows={4} />
        ) : error ? (
          <div className="p-8 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
              Error Loading Circulars
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-400">{error}</p>
            <Button
              variant="danger"
              size="sm"
              onClick={fetchNotices}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Retry
            </Button>
          </div>
        ) : notices.length === 0 ? (
          <EmptyState
            title="No Circulars Found"
            description="No circular announcements matched your search or category filters."
            icon={<Bell className="w-8 h-8 text-indigo-500" />}
            actionLabel="Clear Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedNotices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  onView={(n) => {
                    setViewingNotice(n);
                    setIsDrawerOpen(true);
                  }}
                  onEdit={(n) => {
                    setSelectedNotice(n);
                    setIsModalOpen(true);
                  }}
                  onDelete={(n) => {
                    setDeletingNotice(n);
                    setIsConfirmOpen(true);
                  }}
                />
              ))}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-2 shadow-xs">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={setCurrentPage}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Broadcast Notice Modal */}
      <NoticeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdate}
        initialData={selectedNotice}
      />

      {/* Notice Detail Drawer */}
      <NoticeDetailDrawer
        notice={viewingNotice}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onEdit={(n) => {
          setSelectedNotice(n);
          setIsModalOpen(true);
        }}
      />

      {/* Action Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Circular Announcement"
        message={`Are you sure you want to delete "${deletingNotice?.title}"? This action cannot be undone.`}
        confirmText="Delete Notice"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
