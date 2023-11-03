## 1. lấy danh sách bạn bè

1. phương thức:

   POST: http://localhost:3000/friend/getFriendList

2. cấu trúc:
   
   không cần truyền tham số

3. trả về:

```javascript
{
    "status": 200,
    "payload": [
        {
            "ma_nguoi_dung": 1,
            "ten": "Nam",
            "ngay_sinh": "1991-09-28T17:00:00.000Z",
            "tai_khoan": "nam",
            "email": "nam@gmail.com",
            "so_dien_thoai": "0912345678",
            "gioi_tinh": 1,
            "anh": {
                "ma_anh": 37,
                "url": "https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?w=512&ssl=1",
                "ngay_cap_nhat": "2023-09-01T09:51:53.000Z",
                "ma_nguoi_dung": 1,
                "is_active": 1
            },
            "isOnline": false
        },
        {
            "ma_nguoi_dung": 2,
            "ten": "Dung",
            "ngay_sinh": "1991-09-29T17:00:00.000Z",
            "tai_khoan": "dung",
            "email": "dung@gmail.com",
            "so_dien_thoai": "0912345679",
            "gioi_tinh": 1,
            "anh": {
                "ma_anh": 39,
                "url": "https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?w=512&ssl=1",
                "ngay_cap_nhat": "2023-09-01T09:52:48.000Z",
                "ma_nguoi_dung": 2,
                "is_active": 1
            },
            "isOnline": false
        },
        {
            "ma_nguoi_dung": 3,
            "ten": "Teo",
            "ngay_sinh": "1991-09-30T17:00:00.000Z",
            "tai_khoan": "teo",
            "email": "teo@gmail.com",
            "so_dien_thoai": "0912345680",
            "gioi_tinh": 1,
            "anh": {
                "ma_anh": null,
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
                "ngay_cap_nhat": null,
                "ma_nguoi_dung": "3",
                "is_active": null
            },
            "isOnline": false
        }
    ],
    "message": "lấy danh sách bạn bè thành công",
    "errno": null,
    "errcode": null
}
```

