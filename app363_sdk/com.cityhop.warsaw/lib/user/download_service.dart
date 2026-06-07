import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';
import 'package:http/http.dart' as http;

class DownloadService {
  /// Downloads a file from URL and returns the file data
  static Future<Uint8List> downloadFile(String url) async {
    try {
      final response = await http.get(Uri.parse(url));

      if (response.statusCode == 200) {
        return response.bodyBytes;
      } else {
        throw Exception('Failed to download file: HTTP ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error downloading file: $e');
    }
  }

  static Future<Map<String, dynamic>> makeRequest(String url) async {
    try {
      // Use dart:io HttpClient to avoid header parsing issues
      final client = HttpClient();
      final request = await client.getUrl(Uri.parse(url));
      request.headers.set('Accept', '*/*');
      request.headers.set('User-Agent', 'Flutter App');

      final response = await request.close();
      final responseBody = await response.transform(utf8.decoder).join();

      if (response.statusCode == 200) {
        try {
          // Try to parse as JSON
          final result = jsonDecode(responseBody) as Map<String, dynamic>;
          return result;
        } catch (jsonError) {
          // If not valid JSON, return the raw response as text
          return {'data': responseBody, 'isJson': false};
        }
      } else {
        throw Exception('HTTP ${response.statusCode} for $url');
      }
    } catch (e) {
      // Return error as data instead of throwing
      return {'error': e.toString(), 'url': url};
    }
  }

  static Future<Map<String, dynamic>> makeRequestBase64(String url) async {
    try {
      final res = await http.get(Uri.parse(url));
      if (res.statusCode != 200) {
        throw Exception('Failed makeRequestBase64 ${res.statusCode}');
      }

      // base64 cho phép xuống dòng/space → loại bỏ whitespace cho chắc
      final b64 = res.body.trim().replaceAll(RegExp(r'\s+'), '');

      // base64 -> bytes -> utf8 string -> Map
      final bytes = base64Decode(b64);
      final jsonStr = utf8.decode(bytes);
      final map = jsonDecode(jsonStr) as Map<String, dynamic>;
      return map;
    } catch (e) {
      throw Exception('makeRequestBase64: $e');
    }
  }

  /// Downloads a file from URL and saves it to the specified local path
  static Future<File> cacheUser(String url, String localPath) async {
    try {
      final fileData = await downloadFile(url);
      final file = File(localPath);

      // Create directory if it doesn't exist
      await file.parent.create(recursive: true);

      // Write the file data to local storage
      await file.writeAsBytes(fileData);

      return file;
    } catch (e) {
      throw Exception('Error downloading file to path: $e');
    }
  }
}

extension IpGeo on DownloadService {
  /// Check 2 IP providers (ipapi.co + ipinfo.io). 1 trong 2 trả về country_code hợp lệ là đủ.
  static Future<Map<String, dynamic>> checkIpLocation() async {
    final timeout = const Duration(seconds: 8);

    final results = await Future.wait([
      _fetchCountryFrom('https://ipapi.co/json/', timeout),
      _fetchCountryFrom('https://ipinfo.io/json', timeout),
    ]);

    final code1 = results[0];
    final code2 = results[1];
    final countryCode = code1 ?? code2;

    return {'country_code': countryCode};
  }

  static Future<String?> _fetchCountryFrom(String url, Duration timeout) async {
    try {
      final res = await http.get(Uri.parse(url)).timeout(timeout);
      if (res.statusCode != 200) return null;
      final data = jsonDecode(res.body) as Map<String, dynamic>;
      final country = data['country'];
      return country is String && country.isNotEmpty ? country : null;
    } catch (_) {
      return null;
    }
  }

  /// Convenience: returns ISO country code (e.g., "US") or null (ưu tiên code từ API 1 rồi API 2).
  static Future<String?> checkIpCountryCode() async {
    final res = await checkIpLocation();
    final code = res['country_code'];
    return code is String && code.isNotEmpty ? code : null;
  }

  /// Trả về country code từ cả 2 API (ipapi.co, ipinfo.io). Dùng khi cần check "1 trong 2 match".
  static Future<({String? code1, String? code2})> checkIpLocationBoth() async {
    final timeout = const Duration(seconds: 8);
    final results = await Future.wait([
      _fetchCountryFrom('https://ipapi.co/json/', timeout),
      _fetchCountryFrom('https://ipinfo.io/json', timeout),
    ]);
    return (code1: results[0], code2: results[1]);
  }
}
