import 'package:flutter/material.dart';
import 'package:school_erp_mobile/core/constants/app_colors.dart';

class ExamItem {
  final int id;
  final String title;
  final String subject;
  final String date;
  final String time;
  final String room;
  final int maxMarks;
  final int passingMarks;

  const ExamItem({
    required this.id,
    required this.title,
    required this.subject,
    required this.date,
    required this.time,
    required this.room,
    required this.maxMarks,
    required this.passingMarks,
  });
}

class ExamScreen extends StatefulWidget {
  const ExamScreen({super.key});

  @override
  State<ExamScreen> createState() => _ExamScreenState();
}

class _ExamScreenState extends State<ExamScreen> {
  final List<ExamItem> _exams = const [
    ExamItem(
      id: 1,
      title: 'Mid-Term Mathematics Assessment',
      subject: 'Mathematics',
      date: '18 Aug 2026',
      time: '09:30 AM - 12:30 PM',
      room: 'Hall A-1',
      maxMarks: 100,
      passingMarks: 35,
    ),
    ExamItem(
      id: 2,
      title: 'Physics & Thermodynamics Practical Test',
      subject: 'Physics',
      date: '20 Aug 2026',
      time: '10:00 AM - 11:30 AM',
      room: 'Science Lab 2',
      maxMarks: 50,
      passingMarks: 18,
    ),
    ExamItem(
      id: 3,
      title: 'Computer Science Viva & Practical',
      subject: 'Computer Science',
      date: '22 Aug 2026',
      time: '01:30 PM - 03:30 PM',
      room: 'Computer Lab 1',
      maxMarks: 70,
      passingMarks: 25,
    ),
  ];

  void _showReportCard() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Container(
          height: MediaQuery.of(context).size.height * 0.8,
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Center(
                child: Text(
                  "Greenwood International School",
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppColors.primary),
                ),
              ),
              const Center(
                child: Text(
                  "OFFICIAL REPORT CARD 2025-2026",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
                ),
              ),
              const Divider(height: 24),
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("Student: Aryan Sharma", style: TextStyle(fontWeight: FontWeight.bold)),
                  Text("Grade 8 - Section B", style: TextStyle(color: Colors.grey)),
                ],
              ),
              const SizedBox(height: 16),
              Table(
                border: TableBorder.all(color: Colors.grey, width: 0.5),
                children: const [
                  TableRow(
                    decoration: BoxDecoration(color: Color(0xFFF1F5F9)),
                    children: [
                      Padding(padding: EdgeInsets.all(8), child: Text("Subject", style: TextStyle(fontWeight: FontWeight.bold))),
                      Padding(padding: EdgeInsets.all(8), child: Text("Marks", style: TextStyle(fontWeight: FontWeight.bold))),
                      Padding(padding: EdgeInsets.all(8), child: Text("Grade", style: TextStyle(fontWeight: FontWeight.bold))),
                    ],
                  ),
                  TableRow(
                    children: [
                      Padding(padding: EdgeInsets.all(8), child: Text("Mathematics")),
                      Padding(padding: EdgeInsets.all(8), child: Text("98 / 100")),
                      Padding(padding: EdgeInsets.all(8), child: Text("A+")),
                    ],
                  ),
                  TableRow(
                    children: [
                      Padding(padding: EdgeInsets.all(8), child: Text("Physics")),
                      Padding(padding: EdgeInsets.all(8), child: Text("92 / 100")),
                      Padding(padding: EdgeInsets.all(8), child: Text("A+")),
                    ],
                  ),
                  TableRow(
                    children: [
                      Padding(padding: EdgeInsets.all(8), child: Text("Computer Science")),
                      Padding(padding: EdgeInsets.all(8), child: Text("95 / 100")),
                      Padding(padding: EdgeInsets.all(8), child: Text("A+")),
                    ],
                  ),
                  TableRow(
                    children: [
                      Padding(padding: EdgeInsets.all(8), child: Text("English")),
                      Padding(padding: EdgeInsets.all(8), child: Text("89 / 100")),
                      Padding(padding: EdgeInsets.all(8), child: Text("A")),
                    ],
                  ),
                ],
              ),
              const Spacer(),
              SizedBox(
                width: double.infinity,
                height: 48,
                child: ElevatedButton.icon(
                  onPressed: () {
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text("Downloading PDF Report Card...")),
                    );
                  },
                  icon: const Icon(Icons.download, color: Colors.white),
                  label: const Text("Download PDF Report Card", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text("Exams & Report Cards"),
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.assessment),
            tooltip: "View Report Card",
            onPressed: _showReportCard,
          ),
        ],
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: _exams.length,
        itemBuilder: (context, index) {
          final item = _exams[index];
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
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.primary.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          item.subject,
                          style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 11),
                        ),
                      ),
                      Text("Hall: ${item.room}", style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey)),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(item.title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      const Icon(Icons.calendar_today, size: 14, color: Colors.grey),
                      const SizedBox(width: 4),
                      Text("Date: ${item.date}", style: const TextStyle(fontSize: 12, color: Colors.grey)),
                      const SizedBox(width: 16),
                      const Icon(Icons.access_time, size: 14, color: Colors.grey),
                      const SizedBox(width: 4),
                      Text(item.time, style: const TextStyle(fontSize: 12, color: Colors.grey)),
                    ],
                  ),
                  const Divider(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text("Max Marks: ${item.maxMarks}", style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                      Text("Pass Cutoff: ${item.passingMarks}", style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.green)),
                    ],
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
