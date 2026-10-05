import 'local_storage.dart';
import 'preference_keys.dart';

class SessionManager {
  SessionManager._();

  /// Save Login Session
  static Future<void> saveLogin({
    required int userId,
    required String email,
  }) async {
    await LocalStorage.setBool(
      PreferenceKeys.isLoggedIn,
      true,
    );

    await LocalStorage.setInt(
      PreferenceKeys.userId,
      userId,
    );

    await LocalStorage.setString(
      PreferenceKeys.email,
      email,
    );
  }

  /// Check Login Status
  static Future<bool> isLoggedIn() async {
    return await LocalStorage.getBool(
      PreferenceKeys.isLoggedIn,
    ) ??
        false;
  }

  /// Get User ID
  static Future<int?> getUserId() async {
    return await LocalStorage.getInt(
      PreferenceKeys.userId,
    );
  }

  /// Get Email
  static Future<String?> getEmail() async {
    return await LocalStorage.getString(
      PreferenceKeys.email,
    );
  }

  /// Logout
  static Future<void> logout() async {
    await LocalStorage.remove(
      PreferenceKeys.isLoggedIn,
    );

    await LocalStorage.remove(
      PreferenceKeys.userId,
    );

    await LocalStorage.remove(
      PreferenceKeys.email,
    );

    // Future JWT Support
    await LocalStorage.remove(
      PreferenceKeys.accessToken,
    );

    await LocalStorage.remove(
      PreferenceKeys.refreshToken,
    );
  }
}