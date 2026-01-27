---
title: Hướng dẫn cài đặt SSL cho XAMPP (windows)
slug: huong-dan-cai-dat-ssl-cho-xampp-windows
date: 2025-12-31T21:33:00.000+07:00
cover: /images/huong-dan-cai-dat-ssl-cho-xampp-windows.jpg
image_mobile: /images/huong-dan-cai-dat-ssl-cho-xampp-windows_mobile.jpg
summary: "Tạm biệt đường dẫn localhost nhàm chán. Bài viết này sẽ giúp bạn sở
  hữu domain ảo cực xịn (ví dụ: loclaptrinh.test) với ổ khóa xanh HTTPS ngay
  trên máy tính cá nhân."
description: Hướng dẫn từng bước cài đặt SSL cho XAMPP trên Windows. Cách tự tạo
  chứng chỉ SSL (Self-signed) và cấu hình Apache để chạy website với giao thức
  HTTPS an toàn
keywords: cài đặt ssl xampp,ssl xampp windows,https xampp,tạo chứng chỉ ssl
  localhost,fix lỗi not secure xampp,ssl cho xampp
---
Bạn chán ngấy việc phải gõ đường dẫn dài ngoằng kiểu `http://localhost/du-an-a`? Bạn cần test các tính năng yêu cầu HTTPS (như Facebook Login, Camera API) nhưng XAMPP mặc định lại báo lỗi bảo mật đỏ lòm?

Đừng lo, bài viết này sẽ hướng dẫn bạn cách thiết lập **Domain ảo (Virtual Host)** và cài đặt **Chứng chỉ SSL** để có được "ổ khóa xanh" uy tín ngay trên Localhost.

## Công cụ cần chuẩn bị

Trước khi bắt đầu, bạn hãy tải bộ công cụ tạo chứng chỉ SSL tự động tại đây:
👉 **[Tải xuống Source Code tạo SSL](/xampp-ssl.zip)**

- - -

## Bước 1: Tạo chứng chỉ SSL (Certificate)

Đầu tiên, chúng ta cần tạo ra "chìa khóa" bảo mật cho tên miền ảo của bạn.

1. Truy cập vào thư mục cài đặt Apache của XAMPP (thường là `xampp/apache`).
2. Tạo một thư mục mới tên là `crt`.
3. Giải nén file `.zip` vừa tải ở trên vào trong thư mục `crt` này.
4. Ở file `cert.conf` bạn hãy tìm `thiepcuoionlss.com` và thay thế toàn bộ thành tên miền bạn mong muốn.
5. Chạy file `make-cert.bat`. Một cửa sổ dòng lệnh sẽ hiện ra, bạn điền thông tin như sau:

* **Enter Domain:** Nhập tên miền ảo bạn muốn (Ví dụ: `loclaptrinh.test`).
* **Các dòng tiếp theo** (Country, State, Locality, Organization...): Bạn cứ nhấn **Enter** để bỏ qua cho nhanh.
* **Common Name (e.g. server FQDN):** **Quan trọng!** Hãy nhập lại chính xác tên miền ảo của bạn (Ví dụ: `loclaptrinh.test`).
* **Email Address:** Nhấn **Enter** bỏ qua.

![Hướng dẫn cài đặt SSL cho XAMPP (windows)](/images/huong-dan-cai-dat-ssl-cho-xampp-windows-1.jpg)

Sau khi hoàn tất, trong thư mục `xampp/apache/crt/` sẽ xuất hiện một folder mới tên là `loclaptrinh.test` chứa 2 file quan trọng: `server.crt` và `server.key`.

## Bước 2: Cài đặt chứng chỉ vào Windows (Trusted Root)

Để trình duyệt hiển thị "ổ khóa xanh" và không báo lỗi bảo mật, bạn cần nói cho Windows biết rằng chứng chỉ này là "người nhà".

Click đúp vào file `server.crt` vừa tạo.

Chọn **Install Certificate...** -> Chọn **Local Machine** -> Nhấn **Next**.

![Hướng dẫn cài đặt SSL cho XAMPP (windows)](/images/huong-dan-cai-dat-ssl-cho-xampp-windows-2.jpg)

![Hướng dẫn cài đặt SSL cho XAMPP (windows)](/images/huong-dan-cai-dat-ssl-cho-xampp-windows-3.jpg)

Chọn dòng **Place all certificates in the following store**.

![Hướng dẫn cài đặt SSL cho XAMPP (windows)](/images/huong-dan-cai-dat-ssl-cho-xampp-windows-4.jpg)

Nhấn **Browse** -> Chọn mục **Trusted Root Certification Authorities** (Cơ quan quản lý chứng chỉ gốc tin cậy).

![Hướng dẫn cài đặt SSL cho XAMPP (windows)](/images/huong-dan-cai-dat-ssl-cho-xampp-windows-5.jpg)

Nhấn **OK** -> **Next** -> **Finish**.

![Hướng dẫn cài đặt SSL cho XAMPP (windows)](/images/huong-dan-cai-dat-ssl-cho-xampp-windows-6.jpg)

Thông báo "The import was successful" hiện ra là bạn đã thành công!

## Bước 3: Cấu hình Domain ảo (File Hosts)

Bước này giúp Windows hiểu rằng khi bạn gõ `loclaptrinh.test`, nó sẽ tìm ở máy của bạn chứ không tìm trên Internet.

1. Vào đường dẫn: `C:\Windows\System32\drivers\etc`.
2. Copy file `hosts` ra màn hình Desktop (để tránh lỗi quyền Admin khi sửa).
3. Mở file `hosts` ngoài Desktop bằng Notepad hoặc VS Code.
4. Thêm dòng sau vào cuối file:

```text
127.0.0.1       loclaptrinh.test
```

5. Lưu lại, sau đó copy file `hosts` từ Desktop dán đè ngược lại vào thư mục `C:\Windows\System32\drivers\etc`.

## Bước 4: Cấu hình Apache (Virtual Host)

Đây là bước cuối cùng để kết nối mọi thứ lại với nhau.

1. Mở file cấu hình Virtual Host của XAMPP tại: `xampp/apache/conf/extra/httpd-vhosts.conf`.
2. Thêm đoạn cấu hình sau xuống dưới cùng file:

```apache
## Cấu hình cho HTTP (Cổng 80)
<VirtualHost *:80>
    DocumentRoot "E:/XAMPP/htdocs/loclaptrinh.test/"
    ServerName loclaptrinh.test
    ServerAlias *.loclaptrinh.test
    <Directory "E:/XAMPP/htdocs/loclaptrinh.test/">
        AllowOverride All
        Require all granted
        Options Indexes FollowSymLinks
    </Directory>
</VirtualHost>

## Cấu hình cho HTTPS (Cổng 443 - SSL)
<VirtualHost *:443>
    DocumentRoot "E:/XAMPP/htdocs/loclaptrinh.test/"
    ServerName loclaptrinh.test
    ServerAlias *.loclaptrinh.test
    
    # Kích hoạt SSL
    SSLEngine on
    SSLCertificateFile "E:/XAMPP/apache/crt/loclaptrinh.test/server.crt"
    SSLCertificateKeyFile "E:/XAMPP/apache/crt/loclaptrinh.test/server.key"
    
    <Directory "E:/XAMPP/htdocs/loclaptrinh.test/">
        AllowOverride All
        Require all granted
        Options Indexes FollowSymLinks
    </Directory>
</VirtualHost>
```

**⚠️ Lưu ý quan trọng:**

* Đường dẫn `E:/XAMPP/...` trong code trên là ví dụ. Hãy sửa lại cho đúng với ổ đĩa cài XAMPP trên máy bạn (thường là `C:/xampp/...`).
* `DocumentRoot` phải trỏ đúng vào thư mục chứa code của bạn.
* `SSLCertificateFile` và `SSLCertificateKeyFile` là đường dẫn tới 2 file `server.crt` và `server.key` bạn đã tạo ở **Bước 1**

## Bước 5: Tận hưởng thành quả

Cuối cùng, hãy tắt và bật lại **Apache** trong XAMPP Control Panel (Restart).

Bây giờ hãy mở trình duyệt và truy cập: `https://loclaptrinh.test`. Nếu bạn thấy biểu tượng ổ khóa an toàn hiện lên, chúc mừng bạn đã nâng tầm môi trường lập trình của mình lên chuyên nghiệp hơn rất nhiều!

![Hướng dẫn cài đặt SSL cho XAMPP (windows)](/images/huong-dan-cai-dat-ssl-cho-xampp-windows-9.jpg)
