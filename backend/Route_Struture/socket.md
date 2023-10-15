# LISTEN FOR EVENT

## STATUS POST

#### Like status Post:

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
-

#### Comment status Post:

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


