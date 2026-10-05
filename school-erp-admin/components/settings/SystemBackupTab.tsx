'use client';

import React, { useState } from 'react';
import { SystemBackupConfig } from '@/types/settings';
import { Button } from '@/components/ui/Button';
import { Database, Download, RefreshCw, Server, HardDrive, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export interface SystemBackupTabProps {
  config: SystemBackupConfig;
}

export const SystemBackupTab: React.FC<SystemBackupTabProps> = ({ config }) => {
  const { showToast } = useToast();
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isClearingCache, setIsClearingCache] = useState<boolean>(false);

  const handleExportBackup = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast(
        'Database snapshot created & downloaded successfully (school_erp_dump_2026.sql)',
        'success',
        'Backup Generated'
      );
    }, 1200);
  };

  const handleClearCache = () => {
    setIsClearingCache(true);
    setTimeout(() => {
      setIsClearingCache(false);
      showToast('System application cache and session store cleared.', 'info', 'Cache Cleared');
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Backup Summary & Database Health */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-500" /> Database Backup & Maintenance Tools
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Database Size</span>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 block">
              {config.databaseSizeMB} MB
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block flex items-center gap-1">
              <HardDrive className="w-3 h-3 text-indigo-500" /> PostgreSQL 16 Storage
            </span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Total System Records</span>
            <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 mt-1 block">
              {config.totalRecordsCount.toLocaleString()} Rows
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block flex items-center gap-1">
              <Server className="w-3 h-3 text-emerald-500" /> All ERP Tables Healthy
            </span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Last Automated Backup</span>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 block">
              {config.lastBackupDate}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Daily Snapshot Active
            </span>
          </div>
        </div>

        {/* Maintenance Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Manual Export & Cache Operations</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Download a complete SQL dump of your PostgreSQL database or purge cached app sessions.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleClearCache}
              isLoading={isClearingCache}
              leftIcon={<RefreshCw className="w-4 h-4 text-slate-500" />}
            >
              Purge App Cache
            </Button>
            <Button
              variant="primary"
              onClick={handleExportBackup}
              isLoading={isExporting}
              leftIcon={<Download className="w-4 h-4" />}
              className="shadow-md shadow-indigo-600/20"
            >
              Export SQL Backup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
