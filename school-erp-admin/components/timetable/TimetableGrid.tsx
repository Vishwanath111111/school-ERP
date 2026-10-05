'use client';

import React from 'react';
import { TimetableEntry, DayOfWeek } from '@/types/timetable';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, User, MapPin, Edit2, Trash2, UserCheck } from 'lucide-react';

export interface TimetableGridProps {
  entries: TimetableEntry[];
  onEdit: (entry: TimetableEntry) => void;
  onSubstitute: (entry: TimetableEntry) => void;
  onDelete: (entry: TimetableEntry) => void;
}

const DAYS: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export const TimetableGrid: React.FC<TimetableGridProps> = ({
  entries,
  onEdit,
  onSubstitute,
  onDelete,
}) => {
  const getEntriesForDay = (day: DayOfWeek) => {
    return entries
      .filter((e) => e.dayOfWeek === day)
      .sort((a, b) => a.periodNumber - b.periodNumber);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DAYS.map((day) => {
          const dayEntries = getEntriesForDay(day);
          return (
            <div
              key={day}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs p-5 space-y-4"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {day}
                </h3>
                <span className="text-[11px] font-semibold text-slate-400">
                  {dayEntries.length} Periods Scheduled
                </span>
              </div>

              {/* Period Cards List */}
              {dayEntries.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs italic bg-slate-50 dark:bg-slate-800/20 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                  No periods scheduled for {day}
                </div>
              ) : (
                <div className="space-y-3">
                  {dayEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                        entry.isSubstituted
                          ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900'
                          : 'bg-slate-50/70 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      {/* Period Header */}
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                          Period {entry.periodNumber} ({entry.startTime} - {entry.endTime})
                        </span>
                        {entry.isSubstituted && (
                          <Badge variant="warning">Substituted</Badge>
                        )}
                      </div>

                      {/* Subject Name */}
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                        {entry.subject}
                      </h4>

                      {/* Educator & Room */}
                      <div className="space-y-1 text-[11px] text-slate-500">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-indigo-500" /> Educator:
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {entry.isSubstituted && entry.substituteTeacherName
                              ? `${entry.substituteTeacherName} (Sub)`
                              : entry.teacherName || 'Unassigned'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-rose-500" /> Room:
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {entry.roomNumber || 'Room 101'}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSubstitute(entry)}
                          title="Assign Substitute Educator"
                          className="h-7 px-2 text-[11px] text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                          leftIcon={<UserCheck className="w-3 h-3" />}
                        >
                          Sub
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(entry)}
                          title="Edit Entry"
                          className="h-7 w-7 p-0 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(entry)}
                          title="Delete Entry"
                          className="h-7 w-7 p-0 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
