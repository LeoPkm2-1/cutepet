# các yêu cầu cần hoàn thành:

## 1. Load lại icon thông báo khi có 1 thông baó mới đến:

    - [ ] 1.1. khi có 1 thông báo mới đến thì icon thông báo sẽ được load lại
    - [ ] 1.2. khi mới đăng nhập vào hệ thống phải load lại trang thông báo

sửa dụng: - **[getNotificationBefore](./notification.md/#1-get-notifications-before-specific-time)** hoặc **[getNotificationStartFrom](./notification.md/#2-get-notifications-by-index-and-range)**

## 2. Làm trang profile cá nhân:

    - [ ] 2.1. trang cá nhân cho mình
    - [ ] 2.2 trang cá nhân cho người dùng cụ thể

sửa dụng:

- **[1](./profile.md/#1-lấy-thông-tin-trang-cá-nhân-của-chính-mình)**
- **[2](./profile.md/#2-lấy-các-bài-viết-trên-time-line-của-chính-mình-cho-trang-cá-nhân)**
- **[3](./profile.md/#3-lấy-thông-tin-trang-cá-nhân-của-người-dùng-khác)**
- **[4](./profile.md/#4-lấy-các-bài-viết-trên-time-line-của-người-dùng-khác)**

## 3. đổi lại icon cho bài viết chia sẻ:

## 4. handle kết bạn

    `nhớ kiểm tra event listen nha`

## 5. handle người dùng online hay offline động

    `nhớ kiểm tra event listen nha`

## 6. sửa lại hiển thị bài viết trên newsfeed

    `bài viết trạng thái hiển thị khác với bài viết chia sẻ kiến thức`

## 7. thêm trường theo dõi bài viết và bỏ theo dõi bài viết vào mục tùy chọn trong bài viết

`(tính năng này cho cả chia sẻ kiến thức và trạng thái)`

## 8. sửa lại icon của bài viết `private`, `public`, `just_friend`

## 9. socket có vấn đề:

    - [ ] 9.1. đăng xuất chưa tắt socket
    - [ ] 9.2. khi đăng nhập vào thì socket chưa được kết nối

## 10. navigate tới mạng xã hội khi path là `/` hoặc là `/home`

## 11. hoàn thiện ảnh trong trang chia sẻ kiến thức:

    - [ ] 11.1 resize lại
    - [ ] 11.2 cho hủy ảnh

## 12. điều hướng người dung qua trang bài viết khi đăng xong bài viết

## 13. `upvote`, `downvote` và `comment` khi vào bài viết chia sẻ kiến thức

tham khảo tại: **[article.md](./article.md)**

## 14. người dùng đã đăng nhập thành công thì chặn vào trang `đăng nhập` và `đăng ký`

- trong trang đăng ký  tên phải chỉ chứa tối đa 32 ký tự, có thể là tiếng việt hoặc tiếng anh. [chi tiết tại đây](./userInfor.md#5-đăng-ký-tài-khoản)

## 15. thêm icon xóa ảnh khi đăng bài viết chia sẻ trạng thái

## 16. khi người dùng tag thì phải bỏ đi những người dùng tag rồi tag lại

## 17. đổi mật khẩu người dùng

    (xem trong file summary)

## 18. Sửa lại thông báo trong trang đăng nhập:

    - thông báo rõ ràng hơn lỗi đó là lỗi gì không nên để chung chung là lỗi đăng nhập được:

![img](./../media/img/err/Screenshot%20from%202023-11-14%2014-43-31.png) - vd: không nhập mật khẩu, không nhập tài khoản, thông tin đăng nhập không chính xác

## 19. Thêm tính năng chỉnh sửa bài viết chia sẻ trạng thái

    (xem trong file summary)

## 20. sửa lại danh sách các thể loại của bài viết chia sẻ kiến thức

    (xem trong file summary)

## 21. thêm tính năng đổi mật khẩu cho người dung

    (xem trong file summary)

## 22. thêm tính năng chỉnh sửa bài viết chia sẻ trạng thái

    (xem trong file summary)

## 23. thêm nút xóa ảnh khi đăng bài trạng thái

## 24. resize lại ảnh khi đăng bài viết chia sẻ kiến thức

## 25. hiện category lúc đọc bài viết chia sẻ kiến thức

## 26. đổi lại icon article trên navbar

## 27. bật sáng đúng icon article trên navbar lúc đọc bài viết chia sẻ kiến thức

## 28. handle ảnh bìa cho bài viết chia sẻ kiến thức

## 29. chỉnh sửa bài viết chia sẻ kiến thức.

    (xem chi tiến trong summary)

## 30. report bài viết chia sẻ kiến thức.

    (xem chi tiến trong summary)

## 31. report bài viết chia sẻ trạng thái.

    (xem chi tiến trong summary)

## 32. cập nhật lại hàm lấy bài viết trên newFeed

(**thanh kéo trong load hình ảnh bị sai khi số lượng bài viết nhiều**)

[(xem chi tiến trong summary (16-11-2023) mục 5)](./SUMMARY.md#16-11-2023)

    (do backend đã có hàm mới để thay thế cho hàm cũ)

## 33. trang cập nhật thông tin người dùng

1. **yêu cầu:**

- thiết kế:
  Thiếu kế giống như hình sau:

       chia việc cập nhật thông tin người dung ra làm 2 phân riêng biệt:
          +  cập nhật ảnh đại diện
          +  cập nhật thông tin người dùng

  ![img](./../media/img/err/img7.png)

2. **thực hiện:**

   - cập nhật hình ảnh đại diện của người dùng [chi tiết tại đây](./userInfor.md#3-cập-nhật-ảnh-đại-diện-cho-người-dùng).

   - cập nhật thông tin người dùng [chi tiết tại đây](./userInfor.md#4-cập-nhật-thông-tin-người-dùng).

##

##

##

##

##

##
