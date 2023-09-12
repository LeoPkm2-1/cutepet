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
1. phương thức :
   
   POST: http://localhost:3000/post/likeStatusPost
   
2. cấu trúc
```javascript
{
    post_id: .....
}
```

3. trả về ở dưới này sẽ được nằm trong payload của **Respone**:
```javascript
{
    post_id: ...,
    likeBy: person_id
    likeAt: time
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
```javascript
{
    post_id: .....,
    comment:....,
    commentBy:person_id,
    commentAt: time,
}
```