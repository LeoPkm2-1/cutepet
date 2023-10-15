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
    "owner": {
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
  -  **userLike**: describe **information about user** who has **liked status post**
  -  **owner**: describe **information about user** who is  **owner of status post**
  -  **youAreOwner**:  is post  **owned by you**