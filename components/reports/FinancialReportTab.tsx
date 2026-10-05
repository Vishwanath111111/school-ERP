'use client';

import React from 'react';
import { FinancialFeeStat } from '@/types/report';
import { Badge } from '@/components/ui/Badge';
import { DollarSign, Wallet, AlertCircle } from 'lucide-react';

export interface FinancialReportTabProps {
  stats: FinancialFeeStat[];
}

export const FinancialReportTab: React.FC<FinancialReportTabProps> = ({ stats }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-500" /> Revenue & Dues Financial Summary
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Comprehensive breakdown of fee collections, outstanding dues, and collection efficiency rates.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-3">Fee Category</th>
                <th className="p-3 text-right">Total Invoiced</th>
                <th className="p-3 text-right">Collected Amount</th>
                <th className="p-3 text-right">Pending Dues</th>
                <th className="p-3 text-center">Collection Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {stats.map((row) => (
                <tr key={row.category} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{row.category}</td>
                  <td className="p-3 text-right font-medium text-slate-700 dark:text-slate-300">
                    ₹{row.totalInvoiced.toLocaleString()}
                  </td>
                  <td className="p-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{row.collectedAmount.toLocaleString()}
                  </td>
                  <td className="p-3 text-right font-bold text-rose-600 dark:text-rose-400">
                    ₹{row.pendingAmount.toLocaleString()}
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                      row.collectionRate >= 85
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}>
                      {row.collectionRate}%
                    </span>
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
