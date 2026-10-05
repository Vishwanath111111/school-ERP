'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { timetableService } from '@/services/timetable.service';
import { TimetableEntry, TimetableFilter, TimetableStats, TimetableRequest } from '@/types/timetable';
import { TimetableStatsGrid } from '@/components/timetable/TimetableStatsGrid';
import { TimetableFilters } from '@/components/timetable/TimetableFilters';
import { TimetableGrid } from '@/components/timetable/TimetableGrid';
import { TimetableModal } from '@/components/timetable/TimetableModal';
import { TeacherSubstitutionModal } from '@/components/timetable/TeacherSubstitutionModal';
import { TableSkeleton } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Clock, Plus, RefreshCw, AlertCircle } from 'lucide-react';

export default function TimetablePage() {
  const { showToast } = useToast();

  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [stats, setStats] = useState<TimetableStats>({
    totalWeeklyPeriods: 0,
    activeClassSectionsCount: 0,
    substitutedPeriodsCount: 0,
    freePeriodsCount: 0,
  });
  const [filters, setFilters] = useState<TimetableFilter>({ className: 'Class 10-A' });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modals State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<TimetableEntry | null>(null);

  const [isSubstituteModalOpen, setIsSubstituteModalOpen] = useState<boolean>(false);
  const [substitutingEntry, setSubstitutingEntry] = useState<TimetableEntry | null>(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [deletingEntry, setDeletingEntry] = useState<TimetableEntry | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fetchTimetable = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [data, statsData] = await Promise.all([
        timetableService.getAllEntries(filters),
        timetableService.getStats(),
      ]);
      setEntries(data);
      setStats(statsData);
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to fetch timetable schedules';
      setError(msg);
      showToast(msg, 'error', 'Timetable Error');
    } finally {
      setIsLoading(false);
    }
  }, [filters, showToast]);

  useEffect(() => {
    fetchTimetable();
  }, [fetchTimetable]);

  const handleResetFilters = () => {
    setFilters({ className: 'ALL' });
  };

  const handleCreateOrUpdate = async (formData: TimetableRequest) => {
    try {
      if (selectedEntry) {
        await timetableService.updateEntry(selectedEntry.id, formData);
        showToast('Timetable period updated successfully!', 'success', 'Period Updated');
      } else {
        await timetableService.createEntry(formData);
        showToast('New period scheduled successfully!', 'success', 'Period Scheduled');
      }
      fetchTimetable();
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to save timetable slot';
      showToast(msg, 'error', 'Scheduling Failed');
      throw err;
    }
  };

  const handleSubstituteSave = async (id: number, formData: TimetableRequest) => {
    try {
      await timetableService.updateEntry(id, formData);
      showToast('Substitute educator assigned successfully!', 'success', 'Substitute Reassigned');
      fetchTimetable();
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to assign substitute educator';
      showToast(msg, 'error', 'Substitution Failed');
      throw err;
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingEntry) return;
    setIsDeleting(true);
    try {
      await timetableService.deleteEntry(deletingEntry.id);
      showToast('Timetable entry removed.', 'info', 'Period Deleted');
      setIsConfirmOpen(false);
      setDeletingEntry(null);
      fetchTimetable();
    } catch {
      showToast('Failed to delete timetable entry.', 'error', 'Delete Failed');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Clock className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Timetable & Weekly Schedules
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage weekly class period grids, classroom allocations, and reassign absent faculty with substitute educators.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setSelectedEntry(null);
            setIsModalOpen(true);
          }}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shrink-0 shadow-md shadow-indigo-600/20"
        >
          Add Period Slot
        </Button>
      </div>

      {/* Overview Stats Cards */}
      <TimetableStatsGrid stats={stats} />

      {/* Filter Toolbar */}
      <TimetableFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
      />

      {/* Weekly Schedule Grid */}
      <div className="space-y-4">
        {isLoading ? (
          <TableSkeleton rows={4} />
        ) : error ? (
          <div className="p-8 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
              Error Loading Timetable
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-400">{error}</p>
            <Button
              variant="danger"
              size="sm"
              onClick={fetchTimetable}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Retry
            </Button>
          </div>
        ) : entries.length === 0 ? (
          <EmptyState
            title="No Timetable Slots Found"
            description="No scheduled class periods matched your class or day selection."
            icon={<Clock className="w-8 h-8 text-indigo-500" />}
            actionLabel="Clear Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <TimetableGrid
            entries={entries}
            onEdit={(e) => {
              setSelectedEntry(e);
              setIsModalOpen(true);
            }}
            onSubstitute={(e) => {
              setSubstitutingEntry(e);
              setIsSubstituteModalOpen(true);
            }}
            onDelete={(e) => {
              setDeletingEntry(e);
              setIsConfirmOpen(true);
            }}
          />
        )}
      </div>

      {/* Add / Edit Timetable Entry Modal */}
      <TimetableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdate}
        initialData={selectedEntry}
      />

      {/* Teacher Substitution Modal */}
      <TeacherSubstitutionModal
        isOpen={isSubstituteModalOpen}
        onClose={() => setIsSubstituteModalOpen(false)}
        onSave={handleSubstituteSave}
        entry={substitutingEntry}
      />

      {/* Action Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Timetable Period"
        message={`Are you sure you want to remove period slot #${deletingEntry?.periodNumber} (${deletingEntry?.subject})? This action cannot be undone.`}
        confirmText="Delete Period"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
