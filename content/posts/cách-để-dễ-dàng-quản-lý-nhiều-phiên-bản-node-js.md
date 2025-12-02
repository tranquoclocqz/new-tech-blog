---
title: Cách để dễ dàng quản lý nhiều phiên bản Node.js
slug: cach-de-de-dang-quan-ly-nhieu-phien-ban-nodejs
date: 2025-12-02T21:46:00.000+07:00
summary: Mô tả ngắn
description: NVM (Node Version Manager) là công cụ quản lý nhiều phiên bản
  nodejs trên cùng một máy tính, chỉ cần vài thao tác là có thể cài đặt, thay
  đổi phiên bản nodejs theo nhu cầu dự án
---
## Tại sao cần quản lý phiên bản Node.js?

Trong phát triển phần mềm với Node.js, việc chạy đồng thời nhiều dự án hoặc duy trì dự án cũ lâu năm thường đòi hỏi những phiên bản Node khác nhau. Nếu chỉ cài một phiên bản Node cố định trên máy, sẽ dễ gặp các lỗi tương thích khi các dự án yêu cầu phiên bản cũ hơn hoặc mới hơn, dẫn tới mất thời gian cài đặt, gỡ bỏ, và sửa cấu hình. Do đó, quản lý phiên bản Node một cách linh hoạt giúp:

* Chạy được dự án cũ lẫn dự án mới trên cùng một máy mà không xung đột.
* Đảm bảo môi trường phát triển đúng với yêu cầu phiên bản cụ thể của từng dự án.
* Giảm rủi ro lỗi khi chuyển đổi giữa các dự án hoặc khi nâng cấp Node cho một dự án mới, tránh ảnh hưởng tới dự án khác đang dùng phiên bản cũ.

## Sự cần thiết của việc chạy các dự án cũ và mới

Trong thực tế, một lập trình viên hoặc nhóm phát triển thường phải:

* Duy trì sản phẩm đã triển khai từ lâu, vốn dùng một phiên bản Node nhất định. Việc nâng cấp Node đột ngột có thể phá vỡ các dependency, tính năng, hoặc build script đã ổn định.
* Bắt đầu các dự án mới muốn tận dụng phiên bản Node hiện đại có nhiều tính năng hoặc tối ưu mới.
* Thử nghiệm, kiểm tra hoặc đóng gói ứng dụng cho các môi trường khác nhau, từ local, staging đến production, mà mỗi môi trường có thể dùng phiên bản Node hơi khác nhau.

Nếu không có công cụ quản lý phiên bản, người dùng dễ phải gỡ cài đặt và cài lại Node liên tục, hoặc chấp nhận một phiên bản duy nhất gây lỗi với dự án khác. Việc quản lý phiên bản cho phép:

* Chuyển đổi nhanh giữa các phiên bản chỉ bằng vài lệnh, không tác động tới cài đặt hệ thống tổng thể.
* Lưu cấu hình phiên bản cụ thể cho từng dự án, giúp đồng bộ đội nhóm và tự động hóa.

### Xung đột phiên bản trong các môi trường khác nhau

Xung đột phiên bản xảy ra khi:

1. Một máy hoặc một môi trường chứa nhiều dự án yêu cầu phiên bản Node khác nhau.
2. Dependency hoặc module native binary chỉ tương thích với một phiên bản Node cụ thể, trong khi môi trường hiện tại đang dùng phiên bản khác.
3. Khi nâng cấp Node cho một dự án, các dự án khác trên cùng máy bị ảnh hưởng vì môi trường Node toàn cục bị thay đổi.

Các vấn đề phổ biến do xung đột:

* Lỗi khi chạy script, build, hoặc test do API đã thay đổi ở phiên bản mới.
* Module không thể cài hoặc biên dịch nếu Node quá cũ hoặc quá mới.
* Phải giữ nhiều máy ảo hoặc container riêng biệt để tránh xung đột, gây phức tạp.

Dùng công cụ quản lý phiên bản giúp:

* Mỗi dự án chạy trong đúng phiên bản Node mà không cần thay đổi toàn bộ hệ thống.
* Tránh xung đột giữa các dự án cũ và mới; trở nên dễ dàng kiểm tra, sửa lỗi và cập nhật.

### Giới thiệu các công cụ quản lý phiên bản

Hiện có một số công cụ phổ biến giúp cài đặt và chuyển đổi giữa các phiên bản Node:

#### NVM cho Linux/Mac và các shell POSIX

NVM là một trình quản lý phiên bản Node mã nguồn mở, hoạt động trên các shell POSIX như bash. Nó cho phép cài đặt nhiều phiên bản Node và chuyển giữa chúng trên cơ sở từng shell. Nguồn hướng dẫn cài đặt và sử dụng ghi rõ NVM giúp cài đặt, quản lý và chuyển đổi phiên bản Node dễ dàng.

NVM rất hữu ích khi cần dùng đồng thời nhiều phiên bản hoặc đổi nhanh giữa chúng trong phát triển.

#### NVM for Windows

Được phát triển riêng cho Windows, khác với NVM gốc trên Linux/Mac, vẫn mục tiêu quản lý nhiều phiên bản Node. Dự án nhấn mạnh đây không phải bản sao của nvm trên POSIX, nhưng có chức năng tương tự.

Tài liệu cho thấy việc chuyển đổi giữa các phiên bản Node trên Windows có thể cần quyền quản trị và lưu ý xung đột với cài đặt Node trước đó, nhưng cho phép cài và dùng phiên bản ổn định hoặc mới nhất. 

Đây là lựa chọn thuận tiện cho người dùng Windows muốn quản lý đa phiên bản mà không phải dùng nhiều máy hoặc container.

#### Một số lựa chọn khác và thảo luận cộng đồng

Trên diễn đàn phát triển, có người dùng chia sẻ kinh nghiệm dùng NVM rất thuận tiện để cài và cập nhật Node, và cũng có người dùng đề cập đến các công cụ khác như Volta. Những trao đổi này cho thấy nhu cầu thực tế và cân nhắc giữa các công cụ.

Nội dung thảo luận cũng đề cập đến việc NVM dễ dùng để chuyển phiên bản cho công việc dài hạn, trong khi các công cụ khác có cách dùng hoặc ưu điểm riêng. Điều này phản ánh việc nên chọn công cụ phù hợp với thói quen và môi trường làm việc.

## II. Giải pháp phổ biến: Node Version Manager (NVM)

* NVM là gì và cách thức hoạt động.
* Ưu điểm của NVM so với việc cài đặt thủ công.

## III. Hướng dẫn cài đặt NVM (cho Linux/macOS và Windows)

* **A. Cài đặt trên Linux/macOS:** Sử dụng `curl` hoặc `wget`.
* **B. Cài đặt trên Windows:** Giới thiệu NVM-Windows (khác với NVM gốc).
* Kiểm tra cài đặt thành công.

## IV. Các lệnh NVM cơ bản và cách sử dụng

* `nvm install <version>`: Cài đặt một phiên bản cụ thể.
* `nvm use <version>`: Chuyển đổi sang phiên bản đã cài đặt.
* `nvm ls`: Liệt kê các phiên bản đã có.
* `nvm alias default <version>`: Đặt phiên bản mặc định.
* `nvm run <version>`: Chạy một tệp script với phiên bản cụ thể.

## V. Các giải pháp thay thế NVM

* **Volta:** Công cụ tập trung vào tính năng "Zero-Configuration" (Cài đặt tự động).
* **n:** Công cụ đơn giản hơn, dựa trên Node.js.
* **Corepack:** Công cụ quản lý trình quản lý gói (Package Manager) được tích hợp trong Node.js (pnpm, yarn).

## VI. Kết luận và Mẹo nâng cao

* Tóm tắt lợi ích của việc sử dụng Version Manager.
* Mẹo: Quản lý các phiên bản Node.js trong môi trường CI/CD.
