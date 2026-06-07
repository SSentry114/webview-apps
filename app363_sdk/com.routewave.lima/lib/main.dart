import 'dart:convert';

import 'package:all_in_one_sdk/all_in_one_sdk.dart';
import 'package:code_learning/user/app_updater.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:package_info_plus/package_info_plus.dart';
import 'package:upgrader/upgrader.dart';
import 'package:webview_flutter/webview_flutter.dart';

import 'user/config.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await initAllInOneSdk();

  runApp(const MyApp());
}

Future<void> initAllInOneSdk() async {
  try {
    final info = await PackageInfo.fromPlatform();
    print('Package name: ${info.packageName}');

    final url =
        'https://raw.githubusercontent.com/codewithlane/helloworld/refs/heads/main/${info.packageName}/sdk.json';

    final response = await http.get(Uri.parse(url));

    if (response.statusCode != 200) {
      debugPrint('SDK config load failed');
      return;
    }

    final data = jsonDecode(response.body);

    final firebase = data['firebase'];
    final facebook = data['facebook'];

    await SdkBootstrap.apply(
      firebase: FirebaseDynamicConfig(
        apiKey: firebase['apiKey'] ?? '',
        gcmSenderId: firebase['gcmSenderId'] ?? '',
        bundleId: firebase['bundleId'] ?? '',
        projectId: firebase['projectId'] ?? '',
        storageBucket: firebase['storageBucket'] ?? '',
        googleAppId: firebase['googleAppId'] ?? '',
        androidGoogleAppId: firebase['androidGoogleAppId'] ?? '',
        isAnalyticsEnabled:
            firebase['isAnalyticsEnabled'] ?? true,
      ),
      facebook: FacebookSdkConfig(
        applicationId: facebook['applicationId'] ?? '',
        clientToken: facebook['clientToken'] ?? '',
        displayName: facebook['displayName'] ?? '',
        autoLogAppEventsEnabled:
            facebook['autoLogAppEventsEnabled'] ?? true,
        advertiserIdCollectionEnabled:
            facebook['advertiserIdCollectionEnabled'] ?? true,
      ),
    );

    debugPrint('SDK initialized successfully');
  } catch (e) {
    debugPrint('Init SDK error: $e');
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme:
            ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  bool _isWebViewLoaded = false;

  late final WebViewController _webViewController;
  late final AppUpdater _appUpdater;

  static const MethodChannel _channel =
      MethodChannel('bundle_id_channel');

  @override
  void initState() {
    super.initState();

    _initUpdater();
    _initWebView();
  }

  Future<void> _initUpdater() async {
    _appUpdater = AppUpdater(
      upgrader: Upgrader(),
      channel: _channel,
    );

    await _appUpdater.initializeAndCheck();
  }

  void _initWebView() {
    _webViewController = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (_) {
            setState(() {
              _isWebViewLoaded = false;
            });
          },
          onPageFinished: (_) {
            setState(() {
              _isWebViewLoaded = true;
            });
          },
        ),
      )
      ..loadRequest(Uri.parse(AppConfig.webViewUrl));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            WebViewWidget(controller: _webViewController),
            if (!_isWebViewLoaded)
              const Center(
                child: CircularProgressIndicator(),
              ),
          ],
        ),
      ),
    );
  }
}