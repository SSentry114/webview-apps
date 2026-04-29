#!/usr/bin/env python3
"""
Flutter App Generator - Multi-clone edition
Usage: python3 flutter_app_generator.py
"""

import os, re, sys, shutil
from PIL import Image

# ─────────────────────────────────────────────────────────────────────────────
# ICON PROCESSING (từ file icon user cung cấp)
# ─────────────────────────────────────────────────────────────────────────────

ANDROID_SIZES = {
    "mipmap-mdpi":    48,
    "mipmap-hdpi":    72,
    "mipmap-xhdpi":   96,
    "mipmap-xxhdpi":  144,
    "mipmap-xxxhdpi": 192,
}

IOS_SIZES = [20, 29, 40, 57, 58, 60, 76, 80, 87, 114, 120, 152, 167, 180, 1024]

def process_icon(icon_path, size, rounded=False):
    """Mở icon gốc, resize về size cần thiết. rounded=True cho Android."""
    img = Image.open(icon_path).convert("RGBA")
    img = img.resize((size, size), Image.LANCZOS)

    if rounded:
        # Thêm rounded corners cho Android
        from PIL import ImageDraw
        mask = Image.new("L", (size, size), 0)
        md = ImageDraw.Draw(mask)
        md.rounded_rectangle([0, 0, size-1, size-1], radius=size//5, fill=255)
        result = Image.new("RGBA", (size, size), (255,255,255,0))
        result.paste(img, mask=mask)
        bg = Image.new("RGB", (size, size), (255,255,255))
        bg.paste(result, mask=result.split()[3])
        return bg
    else:
        bg = Image.new("RGB", (size, size), (255,255,255))
        bg.paste(img, mask=img.split()[3])
        return bg

def android_apply_icons(project_path, icon_path):
    """Generate Android mipmap icons từ icon gốc."""
    for folder, size in ANDROID_SIZES.items():
        dest_dir = os.path.join(project_path, f"android/app/src/main/res/{folder}")
        os.makedirs(dest_dir, exist_ok=True)
        icon = process_icon(icon_path, size, rounded=True)
        icon.save(os.path.join(dest_dir, "ic_launcher.png"), "PNG")
    print(f"  ✓ Android icons: mdpi(48) → xxxhdpi(192)")

def ios_apply_icons(project_path, icon_path):
    """Generate iOS AppIcon sizes từ icon gốc."""
    icon_dir = os.path.join(project_path, "ios/Runner/Assets.xcassets/AppIcon.appiconset")
    os.makedirs(icon_dir, exist_ok=True)
    for size in IOS_SIZES:
        icon = process_icon(icon_path, size, rounded=False)
        icon.save(os.path.join(icon_dir, f"{size}.png"), "PNG")
    print(f"  ✓ iOS icons: {len(IOS_SIZES)} sizes (20 → 1024)")

# ─────────────────────────────────────────────────────────────────────────────
# ANDROID SETUP
# ─────────────────────────────────────────────────────────────────────────────

def android_fix_main_activity(project_path, old_pkg, new_pkg):
    java_base = os.path.join(project_path, "android/app/src/main/java")
    new_path  = os.path.join(java_base, new_pkg.replace(".", "/"))
    new_file  = os.path.join(new_path, "MainActivity.java")
    if os.path.isfile(new_file):
        print(f"  MainActivity.java đã đúng vị trí")
        return
    # Tìm MainActivity.java bất kỳ đâu trong java_base
    for root, dirs, files in os.walk(java_base):
        if "MainActivity.java" in files:
            os.makedirs(new_path, exist_ok=True)
            shutil.move(os.path.join(root, "MainActivity.java"), new_file)
            print(f"  ✓ MainActivity.java → {new_pkg.replace('.','/')}/")
            return
    print(f"  WARN: Không tìm thấy MainActivity.java")

def replace_package_names(project_path, old_pkg, new_pkg):
    old_slash = old_pkg.replace(".", "/")
    new_slash = new_pkg.replace(".", "/")
    skip_ext  = {".png",".jpg",".jpeg",".gif",".ico",".webp",".keystore",".jks",".class",".jar",".zip"}
    skip_dirs = {"build", ".gradle", ".dart_tool"}
    count = 0
    for root, dirs, files in os.walk(project_path):
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        for fname in files:
            if any(fname.endswith(e) for e in skip_ext): continue
            fpath = os.path.join(root, fname)
            try:
                content = open(fpath, encoding="utf-8", errors="ignore").read()
                new_content = content.replace(old_pkg, new_pkg).replace(old_slash, new_slash)
                if new_content != content:
                    open(fpath, "w", encoding="utf-8").write(new_content)
                    count += 1
            except: pass
    print(f"  ✓ Replaced package name trong {count} files")

def setup_android(project_path, old_pkg, new_pkg, app_name, default_uri, icon_path):
    print(f"\n  📱 Android")

    android_fix_main_activity(project_path, old_pkg, new_pkg)
    replace_package_names(project_path, old_pkg, new_pkg)

    # android:label
    manifest = os.path.join(project_path, "android/app/src/main/AndroidManifest.xml")
    if os.path.isfile(manifest):
        content = open(manifest).read()
        new_content = re.sub(r'android:label="[^"]+"', f'android:label="{app_name}"', content)
        open(manifest, "w").write(new_content)
        print(f"  ✓ android:label → '{app_name}'")

    # defaultUri
    dart = os.path.join(project_path, "lib/main.dart")
    if os.path.isfile(dart):
        content = open(dart).read()
        new_content = re.sub(r'static String defaultUri = "[^"]*"', f'static String defaultUri = "{default_uri}"', content)
        open(dart, "w").write(new_content)
        print(f"  ✓ defaultUri → {default_uri}")

    # Icons
    android_apply_icons(project_path, icon_path)

# ─────────────────────────────────────────────────────────────────────────────
# iOS SETUP
# ─────────────────────────────────────────────────────────────────────────────

def setup_ios(project_path, app_name, default_uri, icon_path):
    print(f"\n  🍎 iOS")

    # defaultUri
    dart = os.path.join(project_path, "lib/main.dart")
    if os.path.isfile(dart):
        content = open(dart).read()
        new_content = re.sub(r'static String defaultUri = "[^"]*"', f'static String defaultUri = "{default_uri}"', content)
        open(dart, "w").write(new_content)
        print(f"  ✓ defaultUri → {default_uri}")

    # CFBundleDisplayName
    for plist_path in [
        os.path.join(project_path, "ios/Runner/Info.plist"),
        os.path.join(project_path, "macos/Runner/Info.plist"),
    ]:
        if os.path.isfile(plist_path):
            content = open(plist_path).read()
            new_content = re.sub(
                r'(<key>CFBundleDisplayName</key>\s*<string>)[^<]*(</string>)',
                rf'\g<1>{app_name}\g<2>', content
            )
            open(plist_path, "w").write(new_content)
            label = os.path.relpath(plist_path, project_path)
            print(f"  ✓ {label} → '{app_name}'")

    # Icons
    ios_apply_icons(project_path, icon_path)

# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────

def parse_list(s):
    return [x.strip() for x in s.split(",") if x.strip()]

def main():
    print("=" * 60)
    print("  Flutter App Generator  —  Multi Clone")
    print("=" * 60)

    # ── Source project
    source_path = input("\n📁 Đường dẫn source Flutter base: ").strip().rstrip("/").strip("'\"")
    if not os.path.isdir(source_path):
        print(f"❌ Không tìm thấy: {source_path}"); sys.exit(1)

    # Detect old bundle id
    old_bundle_id = os.path.basename(source_path)
    pubspec = os.path.join(source_path, "pubspec.yaml")
    if os.path.isfile(pubspec):
        m = re.search(r'^name:\s*(\S+)', open(pubspec).read(), re.MULTILINE)
        if m: old_bundle_id = m.group(1)
    print(f"  → Bundle ID gốc: {old_bundle_id}")

    parent_dir = os.path.dirname(source_path)

    # ── Multi inputs
    print("\n📦 Nhập các Bundle ID mới (phân cách bằng dấu phẩy):")
    print("   VD: com.quickbus.monaco, com.easybus.madrid, com.localbus.belgrade")
    bundle_ids = parse_list(input("   > "))

    print("\n📱 Nhập tên app tương ứng (phân cách bằng dấu phẩy, đúng thứ tự):")
    print("   VD: QuickBus Monaco, EasyBus Madrid, LocalBus Belgrade")
    app_names = parse_list(input("   > "))

    print("\n🌐 Nhập các defaultUri tương ứng (phân cách bằng dấu phẩy, đúng thứ tự):")
    print("   VD: https://xxx.figma.site, https://yyy.figma.site, https://zzz.figma.site")
    uris = parse_list(input("   > "))

    # ── Validate counts
    n = len(bundle_ids)
    if len(app_names) != n or len(uris) != n:
        print(f"\n❌ Số lượng không khớp:")
        print(f"   Bundle IDs : {len(bundle_ids)}")
        print(f"   App names  : {len(app_names)}")
        print(f"   URIs       : {len(uris)}")
        sys.exit(1)

    print(f"\n✅ Sẽ tạo {n} project. Tiếp theo nhập đường dẫn icon cho từng app.\n")

    # ── Icon paths per project
    icon_paths = []
    for i, (bundle, name) in enumerate(zip(bundle_ids, app_names)):
        while True:
            path = input(f"🖼  Icon [{i+1}/{n}] {name} ({bundle})\n   Đường dẫn file icon (1024x1024 PNG): ").strip().strip("'\"")
            if os.path.isfile(path):
                icon_paths.append(path)
                break
            else:
                print(f"   ❌ Không tìm thấy file: {path}. Thử lại.")

    # ── Process each project
    print("\n" + "="*60)
    print(f"  Bắt đầu tạo {n} project...")
    print("="*60)

    results = []
    for i, (bundle, name, uri, icon_path) in enumerate(zip(bundle_ids, app_names, uris, icon_paths)):
        print(f"\n[{i+1}/{n}] {name}  ({bundle})")
        print("-" * 50)

        # Copy project
        new_path = os.path.join(parent_dir, bundle)
        if os.path.isdir(new_path):
            print(f"  ⚠️  Folder đã tồn tại, dùng luôn: {new_path}")
        else:
            print(f"  📂 Copying base project...")
            shutil.copytree(source_path, new_path,
                ignore=shutil.ignore_patterns("build", ".dart_tool", ".gradle", "__pycache__"))
            print(f"  ✓ Copied → {bundle}/")

        # Android + iOS
        setup_android(new_path, old_bundle_id, bundle, name, uri, icon_path)
        setup_ios(new_path, name, uri, icon_path)

        results.append((name, bundle, uri, new_path))

    # ── Summary
    print("\n" + "="*60)
    print(f"  ✅ HOÀN THÀNH — {n} project")
    print("="*60)
    for name, bundle, uri, path in results:
        print(f"\n  📦 {name}")
        print(f"     Bundle : {bundle}")
        print(f"     URI    : {uri}")
        print(f"     Output : {path}")
    print()

if __name__ == "__main__":
    main()
