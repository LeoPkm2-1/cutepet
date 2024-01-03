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
                "url": "https://firebasestorage.googleapis.com/v0/b/bkpetcare-e130a.appspot.com/o/images%2FUser-avatar.svg.png?alt=media&token=8fc5e517-78a1-4f12-84fa-2f18245f1dc9",
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

## 2. lấy danh sách lời mời kết bạn

1. phương thức:

   POST: http://localhost:3000/friend/getRequestAddFriendList

2. cấu trúc

   không cần truyền tham số

3. trả về:

```javascript
{
    "status": 200,
    "payload": [
        {
            "ma_nguoi_gui": 2,
            "ma_nguoi_nhan": 15,
            "ngay_gui": "2023-11-03T04:04:49.000Z",
            "trang_thai": "PENDING",
            "thong_tin_nguoi_gui": {
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
                }
            }
        },
        {
            "ma_nguoi_gui": 1,
            "ma_nguoi_nhan": 15,
            "ngay_gui": "2023-11-03T04:04:49.000Z",
            "trang_thai": "PENDING",
            "thong_tin_nguoi_gui": {
                "ma_nguoi_dung": 1,
                "ten": "Dung",
                "ngay_sinh": "1991-09-29T17:00:00.000Z",
                "tai_khoan": "nam",
                "email": "nam@gmail.com",
                "so_dien_thoai": "0912345679",
                "gioi_tinh": 1,
                "anh": {
                    "ma_anh": 39,
                    "url": "https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?w=512&ssl=1",
                    "ngay_cap_nhat": "2023-09-01T09:52:48.000Z",
                    "ma_nguoi_dung": 2,
                    "is_active": 1
                }
            }
        }
    ],
    "message": "lấy lời mời kết bạn thành công",
    "errno": null,
    "errcode": null
}
```

## 3. phải hồi lời mời kết bạn (đồng ý hay không đồng ý)

## 4. thu hồi lời mời kết bạn (xóa lời mời kết bạn khi nó chưa được trả lời)

1. phương thức:

   POST http://localhost:3000/friend/removeRequestAddFriendById

2. cấu trúc:

```javascript
{
  requestID: number;
}
```

- trong đó:
  - **requestID**: id của người dùng trước đó đã gửi lời mời nhưng chưa được phản hồi

3. trả về:

- khi bạn chưa gửi lời mời kết bạn tới người dùng đó

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Bạn chưa gửi lời mời đến người dùng này",
    "errno": 300,
    "errcode": 300
}
```

- thu hồi lời mời kết bạn thành công:

```javascript
{
    "status": 200,
    "payload": {
        "affectedRows": 1,
        "insertId": 0,
        "warningStatus": 0
    },
    "message": "OK",
    "errno": null,
    "errcode": null
}
```

## 5. lấy danh sách người dùng gợi ý kết bạn

**postman số 74**

1. phương thức:

   POST http://localhost:3000/friend/getListSuggestedFriends

2. cấu trúc:

**không yêu cầu tham số**

3. trả về:

`trả về thông tin người dùng có thể kết bạn`

```javascript
{
    "status": 200,
    "payload": [
        {
            "ma_nguoi_dung": 13,
            "ten": "Tuan",
            "ngay_sinh": "1991-10-10T17:00:00.000Z",
            "tai_khoan": "tuan",
            "email": "tuan@gmail.com",
            "so_dien_thoai": "0912345690",
            "gioi_tinh": 1,
            "anh": {
                "ma_anh": null,
                "url": ".........",
                "ngay_cap_nhat": null,
                "ma_nguoi_dung": "13",
                "is_active": null
            }
        },
        {
            "ma_nguoi_dung": 17,
            "ten": "Thuyen",
            "ngay_sinh": "1991-10-11T17:00:00.000Z",
            "tai_khoan": "thuyen",
            "email": "thuyen@gmail.com",
            "so_dien_thoai": "0912345691",
            "gioi_tinh": 1,
            "anh": {
                "ma_anh": null,
                "url": ".........",
                "ngay_cap_nhat": null,
                "ma_nguoi_dung": "17",
                "is_active": null
            }
        },
        {
            "ma_nguoi_dung": 23,
            "ten": "kien",
            "ngay_sinh": "2000-10-17T17:00:00.000Z",
            "tai_khoan": "kien",
            "email": "kien@gmail.com",
            "so_dien_thoai": null,
            "gioi_tinh": null,
            "anh": {
                "ma_anh": null,
                "url": ".........",
                "ngay_cap_nhat": null,
                "ma_nguoi_dung": "23",
                "is_active": null
            }
        },
        {
            "ma_nguoi_dung": 28,
            "ten": "Troy Juarez",
            "ngay_sinh": "1993-10-21T17:00:00.000Z",
            "tai_khoan": "troyjuarez",
            "email": "troyjuarez@gnet.com",
            "so_dien_thoai": "11111",
            "gioi_tinh": 1,
            "anh": {
                "ma_anh": null,
                "url": ".........",
                "ngay_cap_nhat": null,
                "ma_nguoi_dung": "28",
                "is_active": null
            }
        }
    ],
    "message": "",
    "errno": null,
    "errcode": null
}
```

## 6. danh sách các người dũng đã gửi lời mời kết bạn đang chờ phải hồi

1. phương thức:

    POST http://localhost:3000/friend/getListOfAllUserrecievedRequestAddFriendFromMe

2. cấu trúc:
**KHÔNG YÊU CẦU THAM SỐ**

3. trả về:

- khi có dữ liệu

```javascript
{
    "status": 200,
    "payload": [
        {
            "ma_nguoi_nhan": 3,
            "ngay_gui": "2023-11-29T08:26:29.000Z",
            "trang_thai": "PENDING",
            "thong_tin_nguoi_nhan": {
                "ma_nguoi_dung": 3,
                "ten": "Teo",
                "ngay_sinh": "1991-09-30T17:00:00.000Z",
                "tai_khoan": "teo",
                "email": "teo@gmail.com",
                "so_dien_thoai": "0912345680",
                "gioi_tinh": 1,
                "anh": {
                    "ma_anh": null,
                    "url": "https://firebasestorage.googleapis.com/v0/b/bkpetcare-e130a.appspot.com/o/images%2FUser-avatar.svg.png?alt=media&token=8fc5e517-78a1-4f12-84fa-2f18245f1dc9",
                    "ngay_cap_nhat": null,
                    "ma_nguoi_dung": "3",
                    "is_active": null
                }
            }
        },
        {
            "ma_nguoi_nhan": 18,
            "ngay_gui": "2023-11-21T15:16:27.000Z",
            "trang_thai": "PENDING",
            "thong_tin_nguoi_nhan": {
                "ma_nguoi_dung": 18,
                "ten": "Thao",
                "ngay_sinh": "1991-10-11T17:00:00.000Z",
                "tai_khoan": "thao",
                "email": "thao@gmail.com",
                "so_dien_thoai": "0912345691",
                "gioi_tinh": 1,
                "anh": {
                    "ma_anh": null,
                    "url": "https://firebasestorage.googleapis.com/v0/b/bkpetcare-e130a.appspot.com/o/images%2FUser-avatar.svg.png?alt=media&token=8fc5e517-78a1-4f12-84fa-2f18245f1dc9",
                    "ngay_cap_nhat": null,
                    "ma_nguoi_dung": "18",
                    "is_active": null
                }
            }
        }
    ],
    "message": "",
    "errno": null,
    "errcode": null
}
``` 


- khi không có dữ liệu:
```javascript
{
    "status": 200,
    "payload": [],
    "message": "",
    "errno": null,
    "errcode": null
}
```

##
