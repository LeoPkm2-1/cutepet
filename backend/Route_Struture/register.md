## 1. trang đăng ký

1. phương thức:

   GET: http://localhost:3000/register

2. cấu trúc:

```javascript
{
    ten:string (bắt buộc),
    tai_khoan:string (bắt buộc),
    mat_khau:string (bắt buộc),
    email:string (bắt buộc) dạng email,

}
```

3. trả về:

- khi thành công:

```javascript
{
    "status": 200,
    "payload": "...............................",
    "message": "Vui lòng xác thực đăng nhập bằng email đã đăng ký để hoàn tất",
    "errno": null,
    "errcode": null
}
```

- khi người dũng đã tồn tại:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "người dùng đã tồn tại",
    "errno": null,
    "errcode": null
}
```

- khi email cú pháp không hợp lệ

```javascript
{
    "status": 400,
    "payload": [],
    "message": "email không hợp lệ",
    "errno": null,
    "errcode": null
}
```

- khi email đã tồn tại

```javascript
{
    "status": 400,
    "payload": [],
    "message": "email đã tồn tại",
    "errno": null,
    "errcode": null
}
```

## 2. xác thực đăng ký

1. phương thức:

   POST: http://localhost:3000/user/confirmRegister

2. cấu trúc:

```javascript
{
    active_code:string (bắt buộc),
}
```

3. trả về:

- khi mã xác thực không hợp lệ

```javascript
{
    "status": 400,
    "payload": {},
    "message": "mã xác thực không đúng",
    "errno": 300,
    "errcode": 300
}
```

- khi xác nhận người dùng thành công

```javascript
{
    "status": 200,
    "payload": {
        "ma_nguoi_dung": 27,
        "ten": "...............",
        "ngay_sinh": null,
        "tai_khoan": ".................",
        "email": ".......................@gmail.com",
        "so_dien_thoai": null,
        "gioi_tinh": null,
        "anh": {
            "ma_anh": null,
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
            "ngay_cap_nhat": null,
            "ma_nguoi_dung": "27",
            "is_active": null
        }
    },
    "message": "hoàn tất xác thực đăng ký",
    "errno": null,
    "errcode": null
}
```
