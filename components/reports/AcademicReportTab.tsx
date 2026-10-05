'use client';

import React from 'react';
import { AcademicGradeStat } from '@/types/report';
import { Badge } from '@/components/ui/Badge';
import { GraduationCap, Award, CheckCircle } from 'lucide-react';

export interface AcademicReportTabProps {
  stats: AcademicGradeStat[];
}

export const AcademicReportTab: React.FC<AcademicReportTabProps> = ({ stats }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-500" /> Academic Grade Performance & Subject Analytics
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Assessment statistics, mean percentage averages, pass rates, and top student rankers.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-3">Academic Subject</th>
                <th className="p-3 text-center">Assessed Students</th>
                <th className="p-3 text-center">Average Grade / %</th>
                <th className="p-3 text-center">Pass Percentage</th>
                <th className="p-3 text-left">Top Scorer Highlight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {stats.map((row) => (
                <tr key={row.subject} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{row.subject}</td>
                  <td className="p-3 text-center text-slate-600 dark:text-slate-300 font-medium">
                    {row.totalStudentsAssessed} Students
                  </td>
                  <td className="p-3 text-center font-bold text-indigo-600 dark:text-indigo-400">
                    {row.averageGrade}
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {row.passPercentage}%
                    </span>
                  </td>
                  <td className="p-3 text-left font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" /> {row.topScorer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
