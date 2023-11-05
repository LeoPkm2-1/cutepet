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
