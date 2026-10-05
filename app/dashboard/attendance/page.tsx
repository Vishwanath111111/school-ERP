'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { attendanceService } from '@/services/attendance.service';
import { AttendanceRecord, AttendanceStatus, AttendanceStats } from '@/types/attendance';
import { AttendanceStatsGrid } from '@/components/attendance/AttendanceStatsGrid';
import { AttendanceHeader } from '@/components/attendance/AttendanceHeader';
import { AttendanceTable } from '@/components/attendance/AttendanceTable';
import { TableSkeleton } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { CalendarCheck, RefreshCw, AlertCircle, Users } from 'lucide-react';

export default function AttendancePage() {
  const { showToast } = useToast();

  const [selectedClass, setSelectedClass] = useState<string>('Class 10');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<AttendanceStats>({
    totalStudents: 0,
    presentCount: 0,
    absentCount: 0,
    lateCount: 0,
    halfDayCount: 0,
    attendancePercentage: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await attendanceService.getAttendance(selectedClass, selectedDate);
      setRecords(data);
      setStats(attendanceService.calculateStats(data));
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to fetch class attendance list';
      setError(msg);
      showToast(msg, 'error', 'Attendance Fetch Error');
    } finally {
      setIsLoading(false);
    }
  }, [selectedClass, selectedDate, showToast]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const handleStatusChange = (studentId: number, status: AttendanceStatus) => {
    const updated = records.map((r) =>
      r.studentId === studentId ? { ...r, status } : r
    );
    setRecords(updated);
    setStats(attendanceService.calculateStats(updated));
  };

  const handleRemarksChange = (studentId: number, remarks: string) => {
    const updated = records.map((r) =>
      r.studentId === studentId ? { ...r, remarks } : r
    );
    setRecords(updated);
  };

  const handleMarkAllPresent = () => {
    const updated = records.map((r) => ({ ...r, status: 'PRESENT' as AttendanceStatus }));
    setRecords(updated);
    setStats(attendanceService.calculateStats(updated));
    showToast('All students marked Present for today.', 'info', 'Quick Action');
  };

  const handleSaveAttendance = async () => {
    setIsSaving(true);
    try {
      await attendanceService.saveAttendance({
        date: selectedDate,
        items: records,
      });
      showToast(
        `Attendance for ${selectedClass} on ${selectedDate} finalized successfully!`,
        'success',
        'Attendance Saved'
      );
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to save attendance entries';
      showToast(msg, 'error', 'Save Failed');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <CalendarCheck className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Daily Attendance Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Record daily student attendance, log presence/absence, and submit bulk entries.
          </p>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <AttendanceStatsGrid stats={stats} />

      {/* Attendance Toolbar Header */}
      <AttendanceHeader
        selectedClass={selectedClass}
        onClassChange={setSelectedClass}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onMarkAllPresent={handleMarkAllPresent}
        onSave={handleSaveAttendance}
        isSaving={isSaving}
      />

      {/* Attendance Table Area */}
      <div className="space-y-4">
        {isLoading ? (
          <TableSkeleton rows={6} />
        ) : error ? (
          <div className="p-8 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
              Error Loading Attendance Data
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-400">{error}</p>
            <Button
              variant="danger"
              size="sm"
              onClick={fetchAttendance}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Retry
            </Button>
          </div>
        ) : records.length === 0 ? (
          <EmptyState
            title="No Students Found"
            description={`No active students found in ${selectedClass} for attendance entry.`}
            icon={<Users className="w-8 h-8 text-indigo-500" />}
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
            <AttendanceTable
              records={records}
              onStatusChange={handleStatusChange}
              onRemarksChange={handleRemarksChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
