# Route Structure of User

## 1. Search User

(_postman số_ **25**)

1. phương thức:

   GET: http://localhost:3000/user/searchPeople

2. cấu trúc data gửi đi:

```javascript
{
  searchKey: String;
  index: number;
  num:number

}
```

- trong đó:
  - **searchKey**: là từ khóa tìm kiếm người dùng
  - **index**: là vị trí bắt đầu lấy dữ liệu
  - **num**: là số lượng dữ liệu cần lấy
3. cấu trúc data trả về:
   - khi có dữ liệu:

```javascript
{
    "status": 200,
    "payload": [
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
            "isFriend": false,
            "requestAddFriendStatus": "HAS_SEND_REQUEST_ADD_FRIEND"
        },
        {
            "ma_nguoi_dung": 4,
            "ten": "Ty",
            "ngay_sinh": "1991-10-01T17:00:00.000Z",
            "tai_khoan": "ty",
            "email": "ty@gmail.com",
            "so_dien_thoai": "0912345681",
            "gioi_tinh": 1,
            "anh": {
                "ma_anh": null,
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
                "ngay_cap_nhat": null,
                "ma_nguoi_dung": "4",
                "is_active": null
            },
            "isFriend": false,
            "requestAddFriendStatus": null
        }
    ],
    "message": "",
    "errno": null,
    "errcode": null
}
```

trong đó:

- **isFriend**: mô tả người dùng đó có phải là bạn bè của người đang tìm kiếm hay không. nếu là bạn bè thì là **true** ngược lại thì là **false**

  _vd_: trong vd trên người dùng có `ma_nguoi_dung:10` **là bạn bè** của người dùng đang tìm kiếm còn người dùng có mã `ma_nguoi_dung:15` thì **không phải là bạn bè** của người dùng đang tìm kiếm

## 2. đổi mật khẩu người dùng:

1. phương thức:

   POST: http://localhost:3000/user/changePassword

2. cấu trúc:

```javascript
{
    old_pass:string     (bắt buộc)
    new_pass: string    (bắt buộc)
    confirm_pass :string    (bắt buộc)
}
```

3. trả về:

- khi không điền mật khẩu cũ:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "vui lòng nhập mật khẩu hiện tại",
    "errno": null,
    "errcode": null
}
```

- khi không điền mật khẩu cần thay đổi:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "vui lòng nhập mật khẩu cần thay đổi",
    "errno": null,
    "errcode": null
}
```

- khi không xác nhận lại mật khẩu:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "vui lòng nhập xác nhận  mật khẩu ",
    "errno": null,
    "errcode": null
}
```

- khi mật khẩu mới và xác nhận mật khẩu không đúng:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "mật khẩu mới và xác nhận mật khẩu không khớp",
    "errno": null,
    "errcode": null
}
```

- khi nhập mật khẩu hiện tại không đúng:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Mật khẩu hiện tại không đúng",
    "errno": null,
    "errcode": null
}
```

- khi đổi mật khẩu thành công

```javascript
{
    "status": 200,
    "payload": [],
    "message": "Đổi mật khẩu thành công",
    "errno": null,
    "errcode": null
}
```

## 3. cập nhật ảnh đại diện cho người dùng:

1. phương thức:

   POST: http://localhost:3000/user/updateAvatar

2. cấu trúc:

```javascript
{
    url_anh: string (bắt buộc)
}
```

3. trả về:

- khi thành công:

```javascript
{
    "status": 200,
    "payload": {
        "affectedRows": 1,
        "insertId": 0,
        "warningStatus": 0
    },
    "message": "cập nhật ảnh đại diện thành công",
    "errno": null,
    "errcode": null
}
```

- khi ảnh không hợp lệ

```javascript
{
    "status": 400,
    "payload": [],
    "message": "vui lòng nhập url ảnh",
    "errno": null,
    "errcode": null
}
```

## 4. cập nhật thông tin người dùng:

1. phương thức:

   POST: http://localhost:3000/user/updateInfor

2. cấu trúc:

```javascript
{
    ten: string (bắt buộc)
    ngay_sinh: string (YYYY-MM-DD) || undefined
    so_dien_thoai: string (chuỗi các số từ 4 -> 12 số) || undefined
    gioi_tinh: number (0,1)||undefined
}
```

- trong đó:
  - **gioi_tinh**: 1 là nam, 0 là nữ, còn undefined là giới tính khác
  - **ngay_sinh**: nếu không nhập ngày sinh thì để là undefined. Nếu nhập ngày sinh thì phải để ở dạng là **string** có định dạng **YYYY-MM-DD**
  - **so_dien_thoai**: là một string chứa chuỗi các số có từ **4->12** số
  - **ten**: chỉ bao gồm các ký tự trong bảng chữ cái, có thể là tiếng việt hoặc tiếng anh và chứa 32 ký tự

3. trả về:

- khi thành công:

```javascript
{
    "status": 200,
    "payload": {
        "affectedRows": 1,
        "insertId": 0,
        "warningStatus": 0
    },
    "message": "cập nhật thông tin cá nhân thành công",
    "errno": null,
    "errcode": null
}
```

- khi không nhập tên:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "vui lòng nhập tên người dùng",
    "errno": null,
    "errcode": null
}
```

- khi ngày sinh không hợp lệ:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "ngày sinh không hợp lệ",
    "errno": null,
    "errcode": null
}
```

- khi số điện thoại với format không hợp lệ:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "số điện thoại không hợp lệ",
    "errno": null,
    "errcode": null
}
```

- khi giới tính không hợp lệ:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "giới tính không hợp lệ",
    "errno": null,
    "errcode": null
}
```

- khi tên chứa ký tự không hợp lệ:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "tên chứa các ký tự không hợp lệ",
    "errno": 300,
    "errcode": 300
}
```

## 5. đăng ký tài khoản

1. phương thức:

   POST http://localhost:3000/register

2. cấu trúc:

```javascript
{
    ten: string (bắt buộc)
    tai_khoan: string (bắt buộc)
    mat_khau: string (bắt buộc)
    email: string (bắt buộc)
}
```

- trong đó:
  - **ten**: tên người dùng chứ từ 1 dến 32 ký tự có thể là tiếng việt hoặc tiếng anh

3. trả về:

- khi không nhập tên người dùng:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Vui lòng nhập tên người dùng",
    "errno": 300,
    "errcode": 300
}
```

- khi không nhập tài khoan người dung:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Vui lòng nhập tên đăng nhập",
    "errno": 300,
    "errcode": 300
}
```

- khi không nhập mật khẩu:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Vui lòng nhập mật khẩu",
    "errno": 300,
    "errcode": 300
}
```

- khi không nhập email:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Vui lòng nhập email",
    "errno": 300,
    "errcode": 300
}
```

- khi nhập tên không đúng định dạng:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "tên chứa các ký tự không hợp lệ",
    "errno": 300,
    "errcode": 300
}
```

- khi nhập tài khoản email không đúng định dạng:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "email không hợp lệ",
    "errno": null,
    "errcode": null
}
```

- khi tài khoản đã tồn tại rồi:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "người dùng đã tồn tại",
    "errno": null,
    "errcode": null
}
```

- khi email đã tồn tại rồi:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "email đã tồn tại",
    "errno": null,
    "errcode": null
}
```

- khi đăng ký thành công

```javascript
{
    "status": 200,
    "payload": "94153e31-b574-498e-98fc-6765b9eb47fe",
    "message": "Vui lòng xác thực đăng nhập bằng email đã đăng ký để hoàn tất",
    "errno": null,
    "errcode": null
}
```

##

##

##

##

##

##
