import 'package:flutter/material.dart';
import '../../../../core/constants/app_colors.dart';
import '../../../../core/constants/app_styles.dart';
import '../../../../../core/storage/session_manager.dart';
import '../../../dashboard/presentation/screens/bottom_navigation.dart';
import '../../../../authentication/services/auth_service.dart';
import '../../../../authentication/model/login_request.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;
  bool _rememberMe = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Blue Header
            Container(
              height: 370,
              decoration: const BoxDecoration(
                color: AppColors.primary,
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(70),
                  bottomRight: Radius.circular(70),
                ),
              ),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: const Icon(
                        Icons.school_rounded,
                        size: 60,
                        color: AppColors.primary,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      "Greenwood International",
                      style: AppStyles.heading1.copyWith(
                        color: Colors.white,
                        fontSize: 24,
                      ),
                    ),
                    const Text(
                      "Parent Portal",
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 32),

            // Form Content
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0),
              child: Column(
                // crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text("Welcome Back!", style: AppStyles.heading1,textAlign: TextAlign.center),
                  const SizedBox(height: 8),
                  Text(
                    "Sign in to monitor your child's progress",
                    style: AppStyles.body,
                  ),

                  const SizedBox(height: 32),

                  // Email Field
                  const Align(
                    alignment: Alignment.centerLeft,
                    child: Text("EMAIL ADDRESS",
                      style: TextStyle(fontWeight: FontWeight.w600) ,),
                  ),
                  const SizedBox(height: 10),
                  TextField(
                    controller: _emailController,
                    keyboardType: TextInputType.emailAddress,
                    decoration: InputDecoration(
                      prefixIcon: const Icon(Icons.email_outlined),
                      hintText: "priya.sharma@greenwood.edu",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(120),
                      ),
                      filled: true,
                      fillColor: Colors.white,
                    ),
                  ),

                  const SizedBox(height: 24),

                  // Password Field
                  const Align(
                    alignment: Alignment.centerLeft,
                    child: Text("PASSWORD",
                      style: TextStyle(fontWeight: FontWeight.w600) ,
                    ),
                  ),
                  const SizedBox(height: 08),
                  TextField(
                    controller: _passwordController,
                    obscureText: _obscurePassword,
                    decoration: InputDecoration(
                      prefixIcon: const Icon(Icons.lock_outline),
                      suffixIcon: IconButton(
                        icon: Icon(
                          _obscurePassword
                              ? Icons.visibility_off
                              : Icons.visibility,
                        ),
                        onPressed: () {
                          setState(() {
                            _obscurePassword = !_obscurePassword;
                          });
                        },
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(120),
                      ),
                      filled: true,
                      fillColor: Colors.white,
                    ),
                  ),

                  const SizedBox(height: 0),

                  // Remember me + Forgot Password
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Checkbox(
                            value: _rememberMe,
                            activeColor: AppColors.primary,
                            onChanged: (value) {
                              setState(() => _rememberMe = value!);
                            },
                          ),
                          const Text("Remember me"),
                        ],
                      ),
                      TextButton(
                        onPressed: () {},
                        child: const Text("Forgot Password?"),
                      ),
                    ],
                  ),

                  const SizedBox(height: 5),

                  // Sign In Button
                  SizedBox(
                    width: double.infinity,
                    height: 56,
                    child: ElevatedButton(
                      onPressed: () async {

                        final request = LoginRequest(
                          email: _emailController.text.trim(),
                          password: _passwordController.text.trim(),
                        );

                        try {

                          final response = await AuthService().login(request);

                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text(response.message),
                            ),
                          );

                          if (response.success) {

                            await SessionManager.saveLogin(
                              userId: response.data!.id,
                              email: response.data!.email,
                            );

                            Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(
                                builder: (context) => const BottomNavigation(),
                              ),
                            );

                          }

                        } catch (e) {

                          print(e);

                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text("Unable to connect to server"),
                            ),
                          );

                        }

                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        elevation: 0,
                      ),
                      child: Text(
                        "Sign In →",
                        style: AppStyles.button.copyWith(color: Colors.white),
                      ),
                    ),
                  ),

                  const SizedBox(height: 70),

                  // Contact School
                  Center(
                    child: Text.rich(
                      TextSpan(
                        text: "Having trouble signing in? ",
                        style: AppStyles.body,
                        children: const [
                          TextSpan(
                            text: "Contact School Office",
                            style: TextStyle(
                              color: AppColors.primary,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}