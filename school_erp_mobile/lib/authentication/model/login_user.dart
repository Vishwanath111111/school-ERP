class LoginUser {
  final int id;
  final String email;

  LoginUser({
    required this.id,
    required this.email,
  });

  factory LoginUser.fromJson(Map<String, dynamic> json) {
    return LoginUser(
      id: json['id'],
      email: json['email'],
    );
  }
}