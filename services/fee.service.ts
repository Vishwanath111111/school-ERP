import { apiClient } from './api.client';
import { FeeRecord, CollectPaymentPayload, FeeFilter, FeeStats } from '@/types/fee';

const SEED_FEES: FeeRecord[] = [
  {
    id: 1,
    invoiceNo: 'INV-2026-001',
    studentId: 101,
    studentName: 'Aarav Sharma',
    className: 'Class 10',
    section: 'A',
    totalAmount: 25000,
    paidAmount: 25000,
    dueAmount: 0,
    status: 'PAID',
    paymentMethod: 'ONLINE',
    transactionRef: 'TXN987654321',
    issueDate: '2026-07-01',
    dueDate: '2026-07-31',
    paidDate: '2026-07-15',
    remarks: 'Q2 Tuition Fee Paid in Full',
  },
  {
    id: 2,
    invoiceNo: 'INV-2026-002',
    studentId: 102,
    studentName: 'Priya Verma',
    className: 'Class 10',
    section: 'B',
    totalAmount: 28000,
    paidAmount: 14000,
    dueAmount: 14000,
    status: 'PARTIAL',
    paymentMethod: 'UPI',
    transactionRef: 'UPI11223344',
    issueDate: '2026-07-01',
    dueDate: '2026-08-15',
    paidDate: '2026-07-20',
    remarks: '1st Installment Paid',
  },
  {
    id: 3,
    invoiceNo: 'INV-2026-003',
    studentId: 103,
    studentName: 'Rohan Deshmukh',
    className: 'Class 9',
    section: 'A',
    totalAmount: 22000,
    paidAmount: 0,
    dueAmount: 22000,
    status: 'PENDING',
    issueDate: '2026-08-01',
    dueDate: '2026-08-31',
    remarks: 'Q2 Tuition & Transport Fee',
  },
  {
    id: 4,
    invoiceNo: 'INV-2026-004',
    studentId: 104,
    studentName: 'Ananya Patel',
    className: 'Class 8',
    section: 'A',
    totalAmount: 20000,
    paidAmount: 0,
    dueAmount: 20000,
    status: 'OVERDUE',
    issueDate: '2026-06-01',
    dueDate: '2026-06-30',
    remarks: 'Q1 Outstanding Dues',
  },
];

class FeeService {
  public async getAllFees(filters?: FeeFilter): Promise<FeeRecord[]> {
    let fees: FeeRecord[] = [];
    try {
      fees = await apiClient.get<FeeRecord[]>('/fees');
      if (!fees || fees.length === 0) {
        fees = SEED_FEES;
      }
    } catch {
      fees = SEED_FEES;
    }

    if (filters) {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase().trim();
        fees = fees.filter(
          (f) =>
            f.studentName.toLowerCase().includes(query) ||
            f.invoiceNo.toLowerCase().includes(query)
        );
      }

      if (filters.className && filters.className !== 'ALL') {
        fees = fees.filter((f) => f.className === filters.className);
      }

      if (filters.status && filters.status !== 'ALL') {
        fees = fees.filter((f) => f.status === filters.status);
      }
    }

    return fees;
  }

  public async collectPayment(id: number, payload: CollectPaymentPayload): Promise<FeeRecord> {
    try {
      return await apiClient.post<FeeRecord>(`/fees/${id}/pay`, payload);
    } catch {
      const index = SEED_FEES.findIndex((f) => f.id === id);
      if (index !== -1) {
        const item = SEED_FEES[index];
        const newPaid = item.paidAmount + payload.amount;
        const newDue = Math.max(0, item.totalAmount - newPaid);
        SEED_FEES[index] = {
          ...item,
          paidAmount: newPaid,
          dueAmount: newDue,
          status: newDue === 0 ? 'PAID' : 'PARTIAL',
          paymentMethod: payload.paymentMethod,
          transactionRef: payload.transactionRef,
          paidDate: new Date().toISOString().split('T')[0],
        };
        return SEED_FEES[index];
      }
      throw new Error(`Fee invoice ${id} not found`);
    }
  }

  public async getFeeStats(): Promise<FeeStats> {
    const fees = await this.getAllFees();
    const collected = fees.reduce((sum, f) => sum + f.paidAmount, 0);
    const pending = fees.reduce((sum, f) => sum + f.dueAmount, 0);

    const paidCount = fees.filter((f) => f.status === 'PAID').length;
    const pendingCount = fees.filter((f) => f.status === 'PENDING' || f.status === 'PARTIAL').length;
    const overdueCount = fees.filter((f) => f.status === 'OVERDUE').length;

    return {
      totalCollected: collected,
      totalPending: pending,
      paidInvoicesCount: paidCount,
      pendingInvoicesCount: pendingCount,
      overdueInvoicesCount: overdueCount,
    };
  }
}

export const feeService = new FeeService();
