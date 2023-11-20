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

## 7. Tag user in status post notification

- Listen on: **TAG_USER_IN_STATUS_POST** event
- data structure:

```javascript
{
    "userTag": {
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
    },
    "taggedUser": {
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
        }
    },
    "postInfor": {
        "_id": "653e77b152c970c79c0e1f28",
        "postType": "status",
        "text": "xin chào tui là dũng nha không vi",
        "createAt": "2023-10-29T15:18:09.037Z"
    },
    "tagAt": "2023-10-29T15:18:09.048Z",
    "areYouPostOwner": false,
    "dependOn": null,
    "message": ""
}
```

## 8. thông báo khi có lời mời kết bạn

- Listen on: **REQUEST_ADD_FRIEND** event
- data structure:

```javascript
{
    "requestUser": {
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
    },
    "recipient": {
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
        }
    },
    "requestAt": "2023-11-03T08:11:28.397Z",
    "message": ""
}
```

## 9. thông báo khi được chấp nhận lời mời kết bạn

- Listen on: **ACCEPT_ADD_FRIEND** event
- data structure:

```javascript
{
    "acceptUser": {
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
        }
    },
    "requestUser": {
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
    },
    "acceptAt": "2023-11-03T09:19:30.555Z",
    "message": ""
}
```

## 10. thông báo khi có bài viết status mới được đăng lên

- Listen on: **NEW_STATUS_POST_APPEAR** event
- data trả về:

```javascript
{
    "postInfor": {
        "_id": "655a088a50fed106e885dbb4",
        "text": "2 susan và thúy nha",
        "postType": "STATUS",
        "visibility": "PRIVATE",
        "media": {
            "type": "images",
            "data": [
                ""
            ]
        },
        "taggedUsers": [
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
                }
            },
            {
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
        ],
        "createAt": "2023-11-19T13:07:22.353Z",
        "numOfLike": 0,
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
        },
        "hasLiked": false
    },
    "areYouOwner": true
}
```

- trong đó:
  - **postInfor:** chứa thông tin của status post mới dc đăng lên cầm cập nhật:
  - **areYouOwner:** cho biết bạn có phải là người chủ của bài đăng này không. Nếu là **true** tức là bạn là chủ của bài đăng này => cập nhật bài đăng lên đầu cây dom tree. Nếu là **false** tức là bạn không phải là chủ của bài đăng này => cập nhật bài đăng lên cuối cây dom tree.

##

##

##

##

##

##

##

##

##

##
