'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { teacherService } from '@/services/teacher.service';
import { Teacher, TeacherFilter, TeacherStats, TeacherRequest } from '@/types/teacher';
import { TeacherFilters } from '@/components/teachers/TeacherFilters';
import { TeacherTable } from '@/components/teachers/TeacherTable';
import { TeacherModal } from '@/components/teachers/TeacherModal';
import { TeacherDetailDrawer } from '@/components/teachers/TeacherDetailDrawer';
import { StatsCard } from '@/components/ui/StatsCard';
import { Pagination } from '@/components/ui/Pagination';
import { EmptyState } from '@/components/ui/EmptyState';
import { TableSkeleton } from '@/components/ui/Loader';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { UserCheck, Users, Building2, Award, UserPlus, RefreshCw, AlertCircle } from 'lucide-react';

export default function TeachersPage() {
  const { showToast } = useToast();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [stats, setStats] = useState<TeacherStats | null>(null);
  const [filters, setFilters] = useState<TeacherFilter>({});

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modals & Drawers State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [deletingTeacher, setDeletingTeacher] = useState<Teacher | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const fetchTeachers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [data, statsData] = await Promise.all([
        teacherService.getAllTeachers(filters),
        teacherService.getTeacherStats(),
      ]);
      setTeachers(data);
      setStats(statsData);
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to load teacher records';
      setError(msg);
      showToast(msg, 'error', 'Error Fetching Teachers');
    } finally {
      setIsLoading(false);
    }
  }, [filters, showToast]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handleCreateOrUpdate = async (formData: TeacherRequest) => {
    try {
      if (selectedTeacher) {
        await teacherService.updateTeacher(selectedTeacher.id, formData);
        showToast('Teacher profile updated successfully!', 'success', 'Teacher Updated');
      } else {
        await teacherService.createTeacher(formData);
        showToast('New teacher registered successfully!', 'success', 'Teacher Registered');
      }
      fetchTeachers();
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to save teacher details';
      showToast(msg, 'error', 'Operation Failed');
      throw err;
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTeacher) return;
    setIsDeleting(true);
    try {
      await teacherService.deleteTeacher(deletingTeacher.id);
      showToast(
        `${deletingTeacher.firstName} ${deletingTeacher.lastName} was removed.`,
        'info',
        'Teacher Deleted'
      );
      setIsConfirmOpen(false);
      setDeletingTeacher(null);
      fetchTeachers();
    } catch {
      showToast('Failed to delete teacher record.', 'error', 'Delete Failed');
    } finally {
      setIsDeleting(false);
    }
  };

  // Paginated data slicing
  const totalItems = teachers.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedTeachers = teachers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6 pb-6">
      {/* Page Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Teacher & Educator Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage faculty profiles, academic department allocations, qualifications, and active status.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setSelectedTeacher(null);
            setIsModalOpen(true);
          }}
          leftIcon={<UserPlus className="w-4 h-4" />}
          className="shrink-0 shadow-md shadow-indigo-600/20"
        >
          Add New Teacher
        </Button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Faculty Staff"
          value={stats?.totalTeachers || 0}
          icon={<Users className="w-6 h-6" />}
          color="indigo"
          description="Registered educators"
        />
        <StatsCard
          title="Active Educators"
          value={stats?.activeTeachers || 0}
          icon={<UserCheck className="w-6 h-6" />}
          color="emerald"
          description="Currently teaching"
        />
        <StatsCard
          title="Academic Departments"
          value={stats?.departmentsCount || 0}
          icon={<Building2 className="w-6 h-6" />}
          color="sky"
          description="Science, Maths, Arts & more"
        />
        <StatsCard
          title="Department Heads (HODs)"
          value={stats?.headOfDepartments || 0}
          icon={<Award className="w-6 h-6" />}
          color="amber"
          description="Senior department leads"
        />
      </div>

      {/* Filter Bar */}
      <TeacherFilters
        filters={filters}
        onFilterChange={(f) => {
          setFilters(f);
          setCurrentPage(1);
        }}
        onReset={handleResetFilters}
      />

      {/* Main Content Area */}
      <div className="space-y-4">
        {isLoading ? (
          <TableSkeleton rows={5} />
        ) : error ? (
          <div className="p-8 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
              Error Loading Teacher Records
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-400">{error}</p>
            <Button
              variant="danger"
              size="sm"
              onClick={fetchTeachers}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Retry
            </Button>
          </div>
        ) : teachers.length === 0 ? (
          <EmptyState
            title="No Teachers Found"
            description="No educator profiles matched your search or department filter parameters."
            icon={<Users className="w-8 h-8 text-indigo-500" />}
            actionLabel="Clear Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
            <TeacherTable
              teachers={paginatedTeachers}
              onView={(t) => {
                setViewingTeacher(t);
                setIsDrawerOpen(true);
              }}
              onEdit={(t) => {
                setSelectedTeacher(t);
                setIsModalOpen(true);
              }}
              onDelete={(t) => {
                setDeletingTeacher(t);
                setIsConfirmOpen(true);
              }}
            />

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
        )}
      </div>

      {/* Add / Edit Teacher Modal */}
      <TeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdate}
        initialData={selectedTeacher}
      />

      {/* Profile Detail Drawer */}
      <TeacherDetailDrawer
        teacher={viewingTeacher}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onEdit={(t) => {
          setSelectedTeacher(t);
          setIsModalOpen(true);
        }}
      />

      {/* Action Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Teacher Record"
        message={`Are you sure you want to delete ${deletingTeacher?.firstName} ${deletingTeacher?.lastName} (${deletingTeacher?.employeeId})? This action cannot be undone.`}
        confirmText="Delete Teacher"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
