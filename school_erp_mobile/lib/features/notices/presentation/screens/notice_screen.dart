import 'package:flutter/material.dart';
import 'package:school_erp_mobile/core/constants/app_colors.dart';

class NoticeItem {
  final int id;
  final String title;
  final String content;
  final String category;
  final String audience;
  final String publishDate;
  final bool isUrgent;

  const NoticeItem({
    required this.id,
    required this.title,
    required this.content,
    required this.category,
    required this.audience,
    required this.publishDate,
    required this.isUrgent,
  });
}

class NoticeScreen extends StatefulWidget {
  const NoticeScreen({super.key});

  @override
  State<NoticeScreen> createState() => _NoticeScreenState();
}

class _NoticeScreenState extends State<NoticeScreen> {
  final List<NoticeItem> _notices = const [
    NoticeItem(
      id: 1,
      title: 'Mid-Term Examination Schedule & Guidelines 2026',
      content: 'The Mid-Term Examinations for Classes 6 to 12 will commence on August 18, 2026. Hall tickets will be issued by class teachers. All students are advised to check the detailed timetable on the student portal.',
      category: 'EXAM',
      audience: 'ALL',
      publishDate: '05 Aug 2026',
      isUrgent: true,
    ),
    NoticeItem(
      id: 2,
      title: 'Parent-Teacher Meeting (Classes 9 to 12)',
      content: 'A Parent-Teacher Conference is scheduled for August 29, 2026, from 10:00 AM to 02:00 PM in the School Auditorium. Progress reports for Term 1 will be discussed.',
      category: 'EVENT',
      audience: 'PARENTS',
      publishDate: '07 Aug 2026',
      isUrgent: false,
    ),
    NoticeItem(
      id: 3,
      title: 'Independence Day Flag Hoisting Ceremony',
      content: 'WRIO School will celebrate the 79th Independence Day on August 15, 2026. Flag hoisting ceremony begins promptly at 08:00 AM. Attendance is mandatory for staff and student council members.',
      category: 'EVENT',
      audience: 'ALL',
      publishDate: '08 Aug 2026',
      isUrgent: false,
    ),
  ];

  void _showNoticeDetails(NoticeItem item) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
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
                      item.category,
                      style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 11),
                    ),
                  ),
                  Text(item.publishDate, style: const TextStyle(color: Colors.grey, fontSize: 12)),
                ],
              ),
              const SizedBox(height: 12),
              Text(item.title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              const Divider(height: 24),
              Text(item.content, style: const TextStyle(fontSize: 14, height: 1.4)),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                height: 48,
                child: ElevatedButton(
                  onPressed: () => Navigator.pop(context),
                  style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary),
                  child: const Text("Close Notice", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
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
        title: const Text("Noticeboard & Circulars"),
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: _notices.length,
        itemBuilder: (context, index) {
          final item = _notices[index];
          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
              side: item.isUrgent ? const BorderSide(color: Colors.red, width: 1.5) : BorderSide.none,
            ),
            child: InkWell(
              borderRadius: BorderRadius.circular(16),
              onTap: () => _showNoticeDetails(item),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: AppColors.primary.withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: Text(
                                item.category,
                                style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold, fontSize: 11),
                              ),
                            ),
                            if (item.isUrgent) ...[
                              const SizedBox(width: 8),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(
                                  color: Colors.red.shade50,
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: const Text(
                                  "URGENT",
                                  style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold, fontSize: 10),
                                ),
                              ),
                            ],
                          ],
                        ),
                        Text(item.publishDate, style: const TextStyle(fontSize: 12, color: Colors.grey)),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Text(item.title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 6),
                    Text(
                      item.content,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(fontSize: 13, color: Colors.grey),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
