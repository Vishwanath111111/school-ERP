import 'package:flutter/material.dart';
import 'package:school_erp_mobile/features/profile/presentation/screens/profile_screen.dart';
import '../../../../core/constants/app_colors.dart';
import 'dashboard_screen.dart';

class BottomNavigation extends StatefulWidget {
  const BottomNavigation({super.key});

  @override
  State<BottomNavigation> createState() => _BottomNavigationState();
}

class _BottomNavigationState extends State<BottomNavigation> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const DashboardScreen(), // Home
    const Center(
      child: Text(
        "Alerts Screen\nComing Soon...",
        style: TextStyle(fontSize: 20),
      ),
    ),
    const ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() => _currentIndex = index);
        },
        selectedItemColor: AppColors.primary,
        unselectedItemColor: Colors.grey,
        showUnselectedLabels: true,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_rounded, size: 30),
            label: "Home",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.notifications_rounded,size: 30),
            label: "Alerts",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_rounded, size: 30),
            label: "Profile",
          ),
        ],
      ),
    );
  }
}