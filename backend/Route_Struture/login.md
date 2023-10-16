# Login Struture

## Login

1. phương thức:
   POST: http://localhost:3000/login

2. cấu trúc:

```javascript
{
  tai_khoan: "string",
  mat_khau: "string"
}
```

3. trả về

- khi đúng:

```javascript
{
  "status": 200,
  "payload": [
      {
          "ma_nguoi_dung": 10,
          "ten": "Thanh",
          "ngay_sinh": "1991-10-07T17:00:00.000Z",
          "tai_khoan": "thanh",
          "email": "thanh@gmail.com",
          "so_dien_thoai": "0912345687",
          "gioi_tinh": 0,
          "anh": {
              "ma_anh": null,
              "url": ".............................",
              "ngay_cap_nhat": null,
              "ma_nguoi_dung": "..........................",
              "is_active": null
          },
          "token": ".............................."
      }
  ],
  "message": "Đăng nhập thành công",
  "errno": null,
  "errcode": null
}
```
