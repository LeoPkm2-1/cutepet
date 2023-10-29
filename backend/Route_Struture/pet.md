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
