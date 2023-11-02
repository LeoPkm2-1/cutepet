// =======================POST ID=======================
// index for Reply bình luận bài viết chia sẻ trạng thái
db.RelyBinhLuanBaiVietTrangThai.createIndex({ postId: 1 });

// index for bình luận bài viết chia sẻ trạng thái
db.BinhLuanBaiVietTrangThai.createIndex({ postId: 1 });

// index for like bài viết chia sẻ trạng thái
db.LikeBaiVietTrangThai.createIndex({ postId: 1 });

// index for like bình luận bài viết
db.LikeBinhLuanBaiVietTrangThai.createIndex({ postId: 1 });

// ====================CMT ID =========================
// index for phải hồi bình luận bài viết chia sẻ trạng thái
db.RelyBinhLuanBaiVietTrangThai.createIndex({ cmtId: 1 });

// index for Like binh luan bai viet trang thai
db.LikeBinhLuanBaiVietTrangThai.createIndex({ cmtId: 1 });

// =====================Notification ========================
db.ThongBao.createIndex({receiver_id:-1,createAt:-1});
db.ThongBao.createIndex({createAt:-1,receiver_id:-1});

// ================= Nguoi dung Online ======================
db.NguoiDungDangOnline.createIndex({ userId: 1 }, { unique: true });
