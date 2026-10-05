export type FeeStatus = 'PAID' | 'PENDING' | 'OVERDUE' | 'PARTIAL';

export type PaymentMethod = 'CASH' | 'ONLINE' | 'CHEQUE' | 'UPI';

export interface FeeRecord {
  id: number;
  invoiceNo: string;
  studentId: number;
  studentName: string;
  className: string;
  section?: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  status: FeeStatus;
  paymentMethod?: PaymentMethod;
  transactionRef?: string;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  remarks?: string;
}

export interface CollectPaymentPayload {
  amount: number;
  paymentMethod: PaymentMethod;
  transactionRef?: string;
  remarks?: string;
}

export interface FeeFilter {
  searchQuery?: string;
  className?: string;
  status?: string;
}

export interface FeeStats {
  totalCollected: number;
  totalPending: number;
  paidInvoicesCount: number;
  pendingInvoicesCount: number;
  overdueInvoicesCount: number;
}
