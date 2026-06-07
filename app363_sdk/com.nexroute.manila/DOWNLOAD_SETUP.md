# Hướng dẫn Download File

App này có chức năng tải file .zip từ URL và giải nén vào thư mục project trong Documents.

## Cách sử dụng

1. **Chạy app** và nhấn nút download (nút tròn ở góc phải trên)
2. **App sẽ tự động**:
   - Tải file từ URL: `https://app-assets-manifest.s3.ap-southeast-1.amazonaws.com/363/sun.zip`
   - Lưu file zip vào: `Documents/SpanishVocabProject/sun.zip`
   - Giải nén vào: `Documents/SpanishVocabProject/extracted_files/`

## Cấu trúc thư mục

```
Documents/
└── SpanishVocabProject/
    ├── sun.zip                    # File zip đã tải
    └── extracted_files/           # Thư mục chứa file đã giải nén
        ├── data/
        ├── __MACOSX/
        └── ... (các file khác)
```

## Tính năng

- ✅ Tải file .zip từ URL trực tiếp
- ✅ Giải nén tự động vào thư mục project
- ✅ Hiển thị tiến trình download
- ✅ Thông báo kết quả thành công/lỗi
- ✅ Tạo thư mục project riêng biệt

## Cài đặt

Chạy lệnh để cài đặt dependencies:

```bash
flutter pub get
```

## Troubleshooting

**Lỗi thường gặp:**
- **Network error**: Kiểm tra kết nối internet
- **Permission denied**: App cần quyền truy cập Documents
- **File not found**: Kiểm tra URL có đúng không

**Debug:**
- Xem console logs để biết lỗi chi tiết
- Kiểm tra thư mục Documents/SpanishVocabProject/