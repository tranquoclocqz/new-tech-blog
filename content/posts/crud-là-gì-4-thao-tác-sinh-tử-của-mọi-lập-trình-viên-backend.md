---
title: CRUD là gì? 4 thao tác 'sinh tử' của mọi lập trình viên Backend
slug: crud-la-gi
date: 2025-12-22T22:02:00.000+07:00
cover: /images/crud-la-gi.jpg
summary: "Mọi ứng dụng trên đời từ Facebook, Shopee đến các phần mềm ngân hàng
  đều vận hành xoay quanh 4 chữ cái: C-R-U-D. Nếu không nắm vững CRUD, bạn không
  thể trở thành Backend Developer."
description: Giải thích chi tiết CRUD là gì? Mối quan hệ giữa CRUD với SQL và
  HTTP Method. Ví dụ thực tế về ứng dụng quản lý nhân viên.
keywords: crud là gì, create read update delete, lập trình backend, thao tác cơ
  sở dữ liệu, sql basic, http methods
---
Ở bài viết trước, chúng ta đã tìm hiểu về [mô hình MVC](/mo-hinh-mvc-la-gi/) – cách tổ chức "bộ khung" cho một ngôi nhà. Hôm nay, chúng ta sẽ nói về những thứ bên trong ngôi nhà đó: **Dữ liệu (Data)**.

Bạn có bao giờ tự hỏi:

* Tại sao Facebook nhớ được status bạn vừa đăng?
* Tại sao Shopee biết giỏ hàng của bạn có những món gì?
* Tại sao khi bạn đổi mật khẩu, mật khẩu cũ không còn dùng được nữa?

Tất cả những phép màu đó đều được thực hiện bởi 4 thao tác cơ bản nhất của lập trình Backend, gọi tắt là **CRUD**.

## 1. CRUD là gì?

**CRUD** là từ viết tắt của 4 động từ trong tiếng Anh: **C**reate (Tạo), **R**ead (Đọc/xem), **U**pdate (Sửa), **D**elete (Xóa).

Đây là vòng đời cơ bản của mọi dữ liệu trong một ứng dụng phần mềm. Bất kể bạn đang xây dựng một blog cá nhân nhỏ xíu hay một hệ thống ngân hàng khổng lồ, công việc của bạn suy cho cùng cũng chỉ là đảm bảo 4 thao tác này diễn ra trơn tru và chính xác.

Hãy cùng mổ xẻ từng chữ cái một:

### C - Create (Tạo mới)

Đây là hành động sinh ra dữ liệu mới.

* **Ví dụ đời thường:** Bạn đăng ký tài khoản mới, bạn viết một status, bạn thêm một sản phẩm vào giỏ hàng.
* **Kết quả:** Dữ liệu được lưu trữ vĩnh viễn vào Cơ sở dữ liệu (Database).

### R - Read (Đọc/Xem)

Đây là hành động lấy dữ liệu đã lưu ra để hiển thị.

* **Ví dụ đời thường:** Bạn lướt Newsfeed (đọc status của bạn bè), bạn xem chi tiết một chiếc áo, bạn xem danh sách lịch sử giao dịch.
* **Đặc điểm:** Đây là thao tác **xảy ra nhiều nhất**. Một ứng dụng có thể chỉ Create 1 lần nhưng Read hàng nghìn lần.

### U - Update (Cập nhật/Sửa)

Đây là hành động chỉnh sửa thông tin của dữ liệu đang tồn tại.

* **Ví dụ đời thường:** Bạn đổi avatar, bạn sửa lại caption của bức ảnh vì viết sai chính tả, bạn cập nhật số lượng mua từ 1 lên 2.
* **Kết quả:** Dữ liệu cũ bị thay thế bởi dữ liệu mới.

### D - Delete (Xóa)

Đây là hành động xóa dữ liệu khỏi hệ thống.

* **Ví dụ đời thường:** Bạn xóa một bình luận toxic, bạn hủy kết bạn, Admin xóa một sản phẩm hết hàng.
* **Kết quả:** Dữ liệu biến mất (hoặc bị ẩn đi).

## 2. CRUD trong ngôn ngữ của Lập trình viên

Là một Developer, bạn không chỉ hiểu khái niệm, bạn cần biết cách "nói chuyện" với máy tính để thực hiện CRUD.

Khi chúng ta làm việc với Backend, CRUD sẽ được ánh xạ (map) trực tiếp sang **Câu lệnh SQL** (khi làm việc với Database) và **HTTP Method** (khi làm việc với API).

Đây là bảng "cửu chương" mà bạn bắt buộc phải thuộc lòng:

| Hành động (CRUD) | Ý nghĩa  | Câu lệnh SQL tương ứng | HTTP Method (RESTful API) |
| ---------------- | -------- | ---------------------- | ------------------------- |
| **C** - Create   | Tạo mới  | `INSERT INTO ...`      | `POST`                    |
| **R** - Read     | Đọc/Xem  | `SELECT ...`           | `GET`                     |
| **U** - Update   | Cập nhật | `UPDATE ...`           | `PUT` hoặc `PATCH`        |
| **D** - Delete   | Xóa      | `DELETE ...`           | `DELETE`                  |

*Ghi chú: Nếu bạn chưa biết SQL hay API là gì, đừng lo. Chỉ cần nhớ bảng này, sau này khi đụng vào code thực tế bạn sẽ thấy nó cực kỳ logic.*

## 3. Ví dụ thực chiến: Hệ thống Quản lý Nhân viên

Để chuẩn bị cho bài hướng dẫn thực hành sắp tới (Xây dựng ứng dụng PHP MVC CRUD), hãy cùng phân tích logic nghiệp vụ của một tính năng kinh điển: **Quản lý nhân viên**.

Giả sử chúng ta có một bảng dữ liệu tên là `employees` trong Database.

### Bước 1: Create - Tuyển nhân viên mới

Công ty vừa tuyển anh **Nguyễn Văn A**. Chị HR nhập thông tin anh A vào phần mềm và bấm "Lưu".

* **SQL chạy ngầm:**

  ```sql
  INSERT INTO employees (name, email, salary) 
  VALUES ('Nguyen Van A', 'a@company.com', 1000);
  ```
* **Kết quả:** Anh A xuất hiện trong hệ thống.

### Bước 2: Read - Xem danh sách

Sếp muốn xem công ty hiện tại có bao nhiêu người. Sếp mở trang "Danh sách nhân viên".

* **SQL chạy ngầm:**

  ```sql
  SELECT * FROM employees;
  ```
* **Kết quả:** Màn hình hiện ra một bảng danh sách, trong đó có anh A.

### Bước 3: Update - Tăng lương

Sau 6 tháng, anh A làm việc tốt. Sếp quyết định tăng lương cho anh A từ 1000$  lên  1200$.

* **SQL chạy ngầm:**

  ```sql
  UPDATE employees 
  SET salary = 1200 
  WHERE email = 'a@company.com';
  ```
* **Kết quả:** Lương anh A thay đổi. Thông tin cũ (1000$) bị ghi đè.

### Bước 4: Delete - Nghỉ việc

Anh A trúng số độc đắc và quyết định nghỉ việc đi du lịch vòng quanh thế giới. Chị HR xóa tên anh A khỏi hệ thống.

* **SQL chạy ngầm:**

  ```sql
  DELETE FROM employees WHERE email = 'a@company.com';
  ```
* **Kết quả:** Anh A bay màu khỏi danh sách. Tìm kiếm cũng không thấy nữa.

## 4. Một số lưu ý "sống còn" khi làm CRUD

Tuy lý thuyết đơn giản, nhưng khi đi làm thực tế, **CRUD** phức tạp hơn nhiều. Dưới đây là 2 kinh nghiệm xương máu của mình:

### 1. Hard Delete vs. Soft Delete (Xóa thật và Xóa mềm)

* **Hard Delete:** Là dùng lệnh `DELETE` trong SQL. Dữ liệu **mất vĩnh viễn** không thể khôi phục. Điều này rất nguy hiểm nếu lỡ tay xóa nhầm.
* **Soft Delete:** Trong thực tế, các công ty lớn (như Facebook) không bao giờ xóa thật dữ liệu của bạn. Họ chỉ đánh dấu nó là "Đã xóa".

  * Họ thêm một cột `deleted_at` vào bảng.
  * Khi bạn bấm xóa, họ chạy lệnh `UPDATE employees SET deleted_at = NOW()`.
  * Khi hiển thị (Read), họ chỉ lấy những dòng chưa bị đánh dấu xóa.
  * \=> **Lợi ích:** Có thể khôi phục lại dữ liệu nếu cần.

### 2. Phân quyền (Authorization)

Không phải ai cũng được quyền làm đủ 4 bước **C-R-U-D.**

* **Khách vãng lai (Guest):** Chỉ được **R** (Xem sản phẩm).
* **Khách hàng (User):** Được **C** (Tạo đơn hàng), **U** (Sửa địa chỉ).
* **Admin:** Mới được quyền **D** (Xóa sản phẩm, xóa user vi phạm).

## 5. Kết luận

Vậy là bạn đã nắm trong tay 2 mảnh ghép quan trọng nhất của lập trình Backend:

1. **MVC:** Cách tổ chức code (Kiến trúc sư).
2. **CRUD:** Cách xử lý dữ liệu (Thợ xây).

Bây giờ, đã đến lúc kết hợp lý thuyết vào thực hành. Bạn đã sẵn sàng để tự tay code một ứng dụng hoàn chỉnh từ con số 0 chưa?
