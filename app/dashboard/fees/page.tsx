'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { feeService } from '@/services/fee.service';
import { FeeRecord, FeeFilter, FeeStats, CollectPaymentPayload } from '@/types/fee';
import { FeeStatsGrid } from '@/components/fees/FeeStatsGrid';
import { FeeFilters } from '@/components/fees/FeeFilters';
import { FeeTable } from '@/components/fees/FeeTable';
import { CollectPaymentModal } from '@/components/fees/CollectPaymentModal';
import { FeeDetailDrawer } from '@/components/fees/FeeDetailDrawer';
import { Pagination } from '@/components/ui/Pagination';
import { TableSkeleton } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { DollarSign, RefreshCw, AlertCircle, CreditCard } from 'lucide-react';

export default function FeesPage() {
  const { showToast } = useToast();

  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [stats, setStats] = useState<FeeStats>({
    totalCollected: 0,
    totalPending: 0,
    paidInvoicesCount: 0,
    pendingInvoicesCount: 0,
    overdueInvoicesCount: 0,
  });
  const [filters, setFilters] = useState<FeeFilter>({});

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modals & Drawers State
  const [isCollectModalOpen, setIsCollectModalOpen] = useState<boolean>(false);
  const [selectedFeeForPayment, setSelectedFeeForPayment] = useState<FeeRecord | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [viewingFeeReceipt, setViewingFeeReceipt] = useState<FeeRecord | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const fetchFees = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [data, statsData] = await Promise.all([
        feeService.getAllFees(filters),
        feeService.getFeeStats(),
      ]);
      setFees(data);
      setStats(statsData);
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to fetch fee invoices';
      setError(msg);
      showToast(msg, 'error', 'Error Fetching Fees');
    } finally {
      setIsLoading(false);
    }
  }, [filters, showToast]);

  useEffect(() => {
    fetchFees();
  }, [fetchFees]);

  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handlePaymentCollect = async (payload: CollectPaymentPayload) => {
    if (!selectedFeeForPayment) return;
    try {
      await feeService.collectPayment(selectedFeeForPayment.id, payload);
      showToast(
        `Payment of ₹${payload.amount.toLocaleString('en-IN')} received for Invoice ${selectedFeeForPayment.invoiceNo}!`,
        'success',
        'Payment Recorded'
      );
      fetchFees();
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message || 'Failed to process payment';
      showToast(msg, 'error', 'Payment Failed');
      throw err;
    }
  };

  // Paginated data slicing
  const totalItems = fees.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedFees = fees.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6 pb-6">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <DollarSign className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            Fees & Financial Billing
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage student fee structures, track collections, issue payment receipts, and audit outstanding dues.
          </p>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <FeeStatsGrid stats={stats} />

      {/* Search & Filters */}
      <FeeFilters
        filters={filters}
        onFilterChange={(f) => {
          setFilters(f);
          setCurrentPage(1);
        }}
        onReset={handleResetFilters}
      />

      {/* Data Table Area */}
      <div className="space-y-4">
        {isLoading ? (
          <TableSkeleton rows={5} />
        ) : error ? (
          <div className="p-8 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
              Error Loading Fee Records
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-400">{error}</p>
            <Button
              variant="danger"
              size="sm"
              onClick={fetchFees}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Retry
            </Button>
          </div>
        ) : fees.length === 0 ? (
          <EmptyState
            title="No Fee Invoices Found"
            description="No fee records matched your search or status filter criteria."
            icon={<CreditCard className="w-8 h-8 text-indigo-500" />}
            actionLabel="Clear Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
            <FeeTable
              fees={paginatedFees}
              onCollectPayment={(fee) => {
                setSelectedFeeForPayment(fee);
                setIsCollectModalOpen(true);
              }}
              onViewReceipt={(fee) => {
                setViewingFeeReceipt(fee);
                setIsDrawerOpen(true);
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

      {/* Collect Payment Modal */}
      <CollectPaymentModal
        isOpen={isCollectModalOpen}
        onClose={() => setIsCollectModalOpen(false)}
        onSave={handlePaymentCollect}
        fee={selectedFeeForPayment}
      />

      {/* Fee Receipt Drawer */}
      <FeeDetailDrawer
        fee={viewingFeeReceipt}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onCollectPayment={(fee) => {
          setSelectedFeeForPayment(fee);
          setIsCollectModalOpen(true);
        }}
      />
    </div>
  );
}
