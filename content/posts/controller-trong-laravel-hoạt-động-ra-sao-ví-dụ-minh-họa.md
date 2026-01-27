---
title: Controller trong Laravel là gì? Hướng dẫn xử lý logic trong mô hình MVC
slug: controller-trong-laravel-la-gi
date: 2026-01-04T14:39:00.000+07:00
cover: /images/controller-trong-laravel-la-gi.jpg
image_mobile: /images/controller-trong-laravel-la-gi_mobile.jpg
summary: Controller đóng vai trò gì trong Laravel? Tại sao nên dùng Resource
  Controller? Hướng dẫn chi tiết cách tạo và sử dụng Controller để xử lý logic
  ứng dụng.
description: "Tìm hiểu Controller trong Laravel: Cách hoạt động, cách tạo bằng
  php artisan, và ví dụ minh họa Resource Controller xử lý CRUD chuẩn."
keywords: laravel controller, php artisan make controller, resource controller
  laravel, mvc laravel, route to controller
---
Trong kiến trúc MVC, Controller đóng vai trò là trung tâm xử lý logic.

Khi người dùng gửi một yêu cầu (như xem bài viết, đăng nhập, gửi form), họ không thể tương tác trực tiếp với Cơ sở dữ liệu (Model) hay tự ý thay đổi Giao diện (View). Mọi yêu cầu này bắt buộc phải đi qua Controller.

Tại đây, Controller sẽ tiếp nhận thông tin, xử lý các nghiệp vụ cần thiết, gọi dữ liệu và quyết định xem sẽ trả về kết quả gì cho người dùng. Trong bài viết này, chúng ta sẽ đi sâu vào cách Controller vận hành trong Laravel."

## 1. Controller hoạt động ra sao?

Trong kiến trúc MVC của Laravel, luồng đi của một yêu cầu (Request) sẽ như sau:

1. **User** truy cập đường dẫn (VD: `/san-pham`).
2. **Router** (`routes/web.php`) chặn đường dẫn đó lại và chỉ định: *"Đường dẫn này do ông `ProductController` xử lý"*.
3. **Controller** (`ProductController`) nhận việc. Nó sẽ thực hiện các logic như:

   * Hỏi **Model**: "Lấy cho tao danh sách sản phẩm từ database".
   * Tính toán, xử lý dữ liệu (nếu cần).
   * Gửi dữ liệu sang **View**.
4. **View** hiển thị giao diện HTML trả về cho User.

### Tại sao cần Controller?

Tại sao không viết code xử lý ngay trong file Route?

* **Gọn gàng:** File Route chỉ nên làm nhiệm vụ chỉ đường. Logic phức tạp nên đẩy vào Controller.
* **Tổ chức:** Giúp code dễ quản lý, phân chia các chức năng rõ ràng (UserController, ProductController, OrderController...).

## 2. Cách tạo Controller trong Laravel

Laravel cung cấp bộ công cụ **Artisan** cực mạnh để tạo file tự động. Bạn không cần phải tạo file thủ công rồi copy paste code mẫu.

Mở terminal (trong thư mục dự án) và gõ:

```bash
php artisan make:controller ProductController
```

Lệnh này sẽ tạo ra một file `ProductController.php` nằm trong thư mục `app/Http/Controllers`.

Nội dung mặc định sẽ trông như thế này:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Viết code xử lý của bạn ở đây
}
```

## 3. Ví dụ minh họa: Hiển thị danh sách sản phẩm

Giả sử bạn muốn làm trang hiển thị danh sách sản phẩm.

### Bước 1: Viết logic trong Controller

Mở file `app/Http/Controllers/ProductController.php` và thêm một hàm (method) tên là `index`:

```php
public function index()
{
    // 1. Giả lập lấy dữ liệu (Thực tế sẽ gọi từ Model)
    $products = [
        ['name' => 'iPhone 15', 'price' => 20000000],
        ['name' => 'Samsung S24', 'price' => 18000000],
        ['name' => 'Xiaomi 14', 'price' => 15000000]
    ];

    // 2. Trả về View và kèm theo dữ liệu
    // 'products.index' nghĩa là file: resources/views/products/index.blade.php
    return view('products.index', compact('products'));
}
```

### Bước 2: Khai báo Route

Mở file `routes/web.php` để kết nối đường dẫn với Controller vừa tạo:

```php
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// Khi user vào đường dẫn /san-pham -> Gọi hàm index của ProductController
Route::get('/san-pham', [ProductController::class, 'index']);
```

Vậy là xong! Khi khách truy cập `example.com/san-pham`, Laravel sẽ tự động gọi hàm `index`, lấy dữ liệu và hiển thị view.

## 4. Resource Controller: Vũ khí hạng nặng cho CRUD

Bạn nhớ bài viết về [CRUD là gì](/crud-la-gi/) chứ? Hầu hết các đối tượng trong web (Bài viết, Sản phẩm, User) đều xoay quanh 4 thao tác này.

Thay vì phải tự nghĩ tên hàm (`hienThi`, `themmoi`, `luuDuLieu`, `xoa`...), Laravel chuẩn hóa nó bằng **Resource Controller**.

Để tạo, bạn thêm `--resource` vào lệnh tạo controller:

```bash
php artisan make:controller PostController --resource
```

Kết quả, Laravel sẽ tạo sẵn cho bạn 7 hàm chuẩn mực cho một vòng đời CRUD:

| Tên hàm (Action) | Nhiệm vụ                                | Phương thức HTTP |
| ---------------- | --------------------------------------- | ---------------- |
| **index()**      | Hiển thị danh sách (Read)               | GET              |
| **create()**     | Hiện form thêm mới (Create - View)      | GET              |
| **store()**      | Xử lý lưu dữ liệu mới (Create - Logic)  | POST             |
| **show($id)**    | Xem chi tiết 1 cái (Read)               | GET              |
| **edit($id)**    | Hiện form sửa (Update - View)           | GET              |
| **update($id)**  | Xử lý cập nhật dữ liệu (Update - Logic) | PUT/PATCH        |
| **destroy($id)** | Xóa dữ liệu (Delete)                    | DELETE           |

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
```

Và trong Route, bạn chỉ cần khai báo đúng 1 dòng duy nhất để kích hoạt cả 7 đường dẫn này:

```php
Route::resource('posts', \App\Http\Controllers\PostController::class);
```

Để xem kết quả khi khai báo route bạn hãy gõ lệnh:

```bash
php artisan route:list
```

Đây chính là sự "ma thuật" khiến Laravel được yêu thích: Code ít, hiệu quả nhiều.

## 5. Nguyên tắc "Controller mỏng, Model dày"

Khi làm việc với Controller, người mới thường mắc lỗi: **Viết tất cả mọi thứ vào Controller**.

Ví dụ: Kiểm tra dữ liệu đầu vào, tính toán thuế, gửi email, lưu database... tất cả nhét vào hàm `store()`. Điều này biến Controller thành "Fat Controller" (Controller béo phì) -> Khó bảo trì.

**Lời khuyên:**

* **Controller:** Chỉ nên làm nhiệm vụ điều phối (Nhận request -> Gọi ai xử lý -> Trả về cái gì).
* **Model/Service:** Nên chứa các logic xử lý nghiệp vụ phức tạp.

## Tổng kết

Controller là trạm trung chuyển quan trọng nhất trong Laravel. Nắm vững cách sử dụng Controller và đặc biệt là **Resource Controller** sẽ giúp bạn xây dựng ứng dụng cực nhanh theo đúng chuẩn RESTful.

Ở bài tiếp theo, chúng ta sẽ đi sâu vào **View** và tìm hiểu về **[Blade Template Engine](/blade-template-engine-laravel-toan-tap/)** - công cụ giúp bạn tạo ra giao diện website tuyệt đẹp mà không cần code PHP lộn xộn.
