'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { examService } from '@/services/exam.service';
import { Exam, ExamFilter, ExamStats, ExamRequest, StudentReportCard } from '@/types/exam';
import { ExamStatsGrid } from '@/components/exams/ExamStatsGrid';
import { ExamFilters } from '@/components/exams/ExamFilters';
import { ExamCard } from '@/components/exams/ExamCard';
import { ExamModal } from '@/components/exams/ExamModal';
import { ReportCardDrawer } from '@/components/exams/ReportCardDrawer';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { GraduationCap, Plus, RefreshCw, AlertCircle } from 'lucide-react';

export default function ExamsPage() {
  const { showToast } = useToast();

  const [exams, setExams] = useState<Exam[]>([]);
  const [stats, setStats] = useState<ExamStats>({
    totalExams: 0,
    scheduledCount: 0,
    ongoingCount: 0,
    completedCount: 0,
  });
  const [filters, setFilters] = useState<ExamFilter>({});

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modals & Drawers State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [viewingReportCard, setViewingReportCard] = useState<StudentReportCard | null>(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [deletingExam, setDeletingExam] = useState<Exam | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const fetchExams = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [data, statsData] = await Promise.all([
        examService.getAllExams(filters),
        examService.getExamStats(),
      ]);
      setExams(data);
      setStats(statsData);
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to fetch examination timetables';
      setError(msg);
      showToast(msg, 'error', 'Exams Error');
    } finally {
      setIsLoading(false);
    }
  }, [filters, showToast]);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handleCreateOrUpdate = async (formData: ExamRequest) => {
    try {
      if (selectedExam) {
        await examService.updateExam(selectedExam.id, formData);
        showToast('Examination schedule updated successfully!', 'success', 'Exam Updated');
      } else {
        await examService.createExam(formData);
        showToast('New examination scheduled successfully!', 'success', 'Exam Scheduled');
      }
      fetchExams();
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to save examination details';
      showToast(msg, 'error', 'Scheduling Failed');
      throw err;
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingExam) return;
    setIsDeleting(true);
    try {
      await examService.deleteExam(deletingExam.id);
      showToast('Examination schedule removed.', 'info', 'Exam Deleted');
      setIsConfirmOpen(false);
      setDeletingExam(null);
      fetchExams();
    } catch {
      showToast('Failed to delete examination schedule.', 'error', 'Delete Failed');
    } finally {
      setIsDeleting(false);
    }
  };

  // Paginated data slicing
  const totalItems = exams.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedExams = exams.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6 pb-6">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Exams & Grading Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Schedule mid-terms, final exams, assign exam halls, and generate official student report cards.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setSelectedExam(null);
            setIsModalOpen(true);
          }}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shrink-0 shadow-md shadow-indigo-600/20"
        >
          Schedule New Exam
        </Button>
      </div>

      {/* Overview Stats Cards */}
      <ExamStatsGrid stats={stats} />

      {/* Filter Toolbar */}
      <ExamFilters
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
              Error Loading Examination Schedules
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-400">{error}</p>
            <Button
              variant="danger"
              size="sm"
              onClick={fetchExams}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Retry
            </Button>
          </div>
        ) : exams.length === 0 ? (
          <EmptyState
            title="No Examinations Scheduled"
            description="No examination schedules matched your search or class filter criteria."
            icon={<GraduationCap className="w-8 h-8 text-indigo-500" />}
            actionLabel="Clear Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedExams.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  onView={() => {
                    setViewingReportCard(examService.getSampleReportCard());
                    setIsDrawerOpen(true);
                  }}
                  onEdit={(e) => {
                    setSelectedExam(e);
                    setIsModalOpen(true);
                  }}
                  onDelete={(e) => {
                    setDeletingExam(e);
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

      {/* Schedule Exam Modal */}
      <ExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdate}
        initialData={selectedExam}
      />

      {/* Report Card Drawer */}
      <ReportCardDrawer
        reportCard={viewingReportCard}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Action Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Examination Schedule"
        message={`Are you sure you want to delete "${deletingExam?.examName}"? This action cannot be undone.`}
        confirmText="Delete Exam"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
