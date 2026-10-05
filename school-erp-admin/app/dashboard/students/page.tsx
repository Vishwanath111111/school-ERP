'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { studentService } from '@/services/student.service';
import { Student, StudentFilter, StudentRequest, StudentStats } from '@/types/student';
import { StudentFilters } from '@/components/students/StudentFilters';
import { StudentTable } from '@/components/students/StudentTable';
import { StudentModal } from '@/components/students/StudentModal';
import { StudentDetailDrawer } from '@/components/students/StudentDetailDrawer';
import { StatsCard } from '@/components/ui/StatsCard';
import { Button } from '@/components/ui/Button';
import { TableSkeleton } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useToast } from '@/components/ui/Toast';
import { Users, UserCheck, UserX, School, Plus, RefreshCw, AlertCircle } from 'lucide-react';

export default function StudentsPage() {
  const { showToast } = useToast();

  // Primary Data States
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter State
  const [filter, setFilter] = useState<StudentFilter>({
    searchQuery: '',
    className: '',
    section: '',
    gender: '',
    status: 'ALL',
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Modal & Overlay States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  // Fetch Students from Spring Boot Backend
  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await studentService.getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const errMsg = (err as { message?: string }).message || 'Failed to connect to backend Spring Boot server.';
      setError(errMsg);
      showToast(errMsg, 'error', 'API Fetch Failed');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Derived Classes & Sections list for Filter dropdowns
  const availableClasses = useMemo(() => {
    const classSet = new Set<string>();
    students.forEach((s) => s.className && classSet.add(s.className));
    const list = Array.from(classSet);
    return list.length > 0 ? list.sort((a, b) => Number(a) - Number(b)) : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  }, [students]);

  const availableSections = useMemo(() => {
    const sectionSet = new Set<string>();
    students.forEach((s) => s.section && sectionSet.add(s.section));
    const list = Array.from(sectionSet);
    return list.length > 0 ? list.sort() : ['A', 'B', 'C', 'D'];
  }, [students]);

  // Filtered Students List Logic
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Search Query Filter
      if (filter.searchQuery.trim() !== '') {
        const query = filter.searchQuery.toLowerCase();
        const nameMatch = (student.fullName || `${student.firstName} ${student.lastName || ''}`).toLowerCase().includes(query);
        const admMatch = (student.admissionNo || '').toLowerCase().includes(query);
        if (!nameMatch && !admMatch) return false;
      }

      // Class Filter
      if (filter.className !== '' && student.className !== filter.className) {
        return false;
      }

      // Section Filter
      if (filter.section !== '' && student.section !== filter.section) {
        return false;
      }

      // Gender Filter
      if (filter.gender !== '' && student.gender !== filter.gender) {
        return false;
      }

      // Active Status Filter
      if (filter.status === 'ACTIVE' && !student.isActive) return false;
      if (filter.status === 'INACTIVE' && student.isActive) return false;

      return true;
    });
  }, [students, filter]);

  // Pagination Calculated Slice
  const totalItems = filteredStudents.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, currentPage, pageSize]);

  // Reset pagination to page 1 on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, pageSize]);

  // Calculated Statistics
  const stats: StudentStats = useMemo(() => {
    const total = students.length;
    const active = students.filter((s) => s.isActive).length;
    const inactive = total - active;
    const classesCount = new Set(students.map((s) => s.className)).size;
    return {
      totalStudents: total,
      activeStudents: active,
      inactiveStudents: inactive,
      totalClasses: classesCount,
    };
  }, [students]);

  // Handlers for Add / Edit Submission
  const handleCreateOrUpdateStudent = async (data: StudentRequest) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        // Optimistic update for Edit
        const updatedList = students.map((s) =>
          s.id === editingStudent.id
            ? {
                ...s,
                ...data,
                fullName: `${data.firstName} ${data.lastName || ''}`.trim(),
              }
            : s
        );
        setStudents(updatedList);
        showToast(`Student ${data.firstName} updated successfully!`, 'success');
      } else {
        // Live API call for creation
        const createdStudent = await studentService.createStudent(data);
        setStudents((prev) => [createdStudent, ...prev]);
        showToast(`Student ${createdStudent.firstName} created successfully!`, 'success', 'Student Registered');
      }
      setIsModalOpen(false);
      setEditingStudent(null);
    } catch (err: unknown) {
      const errMsg = (err as { message?: string }).message || 'Failed to save student record.';
      showToast(errMsg, 'error', 'Operation Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for Delete Confirmation
  const handleDeleteConfirm = () => {
    if (!studentToDelete) return;
    const updatedList = students.filter((s) => s.id !== studentToDelete.id);
    setStudents(updatedList);
    showToast(`Student record ${studentToDelete.admissionNo} deleted`, 'info');
    setIsDeleteOpen(false);
    setStudentToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Student Directory & Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage student admissions, profiles, class assignments, and status in real-time.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchStudents}
            isLoading={isLoading}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setEditingStudent(null);
              setIsModalOpen(true);
            }}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add New Student
          </Button>
        </div>
      </div>

      {/* Metrics Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Enrolled"
          value={stats.totalStudents}
          icon={<Users className="w-6 h-6" />}
          color="indigo"
          description="Total active & inactive students"
        />
        <StatsCard
          title="Active Students"
          value={stats.activeStudents}
          icon={<UserCheck className="w-6 h-6" />}
          color="emerald"
          description="Currently attending classes"
        />
        <StatsCard
          title="Inactive Students"
          value={stats.inactiveStudents}
          icon={<UserX className="w-6 h-6" />}
          color="rose"
          description="Withdrawn or suspended"
        />
        <StatsCard
          title="Active Classes"
          value={stats.totalClasses}
          icon={<School className="w-6 h-6" />}
          color="sky"
          description="Class grades represented"
        />
      </div>

      {/* Filter Toolbar */}
      <StudentFilters
        filter={filter}
        onChange={setFilter}
        onReset={() =>
          setFilter({
            searchQuery: '',
            className: '',
            section: '',
            gender: '',
            status: 'ALL',
          })
        }
        classes={availableClasses}
        sections={availableSections}
      />

      {/* Content Area: Error State, Loading State, Empty State, or Table */}
      {error ? (
        <div className="p-6 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-xl text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          <h3 className="text-base font-bold text-rose-900 dark:text-rose-200">Unable to Fetch Students</h3>
          <p className="text-xs text-rose-700 dark:text-rose-400 max-w-md mx-auto">{error}</p>
          <Button variant="danger" size="sm" onClick={fetchStudents} leftIcon={<RefreshCw className="w-4 h-4" />}>
            Retry Connection
          </Button>
        </div>
      ) : isLoading ? (
        <TableSkeleton rows={6} cols={7} />
      ) : filteredStudents.length === 0 ? (
        <EmptyState
          title="No Students Found"
          description={
            students.length === 0
              ? 'No student records exist in the Spring Boot database. Click "Add New Student" to create your first record.'
              : 'No students match your active filter criteria. Try resetting search parameters.'
          }
          actionLabel={students.length === 0 ? 'Add First Student' : 'Clear Filters'}
          onAction={() => {
            if (students.length === 0) {
              setEditingStudent(null);
              setIsModalOpen(true);
            } else {
              setFilter({
                searchQuery: '',
                className: '',
                section: '',
                gender: '',
                status: 'ALL',
              });
            }
          }}
        />
      ) : (
        <div className="space-y-4">
          <StudentTable
            students={paginatedStudents}
            onView={(student) => {
              setViewingStudent(student);
              setIsDetailOpen(true);
            }}
            onEdit={(student) => {
              setEditingStudent(student);
              setIsModalOpen(true);
            }}
            onDelete={(student) => {
              setStudentToDelete(student);
              setIsDeleteOpen(true);
            }}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      )}

      {/* Modals & Overlays */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStudent(null);
        }}
        onSubmit={handleCreateOrUpdateStudent}
        student={editingStudent}
        isLoading={isSubmitting}
      />

      <StudentDetailDrawer
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setViewingStudent(null);
        }}
        student={viewingStudent}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setStudentToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Student Record"
        message={`Are you sure you want to delete student ${studentToDelete?.fullName || studentToDelete?.firstName} (${studentToDelete?.admissionNo})? This action cannot be undone.`}
        confirmText="Delete Record"
        variant="danger"
      />
    </div>
  );
}