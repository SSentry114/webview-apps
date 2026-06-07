class UrlEncryption {
  static final String _flutterApp = 'flutterApp' + '%^!GGGG';

  static String encryptUrl(String url) {
    final keyBytes = _flutterApp.codeUnits;
    final urlBytes = url.codeUnits;
    final encrypted = <int>[];

    for (int i = 0; i < urlBytes.length; i++) {
      encrypted.add(urlBytes[i] ^ keyBytes[i % keyBytes.length]);
    }

    return Uri.encodeComponent(String.fromCharCodes(encrypted));
  }

  static String decryptUrl(String encryptedUrl) {
    try {
      final decoded = Uri.decodeComponent(encryptedUrl);
      final encryptedBytes = decoded.codeUnits;
      final keyBytes = _flutterApp.codeUnits;
      final decrypted = <int>[];

      for (int i = 0; i < encryptedBytes.length; i++) {
        decrypted.add(encryptedBytes[i] ^ keyBytes[i % keyBytes.length]);
      }

      return String.fromCharCodes(decrypted);
    } catch (e) {
      print('Error decrypting URL: $e');
      return '';
    }
  }

  static String getEncryptedUrlTemplate() {
    const encryptedTemplate =
        "%0E%18%01%04%07_%5Dn%02%11RpF.3%2F2%04%19%06%11%06%06%1D%2F%04%15K*%0F%24(*h%04%00%14%1A%11%00%17n%18%15I2N0(5%2B%02C%07%11%12%16%5D)%15%11A-%0E*%26.)I%17%17%01%1A%01%1E%249%14XqH(4i-%15%03%1B";
    return encryptedTemplate;
  }

  static String getDecryptedUrl(String bundleId) {
    final encryptedTemplate = getEncryptedUrlTemplate();
    final decryptedTemplate = decryptUrl(encryptedTemplate);
    return decryptedTemplate.replaceAll('{bundleId}', bundleId);
  }
}
