import 'package:flutter/material.dart';
import 'package:school_erp_mobile/core/constants/app_colors.dart';

class FeeInvoiceItem {
  final int id;
  final String title;
  final String dueDate;
  final double amount;
  final double paidAmount;
  final String status; // PAID, PENDING, OVERDUE

  const FeeInvoiceItem({
    required this.id,
    required this.title,
    required this.dueDate,
    required this.amount,
    required this.paidAmount,
    required this.status,
  });
}

class FeeScreen extends StatefulWidget {
  const FeeScreen({super.key});

  @override
  State<FeeScreen> createState() => _FeeScreenState();
}

class _FeeScreenState extends State<FeeScreen> {
  final List<FeeInvoiceItem> _invoices = const [
    FeeInvoiceItem(
      id: 101,
      title: 'Term 1 Tuition & Academic Fee',
      dueDate: '15 Jul 2026',
      amount: 25000.0,
      paidAmount: 25000.0,
      status: 'PAID',
    ),
    FeeInvoiceItem(
      id: 102,
      title: 'Term 2 Tuition & Activity Fee',
      dueDate: '15 Nov 2026',
      amount: 25000.0,
      paidAmount: 0.0,
      status: 'PENDING',
    ),
    FeeInvoiceItem(
      id: 103,
      title: 'Annual Transport & Bus Charge',
      dueDate: '30 Jun 2026',
      amount: 8000.0,
      paidAmount: 4000.0,
      status: 'OVERDUE',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    double totalDues = _invoices.where((inv) => inv.status != 'PAID').fold(0.0, (sum, inv) => sum + (inv.amount - inv.paidAmount));

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text("Fees & Billing"),
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Outstanding Dues Overview Header
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF1E88E5), Color(0xFF1565C0)],
                ),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "TOTAL OUTSTANDING DUES",
                    style: TextStyle(color: Colors.white70, fontSize: 12, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    "₹${totalDues.toStringAsFixed(0)}",
                    style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w800),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      ElevatedButton.icon(
                        onPressed: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text("Redirecting to Secure Payment Gateway...")),
                          );
                        },
                        icon: const Icon(Icons.payment, size: 18, color: AppColors.primary),
                        label: const Text("Pay Dues Now", style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold)),
                        style: ElevatedButton.styleFrom(backgroundColor: Colors.white, elevation: 0),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            const Text(
              "FEE INVOICE STATEMENT",
              style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey),
            ),

            const SizedBox(height: 12),

            ..._invoices.map((inv) => _buildInvoiceCard(inv)),
          ],
        ),
      ),
    );
  }

  Widget _buildInvoiceCard(FeeInvoiceItem item) {
    final isPaid = item.status == 'PAID';
    final isOverdue = item.status == 'OVERDUE';

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    item.title,
                    style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: isPaid
                        ? Colors.green.shade50
                        : isOverdue
                            ? Colors.red.shade50
                            : Colors.orange.shade50,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    item.status,
                    style: TextStyle(
                      color: isPaid
                          ? Colors.green
                          : isOverdue
                              ? Colors.red
                              : Colors.orange.shade800,
                      fontWeight: FontWeight.bold,
                      fontSize: 11,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Total: ₹${item.amount.toStringAsFixed(0)}", style: const TextStyle(color: Colors.grey, fontSize: 13)),
                Text("Paid: ₹${item.paidAmount.toStringAsFixed(0)}", style: const TextStyle(color: Colors.grey, fontSize: 13)),
              ],
            ),
            const Divider(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Due Date: ${item.dueDate}", style: const TextStyle(fontSize: 12, color: Colors.grey)),
                Text(
                  "Balance: ₹${(item.amount - item.paidAmount).toStringAsFixed(0)}",
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.bold,
                    color: isPaid ? Colors.green : Colors.red,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
