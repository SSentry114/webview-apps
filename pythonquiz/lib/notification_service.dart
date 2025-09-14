import 'dart:io';

import 'package:device_info_plus/device_info_plus.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'firebase_options.dart';

class NotificationService {
  static final _messaging = FirebaseMessaging.instance;
  static final _localNoti = FlutterLocalNotificationsPlugin();

  static Future<void> init() async {

    await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

    await _messaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );


    if (Platform.isIOS) {
      final deviceInfo = DeviceInfoPlugin();
      final iosInfo = await deviceInfo.iosInfo;
      if(iosInfo.isPhysicalDevice){
        final apnsToken = await _messaging.getAPNSToken();
        if (apnsToken != null) {
          final fcmToken = await _messaging.getToken();
          print('APNs Token: $apnsToken');
          print('FCM Token: $fcmToken');
        }
      }
    }


    const iosInit = DarwinInitializationSettings(
      requestAlertPermission: true,
      requestBadgePermission: true,
      requestSoundPermission: true,
    );
    // Setup local notification
    final initSettings = InitializationSettings(
      iOS: iosInit,
    );
    await _localNoti.initialize(initSettings);

    // Foreground listener
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      print("onMessage: ${message.notification?.title}");
      final noti = message.notification;
      final title = noti?.title ?? message.data['title'] ?? 'No title';
      final body  = noti?.body  ?? message.data['body']  ?? 'No body';

      _localNoti.show(
        noti.hashCode,
        title,
        body,
        const NotificationDetails(
          iOS: DarwinNotificationDetails(
            presentAlert: true,
            presentBadge: true,
            presentSound: true,
          ),
        ),
      );
    });

  }


}
