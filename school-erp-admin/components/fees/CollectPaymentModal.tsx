'use client';

import React, { useState, useEffect } from 'react';
import { FeeRecord, CollectPaymentPayload, PaymentMethod } from '@/types/fee';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CreditCard, DollarSign, FileText } from 'lucide-react';

export interface CollectPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: CollectPaymentPayload) => Promise<void>;
  fee: FeeRecord | null;
}

const PAYMENT_METHOD_OPTIONS = [
  { value: 'UPI', label: 'UPI / QR Code' },
  { value: 'ONLINE', label: 'Online Netbanking / Card' },
  { value: 'CASH', label: 'Cash Payment' },
  { value: 'CHEQUE', label: 'Bank Cheque / DD' },
];

export const CollectPaymentModal: React.FC<CollectPaymentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  fee,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [transactionRef, setTransactionRef] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (fee) {
      setAmount(fee.dueAmount);
      setPaymentMethod('UPI');
      setTransactionRef(`TXN-${Math.floor(10000000 + Math.random() * 90000000)}`);
      setRemarks(`Payment received for ${fee.invoiceNo}`);
      setError(null);
    }
  }, [fee, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fee) return;

    if (amount <= 0) {
      setError('Payment amount must be greater than 0');
      return;
    }

    if (amount > fee.dueAmount) {
      setError(`Payment amount cannot exceed remaining due amount (₹${fee.dueAmount})`);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        amount,
        paymentMethod,
        transactionRef,
        remarks,
      });
      onClose();
    } catch {
      // Handled in parent toast alert
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!fee) return null;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Collect Fee Payment"
      description={`Record payment transaction for Invoice #${fee.invoiceNo} (${fee.studentName})`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Invoice Summary Box */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-xs text-center">
          <div>
            <span className="text-slate-400 block text-[10px]">Total Amount</span>
            <span className="font-bold text-slate-900 dark:text-white">₹{fee.totalAmount.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Paid Amount</span>
            <span className="font-bold text-emerald-600">₹{fee.paidAmount.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Remaining Due</span>
            <span className="font-bold text-rose-600">₹{fee.dueAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {error && (
          <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        {/* Payment Amount */}
        <Input
          label="Paying Amount (₹)"
          type="number"
          required
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
            setError(null);
          }}
          placeholder="Enter paying amount"
          leftIcon={<DollarSign className="w-4 h-4 text-emerald-600" />}
        />

        {/* Payment Method */}
        <Select
          label="Payment Mode"
          required
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
          options={PAYMENT_METHOD_OPTIONS}
        />

        {/* Transaction Reference Number */}
        <Input
          label="Transaction Reference / Cheque No"
          value={transactionRef}
          onChange={(e) => setTransactionRef(e.target.value)}
          placeholder="e.g. UPI/TXN ID or Cheque No"
          leftIcon={<CreditCard className="w-4 h-4 text-indigo-500" />}
        />

        {/* Remarks */}
        <Input
          label="Payment Remarks / Note"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Add optional notes..."
          leftIcon={<FileText className="w-4 h-4 text-slate-400" />}
        />

        {/* Actions Bar */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Confirm Payment Receipt
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
