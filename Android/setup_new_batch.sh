#!/bin/bash
# ============================================================
# Flutter Android Batch Setup Script
# Dùng: bash setup_new_batch.sh <source_folder> <dest_folder> <config_file>
# Ví dụ: bash setup_new_batch.sh 2504 2604 config_2604.txt
# ============================================================
set -e

BASE_DIR="/sessions/focused-eloquent-newton/mnt/webview-apps/android"
SOURCE="$1"
DEST="$2"
CONFIG="$3"

if [ -z "$SOURCE" ] || [ -z "$DEST" ] || [ -z "$CONFIG" ]; then
  echo "Usage: bash setup_new_batch.sh <source_folder> <dest_folder> <config_file>"
  echo ""
  echo "Config file format (1 line per app):"
  echo "  OLD_PACKAGE|NEW_PACKAGE|NEW_URL"
  echo "Example:"
  echo "  com.travelroutes.skopje|com.newapp.city|https://xxx.figma.site"
  exit 1
fi

SRC_PATH="$BASE_DIR/$SOURCE"
DST_PATH="$BASE_DIR/$DEST"

# ---- BƯỚC 1: Copy thư mục (bỏ qua build/) ----
echo "==== BƯỚC 1: Copy $SOURCE → $DEST (loại build/) ===="
if [ -d "$DST_PATH" ]; then
  echo "  Thư mục $DEST đã tồn tại, bỏ qua copy."
else
  mkdir -p "$DST_PATH"
  for APP_DIR in "$SRC_PATH"/*/; do
    APP_NAME=$(basename "$APP_DIR")
    echo "  Copying $APP_NAME ..."
    rsync -a --exclude='build/' "$APP_DIR" "$DST_PATH/$APP_NAME/"
  done
  echo "  Copy xong."
fi

# ---- Đọc config ----
declare -A OLD_TO_NEW_PKG
declare -A OLD_TO_NEW_URL
declare -a OLD_PKGS

while IFS='|' read -r OLD NEW URL; do
  [[ "$OLD" =~ ^#.*$ ]] && continue  # bỏ comment
  [ -z "$OLD" ] && continue
  OLD_TO_NEW_PKG["$OLD"]="$NEW"
  OLD_TO_NEW_URL["$OLD"]="$URL"
  OLD_PKGS+=("$OLD")
done < "$CONFIG"

# ---- BƯỚC 2: Đổi tên thư mục (old pkg → new pkg) ----
echo ""
echo "==== BƯỚC 2: Đổi tên thư mục ===="
for OLD in "${OLD_PKGS[@]}"; do
  NEW="${OLD_TO_NEW_PKG[$OLD]}"
  if [ -d "$DST_PATH/$OLD" ]; then
    mv "$DST_PATH/$OLD" "$DST_PATH/$NEW"
    echo "  $OLD → $NEW"
  elif [ -d "$DST_PATH/$NEW" ]; then
    echo "  $NEW đã tồn tại, bỏ qua."
  else
    echo "  WARN: Không tìm thấy $OLD hoặc $NEW trong $DEST"
  fi
done

# ---- BƯỚC 3: Di chuyển MainActivity.java về đúng package path ----
echo ""
echo "==== BƯỚC 3: Di chuyển MainActivity.java ===="
for OLD in "${OLD_PKGS[@]}"; do
  NEW="${OLD_TO_NEW_PKG[$OLD]}"
  APP_DIR="$DST_PATH/$NEW"
  JAVA_BASE="$APP_DIR/android/app/src/main/java"

  # Convert package name to path (dots → slashes)
  OLD_PATH="${OLD//.//}"
  NEW_PATH="${NEW//.//}"

  OLD_FILE="$JAVA_BASE/$OLD_PATH/MainActivity.java"
  NEW_FILE="$JAVA_BASE/$NEW_PATH/MainActivity.java"

  if [ -f "$NEW_FILE" ]; then
    echo "  $NEW: MainActivity.java đã đúng vị trí."
  elif [ -f "$OLD_FILE" ]; then
    mkdir -p "$(dirname "$NEW_FILE")"
    mv "$OLD_FILE" "$NEW_FILE"
    echo "  $NEW: Đã di chuyển MainActivity.java"
  else
    echo "  WARN: Không tìm thấy MainActivity.java cho $NEW"
  fi
done

# ---- BƯỚC 4: Replace text (package name cũ → mới) trong toàn bộ file ----
echo ""
echo "==== BƯỚC 4: Replace package names trong text files ===="
for OLD in "${OLD_PKGS[@]}"; do
  NEW="${OLD_TO_NEW_PKG[$OLD]}"
  OLD_SLASH="${OLD//.//}"
  NEW_SLASH="${NEW//.//}"
  APP_DIR="$DST_PATH/$NEW"

  COUNT=0
  while IFS= read -r -d '' f; do
    if file "$f" | grep -qE 'text|empty|ASCII|UTF'; then
      CHANGED=false
      if grep -qF "$OLD" "$f" 2>/dev/null; then
        sed -i "s|${OLD}|${NEW}|g" "$f"
        CHANGED=true
      fi
      if grep -qF "$OLD_SLASH" "$f" 2>/dev/null; then
        sed -i "s|${OLD_SLASH}|${NEW_SLASH}|g" "$f"
        CHANGED=true
      fi
      [ "$CHANGED" = true ] && COUNT=$((COUNT+1))
    fi
  done < <(find "$APP_DIR" -type f ! -name "*.DS_Store" \
    ! -name "*.png" ! -name "*.jpg" ! -name "*.jpeg" \
    ! -name "*.gif" ! -name "*.ico" ! -name "*.keystore" \
    ! -path "*/build/*" -print0 2>/dev/null)

  echo "  $NEW: $COUNT files updated"
done

# ---- BƯỚC 5: Cập nhật defaultUri trong main.dart ----
echo ""
echo "==== BƯỚC 5: Cập nhật defaultUri ===="
for OLD in "${OLD_PKGS[@]}"; do
  NEW="${OLD_TO_NEW_PKG[$OLD]}"
  NEW_URL="${OLD_TO_NEW_URL[$OLD]}"
  MAIN_DART="$DST_PATH/$NEW/lib/main.dart"
  if [ -f "$MAIN_DART" ]; then
    sed -i "s|static String defaultUri = \".*\"|static String defaultUri = \"$NEW_URL\"|" "$MAIN_DART"
    echo "  $NEW → $NEW_URL"
  else
    echo "  WARN: Không tìm thấy $MAIN_DART"
  fi
done

# ---- BƯỚC 6: Cập nhật android:label trong AndroidManifest.xml ----
echo ""
echo "==== BƯỚC 6: Cập nhật android:label ===="
for OLD in "${OLD_PKGS[@]}"; do
  NEW="${OLD_TO_NEW_PKG[$OLD]}"
  MANIFEST="$DST_PATH/$NEW/android/app/src/main/AndroidManifest.xml"
  if [ -f "$MANIFEST" ]; then
    # Derive label from package: remove "com.", capitalize, replace . with space
    LABEL=$(echo "$NEW" | sed 's/^com\.//' | sed 's/\./ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1))substr($i,2); print}')
    OLD_LABEL=$(grep -oP 'android:label="\K[^"]+' "$MANIFEST" | head -1)
    sed -i "s|android:label=\"$OLD_LABEL\"|android:label=\"$LABEL\"|g" "$MANIFEST"
    echo "  $NEW → \"$LABEL\""
  else
    echo "  WARN: Không tìm thấy $MANIFEST"
  fi
done

echo ""
echo "==== HOÀN THÀNH ===="
