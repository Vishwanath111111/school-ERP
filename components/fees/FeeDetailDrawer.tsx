'use client';

import React from 'react';
import { FeeRecord } from '@/types/fee';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { X, Printer, CheckCircle2, DollarSign, Calendar, FileText, CreditCard } from 'lucide-react';

export interface FeeDetailDrawerProps {
  fee: FeeRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onCollectPayment: (fee: FeeRecord) => void;
}

export const FeeDetailDrawer: React.FC<FeeDetailDrawerProps> = ({
  fee,
  isOpen,
  onClose,
  onCollectPayment,
}) => {
  if (!isOpen || !fee) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200/80 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono text-indigo-200 font-semibold uppercase tracking-wider block">
                Official Fee Receipt
              </span>
              <h3 className="text-lg font-bold">{fee.invoiceNo}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Receipt Body */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* Status Summary Banner */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                  Student Name
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {fee.studentName}
                </h4>
                <span className="text-xs text-slate-500 font-medium">
                  {fee.className} - {fee.section || 'A'}
                </span>
              </div>
              <Badge variant={fee.status === 'PAID' ? 'success' : fee.status === 'PARTIAL' ? 'warning' : 'danger'}>
                {fee.status}
              </Badge>
            </div>

            {/* Amount Summary Cards */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/20 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-medium block">Total Fee</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block">
                  ₹{fee.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block">Paid</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                  ₹{fee.paidAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-3 bg-rose-50/60 dark:bg-rose-950/20 rounded-xl border border-rose-100 dark:border-rose-900">
                <span className="text-[10px] text-rose-600 dark:text-rose-400 font-medium block">Due</span>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-0.5 block">
                  ₹{fee.dueAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Itemized Fee Structure */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-500">
                Fee Breakdown
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-300">Tuition Fee</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ₹{(fee.totalAmount * 0.7).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-300">Computer & Science Lab</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ₹{(fee.totalAmount * 0.15).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-600 dark:text-slate-300">Library & Development</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ₹{(fee.totalAmount * 0.15).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Transaction Audit */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-500">
                Transaction Details
              </h4>
              <div className="space-y-2 text-xs">
                {fee.paymentMethod && (
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-indigo-500" /> Mode
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">{fee.paymentMethod}</span>
                  </div>
                )}

                {fee.transactionRef && (
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-500" /> Ref ID
                    </span>
                    <span className="font-mono font-semibold text-slate-900 dark:text-white">{fee.transactionRef}</span>
                  </div>
                )}

                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Issue Date
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">{fee.issueDate}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/20 rounded-xl">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" /> Due Date
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">{fee.dueDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handlePrint}
              leftIcon={<Printer className="w-4 h-4" />}
            >
              Print Receipt
            </Button>
            {fee.dueAmount > 0 ? (
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => {
                  onClose();
                  onCollectPayment(fee);
                }}
              >
                Collect Payment
              </Button>
            ) : (
              <Button variant="primary" className="flex-1" onClick={onClose}>
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
