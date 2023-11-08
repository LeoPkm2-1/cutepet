# imformative article

## 1. thêm bài viết chia sẻ kiến thức

1. phương thức:

   POST: http://localhost:3000/post/article/addArticle

2. cấu trúc:

```javascript
{
    title: string (bắt buộc),
    main_image: string (bắt buộc),
    intro: string (không bắt buộc),
    content: string (bắt buộc),
    categories: Array[string] (bắt buộc phải có 1 tag),
}
```

**Ví dụ**:

```javascript
{
    title: "tác hại của socola",
    main_image: "www.image_chocolate.com",
    intro: "tác bài .....",
    content: "chocolate rất hại.....",
    categories: ["dog","cat"]
}
```

3. trả về:

```javascript
{
    "status": 200,
    "payload": [
        {
            "_id": "65470fb9c431225e16c2eecb",
            "title": "tác hại của socola",
            "postType": "ARTICLE",
            "visibility": "PUBLIC",
            "main_image": "www.image_chocolate.com",
            "intro": "tác bài .....",
            "content": "chocolate rất hại.....",
            "categories": [
                "dog",
                "cat"
            ],
            "createAt": "2023-11-05T03:44:57.508Z",
            "numOfUpVote": 0,
            "numOfDownVote": 0,
            "numOfComment": 0,
            "modifiedAt": null,
            "owner_id": 10
        }
    ],
    "message": "thêm bài chia sẻ kiến thức thành công",
    "errno": null,
    "errcode": null
}
```

## 2. toggle upvote bài viết chia sẻ kiến thức

1. phương thức:

   POST http://localhost:3000/post/article/upVoteArticle

2. cấu trúc:

```javascript
{
    article_id: string (bắt buộc),
}
```

trong đó:

- **article_id**: id của bài viết chiase kiến thức

3. trả về:

- khi vote thành công

```javascript
{
    "status": 200,
    "payload": {
        "_id": "65471083c431225e16c2eecd",
        "articleId": "6545f11d264a36e0b590d15a",
        "userUpVote": 8,
        "upVoteAt": "2023-11-05T03:48:19.564Z"
    },
    "message": "upvote thành công",
    "errno": null,
    "errcode": null
}
```

- khi bỏ vote thành công

```javascript
{
    "status": 200,
    "payload": {
        "articleId": "6545f11d264a36e0b590d15a"
    },
    "message": "hủy upvote thành công",
    "errno": null,
    "errcode": null
}
```

## 3. toggle downvote bài viết chia sẻ kiến thức

1. phương thức:

   POST http://localhost:3000/post/article/downVoteArticle

2. cấu trúc:

```javascript
{
    article_id: string (bắt buộc),
}
```

trong đó:

- **article_id**: id của bài viết chiase kiến thức

3. trả về:

- khi downvote thành công

```javascript
{
    "status": 200,
    "payload": {
        "_id": "65471147c431225e16c2eece",
        "articleId": "6545f11d264a36e0b590d15a",
        "userDownVote": 2,
        "downVoteAt": "2023-11-05T03:51:35.240Z"
    },
    "message": "downvote thành công",
    "errno": null,
    "errcode": null
}
```

- khi bỏ vote thành công

```javascript
{
    "status": 200,
    "payload": {
        "articleId": "6545f11d264a36e0b590d15a"
    },
    "message": "hủy downvote thành công",
    "errno": null,
    "errcode": null
}
```

## 4. thêm bình luận cho bài viết chia sẻ kiến thức

1. phương thức:

   POST http://localhost:3000/post/article/addComment

2. cấu trúc:

```javascript
{
    article_id: string (bắt buộc),
    content: string (bắt buộc),
}
```

- trong đó:

  - **article_id**: id của bài viết chiase kiến thức
  - **content**: nội dung bình luận

3. trả về:

```javascript
{
    "status": 200,
    "payload": {
        "_id": "65470cd35c48d9c51077c1d9",
        "articleId": "6545f11d264a36e0b590d15a",
        "type": "COMMENT_ARTICLE",
        "comment": "10 điểm",
        "commentBy": 8,
        "commentAt": "2023-11-05T03:32:35.910Z",
        "numOfUpVote": 0,
        "numOfDownVote": 0,
        "numOfReply": 0,
        "modifiedAt": null
    },
    "message": "",
    "errno": null,
    "errcode": null
}
```

## 5. thêm phản hồi cho bình luận của bài viết chia sẻ kiến thức

1. phương thức:

   POST http://localhost:3000/post/article/addReply

2. cấu trúc:

```javascript
{
    cmt_id: string (bắt buộc),
    reply: string (bắt buộc),
}
```

- trong đó:

  - **cmt_id**: id của bình luận
  - **reply**: nội dung phản hồi

3. trả về:

```javascript
{
    "status": 200,
    "payload": {
        "_id": "6548e1700cf8cb273dfbd0ca",
        "cmtId": "6548e1520cf8cb273dfbd0c9",
        "type": "REPLY_COMMENT_ARTICLE",
        "reply": "rep 2",
        "replyBy": 8,
        "replyAt": "2023-11-06T12:52:00.796Z",
        "articleId": "6548b710bacf36ecfeda6421",
        "modifiedAt": null,
        "numOfUpVote": 0,
        "numOfDownVote": 0
    },
    "message": "",
    "errno": null,
    "errcode": null
}
```

## 6. chỉnh sửa nội dung của phản hồi của bình luận

1. phương thức:

   POST http://localhost:3000/post/article/updateReply

2. cấu trúc:

```javascript
{
    reply_id: string (bắt buộc),
    content: string (bắt buộc),
}
```

- trong đó:

  - **reply_id**: id của phản hồi
  - **content**: nội dung được chỉnh sửa

3. trả về:

- khi bạn không có quyền chỉnh sửa phản hồi này

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Không có quyền chỉnh sủa phản hồi",
    "errno": 300,
    "errcode": 300
}
```

- khi chỉnh sửa thành công

```javascript
{
    "status": 200,
    "payload": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    },
    "message": "cập nhật phản hồi thành công",
    "errno": null,
    "errcode": null
}
```

## 7. chỉnh sửa nội dung của bình luận

1. phương thức:

   POST http://localhost:3000/post/article/updateComment

2. cấu trúc:

```javascript
{
    cmt_id: string (bắt buộc),
    content: string (bắt buộc),
}
```

- trong đó:

  - **cmt_id**: id của bình luận
  - **content**: nội dung được chỉnh sửa

3. trả về:

- khi bạn không có quyền chỉnh sửa bình luận này

```javascript
{
   "status": 400,
   "payload": [],
   "message": "Không có quyền chỉnh sủa bình luận",
   "errno": 300,
   "errcode": 300
}
```

- khi chỉnh sửa thành công:

```javascript
{
    "status": 200,
    "payload": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    },
    "message": "cập nhật bình luận thành công",
    "errno": null,
    "errcode": null
}
```

## 8. xóa phản hồi của bình luận

1. phương thức:

   POST http://localhost:3000/post/article/deleteReply

2. cấu trúc:

```javascript
{
    reply_id: string (bắt buộc),
}
```

- trong đó:

  - **reply_id**: id của phản hồi muốn xóa

- _chú ý_:
- chỉ có **người tạo phản hồi** mới có quyền xóa phản hồi này
- hoặc **chủ của bài viết** có quyền xóa phản hồi này

3. trả về:

- khi bạn không có quyền xóa phản hồi này

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Không có quyền xóa phản hồi",
    "errno": 300,
    "errcode": 300
}
```

- khi xóa thành công:

```javascript
{
    "status": 200,
    "payload": {
        "acknowledged": true,
        "deletedCount": 1,
        "reply_id": "6548e1700cf8cb273dfbd0ca"
    },
    "message": "xóa phản hồi thành công",
    "errno": null,
    "errcode": null
}
```

## 9. xóa bình luận của bài viết chia sẻ trạng thái

1. phương thức:

   POST http://localhost:3000/post/article/deleteComment

2. cấu trúc:

```javascript
{
    cmt_id: string (bắt buộc),
}
```

- trong đó:

  - **cmt_id**: id của bình luận muốn xóa

3. trả về

- khi bạn không có quyền xóa bình luận này

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Không có quyền xóa bình luận",
    "errno": 300,
    "errcode": 300
}
```

- khi xóa thành công:

```javascript
{
    "status": 200,
    "payload": {
        "cmt_id": "6548e1520cf8cb273dfbd0c9"
    },
    "message": "xóa bình luận thành công",
    "errno": null,
    "errcode": null
}
```

## 10. xóa bài viết chia sẻ trạng thái

1. phương thức:

   POST http://localhost:3000/post/article/deleteArticle

2. cấu trúc:

```javascript
{
    article_id: string (bắt buộc),
}
```

- trong đó:

  - **article_id**: id của bài viết muốn xóa

3. trả về:

- khi bạn không có quyền xóa bài viết này

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Không có quyền xóa bài viết",
    "errno": 300,
    "errcode": 300
}
```

- khi xóa thành công:

```javascript
{
    "status": 200,
    "payload": {
        "article_id": "6548e8d00b5ba4771a5fc15a"
    },
    "message": "xóa bài viết thành công",
    "errno": null,
    "errcode": null
}
```

## 11. lấy bài viết chia sẻ kiến thức bằng id của bài viết

1. phương thức:

   POST http://localhost:3000/post/article/getArticle

2. cấu trúc:

```javascript
{
    article_id: string (bắt buộc),
}
```

- trong đó:

  - **article_id**: id của bài viết muốn lấy

3. trả về:

- khi bài viết không tồn tại

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Bài chia sẻ kiến thức không tồn tại",
    "errno": 300,
    "errcode": 300
}
```

- khi lấy bài viết thành công:

```javascript
{
    "status": 200,
    "payload": {
        "_id": "6549106cd55fe46e0f9dd857",
        "title": "nuôi dạy chó con",
        "postType": "ARTICLE",
        "visibility": "PUBLIC",
        "main_image": "www.dog.com",
        "intro": "xin chào .....",
        "content": "chocolate rất hại.....",
        "categories": [
            "dog",
            "cat"
        ],
        "createAt": "2023-11-06T16:12:28.545Z",
        "numOfUpVote": 1,
        "numOfDownVote": 2,
        "numOfComment": 0,
        "modifiedAt": null,
        "owner_id": 8,
        "owner_infor": {
            "ma_nguoi_dung": 8,
            "ten": "Susan",
            "ngay_sinh": "1991-10-05T17:00:00.000Z",
            "tai_khoan": "susan",
            "email": "susan@gmail.com",
            "so_dien_thoai": "0912345685",
            "gioi_tinh": 0,
            "anh": {
                "ma_anh": null,
                "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
                "ngay_cap_nhat": null,
                "ma_nguoi_dung": "8",
                "is_active": null
            }
        },
        "hasUpVoted": true,
        "hasDownVoted": false
    },
    "message": "lấy bài viết thành công",
    "errno": null,
    "errcode": null
}
```

- trong đó:
  - **hasUpVoted**: true nếu bạn đã upvote bài viết này, false nếu chưa
  - **hasDownVoted**: true nếu bạn đã downvote bài viết này, false nếu chưa
  - nếu cả **hasUpVoted** và **hasDownVoted** đều là false thì bạn chưa vote bài viết này

## 12. kiểm tra liệu người dung đã theo dõi bài viết chia sẻ kiếm thức chưa

1. phương thức:

   POST http://localhost:3000/post/article/isUserFollowedPost

2. cấu trúc:

```javascript
{
    article_id: string (bắt buộc),
}
```

- trong đó:

  - **article_id**: id của bài viết muốn kiểm tra

3.  trả về:

    - khi người dùng đã theo dõi bài chia sẻ trạng thái:

      ```javascript
      {
      "status": 200,
      "payload": {
          "article_id": "6549106cd55fe46e0f9dd857",
          "isFollowed": true
      },
      "message": "",
      "errno": null,
      "errcode": null
      ```

    }

    ````

    - khi người dùng chưa theo dõi bài chia sẻ trạng thái:

      ```javascript
      {
      "status": 200,
      "payload": {
          "article_id": "6549106cd55fe46e0f9dd857",
          "isFollowed": false
      },
      "message": "",
      "errno": null,
      "errcode": null
    ````

    }

    - trong đó:
      - **article_id**: id của bài viết
      - **isFollowed**: true nếu bạn đã theo dõi bài viết này, false nếu chưa

## 13. theo dõi bài viết chia sẻ kiến thức:

1. phương thức:

   POST http://localhost:3000/post/article/followArticle

2. cấu trúc:

```javascript
{
    article_id: string (bắt buộc),
}
```

- trong đó:

  - **article_id**: id của bài viết chia sẻ kiến thức muốn theo dõi

3. trả về:

- khi bạn đã theo dõi bài viết này trước đó:

```javascript
{
    "status": 200,
    "payload": {
        "article_id": "6548f00bb7221c7de43e80f6",
        "isFollowed": true
    },
    "message": "bạn đã theo dõi bài viết này",
    "errno": null,
    "errcode": null
}
```

- khi người dùng theo dõi thành công:

```javascript
{
    "status": 200,
    "payload": {
        "article_id": "6548f00bb7221c7de43e80f6",
        "isFollowed": true
    },
    "message": "theo dõi bài viết thành công",
    "errno": null,
    "errcode": null
}
```

## 14. bỏ theo dõi bài viết chia sẻ kiến thức

1. phương thức:

   POST http://localhost:3000/post/article/unFollowArticle

2. cấu trúc:

```javascript
{
    article_id: string (bắt buộc),
}
```

- trong đó:

  - **article_id**: id của bài viết chia sẻ kiến thức muốn bỏ theo dõi

3. trả về:

- khi bạn chưa theo dõi bài viết này trước đó:

```javascript
{
    "status": 400,
    "payload": {
        "unfollowed": false,
        "message": "bạn chưa theo dõi bài viết này trước đó"
    },
    "message": "bạn chưa theo dõi bài viết này trước đó",
    "errno": 300,
    "errcode": 300
}
```

- khi bạn bỏ theo dõi thành công:

```javascript
{
    "status": 200,
    "payload": {
        "unfollowed": true,
        "message": "unfollow thành công"
    },
    "message": "unfollow thành công",
    "errno": null,
    "errcode": null
}
```

## 15. lấy tất cả các bình luận của 1 bài viết chia sẻ kiến thức

1. phương thức:

   POST http://localhost:3000/post/article/getAllComment

2. cấu trúc:

```javascript
{
  article_id: string;
}
```

- trong đó:
  - **article_id**: id của bài viết chia sẻ kiến thức muốn lấy ra tất cả các bình luận

3. trả về:

- khi không có comment nào:

```javascript
{
    "status": 200,
    "payload": {
        "comments": [],
        "numOfComments": 0,
        "numOfRemain": 0
    },
    "message": "lấy tất cả các bài viết thành công",
    "errno": null,
    "errcode": null
}
```

- khi có comment:

```javascript
{
    "status": 200,
    "payload": {
        "comments": [
            {
                "_id": "654b2f3a80dd116923a40270",
                "articleId": "6549d20b0973deaa2b1cc8f0",
                "type": "COMMENT_ARTICLE",
                "comment": "test cmt 2",
                "commentBy": 2,
                "commentAt": "2023-11-08T06:48:26.128Z",
                "numOfUpVote": 0,
                "numOfDownVote": 0,
                "numOfReply": 0,
                "modifiedAt": null,
                "userCmtInfor": {
                    "ma_nguoi_dung": 2,
                    "ten": "Dung",
                    "ngay_sinh": "1991-09-29T17:00:00.000Z",
                    "tai_khoan": "dung",
                    "email": "dung@gmail.com",
                    "so_dien_thoai": "0912345679",
                    "gioi_tinh": 1,
                    "anh": {
                        "ma_anh": 39,
                        "url": "...........................",
                        "ngay_cap_nhat": "2023-09-01T09:52:48.000Z",
                        "ma_nguoi_dung": 2,
                        "is_active": 1
                    }
                }
            },
            {
                "_id": "654b2f2d80dd116923a4026f",
                "articleId": "6549d20b0973deaa2b1cc8f0",
                "type": "COMMENT_ARTICLE",
                "comment": "test cmt 1",
                "commentBy": 10,
                "commentAt": "2023-11-08T06:48:13.408Z",
                "numOfUpVote": 0,
                "numOfDownVote": 0,
                "numOfReply": 0,
                "modifiedAt": null,
                "userCmtInfor": {
                    "ma_nguoi_dung": 10,
                    "ten": "Thanh",
                    "ngay_sinh": "1991-10-07T17:00:00.000Z",
                    "tai_khoan": "thanh",
                    "email": "thanh@gmail.com",
                    "so_dien_thoai": "0912345687",
                    "gioi_tinh": 0,
                    "anh": {
                        "ma_anh": null,
                        "url": "..............",
                        "ngay_cap_nhat": null,
                        "ma_nguoi_dung": "10",
                        "is_active": null
                    }
                }
            }
        ],
        "numOfComments": 2,
        "numOfRemain": 0
    },
    "message": "lấy tất cả các bài viết thành công",
    "errno": null,
    "errcode": null
}
```

- trong đó:


  - **comments**: danh sách chứa tất cả các bình luận của bài viết
  - **numOfComments**: số lượng bình luận của bài viết hiện tại trả về  trong danh sách **comments**
  - **numOfRemain**:: số lượng bình luận còn lại của bài viết 
