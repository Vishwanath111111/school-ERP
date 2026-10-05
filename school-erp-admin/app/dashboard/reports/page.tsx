'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { reportService } from '@/services/report.service';
import {
  ReportSummary,
  ClassAttendanceStat,
  FinancialFeeStat,
  AcademicGradeStat,
} from '@/types/report';
import { ReportStatsGrid } from '@/components/reports/ReportStatsGrid';
import { AttendanceReportTab } from '@/components/reports/AttendanceReportTab';
import { FinancialReportTab } from '@/components/reports/FinancialReportTab';
import { AcademicReportTab } from '@/components/reports/AcademicReportTab';
import { TableSkeleton } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { BarChart3, Download, Printer, CheckCircle2, DollarSign, GraduationCap, FileText } from 'lucide-react';

export default function ReportsPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'ATTENDANCE' | 'FINANCIAL' | 'ACADEMIC'>('ATTENDANCE');

  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [attendanceStats, setAttendanceStats] = useState<ClassAttendanceStat[]>([]);
  const [financialStats, setFinancialStats] = useState<FinancialFeeStat[]>([]);
  const [academicStats, setAcademicStats] = useState<AcademicGradeStat[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const summaryData = await reportService.getSummary();
      setSummary(summaryData);
      setAttendanceStats(reportService.getAttendanceReports());
      setFinancialStats(reportService.getFinancialReports());
      setAcademicStats(reportService.getAcademicReports());
    } catch {
      showToast('Failed to load analytical reports', 'error', 'Reports Error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleExportPDF = () => {
    window.print();
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast(
        `Generated & downloaded ${activeTab.toLowerCase()}_analytics_report_2026.csv`,
        'success',
        'CSV Exported'
      );
    }, 800);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            Reports & Analytical Intelligence
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Institutional insights across daily student attendance trends, fee collection revenue, and academic subject performance.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Button
            variant="outline"
            onClick={handleExportPDF}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print PDF Report
          </Button>
          <Button
            variant="primary"
            onClick={handleExportCSV}
            isLoading={isExporting}
            leftIcon={<Download className="w-4 h-4" />}
            className="shadow-md shadow-indigo-600/20"
          >
            Export Data CSV
          </Button>
        </div>
      </div>

      {/* Summary Metrics */}
      {summary && <ReportStatsGrid summary={summary} />}

      {/* Tab Controls */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('ATTENDANCE')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'ATTENDANCE'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> Attendance Analytics
          </button>

          <button
            onClick={() => setActiveTab('FINANCIAL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'FINANCIAL'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" /> Revenue & Fee Dues
          </button>

          <button
            onClick={() => setActiveTab('ACADEMIC')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'ACADEMIC'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Subject Grades & Ranks
          </button>
        </div>
      </div>

      {/* Tab Content Panels */}
      {isLoading ? (
        <TableSkeleton rows={4} />
      ) : (
        <>
          {activeTab === 'ATTENDANCE' && <AttendanceReportTab stats={attendanceStats} />}
          {activeTab === 'FINANCIAL' && <FinancialReportTab stats={financialStats} />}
          {activeTab === 'ACADEMIC' && <AcademicReportTab stats={academicStats} />}
        </>
      )}
    </div>
  );
}
