import 'package:flutter/material.dart';
import 'dart:async';
import '../../../../../core/storage/session_manager.dart';
import '../../../dashboard/presentation/screens/bottom_navigation.dart';
import 'login_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
      super.initState();
      _checkLogin();
    }


    Future<void> _checkLogin() async {

      // Show splash screen for 3 seconds
      await Future.delayed(const Duration(seconds: 3));

      final isLoggedIn =
      await SessionManager.isLoggedIn();

      if (!mounted) return;

      if (isLoggedIn) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => const BottomNavigation(),
          ),
        );
      } else {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => const LoginScreen(),
          ),
        );
      }
    }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF1E88E5),
              Color(0xFF1565C0),
            ],
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Logo Container
            Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(20),
              ),
              child: const Icon(
                Icons.school_rounded,
                size: 60,
                color: Colors.white,
              ),
            ),

            const SizedBox(height: 24),

            // School Name
            const Text(
              "Greenwood International",
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.white,
                letterSpacing: 1,
              ),
              textAlign: TextAlign.center,
            ),

            const Text(
              "School",
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.white,
                letterSpacing: 1,
              ),
            ),

            const SizedBox(height: 8),

            const Text(
              "Parent Connect",
              style: TextStyle(
                fontSize: 18,
                color: Colors.white70,
                letterSpacing: 2,
              ),
            ),

            const SizedBox(height: 80),

            // Version
            const Text(
              "V 2.4.1",
              style: TextStyle(
                color: Colors.white54,
                fontSize: 14,
              ),
            ),

            const SizedBox(height: 40),

            // Loading dots (optional)
            const Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                DotWidget(),
                DotWidget(delay: 300),
                DotWidget(delay: 600),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// Small dot animation widget
class DotWidget extends StatefulWidget {
  final int delay;
  const DotWidget({super.key, this.delay = 0});

  @override
  State<DotWidget> createState() => _DotWidgetState();
}

class _DotWidgetState extends State<DotWidget> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    )..repeat();
    Future.delayed(Duration(milliseconds: widget.delay), () {
      if (mounted) _controller.repeat();
    });
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Container(
          margin: const EdgeInsets.symmetric(horizontal: 4),
          width: 8,
          height: 8,
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.5 + 0.5 * _controller.value),
            shape: BoxShape.circle,
          ),
        );
      },
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}