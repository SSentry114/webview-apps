#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Flutter Multi-Project Cloner
============================
Script tương tác giúp clone 1 Flutter project thành nhiều bản với
bundle id / app name / default URL / app icon khác nhau.

Chạy:  python3 clone_flutter_apps.py
"""

import os
import re
import sys
import json
import shutil
import subprocess
from pathlib import Path

# ---------- Auto-install Pillow nếu chưa có ----------
try:
    from PIL import Image
except ImportError:
    print(">>> Đang cài Pillow để xử lý ảnh ...")
    subprocess.check_call(
        [sys.executable, "-m", "pip", "install", "--quiet", "Pillow"]
    )
    from PIL import Image

# ---------- Hằng số ----------
SCRIPT_NAME = Path(__file__).name

IGNORE_DIRS = {
    "build",
    ".dart_tool",
    ".idea",
    ".gradle",
    ".vscode",
    "Pods",
    "DerivedData",
    ".symlinks",
    "node_modules",
    "ephemeral",
    ".git",
}

# Tập đuôi file là text mà ta có thể yên tâm replace
TEXT_EXTS = {
    ".xml", ".gradle", ".kts", ".kt", ".java", ".swift",
    ".plist", ".dart", ".pbxproj", ".xcconfig", ".xcsettings",
    ".properties", ".yaml", ".yml", ".json", ".md", ".lock",
    ".storyboard", ".entitlements",
}

# Mặc định mipmap density -> px (chỉ dùng nếu không đọc được size từ ảnh gốc)
ANDROID_DENSITY_PX = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}


# ====================================================
# Helpers
# ====================================================

def ask(prompt: str) -> str:
    return input(prompt).strip().strip("'\"")


def expand(p: str) -> str:
    return os.path.abspath(os.path.expanduser(p))


def detect_current_package(project_path: Path) -> str | None:
    """Tự nhận diện package name từ build.gradle(.kts)."""
    candidates = [
        project_path / "android" / "app" / "build.gradle.kts",
        project_path / "android" / "app" / "build.gradle",
    ]
    for f in candidates:
        if not f.exists():
            continue
        text = f.read_text(encoding="utf-8", errors="ignore")
        m = re.search(r'applicationId\s*[=:]?\s*["\']([^"\']+)["\']', text)
        if m:
            return m.group(1)
        m = re.search(r'namespace\s*[=:]?\s*["\']([^"\']+)["\']', text)
        if m:
            return m.group(1)
    return None


def clone_project(src: Path, dest: Path):
    """Clone project (bỏ qua các thư mục build / cache)."""
    print(f"   -> Clone sang: {dest}")

    def ignore(directory, names):
        skip = [n for n in names if n in IGNORE_DIRS]
        # bỏ chính file script này
        if SCRIPT_NAME in names:
            skip.append(SCRIPT_NAME)
        return skip

    shutil.copytree(src, dest, ignore=ignore)


def cleanup_empty_dirs(base: Path, parts: list[str]):
    """Xoá các thư mục rỗng còn lại sau khi di chuyển MainActivity."""
    for i in range(len(parts), 0, -1):
        d = base.joinpath(*parts[:i])
        try:
            if d.exists() and d.is_dir() and not any(d.iterdir()):
                d.rmdir()
        except OSError:
            pass


def move_main_activity(project: Path, old_pkg: str, new_pkg: str):
    """Di chuyển MainActivity sang đường dẫn package name mới."""
    android_main = project / "android" / "app" / "src" / "main"
    for src_root_name in ("kotlin", "java"):
        src_root = android_main / src_root_name
        if not src_root.exists():
            continue

        old_parts = old_pkg.split(".")
        new_parts = new_pkg.split(".")
        old_dir = src_root.joinpath(*old_parts)
        new_dir = src_root.joinpath(*new_parts)

        if not old_dir.exists():
            continue

        new_dir.parent.mkdir(parents=True, exist_ok=True)
        if new_dir.exists():
            for item in old_dir.iterdir():
                target = new_dir / item.name
                if target.exists():
                    if target.is_dir():
                        shutil.rmtree(target)
                    else:
                        target.unlink()
                shutil.move(str(item), str(target))
            try:
                old_dir.rmdir()
            except OSError:
                pass
        else:
            shutil.move(str(old_dir), str(new_dir))

        cleanup_empty_dirs(src_root, old_parts)


def replace_package_in_text_files(project: Path, old_pkg: str, new_pkg: str):
    """Replace tất cả chuỗi old_pkg -> new_pkg trong các file text."""
    count = 0
    for root, dirs, files in os.walk(project):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for fname in files:
            fpath = Path(root) / fname
            if fpath.suffix.lower() not in TEXT_EXTS:
                continue
            try:
                content = fpath.read_text(encoding="utf-8")
            except (UnicodeDecodeError, PermissionError):
                continue
            if old_pkg in content:
                fpath.write_text(content.replace(old_pkg, new_pkg), encoding="utf-8")
                count += 1
    print(f"   -> Đã cập nhật package name trong {count} file")


def update_app_name(project: Path, new_name: str):
    """Đổi app name trong AndroidManifest.xml và Info.plist."""
    # Android
    manifest = project / "android" / "app" / "src" / "main" / "AndroidManifest.xml"
    if manifest.exists():
        text = manifest.read_text(encoding="utf-8")
        text = re.sub(
            r'android:label\s*=\s*"[^"]*"',
            f'android:label="{new_name}"',
            text,
            count=1,
        )
        manifest.write_text(text, encoding="utf-8")
        print("   -> Đã cập nhật android:label")

    # iOS
    plist = project / "ios" / "Runner" / "Info.plist"
    if plist.exists():
        text = plist.read_text(encoding="utf-8")
        new_text, n = re.subn(
            r"(<key>CFBundleDisplayName</key>\s*<string>)[^<]*(</string>)",
            lambda m: f"{m.group(1)}{new_name}{m.group(2)}",
            text,
            count=1,
        )
        if n == 0:
            # Chèn key mới ngay sau <dict>
            new_text = text.replace(
                "<dict>",
                f"<dict>\n\t<key>CFBundleDisplayName</key>\n\t<string>{new_name}</string>",
                1,
            )
        plist.write_text(new_text, encoding="utf-8")
        print("   -> Đã cập nhật CFBundleDisplayName")


def update_default_uri(project: Path, new_uri: str):
    """Đổi defaultUri trong lib/main.dart."""
    main_dart = project / "lib" / "main.dart"
    if not main_dart.exists():
        print("   !! Không tìm thấy lib/main.dart")
        return
    text = main_dart.read_text(encoding="utf-8")
    new_text, n = re.subn(
        r'(static\s+(?:const\s+|final\s+)?String\s+defaultUri\s*=\s*)(["\'])[^"\']*\2',
        lambda m: f'{m.group(1)}"{new_uri}"',
        text,
        count=1,
    )
    if n == 0:
        print("   !! Không tìm thấy biến defaultUri trong main.dart")
        return
    main_dart.write_text(new_text, encoding="utf-8")
    print(f"   -> Đã đổi defaultUri = \"{new_uri}\"")


def square_image(img: Image.Image) -> Image.Image:
    """Resize ảnh về vuông (crop center) và chuyển RGBA."""
    img = img.convert("RGBA")
    w, h = img.size
    if w != h:
        side = min(w, h)
        left = (w - side) // 2
        top = (h - side) // 2
        img = img.crop((left, top, left + side, top + side))
    return img


def to_rgb_white_bg(img: Image.Image) -> Image.Image:
    """iOS yêu cầu PNG không alpha -> đặt nền trắng."""
    if img.mode != "RGBA":
        return img.convert("RGB")
    bg = Image.new("RGB", img.size, (255, 255, 255))
    bg.paste(img, mask=img.split()[3])
    return bg


def generate_android_icons(project: Path, src_img: Image.Image):
    """Replace toàn bộ ic_launcher*.png trong các thư mục res/mipmap-*."""
    res_dir = project / "android" / "app" / "src" / "main" / "res"
    if not res_dir.exists():
        return

    replaced = 0
    for sub in res_dir.iterdir():
        if not sub.is_dir() or not sub.name.startswith("mipmap-"):
            continue
        for png in sub.glob("ic_launcher*.png"):
            # Lấy size từ ảnh hiện có; fallback theo density
            try:
                with Image.open(png) as old:
                    size = old.size[0]
            except Exception:
                size = ANDROID_DENSITY_PX.get(sub.name, 96)
            new_icon = src_img.resize((size, size), Image.LANCZOS)
            new_icon.save(png, "PNG")
            replaced += 1

    # Nếu project chưa có mipmap-* nào (rất hiếm) -> tạo bộ chuẩn
    if replaced == 0:
        for folder, size in ANDROID_DENSITY_PX.items():
            target = res_dir / folder
            target.mkdir(parents=True, exist_ok=True)
            new_icon = src_img.resize((size, size), Image.LANCZOS)
            new_icon.save(target / "ic_launcher.png", "PNG")
            replaced += 1
    print(f"   -> Android: ghi {replaced} file icon")


def generate_ios_icons(project: Path, src_img: Image.Image):
    """Đọc Contents.json để biết cần các size nào, generate từng file."""
    iconset = (
        project
        / "ios"
        / "Runner"
        / "Assets.xcassets"
        / "AppIcon.appiconset"
    )
    if not iconset.exists():
        return

    contents_file = iconset / "Contents.json"
    targets: dict[str, int] = {}

    if contents_file.exists():
        try:
            data = json.loads(contents_file.read_text(encoding="utf-8"))
            for entry in data.get("images", []):
                fname = entry.get("filename")
                if not fname:
                    continue
                # Ưu tiên expected-size (đã là pixel)
                exp = entry.get("expected-size")
                if exp:
                    targets[fname] = int(exp)
                    continue
                size_str = entry.get("size", "")        # vd "60x60"
                scale_str = entry.get("scale", "1x")    # vd "3x"
                try:
                    base = float(size_str.split("x")[0])
                    scale = float(scale_str.replace("x", ""))
                    targets[fname] = int(round(base * scale))
                except Exception:
                    pass
        except Exception as e:
            print(f"   !! Lỗi đọc Contents.json: {e}")

    # Bổ sung: bất kỳ PNG nào đang có sẵn mà chưa nằm trong targets -> giữ size cũ
    for png in iconset.glob("*.png"):
        if png.name not in targets:
            try:
                with Image.open(png) as old:
                    targets[png.name] = old.size[0]
            except Exception:
                continue

    written = 0
    for fname, size in targets.items():
        new_icon = src_img.resize((size, size), Image.LANCZOS)
        new_icon = to_rgb_white_bg(new_icon)
        new_icon.save(iconset / fname, "PNG")
        written += 1
    print(f"   -> iOS: ghi {written} file icon trong AppIcon.appiconset")


def generate_app_icons(project: Path, icon_path: Path):
    print(f"   -> Sinh icon từ: {icon_path}")
    src = Image.open(icon_path)
    src = square_image(src)
    generate_android_icons(project, src)
    generate_ios_icons(project, src)


# ====================================================
# Main
# ====================================================

def main():
    print("=" * 64)
    print("  FLUTTER MULTI-PROJECT CLONER")
    print("=" * 64)

    # 1. Hỏi project gốc
    src_path = Path(expand(ask("\n[1] Đường dẫn tới project Flutter gốc: ")))
    if not src_path.is_dir():
        sys.exit(f"!! '{src_path}' không tồn tại hoặc không phải thư mục.")
    if not (src_path / "pubspec.yaml").exists():
        sys.exit(f"!! Trong '{src_path}' không có pubspec.yaml — không phải Flutter project.")

    src_pkg = detect_current_package(src_path)
    if not src_pkg:
        src_pkg = ask("Không tự nhận diện được package name. Nhập package name hiện tại: ")
    print(f"   * Package name hiện tại: {src_pkg}")

    parent_dir = src_path.parent

    # 2. Hỏi danh sách bundle id mới
    raw = ask("\n[2] Danh sách bundle id mới (cách nhau bằng ','): ")
    new_bids = [b.strip() for b in raw.split(",") if b.strip()]
    if not new_bids:
        sys.exit("!! Bạn chưa nhập bundle id nào.")
    print(f"   * Sẽ tạo {len(new_bids)} project mới: {new_bids}")

    # 3. App name cho từng bundle id
    print("\n[3] Nhập App Name cho từng bundle id:")
    app_names = {bid: ask(f"     - {bid}: ") for bid in new_bids}

    # 5. Default URL cho từng app
    print("\n[5] Nhập Default URL cho từng app:")
    default_uris = {bid: ask(f"     - {bid}: ") for bid in new_bids}

    # 6. App icon cho từng app
    print("\n[6] Nhập đường dẫn App Icon (.png, nên >= 1024x1024) cho từng app:")
    icon_paths: dict[str, Path] = {}
    for bid in new_bids:
        p = Path(expand(ask(f"     - {bid}: ")))
        if not p.is_file():
            print(f"     !! '{p}' không tồn tại — sẽ bỏ qua bước icon cho {bid}")
            icon_paths[bid] = None  # type: ignore
        else:
            icon_paths[bid] = p

    # ===== Xử lý từng bundle id =====
    for bid in new_bids:
        print("\n" + "=" * 64)
        print(f">>> Đang xử lý: {bid}")
        print("=" * 64)

        dest = parent_dir / bid
        if dest.exists():
            ans = ask(f"   '{dest}' đã tồn tại. Xoá và clone lại? [y/N]: ")
            if ans.lower() == "y":
                shutil.rmtree(dest)
                clone_project(src_path, dest)
            else:
                print("   -> Bỏ qua bước clone, tiếp tục cập nhật trên thư mục cũ.")
        else:
            clone_project(src_path, dest)

        # 4. Replace package name + di chuyển MainActivity
        print(f"   -> Đổi package name: {src_pkg}  ->  {bid}")
        move_main_activity(dest, src_pkg, bid)
        replace_package_in_text_files(dest, src_pkg, bid)

        # 3. Đổi app name
        update_app_name(dest, app_names[bid])

        # 5. Đổi defaultUri
        update_default_uri(dest, default_uris[bid])

        # 6. Sinh icon
        if icon_paths.get(bid):
            try:
                generate_app_icons(dest, icon_paths[bid])
            except Exception as e:
                print(f"   !! Lỗi sinh icon: {e}")

    print("\n" + "=" * 64)
    print("HOÀN TẤT. Mở từng project mới và chạy:")
    print("    flutter clean && flutter pub get")
    print("Sau đó build/run như bình thường.")
    print("=" * 64)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n!! Đã huỷ bởi người dùng.")
