# Post Status:

## thêm bài viết chia sẻ trạng thái:
1. phương thức :
   
   POST: http://localhost:3000/post/addStatusPost

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

3. trả về ở dưới này sẽ được nằm trong payload của **Respone**:
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
   
   POST: http://localhost:3000/post/likeStatusPost
   
2. cấu trúc
```javascript
{
    post_id: .....
}
```

3. trả về ở dưới này:
   
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
   
   POST: http://localhost:3000/post/commentStatusPost
   
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
        "commentBy": 7,
        "commentAt": "................",
        "numOfLike": 0,
        "numOfReply": 0
    },
```

## like comment viết chia sẻ trạng thái:

`phương thức này dùng để like nếu bài comment chưa được like và hủy like nếu bài comment đã được like rồi`

1. phương thức :
   
   POST: http://localhost:3000/post/likeCommentStatusPost
   
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