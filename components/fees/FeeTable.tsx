'use client';

import React from 'react';
import { FeeRecord } from '@/types/fee';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CreditCard, Eye, Calendar } from 'lucide-react';

export interface FeeTableProps {
  fees: FeeRecord[];
  onCollectPayment: (fee: FeeRecord) => void;
  onViewReceipt: (fee: FeeRecord) => void;
}

export const FeeTable: React.FC<FeeTableProps> = ({
  fees,
  onCollectPayment,
  onViewReceipt,
}) => {
  const getStatusBadge = (status: FeeRecord['status']) => {
    switch (status) {
      case 'PAID':
        return <Badge variant="success">Paid in Full</Badge>;
      case 'PARTIAL':
        return <Badge variant="warning">Partial Paid</Badge>;
      case 'PENDING':
        return <Badge variant="info">Pending</Badge>;
      case 'OVERDUE':
        return <Badge variant="danger">Overdue</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice No & Student</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Total Fee</TableHead>
          <TableHead>Paid Amount</TableHead>
          <TableHead>Due Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fees.map((fee) => (
          <TableRow key={fee.id}>
            {/* Invoice & Student */}
            <TableCell>
              <div>
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold block">
                  {fee.invoiceNo}
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {fee.studentName}
                </h4>
              </div>
            </TableCell>

            {/* Class & Section */}
            <TableCell>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {fee.className} - {fee.section || 'A'}
              </span>
            </TableCell>

            {/* Total Fee Amount */}
            <TableCell>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                ₹{fee.totalAmount.toLocaleString('en-IN')}
              </span>
            </TableCell>

            {/* Paid Amount */}
            <TableCell>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                ₹{fee.paidAmount.toLocaleString('en-IN')}
              </span>
            </TableCell>

            {/* Due Amount */}
            <TableCell>
              <span className={`text-xs font-semibold ${fee.dueAmount > 0 ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-400'}`}>
                ₹{fee.dueAmount.toLocaleString('en-IN')}
              </span>
            </TableCell>

            {/* Status Badge */}
            <TableCell>{getStatusBadge(fee.status)}</TableCell>

            {/* Due Date */}
            <TableCell>
              <div className="flex items-center space-x-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{fee.dueDate}</span>
              </div>
            </TableCell>

            {/* Action Buttons */}
            <TableCell className="text-right">
              <div className="flex items-center justify-end space-x-1.5">
                {fee.dueAmount > 0 && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onCollectPayment(fee)}
                    leftIcon={<CreditCard className="w-3.5 h-3.5" />}
                    className="text-xs py-1"
                  >
                    Collect Payment
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewReceipt(fee)}
                  leftIcon={<Eye className="w-3.5 h-3.5" />}
                  className="text-xs py-1"
                >
                  Receipt
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
