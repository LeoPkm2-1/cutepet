const StatusPostModel = require("../../models/BaiViet/StatusPostModel");
const StatusPostComposStructure = require("../../models/BaiViet/StatusPostComposStructure");
const userHelper = require("../../utils/userHelper");
const { Response } = require("../../utils/index");
const statusPostHelper = require("../../utils/BaiViet/statusPostHelper");
const followModel = require("../../models/theodoi/followModel");
const followhelper = require("../../utils/theodoiHelper");
const statusAndArticleModel = require("../../models/BaiViet/StatusAndArticleModel");
const {
  notifyLikePost,
  notifyCommentPost,
  notifyLikeComment,
  notifyReplyComment,
  notifyTaggedUserInStatusPost,
  notifyHaveNewStatusPost,
} = require("../../notificationHandler/statusPost");
const laBanBeModel = require("../../models/laBanBeModel");
const petHelper = require("../../utils/petHelper");
const banbeHelper = require("../../utils/banbeHelper");

const addPostController = async (req, res) => {
  const { text, media, visibility, taggedUsersId, myPetIds } = req.body;
  const taggedUsers = await userHelper.getUserPublicInforByListIds(
    taggedUsersId
  );
  const withPets = await petHelper.publicInforOfListPet(myPetIds);
  const postStatus = new StatusPostComposStructure.StatusPost(
    text,
    visibility,
    media,
    taggedUsers,
    withPets,
    req.auth_decoded.ma_nguoi_dung
  );

  const addProcess = await StatusPostModel.addPost(postStatus);
  if (addProcess.status != 200) {
    res.status(400).json(new Response(400, [], "đã có lỗi xảy ra", 300, 300));
    return;
  }
  const insertedPost = await statusAndArticleModel.getPostById(
    addProcess.payload.insertedId
  );
  const idOfPost = insertedPost.payload[0]._id.toString();
  const owner_id = insertedPost.payload[0].owner_id;

  // thêm người tạo bài viết vào danh sách theo dõi của bài viết
  await followhelper.followStatusPost(idOfPost, owner_id);
  // xử lý tag
  if (taggedUsersId.length > 0) {
    // thêm các người dùng được tag vào danh sách người theo dõi bài viết
    const data = await Promise.all(
      taggedUsersId.map((userId) =>
        followhelper.followStatusPost(idOfPost, userId)
      )
    );
    // thông báo nếu có tag
    notifyTaggedUserInStatusPost(idOfPost, owner_id, taggedUsersId);
    // thông báo để front-end cập nhật bài viết mới nhất lên giao diện
  }

  res
    .status(200)
    .json(new Response(200, insertedPost.payload, "thêm thành công"));

  notifyHaveNewStatusPost(idOfPost, owner_id);
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

      // // người dùng bỏ theo dõi bài viết.
      // await followhelper.unFollowStatusPost(post_id, userLike, true);

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
      // // xóa người dùng ra khỏi danh sách theo doi bai viet
      // await followhelper.unFollowStatusPost(postId, userLike, true);
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
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const post_id = req.body.post_id;
  const comments = await StatusPostModel.getAllCmtByPostId(post_id)
    .then((data) => data.payload)
    .catch((err) => []);
  await statusPostHelper.InsertUserCmtInforOfListCmts(comments);
  // console.log(comments);
  await statusPostHelper.insertHaveLikeOfUserInListOfComment(
    user_id,
    comments,
    "hasLike"
  );

  const data = {
    comments,
    numOfComments: comments.length,
    numOfRemain: 0,
  };
  res.status(200).json(new Response(200, data, "lấy dữ liệu thành công"));
};

const getCmtStartFromController = async (req, res) => {
  const { post_id, index, num } = req.body;
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
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
    await statusPostHelper.insertHaveLikeOfUserInListOfComment(
      user_id,
      comments
    );
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
    await statusPostHelper.insertHaveLikeOfUserInListOfComment(
      user_id,
      comments
    );

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
    postData.owner_id
  );
  const hasLiked = await statusPostHelper.hasUserLikedPost_1(
    ma_nguoi_dung,
    post_id
  );
  const isFollowed = await followhelper.hasUserFollowedStatusPost(
    post_id,
    ma_nguoi_dung
  );
  const data = {
    ...postData,
    owner_infor,
    hasLiked,
    isFollowed,
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
    const postInfor = await statusAndArticleModel
      .getPostById(postId)
      .then((data) => data.payload);
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
  const { post_id, text, visibility, media } = req.body;
  const postBeforeDelete = req.body.STATUS_POST_INFOR;
  const remainingTaggedUser =
    visibility == "PRIVATE"
      ? postBeforeDelete.taggedUsers.filter(
          (user) => !req.body.UNFOLLOW_USER_ID.includes(user.ma_nguoi_dung)
        )
      : postBeforeDelete.taggedUsers;
  // res.json(remainingTaggedUser);
  let taggedUsers = await userHelper.getUserPublicInforByListIds(
    req.body.NEW_FOLLOW_USER_ID
  );
  taggedUsers = remainingTaggedUser.concat(taggedUsers);

  const withPets = await petHelper.publicInforOfListPet(req.body.myPetIds);

  // delete _id field in old object post
  delete postBeforeDelete._id;
  const newPost = {
    ...postBeforeDelete,
    text,
    visibility,
    media,
    taggedUsers,
    withPets,
    modifiedAt: new Date(),
  };
  const updateProcess = await StatusPostModel.updatePost(post_id, newPost);

  res.status(200).json(new Response(200, newPost, "cập nhật thành công"));
};

const unfollowPostController = async (req, res) => {
  const { post_id } = req.body;
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const hasFollowed = await followhelper.hasUserFollowedStatusPost(
    post_id,
    user_id
  );
  if (!hasFollowed) {
    res.status(400).json(
      new Response(
        400,
        {
          unfollowed: false,
          message: "người dùng chưa theo dõi bài viết",
        },
        "bài viết chưa được theo dõi",
        300,
        300
      )
    );
    return;
  }
  const unfollowProcess = await followhelper.unFollowStatusPost(
    post_id,
    user_id,
    false
  );
  res.status(200).json(
    new Response(
      200,
      {
        unfollowed: true,
        message: "unfollow thành công",
      },
      "unfollow thành công"
    )
  );
  return;
};

// const followPostController = async (req, res) => {
//   const { post_id } = req.body;
//   const user_id = req.auth_decoded.ma_nguoi_dung;
//   const followProcess = await followhelper.followStatusPost(post_id, user_id);
//   res.json(followProcess);
// };

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
      // xóa theo dõi
      await followModel.deleteAllFollowOfStatusPost(post_id),
    ]);
    const everyOk = deleteProcess.every(
      (elemProcess) => elemProcess.status == 200
    );
    // console.log({ everyOk });
    if (everyOk) {
      res.status(200).json(
        new Response(
          200,
          {
            isDeleted: true,
            post_id,
          },
          "Xóa bài viết thành công bài viết " + post_id
        )
      );
      return;
    } else {
      res.status(400).json(
        new Response(
          400,
          {
            isDeleted: false,
            post_id,
          },
          "xóa bài viết thất bại: " + post_id
        )
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const isUserFollowedPostController = async (req, res) => {
  const { post_id } = req.body;
  const user_id = req.auth_decoded.ma_nguoi_dung;
  const isFollowed = await followhelper.hasUserFollowedStatusPost(
    post_id,
    user_id
  );
  res.status(200).json(new Response(200, { post_id, isFollowed }, ""));
  return;
};

const followPostController = async (req, res) => {
  const { post_id } = req.body;
  const user_id = req.auth_decoded.ma_nguoi_dung;
  const isFollowed = await followhelper.hasUserFollowedStatusPost(
    post_id,
    user_id
  );
  if (isFollowed) {
    res.status(200).json(
      new Response(
        200,
        {
          post_id,
          isFollowed,
        },
        "bạn đã theo doi bài viết này rồi"
      )
    );
    return;
  }

  const followProcess = await followhelper.followStatusPost(post_id, user_id);
  res.status(200).json(
    new Response(
      200,
      {
        post_id,
        isFollowed: true,
      },
      "theo dõi thành công"
    )
  );
};

const reportPostController = async (req, res) => {
  const { post_id } = req.body;
  const user_report_id = req.auth_decoded.ma_nguoi_dung;
  const reportProcess = await statusPostHelper.reportPost(
    post_id,
    user_report_id,
    true
  );
  res.status(200).json(reportProcess);
};

const calNumOfPostOfEachUser = async (
  user_id,
  NEEDED_NUM_OF_POST = 10,
  numOfPeopleGetPost = undefined
) => {
  console.log({ NEEDED_NUM_OF_POST });
  if (typeof numOfPeopleGetPost == "undefined") {
    const numOfFriend = await banbeHelper.getNumOfFriendOfUser(user_id);
    return Math.ceil(NEEDED_NUM_OF_POST / (numOfFriend + 1));
  } else {
    return Math.ceil(NEEDED_NUM_OF_POST / numOfPeopleGetPost);
  }
};

const scoreListPostForUser = async (
  listOfPost,
  user_id,
  sortList = true,
  DECS = true
) => {
  // calculate score for each post
  const scoredListPosts = await Promise.all(
    listOfPost.map(async (obj, index) => {
      obj.score = 0; // initialize score
      // check user is tagged in this post
      const hasTagged =
        typeof obj.taggedUsers.find((elem) => elem.ma_nguoi_dung == user_id) ==
        "undefined"
          ? false
          : true;
      const TagScore = hasTagged ? 2 * 1000 * 3600 : 0;
      // check user is commented in this post
      const hasCommented = await statusPostHelper.hasUserCommentedPost(
        user_id,
        obj._id.toString()
      );
      const commentScore = hasCommented ? (1000 * 3600) / 2 : 0;
      // check user is liked in this post
      const hasLiked = await statusPostHelper.hasUserLikedPost_1(
        user_id,
        obj._id.toString()
      );
      const likeScore = hasLiked ? (1000 * 3600) / 3 : 0;
      // check user reply in this post
      const hasReplied = await statusPostHelper.hasUserReplyCmtInPost(
        user_id,
        obj._id.toString()
      );
      const replyScore = hasReplied ? (1000 * 3600) / 4 : 0;
      let score = new Date().getTime() - obj.createAt.getTime();
      score = score - TagScore - commentScore - likeScore - replyScore;
      obj.score = score;
      return obj;
    })
  );
  if (sortList) {
    if (DECS) {
      scoredListPosts.sort((a, b) => a.score - b.score);
      // return scoredListPosts;
    } else {
      scoredListPosts.sort((a, b) => b.score - a.score);
      // return scoredListPosts;
    }
  }
  return scoredListPosts;
};

const getPostForNewsfeedController = async (req, res) => {
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const { index } = req.body;

  const NUMOF_POST_RETURN = 10;
  const NEEDED_NUM_OF_POST = (index + 1) * NUMOF_POST_RETURN;

  const startPointSlicing = index * NUMOF_POST_RETURN;
  // console.log({ index });
  const numOfPostForEachUser = await calNumOfPostOfEachUser(
    user_id,
    NEEDED_NUM_OF_POST
  );
  console.log({ numOfPostForEachUser });
  const ds_ban_be = await laBanBeModel
    .getAllFriendIdsOfUser(user_id)
    .then((data) =>
      data.payload.map((friendShip) => parseInt(friendShip.friend_id))
    );
  // post of friend
  const listPostsOfEachFriend = await Promise.all(
    ds_ban_be.map(
      async (id) =>
        await StatusPostModel.getPostOfUserForReaderBeforeTime(
          id,
          user_id,
          true,
          new Date(),
          numOfPostForEachUser
        )
    )
  );
  // my post
  const myPostList = await StatusPostModel.getAllPostOfUserBeforeTime(
    user_id,
    new Date(),
    numOfPostForEachUser
  ).then((data) => data.payload);

  // concat post of friend and my post
  let listOfPost = listPostsOfEachFriend.reduce((acc, cur) => {
    return acc.concat(cur.payload);
  }, []);
  listOfPost = listOfPost.concat(myPostList);
  // calculate score for each post
  const scoredListPosts = await Promise.all(
    listOfPost.map(async (obj, index) => {
      obj.score = 0; // initialize score
      // check user is tagged in this post
      const hasTagged =
        typeof obj.taggedUsers.find((elem) => elem.ma_nguoi_dung == user_id) ==
        "undefined"
          ? false
          : true;
      const TagScore = hasTagged ? 2 * 1000 * 3600 : 0;
      // check user is commented in this post
      const hasCommented = await statusPostHelper.hasUserCommentedPost(
        user_id,
        obj._id.toString()
      );
      const commentScore = hasCommented ? (1000 * 3600) / 2 : 0;
      // check user is liked in this post
      const hasLiked = await statusPostHelper.hasUserLikedPost_1(
        user_id,
        obj._id.toString()
      );
      const likeScore = hasLiked ? (1000 * 3600) / 3 : 0;
      // check user reply in this post
      const hasReplied = await statusPostHelper.hasUserReplyCmtInPost(
        user_id,
        obj._id.toString()
      );
      const replyScore = hasReplied ? (1000 * 3600) / 4 : 0;
      let score = new Date().getTime() - obj.createAt.getTime();
      score = score - TagScore - commentScore - likeScore - replyScore;
      obj.score = score;
      return obj;
    })
  );
  // sort list post by score (lower score is better)
  scoredListPosts.sort((a, b) => a.score - b.score);

  console.log({ len_1: scoredListPosts.length });
  // remove posts have already render
  const postsHaveNotRender = scoredListPosts.filter(
    (post) => !req.body.PostIdsHaveRendered.includes(post._id.toString())
  );
  const posts = postsHaveNotRender.slice(0, NUMOF_POST_RETURN);

  // insert owner infor for each post
  await statusPostHelper.InsertOwnerInforOfListPosts(posts);
  // insert infor to indicate that  has user liked each post?
  await statusPostHelper.insertUserLikePostInforOfListPosts(user_id, posts);

  console.log({ len_2: posts.length });

  res.status(200).json(new Response(200, posts, ""));
  console.log("heheheh");
};

const getPostOfListUserIdForUser = async (
  listUserId,
  numOfPostForEachUser,
  user_id
) => {
  const dataPosts = await Promise.all(
    listUserId.map(
      async (id) =>
        await StatusPostModel.getPostOfUserForReaderBeforeTime(
          id,
          user_id,
          true,
          new Date(),
          numOfPostForEachUser
        )
    )
  );
  let listOfPost = dataPosts.reduce((acc, cur) => {
    return acc.concat(cur.payload);
  }, []);
  return listOfPost;
};

const getPostForNewsfeedController_2 = async (req, res) => {
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const { index } = req.body;

  const NUMOF_POST_RETURN = 10;
  const NEEDED_NUM_OF_POST = (index + 1) * NUMOF_POST_RETURN;

  const startPointSlicing = index * NUMOF_POST_RETURN;
  // console.log({ index });
  let numOfPostForEachUser = await calNumOfPostOfEachUser(
    user_id,
    NEEDED_NUM_OF_POST
  );
  console.log({ numOfPostForEachUser });
  const ds_ban_be = await laBanBeModel
    .getAllFriendIdsOfUser(user_id)
    .then((data) =>
      data.payload.map((friendShip) => parseInt(friendShip.friend_id))
    );
  // post of friend
  const listPostsOfEachFriend = await getPostOfListUserIdForUser(
    ds_ban_be,
    numOfPostForEachUser,
    user_id
  );

  // my post
  const myPostList = await StatusPostModel.getAllPostOfUserBeforeTime(
    user_id,
    new Date(),
    numOfPostForEachUser
  ).then((data) => data.payload);

  // concat post of friend and my post
  let listOfPost = listPostsOfEachFriend.concat(myPostList);

  // remove posts have already render
  let postsHaveNotRender = listOfPost.filter(
    (post) => !req.body.PostIdsHaveRendered.includes(post._id.toString())
  );

  if (postsHaveNotRender.length <= 0) {
    console.log("okkkkkkkkkkk");
    const ramdomUserId = userHelper.getSomeUserIdInRangeOf10(4);

    numOfPostForEachUser = await calNumOfPostOfEachUser(
      user_id,
      NEEDED_NUM_OF_POST,
      ramdomUserId.length
    );
    // post of random user
    const listPostsOfrandomUser = await getPostOfListUserIdForUser(
      ramdomUserId,
      numOfPostForEachUser,
      user_id
    );
    // remove posts have already render
    postsHaveNotRender = listPostsOfrandomUser.filter(
      (post) => !req.body.PostIdsHaveRendered.includes(post._id.toString())
    );
  }

  // calculate score for each post
  const scoredListPosts = await scoreListPostForUser(
    postsHaveNotRender,
    user_id,
    true,
    true
  );

  console.log({ len_1: scoredListPosts.length });

  const posts = scoredListPosts.slice(0, NUMOF_POST_RETURN);

  // insert owner infor for each post
  await statusPostHelper.InsertOwnerInforOfListPosts(posts);
  // insert infor to indicate that  has user liked each post?
  await statusPostHelper.insertUserLikePostInforOfListPosts(user_id, posts);

  console.log({ len_2: posts.length });

  res.status(200).json(new Response(200, posts, ""));
};

const getPostHavePetController = async (req, res) => {
  const { pet_id, before, num } = req.body;
  const reader_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const owner_id_of_pet = await petHelper.getOwnerIdOfPet(pet_id);
  // console.log(owner_id_of_pet);
  if (reader_id == owner_id_of_pet) {
    const posts = await StatusPostModel.getAllPostOfUserHavePetBeforeTime(
      owner_id_of_pet,
      pet_id,
      before,
      num
    );
    res
      .status(200)
      .json(new Response(200, posts.payload, "Lấy dữ liệu thành công"));
    return;
  } else {
    const laBanBe = await banbeHelper.haveFriendShipBetween(
      reader_id,
      owner_id_of_pet
    );
    // console.log({ laBanBe });
    // res.send('1');
    // return ;
    const posts = await StatusPostModel.getPostOfUserHavePetForReaderBeforeTime(
      owner_id_of_pet,
      pet_id,
      reader_id,
      laBanBe,
      before,
      num
    );
    await statusPostHelper.InsertOwnerInforOfListPosts(posts.payload);
    console.log(posts);
    res
      .status(200)
      .json(new Response(200, posts.payload, "Lấy dữ liệu thành công"));
    return;
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
  unfollowPostController,
  isUserFollowedPostController,
  followPostController,
  reportPostController,
  getPostForNewsfeedController,
  getPostHavePetController,
  getPostForNewsfeedController_2,
};
