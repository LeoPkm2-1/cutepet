# Post Status:

## 1. thêm bài viết chia sẻ trạng thái:

1. phương thức :

   POST: http://localhost:3000/post/statusPost/addPost

2. cấu trúc

```javascript
{
    text: String,
    visibility: "PUBLIC" || "JUST_FRIENDS" || "PRIVATE",
    taggedUsersId: Array[id_users],
    media:
        undefined || {
            type:"video" || "images"
            data:[url]
        }
}
```

1. trả về ở dưới này sẽ được nằm trong payload của **Respone**:

```javascript
{
    post_id:....,
    text: String,
    postType: "status",
    visibility: "PUBLIC" || "JUST_FRIENDS" || "PRIVATE",
    media:
        undefined || {
            type:"video" || "images"
            data:[url]
        },
    taggedUsers:Array[users infor],
    createAt: time,
    numOfLike:0,
    numOfComment:0,
    owner_id: ..........,
}
```

## 2. Like viết chia sẻ trạng thái:

`phương thức này dùng để like nếu bài post chưa được like và hủy like nếu bài post đã được like rồi`

1. phương thức :

   POST: http://localhost:3000/post/statusPost/likePost

2. cấu trúc

```javascript
{
    post_id: .....
}
```

1. trả về ở dưới này:

`like`

```javascript

{
    "status": 200,
    "payload": {
            "_id": "...............",
            "postId": "...............",
            "userLike": "..............."
        },
    "message": "like thành công",
    "errno": null,
    "errcode": null
}
```

`hủy like`

```javascript

{
    "status": 200,
    "payload":  {
        "postId": ".................."
    },
    "message": "hủy like thành công",
    "errno": null,
    "errcode": null
}
```

`khi có lỗi`

```javascript
{
    "status": 400,
    "payload": [],
    "message": "hủy like thành công",
    "errno": 300,
    "errcode": 300
}
```

## 3. comment viết chia sẻ trạng thái:

1. phương thức :

   POST: http://localhost:3000/post/statusPost/addComment

2. cấu trúc

```javascript
{
    post_id: .....,
    comment:....,
}
```

3. trả về

`thông tin trả về dưới đây nằm trong payload của đổi tượng respone`

```javascript
{
        "_id": "................",
        "postId": "................",
        "comment": "................",
        "commentBy": "..................",
        "commentAt": "................",
        "numOfLike": 0,
        "numOfReply": 0
    },
```

## 4. like comment viết chia sẻ trạng thái:

`phương thức này dùng để like nếu bài comment chưa được like và hủy like nếu bài comment đã được like rồi`

1. phương thức :

   POST: http://localhost:3000/post/statusPost/likeComment

2. cấu trúc

```javascript
{
    cmt_id: .....
}
```

3. trả về ở dưới này:

`like`

```javascript
{
    "status": 200,
    "payload": {
        "_id": "................",
        "cmtId": "..............",
        "userLike": '...........',
        "likeAt": "................"
    },
    "message": "like thành công",
    "errno": null,
    "errcode": null
}
```

`hủy like`

```javascript
{
    "status": 200,
    "payload": {
        "cmtId": "6501d6b7a7499cde4c143603"
    },
    "message": "hủy like thành công",
    "errno": null,
    "errcode": null
}
```

## 5. Reply comment

`phương thức này đùng để phản hồi lại bình luận của người dùng`

1. phương thức:

   POST: http://localhost:3000/post/statusPost/replyComment

2. cấu trúc

```javascript
{
    cmt_id:'....................',
    reply:'.....................',
}
```

3. trả về ở dưới này:

```javascript
{
    "status": 200,
    "payload": {
        "_id": "......................",
        "cmtId": ".................",
        "reply": "..........",
        "replyBy": '..........',
        "replyAt": "...............",
        "numOfLike": 0
    },
    "message": "reply thành công",
    "errno": null,
    "errcode": null
}
```

nếu bình luận không tồn tại:

```javascript
{
    "status": 400,
    "payload": "Bình luật không tồn tại",
    "message": 300,
    "errno": 300,
    "errcode": 300
}
```

## 6. lấy tất cả các bình luận của 1 bài viết trạng thái

` Phương thức này lấy tất cả các bình luận của 1 bài viết trạng thái`

1. Phương thức:

   POST: 'http://localhost:3000/post/statusPost/getAllComment'

2. cấu trúc:

```javascript
{

    post_id: chính là mã bài viết
}
```

1. trả về ở dưới này:

```javascript
{
    "status": 200,
    "payload": {
        "comments": [
            {
                "_id": "...............",
                "postId": "...........",
                "comment": "..........",
                "commentBy": ......,
                "commentAt": "............",
                "numOfLike": ..............,
                "numOfReply": ................,
                "modifiedAt": null,
                "userCmtInfor": {
                    "ma_nguoi_dung": .................,
                    "ten": "Nam",
                    "ngay_sinh": ".....................",
                    "tai_khoan": "...........................",
                    "email": "...................",
                    "so_dien_thoai": ".................",
                    "gioi_tinh": ...............,
                    "anh": {
                        "ma_anh": ..............,
                        "url": "....................",
                        "ngay_cap_nhat": "..................",
                        "ma_nguoi_dung": ...................,
                        "is_active": ...........................
                    }
                }
            },
            {
                .............
            }
        ],
        "numOfComments": 2,
        "numOfRemain": 0
    },
    "message": "lấy dữ liệu thành công",
    "errno": null,
    "errcode": null
}
```

## 7. phân trang cho bình luận

1. Phương thức:

   POST: 'http://localhost:3000/post/statusPost/getCommentStartFrom'

2. cấu trúc

```javascript
{
    post_id: string
    index: number,
    num: number,
}
```

- trong đó:
  - **post_id**: mã bài viết muốn lấy bình luận
  - **index**: lấy từ bình luận thứ mấy (thứ tự bắt đầu từ: 0,1,......)
  - **num**: số lượng bình luận lấy ra

1. trả về:

```javascript
{
    "status": 200,
    "payload": {
        "comments": [
            {
                "_id": "303132333435363738393134",
                "postId": "313233343536373839303132",
                "comment": "cmt 1",
                "commentBy": 1,
                "commentAt": "2023-09-10T04:24:57.000Z",
                "numOfLike": 2,
                "numOfReply": 0,
                "modifiedAt": null,
                "userCmtInfor": {
                    "ma_nguoi_dung": 1,
                    "ten": "Nam",
                    "ngay_sinh": "1991-09-28T17:00:00.000Z",
                    "tai_khoan": "nam",
                    "email": "nam@gmail.com",
                    "so_dien_thoai": "0912345678",
                    "gioi_tinh": 1,
                    "anh": {
                        "ma_anh": 37,
                        "url": "www.leo.com.vn",
                        "ngay_cap_nhat": "2023-09-01T09:51:53.000Z",
                        "ma_nguoi_dung": 1,
                        "is_active": 1
                    }
                }
            },
            {
                "_id": "303132333435363738393135",
                "postId": "313233343536373839303132",
                "comment": "cmt 1",
                "commentBy": 1,
                "commentAt": "2023-09-10T04:24:57.000Z",
                "numOfLike": 2,
                "numOfReply": 0,
                "modifiedAt": "2023-09-10T04:24:58.000Z",
                "userCmtInfor": {
                    "ma_nguoi_dung": 1,
                    "ten": "Nam",
                    "ngay_sinh": "1991-09-28T17:00:00.000Z",
                    "tai_khoan": "nam",
                    "email": "nam@gmail.com",
                    "so_dien_thoai": "0912345678",
                    "gioi_tinh": 1,
                    "anh": {
                        "ma_anh": 37,
                        "url": "www.leo.com.vn",
                        "ngay_cap_nhat": "2023-09-01T09:51:53.000Z",
                        "ma_nguoi_dung": 1,
                        "is_active": 1
                    }
                }
            }
        ],
        "numOfComments": 2,
        "numOfRemain": 0
    },
    "message": "lấy dữ liệu thành công",
    "errno": null,
    "errcode": null
}
```

## 8. Lấy tất cả các Phản hồi của bình luận

`Phương thức này lấy tất cả các phản hồi của 1 bình luận`

1. Phương thức:

   POST: 'http://localhost:3000/post/statusPost/getAllReply'

2. cấu trúc:

   ```javascript
   {
     cmt_id: string;
   }
   ```

   - trong đó:

     - **cmt_id**: mã của bình luận muốn lấy phản hồi

3. trả về ở dưới này:

```javascript
{
    "status": 200,
    "payload": {
        "replies": [
            {
                "_id": "303132333435363738393231",
                "cmtId": "303132333435363738393134",
                "reply": "bye",
                "replyBy": 1,
                "replyAt": "2023-09-10T04:25:04.000Z",
                "numOfLike": 0,
                "modifiedAt": "2023-09-10T04:25:05.000Z",
                "userReplyInfor": {
                    "ma_nguoi_dung": 1,
                    "ten": "Nam",
                    "ngay_sinh": "1991-09-28T17:00:00.000Z",
                    "tai_khoan": "nam",
                    "email": "nam@gmail.com",
                    "so_dien_thoai": "0912345678",
                    "gioi_tinh": 1,
                    "anh": {
                        "ma_anh": 37,
                        "url": "www.leo.com.vn",
                        "ngay_cap_nhat": "2023-09-01T09:51:53.000Z",
                        "ma_nguoi_dung": 1,
                        "is_active": 1
                    }
                }
            },
            {
                "_id": "303132333435363738393230",
                "cmtId": "303132333435363738393134",
                "reply": "goodbye",
                "replyBy": 6,
                "replyAt": "2023-09-10T04:25:03.000Z",
                "numOfLike": 0,
                "modifiedAt": null,
                "userReplyInfor": {
                    "ma_nguoi_dung": 6,
                    "ten": "John",
                    "ngay_sinh": "1991-10-03T17:00:00.000Z",
                    "tai_khoan": "john",
                    "email": "john@gmail.com",
                    "so_dien_thoai": "0912345683",
                    "gioi_tinh": 1,
                    "anh": {
                        "ma_anh": null,
                        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
                        "ngay_cap_nhat": null,
                        "ma_nguoi_dung": "6",
                        "is_active": null
                    }
                }
            }
        ],
        "numOfReplies": 2,
        "numOfRemain": 0
    },
    "message": "lấy phản hồi thành công",
    "errno": null,
    "errcode": null
}
```

## 9. phân trang cho phản hồi

1. Phương thức:

   Post: 'http://localhost:3000/post/statusPost/getReplyStartFrom'

2. cấu trúc:

```javascript
{
    cmt_id:mã của bình luận,
    index:lấy từ bình luận thứ mấy (thứ tự bắt đầu từ: 0,1,......),
    num:số lượng phản hồi lấy ra,
}
```

3. trả về:

```javascript
{
    "status": 200,
    "payload": {
        "replies": [
            {
                "_id": "303132333435363738393232",
                "cmtId": "303132333435363738393135",
                "reply": "xin chào",
                "replyBy": 6,
                "replyAt": "2023-09-10T04:25:04.000Z",
                "numOfLike": 0,
                "modifiedAt": "2023-09-10T04:26:04.000Z",
                "userReplyInfor": {
                    "ma_nguoi_dung": 6,
                    "ten": "John",
                    "ngay_sinh": "1991-10-03T17:00:00.000Z",
                    "tai_khoan": "john",
                    "email": "john@gmail.com",
                    "so_dien_thoai": "0912345683",
                    "gioi_tinh": 1,
                    "anh": {
                        "ma_anh": null,
                        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
                        "ngay_cap_nhat": null,
                        "ma_nguoi_dung": "6",
                        "is_active": null
                    }
                }
            },
            {
                "_id": "303132333435363738393233",
                "cmtId": "303132333435363738393135",
                "reply": "xin chào",
                "replyBy": 6,
                "replyAt": "2023-09-10T04:25:04.000Z",
                "numOfLike": 0,
                "modifiedAt": null,
                "userReplyInfor": {
                    "ma_nguoi_dung": 6,
                    "ten": "John",
                    "ngay_sinh": "1991-10-03T17:00:00.000Z",
                    "tai_khoan": "john",
                    "email": "john@gmail.com",
                    "so_dien_thoai": "0912345683",
                    "gioi_tinh": 1,
                    "anh": {
                        "ma_anh": null,
                        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
                        "ngay_cap_nhat": null,
                        "ma_nguoi_dung": "6",
                        "is_active": null
                    }
                }
            }
        ],
        "numOfReplies": 2,
        "numOfRemain": 0
    },
    "message": "lấy phản hồi thành công",
    "errno": null,
    "errcode": null
}
```

## 10. lấy bài viết dựa vào mã của bài viết

1. Phương thức:

   POST: 'http://localhost:3000/post/statusPost/getPost

2. cấu trúc:

```javascript
    {
        post_id: mã của bài viết
    }

```

3. trả về:

```javascript
{
    "status": 200,
    "payload": {
        "_id": "313233343536373839303132",
        "text": "xoa testing",
        "postType": "status",
        "media": {
            "type": "images",
            "data": [
                "google.com",
                "facebook.com"
            ]
        },
        "createAt": "2023-09-10T04:24:55.000Z",
        "numOfLike": 2,
        "numOfComment": 2,
        "modifiedAt": null,
        "owner_id": 1,
        "owner_infor": {
            "ma_nguoi_dung": 1,
            "ten": "Nam",
            "ngay_sinh": "1991-09-28T17:00:00.000Z",
            "tai_khoan": "nam",
            "email": "nam@gmail.com",
            "so_dien_thoai": "0912345678",
            "gioi_tinh": 1,
            "anh": {
                "ma_anh": 37,
                "url": "www.leo.com.vn",
                "ngay_cap_nhat": "2023-09-01T09:51:53.000Z",
                "ma_nguoi_dung": 1,
                "is_active": 1
            }
        },
        "hasLiked": true
    },
    "message": "lấy dữ liệu thành công",
    "errno": null,
    "errcode": null
}
```

## 11. phân trang cho bài viết

1. Phương thức:

   POST: http://localhost:3000/post/statusPost/getPostStartFrom

2. cấu trúc:

```javascript
{
    index: lấy từ bài viết thứ mấy (thứ tự bắt đầu từ: 0,1,......),
    num: số lượng bài viết cần lấy ra, nếu là undefined thì lấy tất cả các bài viết
}
```

3. trả về:

```javascript
{
    "status": 200,
    "payload": {
        "posts": [
            {
                "_id": "313233343536373839303132",
                "text": "xoa testing",
                "postType": "status",
                "media": {
                    "type": "images",
                    "data": [
                        "google.com",
                        "facebook.com"
                    ]
                },
                "createAt": "2023-09-10T04:24:55.000Z",
                "numOfLike": 2,
                "numOfComment": 2,
                "modifiedAt": null,
                "owner_id": 1,
                "owner_infor": {
                    "ma_nguoi_dung": 1,
                    "ten": "Nam",
                    "ngay_sinh": "1991-09-28T17:00:00.000Z",
                    "tai_khoan": "nam",
                    "email": "nam@gmail.com",
                    "so_dien_thoai": "0912345678",
                    "gioi_tinh": 1,
                    "anh": {
                        "ma_anh": 37,
                        "url": "www.leo.com.vn",
                        "ngay_cap_nhat": "2023-09-01T09:51:53.000Z",
                        "ma_nguoi_dung": 1,
                        "is_active": 1
                    }
                },
                "hasLiked": true
            }
        ],
        "numOfPosts": 1,
        "numOfRemain": 0
    },
    "message": "lấy dự liệu thành công",
    "errno": null,
    "errcode": null
}
```

## 12. kiếm tra xem người dùng đã follow bài biết hay chưa

(**postman số 23**)

1. Phương thức:

   POST: 'http://localhost:3000/post/statusPost/isUserFollowedPost'

2. cấu trúc:
   ```javascript
    {
        post_id: mã của bài viết muốn kiểm tra xem follow hay chưa
    }
   ```
3. trả về:
   - khi đã theo doi bài viết

```javascript
{
    "status": 200,
    "payload": {
        "post_id": "65333ff5f0efa9d27e7bf163",
        "isFollowed": true
    },
    "message": "",
    "errno": null,
    "errcode": null
}
```

- khi chưa theo dõi bài viết

```javascript
{
    "status": 200,
    "payload": {
        "post_id": "65333ff5f0efa9d27e7bf163",
        "isFollowed": false
    },
    "message": "",
    "errno": null,
    "errcode": null
}
```

## 13. đăng ký theo dõi bài viết

(**postman số 24**)

1. Phương thức:

   POST: 'http://localhost:3000/post/statusPost/followPost'

2. cấu trúc:

```javascript
{
    post_id: mã của bài viết muốn đăng ký theo dõi
}
```

3. trả về:

```javascript
{
    "status": 200,
    "payload": {
        "post_id": "65333ff5f0efa9d27e7bf163",
        "isFollowed": true
    },
    "message": "theo dõi thành công",
    "errno": null,
    "errcode": null
}
```

## 14. hủy theo dõi bài viết

(**postman số 23**)

1. Phương thức:

   POST http://localhost:3000/post/statusPost/unFollowPost

2. cấu trúc:

```javascript
{
    post_id: mã của bài viết muốn hủy theo dõi
}
```

3. trả về:

- khi người dùng chưa theo dõi bài viết trước đó:

```javascript
{
    "status": 400,
    "payload": {
        "unfollowed": false,
        "message": "người dùng chưa theo dõi bài viết"
    },
    "message": "bài viết chưa được theo dõi",
    "errno": 300,
    "errcode": 300
}
```

- khi hủy theo dõi thành công:

```javascript
{
    "status": 200,
    "payload": {
        "unfollowed": true,
        "message": "unfollow thành công"
    },
    "message": "unfollow thành công",
    "errno": 300,
    "errcode": 300
}
```

## 15. chỉnh sửa bài viết trạng thái

(**postman số 57**)

1. phương thức:

   POST http://localhost:3000/post/statusPost/updatePost

2. cấu trúc:

```javascript
{
    post_id: mã của bài viết muốn chỉnh sửa thông tin
    text: string,
    visibility: "PUBLIC" || "JUST_FRIENDS" || "PRIVATE",
    taggedUsersId: Array[id_users],
    media:
        undefined || {
            type:"video" || "images"
            data:[url]
        }
}
```

3. trả về:

- khi bài viết không tòn tại:

```javascript
{
    "status": 400,
    "payload": "Bài viết không tồn tại",
    "message": 300,
    "errno": 300,
    "errcode": 300
}
```

- khi bạn không có quyền cập nhật bài viết:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Bạn không có quyền xóa bài viết này",
    "errno": 300,
    "errcode": 300
}
```

## 16. report bài viết chia sẻ trạng thái

1. phương thức:

   POST: http://localhost:3000/post/statusPost/reportPost

2. cấu trúc:

```javascript
{
    post_id: string (bắt buộc)
}
```

3. trả về:

- khi bài viết không tồn tại:

```javascript
{
    "status": 400,
    "payload": "Bài viết không tồn tại",
    "message": 300,
    "errno": 300,
    "errcode": 300
}
```

- khi báo cáo thành công:

```javascript
{
    "status": 200,
    "payload": {
        "acknowledged": true,
        "insertedId": "6555c41df3ea8cfc9d63b289"
    },
    "message": "",
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

##

##
