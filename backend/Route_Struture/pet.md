# Pet

## 1. thêm thú cưng

1. phương thức :

   POST: http://localhost:3000/pet/addpet

2. cấu trúc:

```javascript
 {
    ten_thu_cung:string,
    ngay_sinh:'yyyy-mm-dd',
    gioi_tinh:boolean||null,
    ghi_chu:string,
    ma_loai:number,
    ma_giong:number,
    url_anh:undefined||string,
    chieu_cao:undefined||number,
    can_nang:undefined||number,
 }
```

3. trả về:

```javascript
{
    "status": 200,
    "payload": {
        "ma_thu_cung": 38,
        "ten_thu_cung": "tui là thỏ 2 nha",
        "ngay_sinh": "2019-10-1",
        "gioi_tinh": "1",
        "giong_loai": {
            "ma_giong": 104,
            "ten_giong": "French Bulldog",
            "ma_loai": 1,
            "ten_loai": "chó"
        },
        "anh": {
            "ma_anh": 52,
            "url": "Leo.comahihihi.@",
            "ngay_cap_nhat": "2023-10-29T16:21:42.000Z",
            "ma_thu_cung": 38,
            "is_active": 1
        },
        "thong_tin_suc_khoe": {
            "ma_suc_khoe": 22,
            "ma_thu_cung": 38,
            "thoi_gian": "2023-10-29T16:21:42.000Z",
            "can_nang": 12,
            "chieu_cao": null
        }
    },
    "message": "thêm thú cưng thành công",
    "errno": null,
    "errcode": null
}
```


## 2. xóa thú cưng

1. phương thức:
    POST: http://localhost:3000/pet/deletePet

2. cấu trúc:
   
```javascript
{
    ma_thu_cung:number
}
```

3. trả về
    3.1. khi thú cưng không tồn tại
    ```javascript
    {
        "status": 400,
        "payload": [],
        "message": "thú cưng không tồn tại",
        "errno": 300,
        "errcode": 300
    }
    ```

    3.2. khi người xóa không phải là chủ của thú cưng đó

    ```javascript
    {
        "status": 400,
        "payload": [],
        "message": "bạn không phải là chủ thú cưng",
        "errno": 300,
        "errcode": 300
    }
    ```
    
    3.3. khi xóa thành công

    ```javascript
    {
        "status": 200,
        "payload": [],
        "message": "xóa thú cưng thành công",
        "errno": null,
        "errcode": null
    }
    ```



## 3. lấy tat cả các thú cưng của chính mình

1. phương thức:
    GET: http://localhost:3000/pet/getAllMyPets

2. cấu trúc:
    không cần truyền tham số

3. trả về :
```javascript
{
    "status": 200,
    "payload": [
        {
            "ma_thu_cung": 2,
            "ten_thu_cung": "Charlie",
            "ngay_sinh": "2019-10-10T17:00:00.000Z",
            "gioi_tinh": 1,
            "ghi_chu": "mèo ú",
            "ma_nguoi_chu": 2,
            "giong_loai": {
                "ma_giong": 205,
                "ten_giong": "British Shorthair",
                "ma_loai": 2,
                "ten_loai": "mèo"
            },
            "anh": {
                "ma_anh": null,
                "url": "https://img.freepik.com/free-photo/view-adorable-3d-cat_23-2150473746.jpg",
                "ngay_cap_nhat": null,
                "ma_thu_cung": 2,
                "is_active": null
            },
            "thong_tin_suc_khoe": {
                "ma_suc_khoe": null,
                "ma_thu_cung": 2,
                "thoi_gian": null,
                "can_nang": null,
                "chieu_cao": null
            }
        },
        {
            "ma_thu_cung": 4,
            "ten_thu_cung": "Luna",
            "ngay_sinh": "2019-10-12T17:00:00.000Z",
            "gioi_tinh": 0,
            "ghi_chu": "mèo lười",
            "ma_nguoi_chu": 2,
            "giong_loai": {
                "ma_giong": 205,
                "ten_giong": "British Shorthair",
                "ma_loai": 2,
                "ten_loai": "mèo"
            },
            "anh": {
                "ma_anh": null,
                "url": "https://img.freepik.com/free-photo/view-adorable-3d-cat_23-2150473746.jpg",
                "ngay_cap_nhat": null,
                "ma_thu_cung": 4,
                "is_active": null
            },
            "thong_tin_suc_khoe": {
                "ma_suc_khoe": null,
                "ma_thu_cung": 4,
                "thoi_gian": null,
                "can_nang": null,
                "chieu_cao": null
            }
        }
    ],
    "message": "lấy dữ liệu thành công",
    "errno": null,
    "errcode": null
}
```