import 'dart:io';
import 'dart:typed_data';
import 'package:path_provider/path_provider.dart';

class FileManager {
  /// Gets the app's documents directory
  static Future<Directory> getAppDocumentsDirectory() async {
    final directory = await getApplicationDocumentsDirectory();
    return directory;
  }

  /// Gets the project directory in Documents
  static Future<Directory> getProjectDirectory() async {
    final documentsDir = await getApplicationDocumentsDirectory();
    final projectDir = Directory(
      documentsDir.path,
    );

    // Create project directory if it doesn't exist
    if (!await projectDir.exists()) {
      await projectDir.create(recursive: true);
    }

    return projectDir;
  }

  /// Gets the app's cache directory
  static Future<Directory> getAppCacheDirectory() async {
    final directory = await getTemporaryDirectory();
    return directory;
  }

  /// Creates a directory if it doesn't exist
  static Future<Directory> createDirectoryIfNotExists(String path) async {
    final directory = Directory(path);
    if (!await directory.exists()) {
      await directory.create(recursive: true);
    }
    return directory;
  }

  /// Saves data to a file
  static Future<File> saveFile(Uint8List data, String filePath) async {
    final file = File(filePath);

    // Create directory if it doesn't exist
    await createDirectoryIfNotExists(file.parent.path);

    // Write data to file
    await file.writeAsBytes(data);

    return file;
  }
}
