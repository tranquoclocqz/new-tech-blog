---
draft: false
meta:
  description: "Blade Template là gì? Tổng hợp tất cả các câu lệnh Blade: @if,
    @foreach, @extends, @yield, @include... Hướng dẫn build layout master
    chuẩn."
  keywords: blade template laravel, các câu lệnh blade, blade directive list,
    laravel view engine, layout inheritance laravel
title: Blade Template là gì? Cẩm nang toàn tập các câu lệnh Blade trong Laravel
slug: blade-template-engine-laravel-toan-tap
date: 2026-01-04T21:04:00.000+07:00
summary: Tổng hợp toàn bộ các câu lệnh (Directives) trong Blade Template. Hướng
  dẫn cách sử dụng Layout, Component, Loop và các mẹo xử lý View cực nhanh.
layout: single
cover: /images/blade-template-engine-laravel-toan-tap.jpg
categories: []
tags: []
description: "Blade Template là gì? Tổng hợp tất cả các câu lệnh Blade: @if,
  @foreach, @extends, @yield, @include... Hướng dẫn build layout master chuẩn."
keywords: blade template laravel, các câu lệnh blade, blade directive list,
  laravel view engine, layout inheritance laravel,mvc laravel,mvc cơ bản
---
Sau khi Controller đã xử lý xong dữ liệu, nó cần trả về một giao diện đẹp đẽ cho người dùng. Đó là lúc **View** xuất hiện.

Trong PHP thuần, bạn thường phải viết code kiểu này:

```php
<h1>Xin chào, <?php echo $name; ?></h1>
<?php if($age > 18): ?>
    <p>Đủ tuổi trưởng thành</p>
<?php endif; ?>
```

Nhưng với **Blade Template Engine** của Laravel, code của bạn sẽ trở nên thanh thoát như thơ:

```blade
<h1>Xin chào, {{ $name }}</h1>
@if($age > 18)
    <p>Đủ tuổi trưởng thành</p>
@endif
```

Bài viết này về cách sử dụng Blade Template, giúp bạn làm chủ từ những câu lệnh cơ bản đến nâng cao.

- - -

## PHẦN 1: CÁC TÍNH NĂNG CỐT LÕI (PHẢI BIẾT)

### 1. Hiển thị dữ liệu (Displaying Data)

* **In biến (An toàn):** `{{ $variable }}`
* Tự động chống XSS (chuyển đổi ký tự đặc biệt thành HTML entities).
* **In biến (Không escape - Nguy hiểm):** `{!! $variable !!}`
* Dùng khi bạn muốn hiển thị mã HTML (ví dụ nội dung bài viết từ editor).
* **Javascript Framework:** `@{{ variable }}`
* Giúp Blade bỏ qua, không biên dịch để VueJS/ReactJS xử lý.

### 2. Cấu trúc điều khiển (Control Structures)

Blade cung cấp các "phím tắt" thay thế cho cú pháp PHP rườm rà.

#### Câu lệnh điều kiện (Conditionals)

```blade
@if (count($records) === 1)
    Có 1 bản ghi
@elseif (count($records) > 1)
    Có nhiều bản ghi
@else
    Không có bản ghi nào
@endif

@unless (Auth::check())
    Bạn chưa đăng nhập!
@endunless

@isset($records)
    // Biến $records có tồn tại và khác null
@endisset

@empty($records)
    // Biến $records bị rỗng
@endempty
```

#### Vòng lặp (Loops)

```blade
@for ($i = 0; $i < 10; $i++)
    Giá trị là {{ $i }}
@endfor

@foreach ($users as $user)
    <p>User: {{ $user->name }}</p>
@endforeach

@while (true)
    <p>Vòng lặp vô tận</p>
@endwhile
```

🔥 Tuyệt chiêu: Biến `$loop` Trong vòng lặp `@foreach` , Blade tự động tặng bạn biến `$loop` cực mạnh:

```blade
@foreach ($users as $user)
    @if ($loop->first)
        Đây là user đầu tiên
    @endif

    @if ($loop->last)
        Đây là user cuối cùng
    @endif
    <p>{{ $loop->iteration }}. {{ $user->name }}</p> 
@endforeach
```

### 3. Layouts & Kế thừa (Inheritance) - Tính năng quan trọng nhất

Đây là lý do chính chúng ta dùng Blade: Tạo ra một bộ khung (Master Layout) và các trang con chỉ cần điền nội dung vào.

**File cha (`layouts/app.blade.php`):**

```blade
<html>
    <head>
        <title>@yield('title')</title>
    </head>
    <body>
        @include('partials.header') <div class="container">
            @yield('content') </div>
        @include('partials.footer')
    </body>
</html>
```

**File con (`home.blade.php`):**

```blade
@extends('layouts.app') 
@section('title', 'Trang chủ') 
@section('content') 
    <h1>Chào mừng đến với Website</h1>
    <p>Nội dung trang chủ...</p>
@endsection
```

### 4. Components (Blade hiện đại)

Thay vì dùng `@include`, Laravel hiện đại khuyến khích dùng **Component** (giống React/Vue).

Tạo component: `php artisan make:component Alert`

Sử dụng trong View:

```blade
<x-alert type="error" message="Có lỗi xảy ra!" />
```

- - -

## PHẦN 2: BẢNG TRA CỨU CÁC CÂU LỆNH (CHEAT SHEET)

Dưới đây là danh sách tổng hợp các Directives thường dùng để bạn tra cứu nhanh.

### 1. Nhúng và Kế thừa

| Câu lệnh                       | Mô tả                                                |
| ------------------------------ | ---------------------------------------------------- |
| `@extends('layout')`           | Chỉ định file layout cha.                            |
| `@section('name')`             | Định nghĩa một phần nội dung.                        |
| `@yield('name')`               | Hiển thị nội dung của một section (dùng ở file cha). |
| `@include('view')`             | Nhúng một view con vào (VD: header, footer).         |
| `@includeIf('view')`           | Chỉ nhúng nếu view đó tồn tại.                       |
| `@includeWhen($bool, 'view')`  | Chỉ nhúng nếu điều kiện đúng.                        |
| `@each('view', $array, 'var')` | Loop qua mảng và render view cho từng phần tử.       |

### 2. Stack & Push (Quản lý CSS/JS)

Dùng để chèn CSS/JS từ trang con vào layout cha (ví dụ chỉ trang Product mới cần file JS zoom ảnh).

* **File cha:** `@stack('scripts')`
* **File con:**

```blade
@push('scripts')
    <script src="/zoom.js"></script>
@endpush
```

### 3. Authentication (Xác thực)

| Câu lệnh                 | Mô tả                                             |
| ------------------------ | ------------------------------------------------- |
| `@auth` ... `@endauth`   | Chỉ hiển thị nếu user **đã đăng nhập**.           |
| `@guest` ... `@endguest` | Chỉ hiển thị nếu user **chưa đăng nhập** (Khách). |

### 4. Form & CSRF

| Câu lệnh            | Mô tả                                                                 |
| ------------------- | --------------------------------------------------------------------- |
| `@csrf`             | Tạo thẻ input hidden chứa token bảo mật (Bắt buộc cho mọi form POST). |
| `@method('PUT')`    | Giả lập method PUT (cho chức năng Update).                            |
| `@method('DELETE')` | Giả lập method DELETE (cho chức năng Xóa).                            |
| `@checked($dk)`     | Tự động thêm attribute `checked` nếu điều kiện đúng.                  |
| `@selected($dk)`    | Tự động thêm attribute `selected` nếu điều kiện đúng.                 |
| `@disabled($dk)`    | Tự động thêm attribute `disabled` nếu điều kiện đúng.                 |
| `@error('field')`   | Hiển thị lỗi validate của form.                                       |

### 5. Raw PHP & Comments

| Câu lệnh            | Mô tả                                                               |
| ------------------- | ------------------------------------------------------------------- |
| `@php ... @endphp`  | Viết code PHP thuần trong Blade (Hạn chế dùng).                     |
| `{{-- Comment --}}` | Comment của Blade (Sẽ không hiện khi View Source trên trình duyệt). |

### 6. Switch Case

```blade
@switch($i)
    @case(1)
        Là số 1
        @break
    @case(2)
        Là số 2
        @break
    @default
        Không biết số gì
@endswitch
```

### 7. @csrf

Trong HTML thuần, bạn chỉ cần tạo form và submit. Nhưng trong Laravel, nếu bạn tạo form method `POST`, `PUT` hoặc `DELETE` mà không có `@csrf`, bạn sẽ nhận ngay lỗi **419 Page Expired**.

#### Tại sao cần nó?

Đây là cơ chế bảo mật chống tấn công giả mạo (Cross-Site Request Forgery). Laravel muốn đảm bảo rằng: *"Cái form đang được submit kia chính là form do website của mình tạo ra, chứ không phải do một hacker nào đó gửi lệnh ngầm từ nơi khác tới"*.

#### Cách dùng:

Bạn chỉ cần đặt `@csrf` vào bất cứ đâu trong cặp thẻ `<form>`.

**Trong file Blade:**

```blade
<form action="/user/save" method="POST">
    @csrf
    <input type="text" name="name">
    <button type="submit">Lưu</button>
</form>
```

**Khi Laravel biên dịch ra HTML (View Source sẽ thấy):**

```html
<form action="/user/save" method="POST">
    <input type="hidden" name="_token" value="Chuoi_Ky_Tu_Ngau_Nhien_Dai_Ngoang...">
    <input type="text" name="name">
    <button type="submit">Lưu</button>
</form>
```

*Laravel sẽ tự động sinh ra một thẻ input ẩn chứa token. Khi submit, Laravel sẽ kiểm tra token này có khớp với session của người dùng không.*

- - -

### 8. @method

Đây là một hạn chế của HTML chứ không phải của Laravel.
Các thẻ Form HTML (`<form>`) chỉ hỗ trợ 2 phương thức duy nhất: **GET** và **POST**.

Tuy nhiên, chuẩn **RESTful** (mà Resource Controller sử dụng) lại yêu cầu:

* **PUT/PATCH:** Để cập nhật dữ liệu.
* **DELETE:** Để xóa dữ liệu.

Làm sao để gửi một request `PUT` khi cái form chỉ cho phép `POST`? Chúng ta dùng `@method`.

#### Cách dùng:

Bạn vẫn để `method="POST"` ở thẻ form, nhưng bên trong thêm `@method('PUT')`.

**Trong file Blade (Form sửa sản phẩm):**

```blade
<form action="/products/1" method="POST">
    @csrf
    @method('PUT') 
    <input type="text" name="name" value="iPhone 15">
    <button type="submit">Cập nhật</button>
</form>
```

**Khi Laravel biên dịch ra HTML:**

```html
<form action="/products/1" method="POST">
    <input type="hidden" name="_token" value="...">
    <input type="hidden" name="_method" value="PUT">
    <input type="text" name="name" value="iPhone 15">
    <button type="submit">Cập nhật</button>
</form>
```

*Khi Router nhận được request này, nó nhìn thấy `_method = PUT`, nó sẽ chuyển hướng request đó vào hàm `update()` trong Controller thay vì hàm `store()`.*

- - -

#### Ví dụ tổng hợp: Form Xóa (DELETE)

Một ví dụ kinh điển khác là nút "Xóa". Trong Laravel, chúng ta không dùng thẻ `<a>` để xóa (vì nó là method GET, rất nguy hiểm). Chúng ta phải dùng Form.

```blade
<form action="/products/1" method="POST" onsubmit="return confirm('Xóa thật không?');">
    @csrf
    @method('DELETE')

    <button type="submit" class="btn-danger">
        Xóa sản phẩm
    </button>
</form>
```

## Tổng kết

Blade Template Engine là một công cụ cực kỳ mạnh mẽ giúp việc viết HTML trở nên thú vị hơn.

* Hãy dùng **Layout** để quản lý giao diện chung.
* Hãy dùng **@include** hoặc **Components** để chia nhỏ các phần tử giao diện.
* Đừng quên **@csrf** trong mọi thẻ Form và **@method** tùy tình huống sử dụng.

Ở bài tiếp theo, chúng ta sẽ kết hợp Controller và Blade để xây dựng hoàn chỉnh tính năng **CRUD Sản phẩm**.
