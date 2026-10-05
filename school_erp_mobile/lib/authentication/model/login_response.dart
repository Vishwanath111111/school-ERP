import 'login_user.dart';

class LoginResponse {
  final bool success;
  final String message;
  final LoginUser? data;

  LoginResponse({
    required this.success,
    required this.message,
    this.data,
  });

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
      success: json['success'],
      message: json['message'],
      data: json['data'] != null
          ? LoginUser.fromJson(json['data'])
          : null,
    );
  }
}