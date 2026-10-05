import 'package:dio/dio.dart';
import '../../../core/api/api_client.dart';
import '../../../core/api/api_constants.dart';
import '../../authentication/model/login_request.dart';
import '../../authentication/model/login_response.dart';

class AuthService {

  Future<LoginResponse> login(LoginRequest request) async {

    Response response = await ApiClient.dio.post(
      ApiConstants.login,
      data: request.toJson(),
    );

    return LoginResponse.fromJson(response.data);

  }

}