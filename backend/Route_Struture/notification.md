# GET NOTIFICATION

## 1. Get notifications before specific time

(tham khảo _postman_ số 19)

1. phương thức :

   POST: http://localhost:3000/notification/getNotificationBefore

2. cấu trúc:
   ```javascript
   {
     before: string_time;
     num: positive_number;
   }
   ```

- trong đó:

  - **num**: số lượng bài viết cần lấy ra
  - **before**:

  `<năm>-<tháng>-<ngày>T<giờ>:<phút>:<giây>.<tích tắc><time_zone_>`

`<tích tắc>`: có thể có hoăc không

`<time_zone>`: có thể có hoăc không:

- nếu không mô tả `<time_zone>` thì thời gian sẽ ở múi giờ của local
  `2023-09-01T09:52:48.000`

- nếu `<time_zone>` là **Z** thì thời gian ở múi giờ +00:00. VD:
  `2023-09-01T09:52:48Z`

- mô tả `<time_zone>` bất kỳ theo cú pháp sau:`[sign]<...><.....>:<...><...>`. trong đó `sign` là `+` hoặc `-`: vd thời gian ở múi giờ `+10:30` sẽ mô tả như sau:
  `2023-10-16T13:34:12.735+10:30`

## 2. Get notifications by index and range

(tham khảo _postman_ số 18)

1. phương thức :

   POST: http://localhost:3000/notification/getNotificationStartFrom

2. cấu trúc:
   ```javascript
   {
     index: positive_number;
     num: positive_number;
   }
   ```
   - trong đó:
     - index: mô tả thông báo thứ mấy
     - num: số lượng thông báo cần lấy

## 3. mark notification as read

(tham khảo _postman_ số 20)

1. phương thức:

   POST: http://localhost:3000/notification/markAsRead

2. cấu trúc:

   ```javascript
   {
     notif_id: string;
   }
   ```

   - trong đó:
   - notif_id: id của thông báo cần đánh dấu đã đọc

3. cấu trúc:

## 4. mark ALL notification as read

(tham khảo _postman_ số 21)

1. phương thức:

   POST: http://localhost:3000/notification/markAllAsRead

## 5. Get UnRead notifications before specific time

(postman số 69)

1. phương thức :

   POST: http://localhost:3000/notification/getUnReadNotiBefore

2. cấu trúc:

```javascript
{
  before: string_time;
  num: positive_number;
}
```

- trong đó:

- **num**: số lượng bài viết cần lấy ra
- **before**:

`<năm>-<tháng>-<ngày>T<giờ>:<phút>:<giây>.<tích tắc><time_zone_>`

`<tích tắc>`: có thể có hoăc không

`<time_zone>`: có thể có hoăc không:

- nếu không mô tả `<time_zone>` thì thời gian sẽ ở múi giờ của local
  `2023-09-01T09:52:48.000`

- nếu `<time_zone>` là **Z** thì thời gian ở múi giờ +00:00. VD:
  `2023-09-01T09:52:48Z`

- mô tả `<time_zone>` bất kỳ theo cú pháp sau:`[sign]<...><.....>:<...><...>`. trong đó `sign` là `+` hoặc `-`: vd thời gian ở múi giờ `+10:30` sẽ mô tả như sau:
  `2023-10-16T13:34:12.735+10:30`

## 6. Get UnRead notifications by index and range

(postman số 70)

1. phương thức :

   POST: http://localhost:3000/notification/getUnReadNotiStartFrom

2. cấu trúc:

```javascript
{
  index: positive_number;
  num: positive_number;
}
```

- trong đó:
  - index: mô tả thông báo thứ mấy
  - num: số lượng thông báo cần lấy
