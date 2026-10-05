import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import '../../../../core/constants/app_colors.dart';

class AttendanceScreen extends StatefulWidget {
  const AttendanceScreen({super.key});

  @override
  State<AttendanceScreen> createState() => _AttendanceScreenState();
}

class _AttendanceScreenState extends State<AttendanceScreen> {
  CalendarFormat _calendarFormat = CalendarFormat.month;
  DateTime _focusedDay = DateTime(2026, 6, 1);
  DateTime? _selectedDay;

  bool isSameDay(DateTime? a, DateTime? b) {
    if (a == null || b == null) return false;
    return a.year == b.year && a.month == b.month && a.day == b.day;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // Blue Header
          Container(
            padding: const EdgeInsets.fromLTRB(20, 50, 20, 25),
            decoration: const BoxDecoration(
              color: AppColors.primary,
              borderRadius: BorderRadius.only(
                bottomLeft: Radius.circular(30),
                bottomRight: Radius.circular(30),
              ),
            ),
            child: Column(
              children: [
                const Text("Attendance", style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Colors.white),
                  textAlign: TextAlign.left,
                ),
                const SizedBox(height: 24),
                _buildCircularProgress(),
                const SizedBox(height: 24),
                _buildStatsRow(),
              ],
            ),
          ),

          // Interactive Calendar
          Padding(
            padding: const EdgeInsets.all(16),
            child: TableCalendar(
              firstDay: DateTime(2025, 1, 1),
              lastDay: DateTime(2027, 12, 31),
              focusedDay: _focusedDay,
              calendarFormat: _calendarFormat,
              selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
              onDaySelected: (selectedDay, focusedDay) {
                setState(() {
                  _selectedDay = selectedDay;
                  _focusedDay = focusedDay;
                });
              },
              onFormatChanged: (format) {
                setState(() => _calendarFormat = format);
              },
              onPageChanged: (focusedDay) {
                _focusedDay = focusedDay;
              },
              headerStyle: const HeaderStyle(
                formatButtonVisible: false,
                titleCentered: true,
                titleTextStyle: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              calendarStyle: CalendarStyle(
                todayDecoration: BoxDecoration(
                  color: Colors.blue.withValues(alpha: 0.3),
                  shape: BoxShape.circle,
                ),
                selectedDecoration: const BoxDecoration(
                  color: AppColors.primary,
                  shape: BoxShape.circle,
                ),
                defaultDecoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.grey.shade100,
                ),
              ),
            ),
          ),

          // Daily Record
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: Align(
              alignment: Alignment.centerLeft,
              child: Text("DAILY RECORD", style: TextStyle(fontWeight: FontWeight.bold)),
            ),
          ),

          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              children: const [
                _AttendanceRecord(date: "Sat, 27 Jun", status: "Present"),
                _AttendanceRecord(date: "Fri, 26 Jun", status: "Present"),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCircularProgress() {
    return Stack(
      alignment: Alignment.center,
      children: [
        SizedBox(
          width: 150,
          height: 150,
          child: CircularProgressIndicator(
            value: 0.92,
            strokeWidth: 13,
            backgroundColor: Colors.white24,
            valueColor: const AlwaysStoppedAnimation(Colors.white),
          ),
        ),
        Column(
          children: const [
            Text("0%", style: TextStyle(fontSize: 38, fontWeight: FontWeight.bold, color: Colors.black)),
            Text("Overall", style: TextStyle(fontSize: 25,fontWeight: FontWeight.bold, color: Colors.black38)),
          ],
        ),
      ],
    );
  }

  Widget _buildStatsRow() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        _buildStat("0", "Present", Colors.greenAccent),
        _buildStat("0", "Absent", Colors.red),
        _buildStat("0", "Late", Colors.orange),
        _buildStat("0", "Total Days", Colors.white),
      ],
    );
  }

  Widget _buildStat(String count, String label, Color color) {
    return Column(
      children: [
        Text(count, style: TextStyle(fontSize: 20, color: color)),
        Text(label, style: const TextStyle(fontSize: 20,fontWeight: FontWeight.bold, color: Colors.white)),
      ],
    );
  }
}

class _AttendanceRecord extends StatelessWidget {
  final String date;
  final String status;

  const _AttendanceRecord({required this.date, required this.status});

  @override
  Widget build(BuildContext context) {
    final isPresent = status == "Present";
    return Card(
      margin: const EdgeInsets.only(bottom: 10),
      child: ListTile(
        leading: Icon(isPresent ? Icons.check_circle : Icons.cancel, color: isPresent ? Colors.green : Colors.red),
        title: Text(date),
        subtitle: const Text("All Subjects"),
        trailing: Text(status, style: TextStyle(color: isPresent ? Colors.green : Colors.red, fontWeight: FontWeight.w600)),
      ),
    );
  }
}