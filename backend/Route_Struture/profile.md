# Profile

## 1. lấy thông tin trang cá nhân của chính mình

1. phương thức:

   POST: http://localhost:3000/profile/myProfile

2. cấu trúc: không cần tham số
3. trả về:

```javascript
{
    "thong_tin_profile_user": {
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
    },
    "danh_sach_anh_dai_dien": [
        {
            "ma_anh": 39,
            "ma_nguoi_dung": 2,
            "is_active": 1,
            "url": "https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?w=512&ssl=1",
            "ngay_cap_nhat": "2023-09-01T09:52:48.000Z"
        },
        {
            "ma_anh": 38,
            "ma_nguoi_dung": 2,
            "is_active": 0,
            "url": "https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?w=512&ssl=1",
            "ngay_cap_nhat": "2023-09-01T09:52:24.000Z"
        }
    ],
    "danh_sach_ban_be": [
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
            }
        },
        {
            "ma_nguoi_dung": 7,
            "ten": "Peter",
            "ngay_sinh": "1991-10-04T17:00:00.000Z",
            "tai_khoan": "peter",
            "email": "peter@gmail.com",
            "so_dien_thoai": "0912345684",
            "gioi_tinh": 1,
            "anh": {
                "ma_anh": null,
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
                "ngay_cap_nhat": null,
                "ma_nguoi_dung": "7",
                "is_active": null
            }
        }
    ],
    "danh_sach_thu_cung": [
        {
            "ma_thu_cung": 2,
            "ten_thu_cung": "Charlie",
            "ngay_sinh": "2019-10-10T17:00:00.000Z",
            "gioi_tinh": 1,
            "ghi_chu": "mèo ú",
            "ma_nguoi_chu": 2,
            "giong_loai": {
                "ma_giong": 205,
                "ten_giong": "British Shorthair",
                "ma_loai": 2,
                "ten_loai": "mèo"
            },
            "anh": {
                "ma_anh": null,
                "url": "https://img.freepik.com/free-photo/view-adorable-3d-cat_23-2150473746.jpg",
                "ngay_cap_nhat": null,
                "ma_thu_cung": 2,
                "is_active": null
            },
            "thong_tin_suc_khoe": {
                "ma_suc_khoe": null,
                "ma_thu_cung": 2,
                "thoi_gian": null,
                "can_nang": null,
                "chieu_cao": null
            }
        },
        {
            "ma_thu_cung": 4,
            "ten_thu_cung": "Luna",
            "ngay_sinh": "2019-10-12T17:00:00.000Z",
            "gioi_tinh": 0,
            "ghi_chu": "mèo lười",
            "ma_nguoi_chu": 2,
            "giong_loai": {
                "ma_giong": 205,
                "ten_giong": "British Shorthair",
                "ma_loai": 2,
                "ten_loai": "mèo"
            },
            "anh": {
                "ma_anh": null,
                "url": "https://img.freepik.com/free-photo/view-adorable-3d-cat_23-2150473746.jpg",
                "ngay_cap_nhat": null,
                "ma_thu_cung": 4,
                "is_active": null
            },
            "thong_tin_suc_khoe": {
                "ma_suc_khoe": null,
                "ma_thu_cung": 4,
                "thoi_gian": null,
                "can_nang": null,
                "chieu_cao": null
            }
        }
    ]
}
```

- **thong_tin_profile_user**: thông tin người dùng (_ở đây là chính mình_)
- **anh**: mô tả thông tin của hình ảnh,
  - nếu `ma_anh` mang giá trị **null** thì tức là đối tượng (người dùng hoặc thú cưng) chưa có hình ảnh, trường **url**: sẽ là giá trị mặc định mà hệ thống cấp cho đối tượng đó
- **thong_tin_suc_khoe**: mô tả thông tin sức khỏe của thú cưng
  - nếu `ma_suc_khoe` mang gái trị **null** thì tức là thú cưng chưa có thông tin về sức khỏe

## 2. lấy các bài viết trên time line của chính mình cho trang cá nhân

1. phương thức:

   POST: http://localhost:3000/profile/myTimelineBackward

2. cấu trúc:

   ```javascript
   {
        before: time_string,
        num: number
   }
   ```

   - **before**: mô tả thời gian mà bài viết được đăng lên trước thời gian này
   - **num**: số lượng bài viết cần lấy

3. trả về:
   ```javascript
   {
    "status": 200,
    "payload": [
        {
            "_id": "65430fa7aa78ce62f7b97875",
            "text": "xin chào tui là dũng PRIVATE",
            "postType": "status",
            "visibility": "PRIVATE",
            "media": {
                "type": "images",
                "data": [
                    "google.com",
                    "youtube.com",
                    "amazon.com"
                ]
            },
            "taggedUsers": [],
            "createAt": "2023-11-02T02:55:35.744Z",
            "numOfLike": 0,
            "numOfComment": 0,
            "modifiedAt": null,
            "owner_id": 2
        },
        {
            "_id": "65430f99aa78ce62f7b97873",
            "text": "xin chào tui là dũng PUBLIC",
            "postType": "status",
            "visibility": "PUBLIC",
            "media": {
                "type": "images",
                "data": [
                    "google.com",
                    "youtube.com",
                    "amazon.com"
                ]
            },
            "taggedUsers": [],
            "createAt": "2023-11-02T02:55:21.319Z",
            "numOfLike": 0,
            "numOfComment": 0,
            "modifiedAt": null,
            "owner_id": 2
        }
    ],
    "message": "",
    "errno": null,
    "errcode": null
   }
   ```

## 3. lấy thông tin trang cá nhân của người dùng khác

1. phương thức:

   POST: http://localhost:3000/profile/userProfile

2. cấu trúc:

```javascript
{
  user_id: number;
}
```

- **user_id**: mã của người dùng mà ta muốn lấy thông tin profile

3. trả về:

```javascript
{
    "thong_tin_profile_user": {
        "ma_nguoi_dung": 10,
        "ten": "Thanh",
        "ngay_sinh": "",
        "tai_khoan": "thanh",
        "email": "",
        "so_dien_thoai": "",
        "gioi_tinh": 0,
        "anh": {
            "ma_anh": null,
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
            "ngay_cap_nhat": null,
            "ma_nguoi_dung": "10",
            "is_active": null
        }
    },
    "la_ban_be": false,
    "danh_sach_anh_dai_dien": [],
    "danh_sach_ban_be": [],
    "danh_sach_thu_cung": []
}
```

- **thong_tin_profile_user**: thông tin người dùng
- **anh**: mô tả thông tin của hình ảnh,

  - nếu `ma_anh` mang giá trị **null** thì tức là đối tượng (người dùng hoặc thú cưng) chưa có hình ảnh, trường **url**: sẽ là giá trị mặc định mà hệ thống cấp cho đối tượng đó

- **la_ban_be**: nếu trả về **true** thì có chính là bạn bè với mình. Nếu **false** thì không phải là bạn bè với mình
- **danh_sach_anh_dai_dien**:mô tả danh sách ảnh đại diện của người dùng đó
- **danh_sach_ban_be**:mô tả danh sách bạn bè của người dùng đó.
- **danh_sach_thu_cung**: mô tả danh sách thú cưng của người dùng đó.

## 4. lấy các bài viết trên time line của người dùng khác

1. phương thức:

   POST : http://localhost:3000/profile/userTimelineBackward

2. cấu trúc:

```javascript
{
  user_id: number;
  before: time_string,
  num: number
}
```

- **user_id**: mã của người dùng mà ta muốn lấy thông tin về time line
- **before**: mô tả mốc thời gian bài viết được đăng lên trước thời gian này
- **num**: số lượng bài viết cần lấy

3. trả về :

```javascript
{
    "status": 200,
    "payload": [
        {
            "_id": "6543d5d9ad43fb5cb950f519",
            "text": "DŨNG JUST_FRIENDS - TAG - 1_1",
            "postType": "status",
            "visibility": "JUST_FRIENDS",
            "media": {
                "type": "images",
                "data": [
                    "google.com",
                    "youtube.com",
                    "amazon.com"
                ]
            },
            "taggedUsers": [
                {
                    "ma_nguoi_dung": 9,
                    "ten": "Hoang",
                    "ngay_sinh": "1991-10-06T17:00:00.000Z",
                    "tai_khoan": "hoang",
                    "email": "hoang@gmail.com",
                    "so_dien_thoai": "0912345686",
                    "gioi_tinh": 1,
                    "anh": {
                        "ma_anh": null,
                        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
                        "ngay_cap_nhat": null,
                        "ma_nguoi_dung": "9",
                        "is_active": null
                    }
                }
            ],
            "createAt": "2023-11-02T17:01:13.890Z",
            "numOfLike": 0,
            "numOfComment": 0,
            "modifiedAt": null,
            "owner_id": 2
        },
        {
            "_id": "6543d5c1ad43fb5cb950f515",
            "text": "DŨNG PUBLIC - TAG - 1_1",
            "postType": "status",
            "visibility": "PUBLIC",
            "media": {
                "type": "images",
                "data": [
                    "google.com",
                    "youtube.com",
                    "amazon.com"
                ]
            },
            "taggedUsers": [
                {
                    "ma_nguoi_dung": 9,
                    "ten": "Hoang",
                    "ngay_sinh": "1991-10-06T17:00:00.000Z",
                    "tai_khoan": "hoang",
                    "email": "hoang@gmail.com",
                    "so_dien_thoai": "0912345686",
                    "gioi_tinh": 1,
                    "anh": {
                        "ma_anh": null,
                        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
                        "ngay_cap_nhat": null,
                        "ma_nguoi_dung": "9",
                        "is_active": null
                    }
                }
            ],
            "createAt": "2023-11-02T17:00:49.671Z",
            "numOfLike": 0,
            "numOfComment": 0,
            "modifiedAt": null,
            "owner_id": 2
        },
        {
            "_id": "6543a46ce7954669db8943c8",
            "text": "Dũng PUBLIC - NON_TAG - 1",
            "postType": "status",
            "visibility": "PUBLIC",
            "media": {
                "type": "images",
                "data": [
                    "google.com",
                    "youtube.com",
                    "amazon.com"
                ]
            },
            "taggedUsers": [],
            "createAt": "2023-11-02T13:30:20.163Z",
            "numOfLike": 0,
            "numOfComment": 0,
            "modifiedAt": null,
            "owner_id": 2
        }
    ],
    "message": "",
    "errno": null,
    "errcode": null
}
```

