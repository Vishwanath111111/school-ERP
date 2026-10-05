'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { homeworkService } from '@/services/homework.service';
import { Homework, HomeworkFilter, HomeworkStats, HomeworkRequest } from '@/types/homework';
import { HomeworkStatsGrid } from '@/components/homework/HomeworkStatsGrid';
import { HomeworkFilters } from '@/components/homework/HomeworkFilters';
import { HomeworkCard } from '@/components/homework/HomeworkCard';
import { HomeworkModal } from '@/components/homework/HomeworkModal';
import { HomeworkDetailDrawer } from '@/components/homework/HomeworkDetailDrawer';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { BookOpen, Plus, RefreshCw, AlertCircle } from 'lucide-react';

export default function HomeworkPage() {
  const { showToast } = useToast();

  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [stats, setStats] = useState<HomeworkStats>({
    totalAssignments: 0,
    activeAssignmentsCount: 0,
    dueTodayCount: 0,
    totalSubmissionsReceived: 0,
  });
  const [filters, setFilters] = useState<HomeworkFilter>({});

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modals & Drawers State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [viewingHomework, setViewingHomework] = useState<Homework | null>(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [deletingHomework, setDeletingHomework] = useState<Homework | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const fetchHomeworks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [data, statsData] = await Promise.all([
        homeworkService.getAllHomeworks(filters),
        homeworkService.getHomeworkStats(),
      ]);
      setHomeworks(data);
      setStats(statsData);
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to fetch homework assignments';
      setError(msg);
      showToast(msg, 'error', 'Homework Error');
    } finally {
      setIsLoading(false);
    }
  }, [filters, showToast]);

  useEffect(() => {
    fetchHomeworks();
  }, [fetchHomeworks]);

  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handleCreateOrUpdate = async (formData: HomeworkRequest) => {
    try {
      if (selectedHomework) {
        await homeworkService.updateHomework(selectedHomework.id, formData);
        showToast('Homework assignment updated successfully!', 'success', 'Homework Updated');
      } else {
        await homeworkService.createHomework(formData);
        showToast('New homework coursework assigned successfully!', 'success', 'Homework Assigned');
      }
      fetchHomeworks();
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to save homework details';
      showToast(msg, 'error', 'Assignment Failed');
      throw err;
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingHomework) return;
    setIsDeleting(true);
    try {
      await homeworkService.deleteHomework(deletingHomework.id);
      showToast('Homework assignment removed.', 'info', 'Homework Deleted');
      setIsConfirmOpen(false);
      setDeletingHomework(null);
      fetchHomeworks();
    } catch {
      showToast('Failed to delete homework assignment.', 'error', 'Delete Failed');
    } finally {
      setIsDeleting(false);
    }
  };

  // Paginated data slicing
  const totalItems = homeworks.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedHomeworks = homeworks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6 pb-6">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Homework & Subject Assignments
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Assign coursework tasks, track student hand-in submission progress, and evaluate subject assignments.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setSelectedHomework(null);
            setIsModalOpen(true);
          }}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shrink-0 shadow-md shadow-indigo-600/20"
        >
          Assign New Homework
        </Button>
      </div>

      {/* Overview Stats Cards */}
      <HomeworkStatsGrid stats={stats} />

      {/* Filter Toolbar */}
      <HomeworkFilters
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
              Error Loading Coursework Assignments
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-400">{error}</p>
            <Button
              variant="danger"
              size="sm"
              onClick={fetchHomeworks}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Retry
            </Button>
          </div>
        ) : homeworks.length === 0 ? (
          <EmptyState
            title="No Homework Assignments Found"
            description="No coursework assignments matched your search, class, or subject filter parameters."
            icon={<BookOpen className="w-8 h-8 text-indigo-500" />}
            actionLabel="Clear Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedHomeworks.map((hw) => (
                <HomeworkCard
                  key={hw.id}
                  homework={hw}
                  onView={(h) => {
                    setViewingHomework(h);
                    setIsDrawerOpen(true);
                  }}
                  onEdit={(h) => {
                    setSelectedHomework(h);
                    setIsModalOpen(true);
                  }}
                  onDelete={(h) => {
                    setDeletingHomework(h);
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

      {/* Create / Edit Homework Modal */}
      <HomeworkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdate}
        initialData={selectedHomework}
      />

      {/* Homework Detail Drawer */}
      <HomeworkDetailDrawer
        homework={viewingHomework}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onEdit={(h) => {
          setSelectedHomework(h);
          setIsModalOpen(true);
        }}
      />

      {/* Action Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Homework Assignment"
        message={`Are you sure you want to delete "${deletingHomework?.title}"? This action cannot be undone.`}
        confirmText="Delete Assignment"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
