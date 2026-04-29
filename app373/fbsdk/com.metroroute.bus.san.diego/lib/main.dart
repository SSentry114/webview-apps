import 'package:code_learning/user/app_updater.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:upgrader/upgrader.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'user/config.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      debugShowCheckedModeBanner: false,
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
  late WebViewController _webViewController;
  late AppUpdater _appUpdater;
  // Method channel for communicating with native iOS
  static const MethodChannel _channel = MethodChannel('bundle_id_channel');

  @override
  void initState() {
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      _appUpdater = AppUpdater(upgrader: Upgrader(), channel: _channel);
      WidgetsBinding.instance.addPostFrameCallback((_) async {
        await _appUpdater.initializeAndCheck();
      });
    });
    _initWebView();
    super.initState();
  }

  void _initWebView() {
    _webViewController = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (String url) {
            setState(() {
              _isWebViewLoaded = false;
            });
          },
          onPageFinished: (String url) {
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
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Stack(
          children: [
            WebViewWidget(controller: _webViewController),
            if (!_isWebViewLoaded)
              Center(
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    
                    const CircularProgressIndicator(
                      color: Colors.blueAccent,
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
