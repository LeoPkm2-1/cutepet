# LISTEN FOR EVENT

## 1. Like status Post:

- Listen on: **LIKE_STATUS_POST** event
- data struture:

```javascript
  {
    "userLike": {
        "ma_nguoi_dung": 4,
        "ten": "Ty",
        "tai_khoan": "ty",
        "anh": {
            "ma_anh": null,
            "url": ".......................",
            "ngay_cap_nhat": null,
            "ma_nguoi_dung": "4",
            "is_active": null
        }
    },
    "postOwner": {
        "ma_nguoi_dung": 2,
        "ten": "Dung",
        "tai_khoan": "dung",
        "anh": {
            "ma_anh": 39,
            "url": "www.facebook.com.vn",
            "ngay_cap_nhat": "2023-09-01T09:52:48.000Z",
            "ma_nguoi_dung": 2,
            "is_active": 1
        }
    },
    "message": "",
    "likeAt": "2023-10-15T08:27:58.708Z",
    "youAreOwner": false
}
```

- **userLike**: describe **information about user** who has **liked status post**
- **postOwner**: describe **information about user** who is **owner of status post**
- **youAreOwner**: is post **owned by you**

## 2. Comment status Post:

- Listen on: **COMMENT_STATUS_POST** event
- data struture:

```javascript
{
    "userComment": {
        "ma_nguoi_dung": 8,
        "ten": "Susan",
        "tai_khoan": "susan",
        "anh": {
            "ma_anh": null,
            "url": "...........................",
            "ngay_cap_nhat": null,
            "ma_nguoi_dung": "8",
            "is_active": null
        }
    },
    "postOwner": {
        "ma_nguoi_dung": 2,
        "ten": "Dung",
        "tai_khoan": "dung",
        "anh": {
            "ma_anh": 39,
            "url": ".............................",
            "ngay_cap_nhat": "2023-09-01T09:52:48.000Z",
            "ma_nguoi_dung": 2,
            "is_active": 1
        }
    },
    "message": "",
    "commentAt": "2023-10-15T09:57:07.999Z",
    "youAreOwner": true
}
```

- **userComment** : describe information about **user** who has **commented status post**
- **postOwner** : describe **information about user** who is **owner of status post**
- **areYouOwner** : is post **owned by you**

## 3. Like comment in status Post

- Listen on: **LIKE_COMMENT_IN_STATUS_POST** event
- data structure

```javascript
{
    "userLike": {
        "ma_nguoi_dung": 8,
        "ten": "Susan",
        "tai_khoan": "susan",
        "anh": {
            "ma_anh": null,
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
            "ngay_cap_nhat": null,
            "ma_nguoi_dung": "8",
            "is_active": null
        }
    },
    "commentOwner": {
        "ma_nguoi_dung": 2,
        "ten": "Dung",
        "tai_khoan": "dung",
        "anh": {
            "ma_anh": 39,
            "url": "www.facebook.com.vn",
            "ngay_cap_nhat": "2023-09-01T09:52:48.000Z",
            "ma_nguoi_dung": 2,
            "is_active": 1
        }
    },
    "commentInfor": {
        "_id": "6533416af0efa9d27e7bf16c",
        "postId": "65333ff5f0efa9d27e7bf163",
        "comment": "tôi là dung comment",
        "commentBy": 2,
        "commentAt": "2023-10-21T03:11:38.515Z",
        "numOfLike": 2,
        "numOfReply": 3,
        "modifiedAt": null
    },
    "likeAt": "2023-10-21T06:27:39.610Z",
    "areYouCommenOwner": true,
    "dependOn": {
        "postInfor": {
            "_id": "65333ff5f0efa9d27e7bf163",
            "text": "xin chào tui là dũng nha",
            "postType": "status",
            "media": {
                "type": "images",
                "data": [
                    "google.com",
                    "youtube.com",
                    "amazon.com"
                ]
            },
            "createAt": "2023-10-21T03:05:25.146Z",
            "numOfLike": 2,
            "numOfComment": 2,
            "modifiedAt": null,
            "owner_id": 2
        },
        "postOwner": {
            "ma_nguoi_dung": 2,
            "ten": "Dung",
            "tai_khoan": "dung",
            "anh": {
                "ma_anh": 39,
                "url": "www.facebook.com.vn",
                "ngay_cap_nhat": "2023-09-01T09:52:48.000Z",
                "ma_nguoi_dung": 2,
                "is_active": 1
            }
        },
        "areYouPostOwner": true
    },
    "message": ""
}
```

- **userLike**: describe **information about user** who has **liked comment in status post**

- **commentOwner** : describe **information about user** who is **owner of comment in status post**

- **commentInfor**:information about **comment** which **has been liked**

- **likeAt**: time when **comment** has been liked

- **areYouCommenOwner**: is comment **owned by you**

- **dependOn**: information about **post** which contain **the comment** has been liked

- **dependOn.postInfor**: post information
- **dependOn.postOwner**: post owner information
- **dependOn.areYouPostOwner**: is post **owned by you**

## 4. Reply in comment

- Listen on: **REPLY_COMMENT_IN_STATUS_POST** event
- data struture:

```javascript
{
    "userReply": {
        "ma_nguoi_dung": 10,
        "ten": "Thanh",
        "tai_khoan": "thanh",
        "anh": {
            "ma_anh": null,
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
            "ngay_cap_nhat": null,
            "ma_nguoi_dung": "10",
            "is_active": null
        }
    },
    "commentOwner": {
        "ma_nguoi_dung": 2,
        "ten": "Dung",
        "tai_khoan": "dung",
        "anh": {
            "ma_anh": 39,
            "url": "www.facebook.com.vn",
            "ngay_cap_nhat": "2023-09-01T09:52:48.000Z",
            "ma_nguoi_dung": 2,
            "is_active": 1
        }
    },
    "commentInfor": {
        "_id": "6533416af0efa9d27e7bf16c",
        "postId": "65333ff5f0efa9d27e7bf163",
        "comment": "tôi là dung comment",
        "commentBy": 2,
        "commentAt": "2023-10-21T03:11:38.515Z",
        "numOfLike": 2,
        "numOfReply": 4,
        "modifiedAt": null
    },
    "replyAt": "2023-10-21T06:35:16.004Z",
    "areYouCommenOwner": true,
    "dependOn": {
        "postInfor": {
            "_id": "65333ff5f0efa9d27e7bf163",
            "text": "xin chào tui là dũng nha",
            "postType": "status",
            "media": {
                "type": "images",
                "data": [
                    "google.com",
                    "youtube.com",
                    "amazon.com"
                ]
            },
            "createAt": "2023-10-21T03:05:25.146Z",
            "numOfLike": 2,
            "numOfComment": 2,
            "modifiedAt": null,
            "owner_id": 2
        },
        "postOwner": {
            "ma_nguoi_dung": 2,
            "ten": "Dung",
            "tai_khoan": "dung",
            "anh": {
                "ma_anh": 39,
                "url": "www.facebook.com.vn",
                "ngay_cap_nhat": "2023-09-01T09:52:48.000Z",
                "ma_nguoi_dung": 2,
                "is_active": 1
            }
        },
        "areYouPostOwner": true
    },
    "message": ""
}
```

- **userReply**: describe **information about user** who has **replied comment in status post**

- **commentOwner** : describe **information about user** who is **owner of comment in status post**

- **commentInfor**:information about **comment** which **has been replied**

- **replyAt**: time when **comment** has been replied

- **areYouCommenOwner**: is comment **owned by you**
- **dependOn**: information about **post** which contain **the comment** has been replied
- **dependOn.postInfor**: post information
- **dependOn.postOwner**: post owner information
- **dependOn.areYouPostOwner**: is post **owned by you**

## 5. Login notification

- Listen on: **USER_IS_ONLINE** event
- data struture:

```javascript
{
    "user_id": 2
}
```

- **user_id**: id of user who has just logged in

## 6. Logout notification

- Listen on: **USER_IS_OFFLINE** event
- data struture:

```javascript
{
    "user_id": 2
}
```

- **user_id**: id of user who has just logged out