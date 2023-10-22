# Route Structure of User

## Search User

1. phương thức:

   GET: http://localhost:3000/user/searchPeople

2. cấu trúc data gửi đi:

```javascript
{
  searchKey: String;
}
```

3. cấu trúc data trả về:
   - khi có dữ liệu:

```javascript
{
  "status": 200,
  "payload": [

      {
          "ma_nguoi_dung": 15,
          "ten": "Thuy",
          "ngay_sinh": "1991-10-11T17:00:00.000Z",
          "tai_khoan": "thuy",
          "email": "thuy@gmail.com",
          "so_dien_thoai": "0912345691",
          "gioi_tinh": 1,
          "anh": {
              "ma_anh": null,
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
              "ngay_cap_nhat": null,
              "ma_nguoi_dung": "15",
              "is_active": null
          },
          "checkFriend": {
              "userCheckFriend": 2,
              "isFriend": true
          }
      },
      {
          "ma_nguoi_dung": 16,
          "ten": "Thu",
          "ngay_sinh": "1991-10-11T17:00:00.000Z",
          "tai_khoan": "thu",
          "email": "thu@gmail.com",
          "so_dien_thoai": "0912345691",
          "gioi_tinh": 1,
          "anh": {
              "ma_anh": null,
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
              "ngay_cap_nhat": null,
              "ma_nguoi_dung": "16",
              "is_active": null
          },
          "checkFriend": {
              "userCheckFriend": 2,
              "isFriend": false
          }
      }

  ],
  "message": "",
  "errno": null,
  "errcode": null
}
```

trong đó:

- **isFriend**: mô tả người dùng đó có phải là bạn bè của người dùng có mã id: **userCheckFriend** hay không. nếu là bạn bè thì là **true** ngược lại thì là **false**

  _vd_: trong vd trên người dùng có `ma_nguoi_dung:16` **Không phải là bạn bè**  của người dùng có `ma_nguoi_dung:2`
