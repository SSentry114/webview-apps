#!/bin/bash

echo "=== Auto Install Flutter Package From Git (V4 - Input From Keyboard) ==="

# --- NHẬP LINK TỪ BÀN PHÍM ---
read -p "Nhập Git repository URL: " GIT_URL

if [ -z "$GIT_URL" ]; then
  echo "❌ Bạn chưa nhập link git!"
  exit 1
fi

PACKAGE_NAME="user_screen"
PACKAGE_DIR="package"
ROOT_IOS_DIR="ios/Runner"

echo "➡️  Xoá sạch thư mục $PACKAGE_DIR ..."
rm -rf "$PACKAGE_DIR"
mkdir -p "$PACKAGE_DIR"

# --- BƯỚC 1: CLONE ---
echo "➡️  Clone repo..."
cd "$PACKAGE_DIR"
git clone "$GIT_URL"

# Lấy tên folder gốc của repo
ORIGINAL_FOLDER=$(ls -d */ | head -n 1 | sed 's#/##')

echo "➡️  Rename $ORIGINAL_FOLDER → $PACKAGE_NAME"
mv "$ORIGINAL_FOLDER" "$PACKAGE_NAME"

cd ..

# # --- BƯỚC 2: Update pubspec.yaml ---
# echo "➡️  Update pubspec.yaml..."

# PUBSPEC="pubspec.yaml"

# # Xóa dependency cũ nếu có
# sed -i '' "/$PACKAGE_NAME:/d" "$PUBSPEC"

# # Thêm dependency mới
# sed -i '' "/dependencies:/a\\
#   $PACKAGE_NAME:\\
#     path: ./$PACKAGE_DIR/$PACKAGE_NAME
# " "$PUBSPEC"

# --- BƯỚC 3: flutter pub get ---
echo "➡️  Chạy flutter pub get..."
flutter pub get

# --- BƯỚC 4: Copy Info.plist ---
SOURCE_PLIST="$PACKAGE_DIR/$PACKAGE_NAME/example/ios/Runner/Info.plist"
TARGET_PLIST="$ROOT_IOS_DIR/Info.plist"

echo "➡️  Copy Info.plist..."
if [ -f "$SOURCE_PLIST" ]; then
  cp "$SOURCE_PLIST" "$TARGET_PLIST"
  echo "✔ Info.plist copied!"
else
  echo "❌ Không tìm thấy Info.plist trong package!"
fi

# --- BƯỚC 5: Copy AppIcon ---
SOURCE_ICON="$PACKAGE_DIR/$PACKAGE_NAME/example/ios/Runner/Assets.xcassets/AppIcon.appiconset"
TARGET_ICON="$ROOT_IOS_DIR/Assets.xcassets/AppIcon.appiconset"

echo "➡️  Copy AppIcon..."
if [ -d "$SOURCE_ICON" ]; then
  rm -rf "$TARGET_ICON"
  mkdir -p "$TARGET_ICON"
  cp -R "$SOURCE_ICON/" "$TARGET_ICON/"
  echo "✔ AppIcon copied!"
else
  echo "❌ Không tìm thấy AppIcon.appiconset!"
fi

echo "🎉 DONE — Package đã tích hợp thành công!"
