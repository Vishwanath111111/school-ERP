'use client';

import React from 'react';
import { StatsCard } from '@/components/ui/StatsCard';
import { FeeStats } from '@/types/fee';
import { DollarSign, Clock, AlertTriangle, CheckCircle2, CreditCard } from 'lucide-react';

export interface FeeStatsGridProps {
  stats: FeeStats;
}

export const FeeStatsGrid: React.FC<FeeStatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Revenue Collected"
        value={`₹${stats.totalCollected.toLocaleString('en-IN')}`}
        icon={<DollarSign className="w-6 h-6" />}
        color="emerald"
        description="Fees collected into account"
      />
      <StatsCard
        title="Outstanding Fee Dues"
        value={`₹${stats.totalPending.toLocaleString('en-IN')}`}
        icon={<Clock className="w-6 h-6" />}
        color="amber"
        description="Pending receivable dues"
      />
      <StatsCard
        title="Cleared Invoices"
        value={stats.paidInvoicesCount}
        icon={<CheckCircle2 className="w-6 h-6" />}
        color="indigo"
        description="Paid in full"
      />
      <StatsCard
        title="Overdue Accounts"
        value={stats.overdueInvoicesCount}
        icon={<AlertTriangle className="w-6 h-6" />}
        color="rose"
        description="Past due deadline"
      />
    </div>
  );
};
