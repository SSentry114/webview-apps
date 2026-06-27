import asyncio
import os
import re
import time
from datetime import datetime

from playwright.async_api import async_playwright

from telegram import Update, InputMediaPhoto
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    ConversationHandler,
    MessageHandler,
    filters,
)

# Ưu tiên lấy token từ biến môi trường; fallback về token cũ để vẫn chạy được.
BOT_TOKEN = os.environ.get(
    "BOT_TOKEN", "8763748050:AAE3itvuXJ4qjru24E-loTEaf5cZEp_B3Ao"
)

# Các bước của hội thoại đăng nhập
EMAIL, PASSWORD, TWOFA = range(3)


# =========================
# PARSERS
# =========================
def parse_join_date(text: str):
    """Ngày tham gia = ngày 'Accepted' SỚM NHẤT trong các agreement."""
    # Chỉ bắt ngày đứng sau 'Accepted'
    dates = re.findall(
        r"Accepted\s+([A-Z][a-z]+\s+\d{1,2},\s+\d{4})",
        text,
    )
    if not dates:
        return ""

    parsed = []
    for d in dates:
        for fmt in ("%B %d, %Y", "%b %d, %Y"):
            try:
                parsed.append((datetime.strptime(d, fmt), d))
                break
            except ValueError:
                continue

    if not parsed:
        return dates[0]

    parsed.sort(key=lambda x: x[0])
    return parsed[0][1]  # ngày sớm nhất


def parse_membership(text: str, join_date: str = "", email: str = ""):

    def find(pattern):
        m = re.search(pattern, text)
        return m.group(1).strip() if m else ""

    program = find(r"Program\s*\n\s*(.+)")
    enrolled = find(r"Enrolled as\s*\n\s*(.+)")

    address_match = re.search(
        r"Street address\s*\n([\s\S]*?)\n\s*Renewal date",
        text,
    )
    address = address_match.group(1).strip() if address_match else ""

    renewal = find(r"Renewal date\s*\n\s*(.+)")
    fee = find(r"Annual fee\s*\n\s*(.+)")
    device = find(r"Device reset date\s*\n\s*(.+)")

    return f"""
APPLE DEVELOPER MEMBERSHIP

📧 Email: {email}
📦 Program: {program}
👤 Enrolled as: {enrolled}
🗓️ Enroll date: {join_date}
📅 Renewal date: {renewal}
🏠 Address:
{address}
💳 Annual fee: {fee}
🔁 Device reset date: {device}
"""


def build_apps_text(result_apps):
    apps = result_apps.get("data", []) if result_apps else []

    versions = {}
    for item in (result_apps or {}).get("included", []):
        if item.get("type") == "appStoreVersions":
            versions[item["id"]] = item

    msg = ["APPLE APPS\n", f"📱 Total Apps: {len(apps)}\n"]

    stt = 0
    for app in apps:
        try:
            name = app["attributes"].get("name", "?")
            bundle = app["attributes"].get("bundleId", "?")

            version_id = app["relationships"]["displayableVersions"]["data"][0]["id"]
            version = versions.get(version_id, {})
            attrs = version.get("attributes", {})

            state = attrs.get("appStoreState", "UNKNOWN")
            version_string = attrs.get("versionString", "?")

            stt += 1
            msg.append(
                f"{stt}. {name}\nBundle: {bundle}\nVersion: {version_string}\nStatus: {state}\n"
            )
        except Exception:
            pass

    return "\n".join(msg)


# =========================
# DEVELOPER PORTAL HELPERS
# =========================
async def open_card(dev_page, card_id, link_names):
    """Mở 1 card trên trang account. SPA không nhảy khi mở thẳng URL hash,
    nên ưu tiên CLICK link (giống chuột), fallback bằng hashchange."""
    clicked = False

    # 1) Click link theo href chứa id của card
    try:
        loc = dev_page.locator(f'a[href*="{card_id}"]').first
        if await loc.count() > 0:
            await loc.click(timeout=5000)
            clicked = True
    except Exception:
        pass

    # 2) Click link/nút theo tên hiển thị
    if not clicked:
        for name in link_names:
            try:
                loc = dev_page.get_by_role("link", name=re.compile(name, re.I)).first
                if await loc.count() == 0:
                    loc = dev_page.get_by_role(
                        "button", name=re.compile(name, re.I)
                    ).first
                if await loc.count() > 0:
                    await loc.click(timeout=5000)
                    clicked = True
                    break
            except Exception:
                continue

    # 3) Fallback: set hash + bắn hashchange cho SPA router
    if not clicked:
        try:
            await dev_page.evaluate(
                """(id) => {
                    location.hash = '';
                    location.hash = id;
                    window.dispatchEvent(new HashChangeEvent('hashchange'));
                }""",
                card_id,
            )
        except Exception:
            pass

    # Chờ 3s cho load rồi scroll tới đúng card
    await dev_page.wait_for_timeout(3000)
    try:
        await dev_page.evaluate(
            "(id) => { const el = document.getElementById(id);"
            " if (el) el.scrollIntoView({block: 'start'}); }",
            card_id,
        )
        await dev_page.wait_for_timeout(1000)
    except Exception:
        pass


async def fetch_membership_and_agreement(browser_context, email=""):
    """Mở trang developer (cùng session), lấy membership + ngày tham gia + ảnh."""
    membership_screenshot_path = None
    agreement_screenshot_path = None

    dev_page = await browser_context.new_page()

    await dev_page.goto(
        "https://developer.apple.com/account", wait_until="networkidle"
    )
    await dev_page.wait_for_timeout(3000)

    # Membership Details Card
    await open_card(dev_page, "MembershipDetailsCard", ["Membership"])
    raw_text = await dev_page.inner_text("body")
    try:
        membership_screenshot_path = f"membership_{int(time.time())}.png"
        await dev_page.screenshot(path=membership_screenshot_path)
    except Exception:
        membership_screenshot_path = None

    # Agreement History Card (ngày tham gia)
    await open_card(dev_page, "AgreementHistoryCard", ["Agreement"])
    try:
        agreement_text = await dev_page.inner_text("body")
        join_date = parse_join_date(agreement_text)
    except Exception:
        join_date = ""
    try:
        agreement_screenshot_path = f"agreement_{int(time.time())}.png"
        await dev_page.screenshot(path=agreement_screenshot_path)
    except Exception:
        agreement_screenshot_path = None

    membership_text = parse_membership(raw_text, join_date, email)
    return membership_text, membership_screenshot_path, agreement_screenshot_path


# =========================
# APPLE LOGIN HELPERS (semi-auto)
# =========================
async def wait_auth_frame(page, timeout=30000):
    """Tìm frame chứa form đăng nhập Apple (iframe idmsa, hoặc full-page idmsa)."""
    deadline = time.time() + timeout / 1000
    while time.time() < deadline:
        for fr in page.frames:
            url = fr.url or ""
            if "idmsa" in url or "appleauth" in url:
                return fr
        await page.wait_for_timeout(500)
    return page.main_frame


async def find_input(page, selectors, timeout=30000):
    """Quét qua MỌI frame, trả về ô input đầu tiên đang HIỆN khớp selector."""
    deadline = time.time() + timeout / 1000
    while time.time() < deadline:
        for fr in page.frames:
            for sel in selectors:
                try:
                    loc = fr.locator(sel).first
                    if await loc.count() > 0 and await loc.is_visible():
                        return loc
                except Exception:
                    continue
        await page.wait_for_timeout(200)
    return None


async def type_text(loc, text):
    """Gõ từng ký tự để kích hoạt sự kiện phím (fill không bắn keydown)."""
    try:
        await loc.press_sequentially(text, delay=80)
    except Exception:
        await loc.type(text, delay=80)


async def type_and_verify(loc, text, attempts=3):
    """Gõ rồi kiểm tra giá trị; nếu rớt ký tự thì xóa và gõ lại."""
    for _ in range(attempts):
        try:
            await loc.click()
        except Exception:
            pass
        await loc.page.wait_for_timeout(300)
        try:
            await loc.fill("")
        except Exception:
            pass
        await type_text(loc, text)
        try:
            if await loc.input_value() == text:
                return True
        except Exception:
            return True  # không đọc được value thì coi như xong
        await loc.page.wait_for_timeout(300)
    return False


async def click_continue_in_frames(page):
    """Bấm nút Continue/Sign in nếu có (phòng khi Enter không ăn)."""
    for fr in page.frames:
        for sel in ["#sign-in", "#continue", "button#sign-in", 'button[type="submit"]']:
            try:
                loc = fr.locator(sel).first
                if await loc.count() > 0 and await loc.is_visible():
                    await loc.click(timeout=4000)
                    return
            except Exception:
                continue


async def do_apple_login(page, email, password):
    """Điền email + password vào widget đăng nhập Apple."""
    await page.wait_for_load_state("domcontentloaded")
    await page.wait_for_timeout(3000)

    # --- EMAIL ---
    email_loc = await find_input(
        page,
        [
            "#account_name_text_field",
            'input[autocomplete="username"]',
            'input[name="accountName"]',
            'input[type="email"]',
            'input[type="text"]',
        ],
    )
    if email_loc is None:
        raise RuntimeError("Không tìm thấy ô email")

    await type_and_verify(email_loc, email)
    await page.wait_for_timeout(200)

    # Bấm Continue (ưu tiên), Enter chỉ là phương án dự phòng
    await click_continue_in_frames(page)
    try:
        await email_loc.press("Enter")
    except Exception:
        pass
    await page.wait_for_timeout(2000)

    # --- PASSWORD --- (find_input tự đợi tới khi hiện)
    pwd_loc = await find_input(
        page,
        [
            "#password_text_field",
            'input[type="password"]',
            'input[autocomplete="current-password"]',
        ],
    )
    if pwd_loc is None:
        raise RuntimeError("Không tìm thấy ô password")

    await type_and_verify(pwd_loc, password)
    await page.wait_for_timeout(500)
    try:
        await pwd_loc.press("Enter")
    except Exception:
        pass
    await click_continue_in_frames(page)
    await page.wait_for_timeout(1000)


CODE_SELECTORS = [
    'input[id^="char"]',
    'input[autocomplete="one-time-code"]',
    'input[type="tel"]',
]


async def choose_phone_number(page, timeout=12000):
    """Dò liên tục: nếu hiện màn 'Choose a phone number' thì bấm số ĐẦU TIÊN;
    nếu đã sang màn nhập mã thì thôi. Trả về ngay khi xử lý xong (không chờ thừa)."""
    deadline = time.time() + timeout / 1000
    while time.time() < deadline:
        # Lấy auth frame hiện tại
        frame = page.main_frame
        for fr in page.frames:
            u = fr.url or ""
            if "idmsa" in u or "appleauth" in u:
                frame = fr
                break

        # Đã sang màn nhập mã -> không cần chọn số
        for sel in CODE_SELECTORS:
            try:
                loc = frame.locator(sel).first
                if await loc.count() > 0 and await loc.is_visible():
                    return False
            except Exception:
                pass

        # Màn chọn số -> bấm option đầu tiên
        try:
            title = frame.get_by_text(re.compile("choose a phone number", re.I))
            if await title.count() > 0:
                opt = frame.get_by_text(re.compile("Text message", re.I)).first
                if await opt.count() > 0 and await opt.is_visible():
                    await opt.click(timeout=5000)
                    await page.wait_for_timeout(800)
                    return True
        except Exception:
            pass

        await page.wait_for_timeout(200)

    return False


async def is_2fa_present(page, timeout=15000):
    loc = await find_input(page, CODE_SELECTORS, timeout=timeout)
    return loc is not None


def extract_otp_url(sms: str) -> str:
    """Cắt lấy phần URL từ 'http' trở về sau trong chuỗi SMS."""
    idx = sms.find("http")
    return sms[idx:].strip() if idx != -1 else ""


async def fetch_otp_from_url(browser_context, url, total=60, interval=5):
    """Mở trang SMS, tìm OTP 6 số. Thử lại mỗi `interval`s, tối đa `total`s.
    Trả về chuỗi 6 số, hoặc None nếu hết thời gian."""
    deadline = time.time() + total
    page = await browser_context.new_page()
    try:
        while time.time() < deadline:
            try:
                await page.goto(url, wait_until="networkidle", timeout=20000)
                body = await page.inner_text("body")
                # ưu tiên mã đứng cạnh 'code'/'is', fallback bất kỳ 6 số đứng riêng
                m = re.search(
                    r"(?:code(?:\s+is)?|is)[:\s]*?(\d{6})\b", body, re.I
                ) or re.search(r"\b(\d{6})\b", body)
                if m:
                    return m.group(1)
            except Exception:
                pass
            await page.wait_for_timeout(interval * 1000)
        return None
    finally:
        try:
            await page.close()
        except Exception:
            pass


async def enter_2fa(page, code):
    frame = await wait_auth_frame(page)
    digits = list(code.strip())
    filled = False

    # Dạng 6 ô riêng lẻ
    try:
        inputs = frame.locator('input[id^="char"]')
        n = await inputs.count()
        if n >= len(digits):
            for i, d in enumerate(digits):
                await inputs.nth(i).fill(d)
            filled = True
    except Exception:
        pass

    # Dạng 1 ô
    if not filled:
        for sel in [
            'input[autocomplete="one-time-code"]',
            'input[type="tel"]',
            'input[type="text"]',
        ]:
            try:
                loc = frame.locator(sel).first
                if await loc.count() > 0:
                    await loc.fill(code)
                    filled = True
                    break
            except Exception:
                continue

    await page.wait_for_timeout(3000)


async def continue_past_trust(page):
    """Bỏ qua màn hình 'Trust this browser?' nếu có."""
    await page.wait_for_timeout(2000)
    frame = await wait_auth_frame(page, timeout=8000)
    for name in ["Trust", "Don.t Trust", "Continue"]:
        try:
            loc = frame.get_by_role("button", name=re.compile(name, re.I)).first
            if await loc.count() > 0:
                await loc.click(timeout=4000)
                break
        except Exception:
            continue
    await page.wait_for_timeout(3000)


# =========================
# SHARED: thu thập + báo cáo sau khi đã đăng nhập
# =========================
async def collect_and_report(update, page, ctx, state, email="", steps=None):
    """Sau khi đã đăng nhập: chờ apps API, lấy membership, gửi text + ảnh."""
    if steps is None:
        steps = []

    await send_step(update, steps, "📦 Đang lấy danh sách app...")

    # chờ về trang apps + API trả về
    try:
        await page.wait_for_url(
            "**/appstoreconnect.apple.com/apps**", timeout=120000
        )
    except Exception:
        pass
    try:
        await page.wait_for_response(
            lambda r: "/iris/v1/apps?" in r.url and "displayableVersions" in r.url,
            timeout=60000,
        )
    except Exception:
        pass

    await page.wait_for_timeout(3000)
    await page.wait_for_timeout(3000)  # chờ icon app load

    apps_shot = None
    try:
        apps_shot = f"apps_{int(time.time())}.png"
        await page.screenshot(path=apps_shot)
    except Exception:
        apps_shot = None

    apps_text = build_apps_text(state.get("apps"))

    await send_step(update, steps, "🍎 Đang lấy Membership & ngày tham gia...")
    membership_text, m_shot, a_shot = await fetch_membership_and_agreement(ctx, email)

    await send_step(update, steps, "📤 Đang gửi kết quả...")

    full = f"""
{membership_text[:3000]}

============================

{apps_text}
"""

    if len(full) > 4000:
        for i in range(0, len(full), 4000):
            await update.message.reply_text(full[i:i + 4000])
    else:
        await update.message.reply_text(full)

    await send_photos(
        update,
        [
            (apps_shot, "📸 App Store Connect - /apps"),
            (m_shot, "📸 Developer - Membership"),
            (a_shot, "📸 Developer - Agreement History"),
        ],
    )

    # Xóa hết thông báo bước sau khi đã gửi xong kết quả + ảnh
    await clear_steps(steps)


async def send_step(update, steps, text):
    """Gửi 1 thông báo bước và ghi lại để xóa sau."""
    try:
        m = await update.message.reply_text(text)
        steps.append(m)
        return m
    except Exception:
        return None


async def clear_steps(steps):
    """Xóa hết các thông báo bước."""
    for m in steps:
        try:
            await m.delete()
        except Exception:
            pass
    steps.clear()


async def send_photos(update, items):
    opened = []
    try:
        media = []
        for path, caption in items:
            if path:
                f = open(path, "rb")
                opened.append(f)
                media.append(InputMediaPhoto(media=f, caption=caption))
        if media:
            await update.message.reply_media_group(media=media)
    except Exception as e:
        await update.message.reply_text(f"Không gửi được ảnh: {e}")
    finally:
        for f in opened:
            f.close()


# =========================
# /acc  — LOGIN THỦ CÔNG (giữ nguyên cách cũ)
# =========================
async def run_apple_flow():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        ctx = await browser.new_context()
        page = await ctx.new_page()

        state = {"apps": None}

        async def handle_response(response):
            if "/iris/v1/apps?" in response.url and "displayableVersions" in response.url:
                try:
                    state["apps"] = await response.json()
                except Exception:
                    pass

        page.on("response", handle_response)

        await page.goto("https://appstoreconnect.apple.com/apps")

        print("\nLOGIN APPLE ACCOUNT...")
        await page.wait_for_url(
            "**/appstoreconnect.apple.com/apps**", timeout=300000
        )

        try:
            await page.wait_for_response(
                lambda r: "/iris/v1/apps?" in r.url
                and "displayableVersions" in r.url,
                timeout=60000,
            )
        except Exception:
            pass

        await page.wait_for_timeout(3000)
        await page.wait_for_timeout(3000)

        apps_shot = None
        try:
            apps_shot = f"apps_{int(time.time())}.png"
            await page.screenshot(path=apps_shot)
        except Exception:
            apps_shot = None

        apps_text = build_apps_text(state.get("apps"))
        membership_text, m_shot, a_shot = await fetch_membership_and_agreement(ctx)

        await browser.close()

    return apps_text, membership_text, apps_shot, m_shot, a_shot


async def acc(update: Update, context: ContextTypes.DEFAULT_TYPE):
    steps = []
    await send_step(update, steps, "🌐 Mở trình duyệt, chờ đăng nhập thủ công...")
    try:
        apps_text, membership_text, apps_shot, m_shot, a_shot = await run_apple_flow()

        await send_step(update, steps, "📤 Đang gửi kết quả...")

        full = f"""
{membership_text[:3000]}

============================

{apps_text}
"""
        if len(full) > 4000:
            for i in range(0, len(full), 4000):
                await update.message.reply_text(full[i:i + 4000])
        else:
            await update.message.reply_text(full)

        await send_photos(
            update,
            [
                (apps_shot, "📸 App Store Connect - /apps"),
                (m_shot, "📸 Developer - Membership"),
                (a_shot, "📸 Developer - Agreement History"),
            ],
        )

        await clear_steps(steps)
    except Exception as e:
        await update.message.reply_text(f"ERROR: {e}")


# =========================
# /login  — BÁN TỰ ĐỘNG (bot điền email/pass, hỏi mã 2FA)
# =========================
async def login_start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    raw = update.message.text or ""

    # Tách phần sau lệnh. Hỗ trợ phân tách bằng '/' HOẶC khoảng trắng:
    #   /login username/password            (bán tự động)
    #   /login username/password/sms        (tự động hoàn toàn)
    #   /login username password            (bán tự động)
    #   /login username password   sms      (tự động hoàn toàn)
    parts = raw.split(maxsplit=1)
    if len(parts) < 2:
        await update.message.reply_text(
            "Cú pháp:\n"
            "/login username/password\n"
            "/login username/password/sms\n"
            "(hoặc cách nhau bằng khoảng trắng)\n(gõ /cancel để hủy)"
        )
        return ConversationHandler.END

    arg = parts[1].strip()

    # 1) Tách phần SMS (chuỗi chứa link http), nếu có
    sms = ""
    idx = arg.find("http")
    if idx != -1:
        start = idx
        while start > 0 and arg[start - 1] not in (" ", "\t", "\n", "/"):
            start -= 1
        sms = arg[start:].strip()
        arg = arg[:start].strip().rstrip("/").strip()

    # 2) Tách username/password: ưu tiên khoảng trắng, fallback dấu '/'
    if re.search(r"\s", arg):
        pair = arg.split(None, 1)
    elif "/" in arg:
        pair = arg.split("/", 1)
    else:
        pair = [arg]

    if len(pair) < 2:
        await update.message.reply_text("Thiếu username hoặc password.")
        return ConversationHandler.END

    email = pair[0].strip()
    password = pair[1].strip()

    if not email or not password:
        await update.message.reply_text("Thiếu username hoặc password.")
        return ConversationHandler.END

    context.user_data["email"] = email
    context.user_data["steps"] = []
    steps = context.user_data["steps"]

    await send_step(update, steps, "🔐 Đang đăng nhập...")

    p = await async_playwright().start()
    browser = await p.chromium.launch(headless=False)
    ctx = await browser.new_context()
    page = await ctx.new_page()

    state = {"apps": None}

    async def handle_response(response):
        if "/iris/v1/apps?" in response.url and "displayableVersions" in response.url:
            try:
                state["apps"] = await response.json()
            except Exception:
                pass

    page.on("response", handle_response)

    try:
        await page.goto("https://appstoreconnect.apple.com/apps")
        await do_apple_login(page, email, password)
    except Exception as e:
        await update.message.reply_text(f"Lỗi khi đăng nhập: {e}")
        try:
            await browser.close()
            await p.stop()
        except Exception:
            pass
        return ConversationHandler.END

    # Lưu lại để bước nhập mã 2FA dùng tiếp
    context.user_data["pw"] = (p, browser, ctx, page, state)

    # Account nhiều số: chọn số đầu tiên để Apple gửi OTP
    await choose_phone_number(page)

    if await is_2fa_present(page):
        # --- Chế độ AUTO: tự lấy OTP từ link SMS ---
        if sms:
            url = extract_otp_url(sms)
            if not url:
                await update.message.reply_text("❌ SMS không chứa link http. Hủy.")
                await _cleanup(context)
                return ConversationHandler.END

            await send_step(update, steps, "📨 Đang lấy OTP từ SMS (tối đa 1 phút)...")
            otp = await fetch_otp_from_url(ctx, url, total=60, interval=5)

            if not otp:
                await update.message.reply_text(
                    "❌ Không lấy được OTP sau 1 phút. Hủy tác vụ."
                )
                await _cleanup(context)
                return ConversationHandler.END

            await send_step(update, steps, f"🔑 OTP: {otp}")
            try:
                await enter_2fa(page, otp)
                await continue_past_trust(page)
            except Exception as e:
                await update.message.reply_text(f"Lỗi nhập mã: {e}")

            await _finalize(update, context)
            return ConversationHandler.END

        # --- Chế độ BÁN TỰ ĐỘNG: hỏi người dùng ---
        await send_step(update, steps, "📲 Đã gửi OTP. Nhập MÃ 6 SỐ (2FA):")
        return TWOFA

    # Không cần 2FA → chạy luôn
    await _finalize(update, context)
    return ConversationHandler.END


async def login_2fa(update: Update, context: ContextTypes.DEFAULT_TYPE):
    code = update.message.text.strip()
    pw = context.user_data.get("pw")
    if not pw:
        await update.message.reply_text("Phiên đã hết. Gõ /login để bắt đầu lại.")
        return ConversationHandler.END

    steps = context.user_data.get("steps", [])
    _, _, _, page, _ = pw
    try:
        await send_step(update, steps, "⏳ Đang xác thực mã...")
        await enter_2fa(page, code)
        await continue_past_trust(page)
    except Exception as e:
        await update.message.reply_text(f"Lỗi nhập mã: {e}")

    await _finalize(update, context)
    return ConversationHandler.END


async def _cleanup(context):
    """Đóng trình duyệt + dọn state (dùng khi hủy giữa chừng)."""
    pw = context.user_data.pop("pw", None)
    if pw:
        p, browser, _, _, _ = pw
        try:
            await browser.close()
        except Exception:
            pass
        try:
            await p.stop()
        except Exception:
            pass
    context.user_data.pop("email", None)
    context.user_data.pop("steps", None)


async def _finalize(update, context):
    p, browser, ctx, page, state = context.user_data.get("pw")
    email = context.user_data.get("email", "")
    steps = context.user_data.get("steps", [])
    try:
        await collect_and_report(update, page, ctx, state, email, steps)
    except Exception as e:
        await update.message.reply_text(f"ERROR: {e}")
    finally:
        try:
            await browser.close()
        except Exception:
            pass
        try:
            await p.stop()
        except Exception:
            pass
        context.user_data.pop("pw", None)
        context.user_data.pop("email", None)
        context.user_data.pop("steps", None)


async def login_cancel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    pw = context.user_data.pop("pw", None)
    if pw:
        _, browser, _, _, _ = pw
        try:
            await browser.close()
        except Exception:
            pass
    context.user_data.pop("email", None)
    await update.message.reply_text("Đã hủy.")
    return ConversationHandler.END


# =========================
# MAIN
# =========================
def main():
    app = Application.builder().token(BOT_TOKEN).build()

    app.add_handler(CommandHandler("acc", acc))

    conv = ConversationHandler(
        entry_points=[CommandHandler("login", login_start)],
        states={
            TWOFA: [MessageHandler(filters.TEXT & ~filters.COMMAND, login_2fa)],
        },
        fallbacks=[CommandHandler("cancel", login_cancel)],
    )
    app.add_handler(conv)

    print("Bot started...")
    app.run_polling()


if __name__ == "__main__":
    main()
