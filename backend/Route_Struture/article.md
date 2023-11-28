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
  - **numOfComments**: số lượng bình luận của bài viết hiện tại trả về trong danh sách **comments**
  - **numOfRemain**:: số lượng bình luận còn lại của bài viết

## 16. lấy bình luận theo của bài viết chia sẻ kiến thức index và num

1. phương thức:

   POST http://localhost:3000/post/article/getCommentStartFrom

2. cấu trúc:

```javascript
{
    article_id: string,
    index: number,
    num: number
}
```

- trong đó:
  - **article_id**: id của bài chia sẻ kiến thức muốn lấy ra các bình luận
  - **index**: mô tả vị trí của bình luận được lấy (index: bắt đầu từ 0,1,....)
    - **num**: số lượng bình luận cần lấy ra

3. trả về:

```javascript
{
    "status": 200,
    "payload": {
        "comments": [
            {
                "_id": "654b4b13cacfb2b68ed97a87",
                "articleId": "654b4aa2cacfb2b68ed97a7d",
                "type": "COMMENT_ARTICLE",
                "comment": "chó con đáng yêu 9",
                "commentBy": 4,
                "commentAt": "2023-11-08T08:47:15.779Z",
                "numOfUpVote": 0,
                "numOfDownVote": 0,
                "numOfReply": 0,
                "modifiedAt": null,
                "userCmtInfor": {
                    "ma_nguoi_dung": 4,
                    "ten": "Ty",
                    "ngay_sinh": "1991-10-01T17:00:00.000Z",
                    "tai_khoan": "ty",
                    "email": "ty@gmail.com",
                    "so_dien_thoai": "0912345681",
                    "gioi_tinh": 1,
                    "anh": {
                        "ma_anh": null,
                        "url": "........................",
                        "ngay_cap_nhat": null,
                        "ma_nguoi_dung": "4",
                        "is_active": null
                    }
                }
            },
            {
                "_id": "654b4affcacfb2b68ed97a86",
                "articleId": "654b4aa2cacfb2b68ed97a7d",
                "type": "COMMENT_ARTICLE",
                "comment": "chó con đáng yêu 8",
                "commentBy": 2,
                "commentAt": "2023-11-08T08:46:55.872Z",
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
                        "url": "......................",
                        "ngay_cap_nhat": "2023-09-01T09:52:48.000Z",
                        "ma_nguoi_dung": 2,
                        "is_active": 1
                    }
                }
            },
            {
                "_id": "654b4afbcacfb2b68ed97a85",
                "articleId": "654b4aa2cacfb2b68ed97a7d",
                "type": "COMMENT_ARTICLE",
                "comment": "chó con đáng yêu 7",
                "commentBy": 2,
                "commentAt": "2023-11-08T08:46:51.495Z",
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
                        "url": ".......................",
                        "ngay_cap_nhat": "2023-09-01T09:52:48.000Z",
                        "ma_nguoi_dung": 2,
                        "is_active": 1
                    }
                }
            }
        ],
        "numOfComments": 3,
        "numOfRemain": 6
    },
    "message": "lấy bình luận thành công",
    "errno": null,
    "errcode": null
}
```

- trong đó:
  - **comments**: danh sách chứa tất cả các bình luận của bài viết
  - **numOfComments**: số lượng bình luận của bài viết hiện tại trả về trong danh sách **comments**
  - **numOfRemain**:: số lượng bình luận còn lại của bài viết

## 17. lấy tất cả các bài viết chia sẻ kiến thức trong database

1. Phương thức:

   POST http://localhost:3000/post/article/getAllArticleInDB

2. cấu trúc:

   **không yêu cầu tham số**

3. trả về:

```javascript
{
    "status": 200,
    "payload": [
        {
            "_id": "654b905a64cb740e517ad555",
            "title": "Dùng sữa vào bủôi sáng hay buổi tối thì tốt hơn cho thú cưng",
            "postType": "ARTICLE",
            "visibility": "PUBLIC",
            "main_image": "www.dogcat.com",
            "intro": "xin chào .....",
            "content": "các thú cưng con.....",
            "categories": [
                "dog",
                "cat"
            ],
            "createAt": "2023-11-08T13:42:50.946Z",
            "numOfUpVote": 0,
            "numOfDownVote": 0,
            "numOfComment": 0,
            "modifiedAt": null,
            "owner_id": 2,
            "owner_infor": {
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
            "_id": "654b900c64cb740e517ad553",
            "title": "Độ tuổi phù hợp cho thú cưng uống sữa",
            "postType": "ARTICLE",
            "visibility": "PUBLIC",
            "main_image": "www.dogcat.com",
            "intro": "xin chào .....",
            "content": "các thú cưng con.....",
            "categories": [
                "dog",
                "cat"
            ],
            "createAt": "2023-11-08T13:41:32.190Z",
            "numOfUpVote": 0,
            "numOfDownVote": 0,
            "numOfComment": 0,
            "modifiedAt": null,
            "owner_id": 10,
            "owner_infor": {
                "ma_nguoi_dung": 10,
                "ten": "Thanh",
                "ngay_sinh": "1991-10-07T17:00:00.000Z",
                "tai_khoan": "thanh",
                "email": "thanh@gmail.com",
                "so_dien_thoai": "0912345687",
                "gioi_tinh": 0,
                "anh": {
                    "ma_anh": null,
                    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
                    "ngay_cap_nhat": null,
                    "ma_nguoi_dung": "10",
                    "is_active": null
                }
            }
        },
    ],
    "message": "",
    "errno": null,
    "errcode": null
}
```

## 18 danh sách tên của tất cả các thể loại trong bài viết chia sẻ kiến thức

1. Phương thức:

   POST http://localhost:3000/post/article/AllAvailableCategories

2. cấu trúc:

   không yêu cầu tham số

3. trả về:

```javascript
{
    "status": 200,
    "payload": [
        "CHÓ",
        "CHÓ CON",
        "CHÓ TRƯỞNG THÀNH",
        "CHÓ LỚN TUỔI",
        "GIỐNG LOÀI",
        "MÈO",
        "MÈO CON",
        "MÈO TRƯỞNG THÀNH",
        "MÈO LỚN TUỔI",
        "DỊ ỨNG",
        "CÁCH CHĂM SÓC",
        "BỆNH",
        "CHẾ ĐỘ ĂN UỐNG",
        "HÀNH VI & KỸ NĂNG"
    ],
    "message": "lấy danh sách các thể loại thành công",
    "errno": null,
    "errcode": null
}
```

## 19. chỉnh sửa bài viết chia sẻ kiến thức

1. phương thức:

   POST http://localhost:3000/post/article/editArticle

2. cấu trúc:

```javascript
{
    article_id:string (bắt buộc),
    title: string (bắt buộc),
    main_image: string (bắt buộc),
    intro: string (không bắt buộc),
    content: string (bắt buộc),
    categories: array(string) (bắt buộc)
}
```

3. trả về:

- khi mã bài viết không hợp lệ

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Bài chia sẻ kiến thức không tồn tại",
    "errno": 300,
    "errcode": 300
}
```

- khi tiêu đề không tồn tại

```javascript
  {
  "status": 400,
  "payload": [],
  "message": "Tiêu đề không được để trống",
  "errno": 300,
  "errcode": 300
  }

```

- khi nội dung không tồn tại

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Nội dung bài viết không được để trống",
    "errno": 300,
    "errcode": 300
}
```

- khi hình ảnh chính của bài viết không có:

```javascript
{
    "status": 400,
    "payload": [],
    "message": "Bài chiase kiến thức phải có ảnh chính",
    "errno": 300,
    "errcode": 300
}
```

- khi chỉnh sửa thành công

```javascript
{
    "status": 200,
    "payload": {
        "title": "cách cho mèo  uống sữa đúng cách",
        "postType": "ARTICLE",
        "visibility": "PUBLIC",
        "main_image": "https://imgt.taimienphi.vn/cf/Images/tt/2023/1/10/hinh-nen-meo-cute-ngo-nghinh-dang-yeu-nhin-la-cung-4.jpg",
        "intro": "xin chào .....",
        "content": "các thú cưng con.....",
        "categories": [
            "MÈO",
            "MÈO CON",
            "CHẾ ĐỘ ĂN UỐNG"
        ],
        "createAt": "2023-11-16T00:14:38.939Z",
        "numOfUpVote": 0,
        "numOfDownVote": 0,
        "numOfComment": 0,
        "modifiedAt": "2023-11-16T02:23:10.113Z",
        "owner_id": 2
    },
    "message": "cập nhật bài chia sẻ trạng thái thành công",
    "errno": null,
    "errcode": null
}
```

## 20. report bài viết chia sẻ kiến thức

1. Phương thức:

   POST http://localhost:3000/post/article/reportArticle

2. cấu trúc:

```javascript
{
    article_id: string (bắt buộc)
}
```

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

- khi báo cáo thành cộng:

```javascript
{
    "status": 200,
    "payload": {
        "acknowledged": true,
        "insertedId": "6555c604f3ea8cfc9d63b28a"
    },
    "message": "",
    "errno": null,
    "errcode": null
}
```

## 21. phân trang cho bài viết chia sẻ kiến thức:

**(postman số 72)**

1. phương thức:

   POST http://localhost:3000/post/article/getArticlesByIndexAndNum

2. cấu trúc:

```javascript
{
    "index":null||number,
    "num":null||number,
}
```

- trong đó:
  - **index:** :mô tả bắt đầu lấy từ bài viết số mấy(chỉ số bắt đầu từ 0 , 1, ,2,....)
    - nếu **index** là `null` hoặc `0` thì tức là lấy từ bài viết đầu tiên
  - **num**: số lượng bài viết cần lấy ra.
    - nếu **num** là `null` thì tức là lấy đến bài viết cuối cùng trong csdl.

3. trả về:

```javascript
{
    "status": 200,
    "payload": {
        "articles": [
            {
                "_id": "654f9e8f479ad1da822047b4",
                "title": "Cách xử lý lông cho trắng bị ố vàng",
                "postType": "ARTICLE",
                "visibility": "PUBLIC",
                "main_image": "https://png.pngtree.com/background/20230607/original/pngtree-the-baby-kittens-look-at-the-camera-picture-image_2903605.jpg",
                "intro": "....................",
                "content": "..............",
                "categories": [
                    "Tắm",
                    "Đi dạo",
                    "Ăn uống"
                ],
                "createAt": "2023-11-11T15:32:31.242Z",
                "numOfUpVote": 1,
                "numOfDownVote": 3,
                "numOfComment": 3,
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
                }
            }
        ],
        "totalNumOfArticles": 8,
        "remainNumOfArticles": 2
    },
    "message": "",
    "errno": null,
    "errcode": null
}
```

- trong đó:
  - **totalNumOfArticles**: tổng số lượng bài viết trong csdl
  - **remainNumOfArticles**: sau khi lấy đến bài viết hiện tại thì còn lại bao nhiêu bài viết chưa dc lấy ra

## 22. lọc bài viết chia sẻ kiến thức theo thể loại và tiêu đề

**(postman số 73)**

1. phương thức:

   POST http://localhost:3000/post/article/filterArticles

2. cấu trúc:

```javascript
{
    "searchKey":string || null,
    "tags":array(string) || null,
    "index":number || null,
    "num": number || null
}
```

- trong đó:
  - **searchKey**: mô tả từ khóa liên quan đến tiêu đề của bài viết muốn tìm kiếm.
  - **tags**: danh sách các thể loại bài viết chia sẻ trạng thái muốn tìm kiếm nếu không có để là `null`
  - **index**: mô tả lấy từ bài viết thứ mấy chở đi (index bắt đầu từ: 0,1,2....)
  - **num**: số lượng bài viết muốn lấy ra. Nếu muốn lấy đến cuối danh sách thì truyền vào là `null`

3. trả về:

```javascript
{
    "status": 200,
    "payload": {
        "articles": [
            {
                "_id": "65645303ff180e672e6f87c7",
                "title": "Cách xử lý LôNG chó bị vón cục hiệu quả nhất",
                "postType": "ARTICLE",
                "visibility": "PUBLIC",
                "main_image": ".....................",
                "intro": "..........................",
                "content": "...............................",
                "categories": [
                    "CHÓ",
                    "CÁCH CHĂM SÓC"
                ],
                "createAt": "2023-11-27T08:27:47.554Z",
                "numOfUpVote": 0,
                "numOfDownVote": 0,
                "numOfComment": 0,
                "modifiedAt": null,
                "owner_id": 2,
                "owner_infor": {
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
            }
        ],
        "totalNumOfArticles": 3,
        "remainNumOfArticles": 2
    },
    "message": "",
    "errno": null,
    "errcode": null
}
```

- trong đó:
  - **totalNumOfArticles**: tổng số lượng bài viết trong csdl match với bộ lọc
  - **remainNumOfArticles**: sau khi lấy đến bài viết hiện tại thì còn lại bao nhiêu bài viết chưa dc lấy ra

##

##

##

##

##

```

```
