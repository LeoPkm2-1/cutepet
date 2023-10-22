const StatusPostModel = require("../../models/BaiViet/StatusPostModel");
const StatusPostComposStructure = require("../../models/BaiViet/StatusPostComposStructure");
const userHelper = require("../../utils/userHelper");
const { Response } = require("../../utils/index");
const statusPostHelper = require("../../utils/BaiViet/statusPostHelper");
const followModel = require("../../models/theodoi/followModel");
const followhelper = require("../../utils/theodoiHelper");
const {
  StatusPostEventManagement,
} = require("./../../socketHandler/norm_user/statusPostEvent");
const {
  notifyLikePost,
  notifyCommentPost,
  notifyLikeComment,
  notifyReplyComment,
} = require("../../notificationHandler/statusPost");

const addPostController = async (req, res) => {
  const { text, media } = req.body;
  const postStatus = new StatusPostComposStructure.StatusPost(
    text,
    media,
    req.auth_decoded.ma_nguoi_dung
  );

  const addProcess = await StatusPostModel.addPost(postStatus);
  if (addProcess.status != 200) {
    res.status(400).json(new Response(400, [], "đã có lỗi xảy ra", 300, 300));
    return;
  }
  const insertedPost = await StatusPostModel.getPostById(
    addProcess.payload.insertedId
  );
  const idOfPost = insertedPost.payload[0]._id.toString();
  const owner_id = insertedPost.payload[0].owner_id;

  // thêm người tạo bài viết vào danh sách theo dõi của bài viết
  await followhelper.followStatusPost(idOfPost, owner_id);

  res
    .status(200)
    .json(new Response(200, insertedPost.payload, "thêm thành công"));
  return;
};

const addCommentController = async (req, res) => {
  const comment = req.body.comment;
  const post_id = req.body.post_id;
  const commentBy = req.auth_decoded.ma_nguoi_dung;
  const numOfComment = req.body.STATUS_POST_INFOR.numOfComment;
  const comment_data = new StatusPostComposStructure.CommentPost(
    post_id,
    comment,
    commentBy
  );
  // console.log(comment_data);
  const commentProcess = await StatusPostModel.addComment(comment_data);
  // console.log('commentProcess',commentProcess);
  if (commentProcess.status != 200) {
    res.status(400).json(new Response(400, [], "đã có lỗi xảy ra", 300, 300));
    return;
  }
  await StatusPostModel.updateNumOfCommentPost(post_id, numOfComment + 1);
  const insertedComment = await StatusPostModel.getCommentPostById(
    commentProcess.payload.insertedId.toString()
  );

  // thêm người dùng vào danh sách theo dõi bài viết
  await followhelper.followStatusPost(post_id, commentBy);
  // gửi thông báo đến người dùng
  notifyCommentPost(commentBy, post_id);

  res
    .status(200)
    .json(new Response(200, insertedComment.payload[0], "thêm thành công"));
  return;
};

const toggleLikePostController = async (req, res) => {
  const ERROR_HAPPEN_MESSAGE = "đã có lỗi xảy ra";
  try {
    const { post_id, action } = req.body;
    const userLike = req.auth_decoded.ma_nguoi_dung;
    const numOfLike = req.body.STATUS_POST_INFOR.numOfLike;
    if (action == "LIKE") {
      const likeProcess = await StatusPostModel.addLikePost(post_id, userLike);
      if (likeProcess.status != 200) throw new Error(ERROR_HAPPEN_MESSAGE);

      const likeInfor = await StatusPostModel.getLikeThePostInfor(
        userLike,
        post_id
      ).then((data) => data.payload[0]);
      // update num of like
      await StatusPostModel.updateNumOfLikePost(post_id, numOfLike + 1);

      // thêm người dùng vào danh sách theo dõi của bài viết status
      await followhelper.followStatusPost(post_id, userLike);
      // gửi thông báo đến cho mọi người
      notifyLikePost(userLike, post_id);

      res.status(200).json(new Response(200, likeInfor, "like thành công"));
      return;
    } else {
      const removeLikeProcess = await StatusPostModel.removeLikePost(
        post_id,
        userLike
      );
      if (removeLikeProcess.status != 200)
        throw new Error(ERROR_HAPPEN_MESSAGE);
      // update num of like
      await StatusPostModel.updateNumOfLikePost(post_id, numOfLike - 1);

      // người dùng bỏ theo dõi bài viết.
      await followhelper.unFollowStatusPost(post_id, userLike, true);

      res.status(200).json(
        new Response(
          200,
          {
            postId: post_id,
          },
          "hủy like thành công"
        )
      );
      return;
    }
  } catch (error) {
    switch (error.message) {
      case ERROR_HAPPEN_MESSAGE:
        res
          .status(400)
          .json(new Response(400, [], ERROR_HAPPEN_MESSAGE, 300, 300));
        return;

      default:
        break;
    }
  }
};

const toggleLikeCmtController = async (req, res) => {
  const ERROR_HAPPEN_MESSAGE = "đã có lỗi xảy ra";
  try {
    const { cmt_id, action } = req.body;
    const userLike = req.auth_decoded.ma_nguoi_dung;
    const numOfLike = req.body.CMT_POST_INFOR.numOfLike;
    const postId = req.body.CMT_POST_INFOR.postId;
    if (action == "LIKE") {
      const likePacket = new StatusPostComposStructure.LikeComment(
        cmt_id,
        userLike,
        postId
      );
      const likeProcess = await StatusPostModel.addLikeCmtPost(likePacket);
      if (likeProcess.status != 200) throw new Error(ERROR_HAPPEN_MESSAGE);

      const likeInfor = await StatusPostModel.getLikeCmtPostInfor(
        userLike,
        cmt_id
      ).then((data) => data.payload[0]);
      await StatusPostModel.updateNumOfLikeCmtPost(cmt_id, numOfLike + 1);

      // thêm người dùng vào danh sách theo dõi của bài viết status

      await followhelper.followStatusPost(postId, userLike);
      // gửi thông báo dến các người dùng đang theo dõi
      notifyLikeComment(userLike, cmt_id);
      res.status(200).json(new Response(200, likeInfor, "like thành công"));

      return;
    } else {
      const removeLikeProcess = await StatusPostModel.removeLikeCmtPost(
        cmt_id,
        userLike
      );
      if (removeLikeProcess.status != 200)
        throw new Error(ERROR_HAPPEN_MESSAGE);
      // update the num of like;
      await StatusPostModel.updateNumOfLikeCmtPost(cmt_id, numOfLike - 1);
      // xóa người dùng ra khỏi danh sách theo doi bai viet
      await followhelper.unFollowStatusPost(postId, userLike, true);
      res
        .status(200)
        .json(new Response(200, { cmtId: cmt_id }, "hủy like thành công"));
      return;
    }
  } catch (error) {
    switch (error.message) {
      case ERROR_HAPPEN_MESSAGE:
        res
          .status(400)
          .json(new Response(400, [], ERROR_HAPPEN_MESSAGE, 300, 300));
        return;

      default:
        break;
    }
  }
};

const replyCmtController = async (req, res) => {
  console.log("Chạy hàm reply backend");
  const reply = req.body.reply;
  const cmt_id = req.body.cmt_id;
  const replyBy = req.auth_decoded.ma_nguoi_dung;
  // const replyAt = new Date();
  // const numOfLike = 0;
  const numOfReply = req.body.CMT_POST_INFOR.numOfReply;
  const postId = req.body.CMT_POST_INFOR.postId;

  const reply_data = new StatusPostComposStructure.ReplyComment(
    cmt_id,
    reply,
    replyBy,
    postId
  );
  const replyProcess = await StatusPostModel.addReplyComment(reply_data);
  if (replyProcess.status != 200) {
    res.status(400).json(new Response(400, [], "đã có lỗi xảy ra", 300, 300));
    return;
  }
  await StatusPostModel.updateNumOfReplyInCmtPost(cmt_id, numOfReply + 1);
  const insertedReply = await StatusPostModel.getReplyCommentById(
    replyProcess.payload.insertedId.toString()
  );

  // thêm người dùng vào danh sách theo dõi bài viết status
  await followhelper.followStatusPost(postId, replyBy);
  //   gửi thông báo đến người dùng
  notifyReplyComment(replyBy, cmt_id);
  res
    .status(200)
    .json(new Response(200, insertedReply.payload[0], "reply thành công"));
  return;
};

const getAllCmtController = async (req, res) => {
  const post_id = req.body.post_id;
  const comments = await StatusPostModel.getAllCmtByPostId(post_id)
    .then((data) => data.payload)
    .catch((err) => []);
  await statusPostHelper.InsertUserCmtInforOfListCmts(comments);
  const data = {
    comments,
    numOfComments: comments.length,
    numOfRemain: 0,
  };
  res.status(200).json(new Response(200, data, "lấy dữ liệu thành công"));
};

const getCmtStartFromController = async (req, res) => {
  const { post_id, index, num } = req.body;
  const AllComments = await StatusPostModel.getAllCmtByPostId(post_id)
    .then((data) => data.payload)
    .catch((err) => []);
  if (AllComments.length <= 0) {
    res.status(200).json(
      new Response(
        200,
        {
          comments: [],
          numOfComments: 0,
          numOfRemain: 0,
        },
        ""
      )
    );
    return;
  }
  if (typeof num == "undefined") {
    const comments = AllComments.slice(index);
    await statusPostHelper.InsertUserCmtInforOfListCmts(comments);
    const data = {
      comments,
      numOfComments: comments.length,
      numOfRemain: 0,
    };

    res.status(200).json(new Response(200, data, "lấy dữ liệu thành công"));
    return;
  } else {
    const comments = AllComments.slice(index, index + num);
    await statusPostHelper.InsertUserCmtInforOfListCmts(comments);

    const data = {
      comments,
      numOfComments: comments.length,
      numOfRemain:
        AllComments.length <= index + num
          ? 0
          : AllComments.length - (index + num),
    };
    res.status(200).json(new Response(200, data, "lấy dữ liệu thành công"));
    return;
  }
};

const getAllReplyController = async (req, res) => {
  const cmt_id = req.body.cmt_id;
  const replies = await StatusPostModel.getAllReplyCommentByCmtId(cmt_id)
    .then((data) => data.payload)
    .catch((err) => []);
  await statusPostHelper.InsertUserReplyInforOfListReplies(replies);
  const data = {
    replies,
    numOfReplies: replies.length,
    numOfRemain: 0,
  };
  res.status(200).json(new Response(200, data, "lấy phản hồi thành công"));
};

const getReplyStartFromController = async (req, res) => {
  const { cmt_id, index, num } = req.body;
  const AllReplies = await StatusPostModel.getAllReplyCommentByCmtId(cmt_id)
    .then((data) => data.payload)
    .catch((err) => []);
  if (AllReplies.length <= 0) {
    res.status(200).json(
      new Response(200, {
        replies: [],
        numOfReplies: 0,
        numOfRemain: 0,
      })
    );
    return;
  }
  if (typeof num == "undefined") {
    const replies = AllReplies.slice(index);
    await statusPostHelper.InsertUserReplyInforOfListReplies(replies);
    const data = {
      replies,
      numOfReplies: replies.length,
      numOfRemain: 0,
    };
    res.status(200).json(new Response(200, data, "lấy phản hồi thành công"));
    return;
  } else {
    const replies = AllReplies.slice(index, index + num);
    await statusPostHelper.InsertUserReplyInforOfListReplies(replies);
    const data = {
      replies,
      numOfReplies: replies.length,
      numOfRemain:
        AllReplies.length <= index + num
          ? 0
          : AllReplies.length - (index + num),
    };
    res.status(200).json(new Response(200, data, "lấy dữ liệu thành công"));
    return;
  }
};

const getPostController = async (req, res) => {
  const { post_id } = req.body;
  const ma_nguoi_dung = req.auth_decoded.ma_nguoi_dung;
  const postData = await StatusPostModel.getPostById(post_id).then(
    (data) => data.payload
  );
  const owner_infor = await userHelper.getUserPublicInforByUserId(
    postData[0].owner_id
  );
  const hasLiked = await statusPostHelper.hasUserLikedPost_1(
    ma_nguoi_dung,
    post_id
  );
  const data = {
    ...postData[0],
    owner_infor,
    hasLiked,
  };
  res.status(200).json(new Response(200, data, "lấy dữ liệu thành công"));
};

const getPostStartFromController = async (req, res) => {
  const { index, num } = await req.body;
  const ma_nguoi_dung = req.auth_decoded.ma_nguoi_dung;
  const AllPost = await StatusPostModel.getAllPost()
    .then((data) => data.payload)
    .catch((err) => []);
  if (AllPost.length <= 0 || AllPost.length <= index) {
    const data = {
      posts: [],
      numOfPosts: 0,
      numOfRemain: 0,
    };
    res.status(200).json(new Response(200, data, "lấy dữ liệu thành công"));
    return;
  }
  if (typeof num == "undefined") {
    const posts = AllPost.slice(index);
    await statusPostHelper.InsertOwnerInforOfListPosts(posts);
    await statusPostHelper.insertUserLikePostInforOfListPosts(
      ma_nguoi_dung,
      posts
    );
    const data = {
      posts,
      numOfPosts: posts.length,
      numOfRemain: 0,
    };
    res.status(200).json(new Response(200, data, "lấy dự liệu thành công"));
    return;
  } else {
    const posts = AllPost.slice(index, index + num);
    await statusPostHelper.InsertOwnerInforOfListPosts(posts);
    await statusPostHelper.insertUserLikePostInforOfListPosts(
      ma_nguoi_dung,
      posts
    );
    const data = {
      posts,
      numOfPosts: posts.length,
      numOfRemain:
        AllPost.length <= index + num ? 0 : AllPost.length - (index + num),
    };
    res.status(200).json(new Response(200, data, "lấy dữ liệu thành công"));
    return;
  }
};

const updateReplyController = async (req, res) => {
  // console.log(req.body.REPLY_POST_INFOR);
  const { reply_id, content } = req.body;
  const data = await StatusPostModel.updateReplyComment(reply_id, content);
  res.json(data);
};

const updateCommentController = async (req, res) => {
  const { cmt_id, content } = req.body;
  const data = await StatusPostModel.updateCommentPost(cmt_id, content);
  res.json(data);
};

const deleteReplyController = async (req, res) => {
  try {
    const { reply_id } = req.body;
    // console.log(req.body);
    const deleteProcess = await StatusPostModel.deleteReplyComment(reply_id);
    if (deleteProcess.payload.deletedCount == 1) {
      const cmtId = req.body.REPLY_POST_INFOR.cmtId;
      const cmtInfor = await StatusPostModel.getCommentPostById(cmtId).then(
        (data) => data.payload
      );
      const numOfReply = cmtInfor[0].numOfReply;
      await StatusPostModel.updateNumOfReplyInCmtPost(cmtId, numOfReply - 1);
      res
        .status(200)
        .json(
          new Response(
            200,
            { ...deleteProcess.payload, reply_id },
            "xóa thành công phản hồi:" + reply_id
          )
        );
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(new Response(400, [], "đã có lỗi xảy ra", 300, 300));
  }
};

const deleteCommentController = async (req, res) => {
  try {
    const { cmt_id } = req.body;
    const deleteProcess = await Promise.all([
      await StatusPostModel.deleteAllLikeOfComment(cmt_id),
      await StatusPostModel.deleteAllReplyOfComment(cmt_id),
    ]);
    // console.log(deleteProcess);
    await StatusPostModel.deleteCommentByCmtId(cmt_id);
    const postId = req.body.CMT_POST_INFOR.postId;
    const postInfor = await StatusPostModel.getPostById(postId).then(
      (data) => data.payload
    );
    // console.log(postInfor);
    const numOfComment = postInfor[0].numOfComment;
    await StatusPostModel.updateNumOfCommentPost(postId, numOfComment - 1);
    res
      .status(200)
      .json(
        new Response(200, { cmt_id }, "xóa thành công bình luận:" + cmt_id)
      );
  } catch (error) {
    console.log(error);
    res.status(400).json(new Response(400, [], "đã có lỗi xảy ra", 300, 300));
  }
};

const updatePostController = async (req, res) => {
  const { post_id, text, media } = req.body;
  res.send("ahihi");
};

const deletePostController = async (req, res) => {
  try {
    const { post_id } = req.body;
    const deleteProcess = await Promise.all([
      // xóa bài viết
      await StatusPostModel.deletePostById(post_id),
      // xóa like bài viết
      await StatusPostModel.deleteAllLikesOfPost(post_id),
      // xóa bình luận
      await StatusPostModel.deleteAllCmtsOfPost(post_id),
      // xóa like bình luận
      await StatusPostModel.deleteAllLikeCmtsOfPost(post_id),
      // xóa phản hồi
      await StatusPostModel.deleteAllReplyCmtOfPost(post_id),
    ]);
    res.json(deleteProcess);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addPostController,
  toggleLikePostController,
  addCommentController,
  toggleLikeCmtController,
  replyCmtController,
  getAllCmtController,
  getCmtStartFromController,
  getAllReplyController,
  getReplyStartFromController,
  getPostController,
  getPostStartFromController,
  updateReplyController,
  updateCommentController,
  deleteReplyController,
  deleteCommentController,
  deletePostController,
  updatePostController,
};
