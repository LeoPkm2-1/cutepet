# Post Status:

## thêm bài viết chia sẻ trạng thái:
1. phương thức :
   
   POST: http://localhost:3000/post/statusPost/addPost

2. cấu trúc
```javascript
{
    text: String,
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
    media: 
        undefined || {
            type:"video" || "images"
            data:[url]
        }
    createAt: time,
    numOfLike:0,
    numOfComment:0,
    owner_id: ..........,
}
```

## Like viết chia sẻ trạng thái:
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

## comment viết chia sẻ trạng thái:
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

## like comment viết chia sẻ trạng thái:

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


## Reply comment 

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


## lấy tất cả các bình luận của 1 bài viết trạng thái

` Phương thức này lấy tất cả các bình luận của 1 bài viết trạng thái`

1. Phương thức:

    GET: 'http://localhost:3000/post/statusPost/getAllComment?post_id=.......................'
    Param:

        - post_id: chính là mã bài viết

2. trả về ở dưới này:

```javascript
{
    "status": 200,
    "payload": {
        "comments": [
            {
                "_id": "........................",
                "postId": ".........................",
                "comment": "....................",
                "commentBy": '..',
                "commentAt": "..........................",
                "numOfLike": '........',
                "numOfReply": '..........'
            },
            {
                "_id": "........................",
                "postId": ".........................",
                "comment": "....................",
                "commentBy": '..',
                "commentAt": "..........................",
                "numOfLike": '........',
                "numOfReply": '..........'
            }
            .......
        ],
        "numOfComments": '.....',
        "numOfRemain": '......'
    },
    "message": "lấy dữ liệu thành công",
    "errno": null,
    "errcode": null
}
```

## phân trang cho bình luận

1. Phương thức:

    GET: 'http://localhost:3000/post/statusPost/getCommentStartFrom?post_id=........&index=.........&num=........'

    Param:

    - post_id: mã bài post
    - index: lấy từ comment thứ mấy, (thứ tự bắt đầu từ: 0,1,......)
    - num: số lượng comment lấy ra

2. trả về:
```javascript
{
    "status": 200,
    "payload": {
        "comments": [
            {
                "_id": "6506706fc1a6868a8bf7d4f3",
                "postId": "6501634ea4cdef6e6afc6d2b",
                "comment": "lori",
                "commentBy": 8,
                "commentAt": "2023-09-16T19:20:15.808Z",
                "numOfLike": 0,
                "numOfReply": 0
            },
            {
                "_id": "6506706fc1a6868a8bf7d4f4",
                "postId": "6501634ea4cdef6e6afc6d2b",
                "comment": "lori",
                "commentBy": 9,
                "commentAt": "2023-09-16T18:20:15.808Z",
                "numOfLike": 0,
                "numOfReply": 0
            },
            {
                "_id": "6506706fc1a6868a8bf7d4f5",
                "postId": "6501634ea4cdef6e6afc6d2b",
                "comment": "lori",
                "commentBy": 10,
                "commentAt": "2023-09-16T17:20:15.808Z",
                "numOfLike": 0,
                "numOfReply": 0
            },
            {
                "_id": "6506706fc1a6868a8bf7d4f6",
                "postId": "6501634ea4cdef6e6afc6d2b",
                "comment": "lori",
                "commentBy": 11,
                "commentAt": "2023-09-16T16:20:15.808Z",
                "numOfLike": 0,
                "numOfReply": 0
            }
        ],
        "numOfComments": 4,
        "numOfRemain": 1
    },
    "message": "lấy dữ liệu thành công",
    "errno": null,
    "errcode": null
}
```


## Lấy tất cả các Phản hồi của bình luận

`Phương thức này lấy tất cả các phản hồi của 1 bình luận`

1. Phương thức:

    GET: 'http://localhost:3000/post/statusPost/getAllReply?cmt_id=...................'

    Param:
        - cmt_id: chính là mã của bình luận 
  
2. trả về ở dưới này: 

```javascript
{
    "status": 200,
    "payload": {
        "replies": [
            {
                "_id": "6506c3d7655387a7f2f31f8f",
                "cmtId": "6501dd56ae68d86a2849b3ec",
                "reply": "ahihi",
                "replyBy": 4,
                "replyAt": "2023-09-17T09:16:07.611Z",
                "numOfLike": 0
            },
            {
                "_id": "6503303b194d1473c3dd746d",
                "cmtId": "6501dd56ae68d86a2849b3ec",
                "reply": "ahihi",
                "replyBy": 4,
                "replyAt": "2023-09-14T16:09:31.846Z",
                "numOfLike": 0
            },
            ..................
        ],
        "numOfReplies": 7,
        "numOfRemain": 0
    },
    "message": "lấy phản hồi thành công",
    "errno": null,
    "errcode": null
}
```


## phân trang cho phản hồi

1. Phương thức:

    GET: 'http://localhost:3000/post/statusPost/getReplyStartFrom?cmt_id=................&index=..........&num=........'

    Param:

    - cmt_id: mã của bình luận,
    - index: lấy từ bình luận thứ mấy (thứ tự bắt đầu từ: 0,1,......)
    - num: số lượng phản hồi lấy ra

2. trả về:
   
```javascript
{
    "status": 200,
    "payload": {
        "replies": [
            {
                "_id": "6502bdb4fd7f90a0aa52dd25",
                "cmtId": "6501dd56ae68d86a2849b3ec",
                "reply": "tui là Leo nè",
                "replyBy": 5,
                "replyAt": "2023-09-14T08:00:52.350Z",
                "numOfLike": 0
            },
            {
                "_id": "6502bd69fd7f90a0aa52dd24",
                "cmtId": "6501dd56ae68d86a2849b3ec",
                "reply": "hài quá",
                "replyBy": 5,
                "replyAt": "2023-09-14T07:59:37.892Z",
                "numOfLike": 0
            }
        ],
        "numOfReplies": 2,
        "numOfRemain": 1
    },
    "message": "lấy dữ liệu thành công",
    "errno": null,
    "errcode": null
}
```