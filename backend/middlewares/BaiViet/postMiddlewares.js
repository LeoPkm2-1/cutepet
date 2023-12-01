const { Response } = require("../../utils");
const statusPostModel = require("../../models/BaiViet/StatusPostModel");
const postHelper = require("../../utils/postHelper");
const banBeHelper = require("./../../utils/banbeHelper");
const statusAndArticleModel = require("../../models/BaiViet/StatusAndArticleModel");
const followhelper = require("./../../utils/theodoiHelper");
const petHelper = require("../../utils/petHelper");
const utilHelper = require("../../utils/UtilsHelper");

// middle ware kiểm tra tiền sử lý để thêm bài viết
async function preProcessAddPost(req, res, next) {
  const NOT_CONTENT_POST = `bài viết không được chấp nhận do không có nội dung`;
  const text = req.body.text;
  const visibility = String(req.body.visibility).toUpperCase();
  req.body.visibility = visibility;
  let userTaggedIds = req.body.taggedUsersId || [];
  userTaggedIds = userTaggedIds.map((id) => parseInt(id, 10));
  // remove dulplicate tagged user ids
  userTaggedIds = [...new Set(userTaggedIds)];
  req.body.taggedUsersId = await banBeHelper.getFriendsIdInListOfUserId(
    req.auth_decoded.ma_nguoi_dung,
    userTaggedIds
  );

  let myPetIds = req.body.myPetIds || [];
  myPetIds = myPetIds.map((petId) => parseInt(petId, 10));
  // remove dulplicate my pets id
  myPetIds = [...new Set(myPetIds)];
  req.body.myPetIds = await petHelper.getPetsIdOwnedByUserInListOfPetIds(
    req.auth_decoded.ma_nguoi_dung,
    myPetIds
  );

  const media = req.body.media;
  if (
    visibility != "PUBLIC" &&
    visibility != "JUST_FRIENDS" &&
    visibility != "PRIVATE"
  ) {
    res
      .status(400)
      .json(new Response(400, [], "visibility không hợp lệ", 300, 300));
    return;
  }

  let flag = 0;
  if (!text || Object.keys(text).length == 0 || text.length == 0) {
    flag += 1;
  }
  if (
    !media ||
    Object.keys(media).length == 0 ||
    media.length == 0 ||
    !("type" in media) ||
    !("data" in media)
  ) {
    flag += 1;
  }

  if (flag == 2) {
    res.status(400).json(new Response(400, [], NOT_CONTENT_POST, 300, 300));
    return;
  }

  if (text.trim() == "" && media.data[0].trim() == "") {
    res.status(400).json(new Response(400, [], NOT_CONTENT_POST, 300, 300));
    return;
  }
  req.body.text = text.trim();

  next();
}

// middleware kiểm tra sự tồi tại của bài viết chia sẽ trạng thái. Nếu tồn tại thì gọi next() nếu không thì trả về http respone phản hồi bài viết không tồn tại
async function checkPostExistMid(req, res, next) {
  let post_id = undefined;
  if (req.method === "GET") {
    post_id = req.query.post_id;
  } else if (req.method === "POST") {
    post_id = req.body.post_id;
  }
  const data = await statusPostModel
    .getPostById(post_id)
    .then((data) => data.payload);

  if (data === null) {
    res
      .status(400)
      .json(new Response(400, "Bài viết không tồn tại", 300, 300, 300));
    return;
  }
  // change type của _id từ object sang string
  data._id = data._id.toString();
  req.body.STATUS_POST_INFOR = data;
  next();
}
// middleware kiểm tra sự tồn tại của cmt của status post. Nếu tồn tại thì gọi next() nếu không thì trả về http respone phản hồi bình luận không tồn tại
async function checkCmtPostExistMid(req, res, next) {
  let cmt_id = undefined;
  if (req.method === "GET") {
    cmt_id = req.query.cmt_id;
  } else if (req.method === "POST") {
    cmt_id = req.body.cmt_id;
  }
  // const { cmt_id } = req.body;
  const data = await statusPostModel.getCommentPostById(cmt_id);
  if (data.payload.length <= 0) {
    res
      .status(400)
      .json(new Response(400, "Bình luật không tồn tại", 300, 300, 300));
    return;
  }
  req.body.CMT_POST_INFOR = data.payload[0];
  next();
}

// midlleware kiểm tra sự tồn tại của reply của status post
async function checkReplyPostExistMid(req, res, next) {
  const reply_id = req.method == "GET" ? req.query.reply_id : req.body.reply_id;
  const data = await statusPostModel.getReplyCommentById(reply_id);
  if (data.payload.length <= 0) {
    res
      .status(400)
      .json(new Response(400, "Phản hồi không tồn tại", 300, 300, 300));
    return;
  }
  req.body.REPLY_POST_INFOR = data.payload[0];
  next();
}

async function preProcessUpdateReplyPost(req, res, next) {
  const content = req.body.content;
  const oldReplyInfor = req.body.REPLY_POST_INFOR;
  if (req.auth_decoded.ma_nguoi_dung != oldReplyInfor.replyBy) {
    res
      .status(400)
      .json(
        new Response(
          400,
          "Bạn không có quyền chỉnh sửa phản hồi này",
          300,
          300,
          300
        )
      );
    return;
  } else if (
    typeof content === "undefined" ||
    content === null ||
    content == ""
  ) {
    res
      .status(400)
      .json(
        new Response(
          400,
          "Nội dung thay đổi của phản hồi không hợp lệ",
          300,
          300,
          300
        )
      );
    return;
  }
  next();
}

async function preProcessUpdateCmtPost(req, res, next) {
  const content = req.body.content;
  const oldCmtInfor = req.body.CMT_POST_INFOR;
  if (req.auth_decoded.ma_nguoi_dung != oldCmtInfor.commentBy) {
    res
      .status(400)
      .json(
        new Response(
          400,
          "Bạn không có quyền chỉnh sửa bình luận này",
          300,
          300,
          300
        )
      );
    return;
  } else if (
    typeof content === "undefined" ||
    content === null ||
    content == ""
  ) {
    res
      .status(400)
      .json(
        new Response(
          400,
          "Nội dung thay đổi của bình luận không hợp lệ",
          300,
          300,
          300
        )
      );
    return;
  }
  next();
}

// middleware tiền xử lý khi toggle like bài viết chia sẻ trạng thái, giả sử KHI bài viết đã TỒN TẠI
async function preProcessLikePost(req, res, next) {
  const { post_id } = req.body;
  const userId = req.auth_decoded.ma_nguoi_dung;
  const hasLiked = await postHelper.hasUserLikeTheStatusPost(userId, post_id);
  req.body.action = hasLiked ? "REMOVE_LIKE" : "LIKE";
  next();
  return;
}

async function preProcessLikeCmtPost(req, res, next) {
  const { cmt_id } = req.body;
  const userId = req.auth_decoded.ma_nguoi_dung;
  const hasLiked = await postHelper.hasUserLikeTheCmtStatusPost(userId, cmt_id);
  req.body.action = hasLiked ? "REMOVE_LIKE" : "LIKE";
  next();
  return;
}

async function preProcessCmtPost(req, res, next) {
  const comment = req.body.comment;
  if (typeof comment != "string" || comment == "") {
    res
      .status(400)
      .json(new Response(400, [], "Bình luận không được để trống", 300, 300));
  }
  next();
}
async function preProcessRelyCmtPost(req, res, next) {
  const reply = req.body.reply;
  if (typeof reply != "string" || reply == "") {
    res
      .status(400)
      .json(
        new Response(
          400,
          [],
          "Phản hội Bình luận không được để trống",
          300,
          300
        )
      );
  }
  next();
}

async function preProcessGetCmtPost(req, res, next) {
  const VALID_PARAM = "tham số không hợp lệ";
  let { post_id, index, num } = req.body;
  try {
    index = parseInt(index);
    if (Number.isNaN(index) || index < 0) {
      throw new Error(VALID_PARAM);
    }
    if (typeof num != "undefined" && Number.isNaN(parseInt(num))) {
      throw new Error(VALID_PARAM);
    }

    num = typeof num == "undefined" ? undefined : parseInt(num);
    if (num <= 0) throw new Error(VALID_PARAM);
    req.body.index = index;
    req.body.num = num;
  } catch (error) {
    res.status(400).json(new Response(400, [], VALID_PARAM, 300, 300));
    return;
  }
  next();
}

async function preProcessGetReplyOfCmtPost(req, res, next) {
  const VALID_PARAM = "tham số không hợp lệ";
  let { cmt_id, index, num } = req.body;
  try {
    index = parseInt(index);
    if (Number.isNaN(index) || index < 0) {
      throw new Error(VALID_PARAM);
    }
    if (typeof num != "undefined" && Number.isNaN(parseInt(num))) {
      throw new Error(VALID_PARAM);
    }
    num = typeof num == "undefined" ? undefined : parseInt(num);
    if (num <= 0) throw new Error(VALID_PARAM);
    req.body.index = index;
    req.body.num = num;
  } catch (error) {
    res.status(400).json(new Response(400, [], VALID_PARAM, 300, 300));
    return;
  }
  next();
}

async function preProcessDeletePost(req, res, next) {
  const postBeforeDelete = req.body.STATUS_POST_INFOR;
  if (req.auth_decoded.ma_nguoi_dung != postBeforeDelete.owner_id) {
    res
      .status(400)
      .json(
        new Response(400, [], "Bạn không có quyền xóa bài viết này", 300, 300)
      );
    return;
  }
  next();
}

// middware kiểm tra quyền của người dung xem họ có quyền cập nhật bài viết không + lọc ra danh sách bạn bè dc tag thêm vào, bỏ tag đi
async function preProcessUpdatePost_1(req, res, next) {
  // kiểm tra quyền cập nhật bài viết
  const postBeforeUpdate = req.body.STATUS_POST_INFOR;
  if (req.auth_decoded.ma_nguoi_dung != postBeforeUpdate.owner_id) {
    res
      .status(400)
      .json(
        new Response(400, [], "Bạn không có quyền xóa bài viết này", 300, 300)
      );
    return;
  }
  // lọc friend trong danh sách tag
  let userTaggedIds = req.body.taggedUsersId || [];
  userTaggedIds = userTaggedIds.map((id) => parseInt(id, 10)); // change index to int type
  // remove dulplicate
  userTaggedIds = [...new Set(userTaggedIds)];
  // danh sách bạn bè mới dc tag
  const newTaggedUserId = (req.body.taggedUsersId =
    await banBeHelper.getFriendsIdInListOfUserId(
      req.auth_decoded.ma_nguoi_dung,
      userTaggedIds
    ));
  // danh sách bạn bè cũ dc tag
  const oldTaggedUserId = postBeforeUpdate.taggedUsers.map((user) =>
    parseInt(user.ma_nguoi_dung)
  );

  // danh sách bạn bè bị untag = set( danh sách bạn bè cũ - danh sách bạn bè mới )
  req.body.UNFOLLOW_USER_ID = [
    ...oldTaggedUserId.filter(
      (oldId) => !new Set([...newTaggedUserId]).has(oldId)
    ),
  ];
  // danh sách bạn bè mới dc tag = set( danh sách bạn bè mới - danh sách bạn bè cũ )
  req.body.NEW_FOLLOW_USER_ID = [
    ...newTaggedUserId.filter(
      (newId) => !new Set([...oldTaggedUserId]).has(newId)
    ),
  ];

  // lọc danh sách thú cưng
  let myPetIds = req.body.myPetIds || [];
  myPetIds = myPetIds.map((petId) => parseInt(petId, 10)); // change index to int type
  // remove dulplicate
  myPetIds = [...new Set(myPetIds)];
  // danh sách thú cưng mới dc tag
  const newTaggedPetIds = (req.body.myPetIds =
    await petHelper.getOwnPetIdsOfUserInListOfPetIds(
      req.auth_decoded.ma_nguoi_dung,
      myPetIds
    ));

  next();
}

// dựa vào danh sách bạn bè được tag ở trên tiến hành thay đổi danh sách người dùng theo dõi bài viết
async function preProcessUpdatePost_2(req, res, next) {
  const { post_id } = req.body;
  const postBeforeUpdate = req.body.STATUS_POST_INFOR;
  // const text = req.body.text.trim() ? req.body.text.trim() : false;
  const visibility = String(req.body.visibility).toUpperCase();
  req.body.visibility = visibility;
  // let userTaggedIds = req.body.taggedUsersId || [];
  // userTaggedIds = userTaggedIds.map((id) => parseInt(id, 10));
  // // remove dulplicate
  // userTaggedIds = [...new Set(userTaggedIds)];
  // req.body.taggedUsersId = await banBeHelper.getFriendsIdInListOfUserId(
  //   req.auth_decoded.ma_nguoi_dung,
  //   userTaggedIds
  // );
  if (
    visibility != "PUBLIC" &&
    visibility != "JUST_FRIENDS" &&
    visibility != "PRIVATE"
  ) {
    res
      .status(400)
      .json(new Response(400, [], "visibility không hợp lệ", 300, 300));
    return;
  }

  if (visibility == "PRIVATE") {
    await followhelper.listOfUserUnFollowStatusPost(
      post_id,
      req.body.UNFOLLOW_USER_ID,
      false
    );
  }

  await followhelper.listOfUserFollowStatusPost(
    post_id,
    req.body.NEW_FOLLOW_USER_ID,
    true
  );

  next();
}

async function preProcessDeleteComment(req, res, next) {
  const postInfor = await statusAndArticleModel
    .getPostById(req.body.CMT_POST_INFOR.postId)
    .then((data) => data.payload[0]);
  console.log({ postInfor });
  if (typeof postInfor == "undefined") {
    res
      .status(400)
      .json(
        new Response(400, [], "Bài viết chứa bình luận không tồn tại", 300, 300)
      );
    return;
  }
  if (req.auth_decoded.ma_nguoi_dung == postInfor.owner_id) {
    next();
    return;
  }
  const cmtBeforeDelete = req.body.CMT_POST_INFOR;
  if (req.auth_decoded.ma_nguoi_dung != cmtBeforeDelete.commentBy) {
    res
      .status(400)
      .json(
        new Response(400, [], "Bạn không có quyền xóa bình luận này", 300, 300)
      );
    return;
  }
  next();
}

async function preProcessDeleteReplyOFCmt(req, res, next) {
  const postInfor = await statusAndArticleModel
    .getPostById(req.body.REPLY_POST_INFOR.postId)
    .then((data) => data.payload[0]);
  // console.log({postInfor});
  if (req.auth_decoded.ma_nguoi_dung == postInfor.owner_id) {
    next();
    return;
  }
  const replyBeforeDelete = req.body.REPLY_POST_INFOR;
  if (req.auth_decoded.ma_nguoi_dung != replyBeforeDelete.replyBy) {
    res
      .status(400)
      .json(
        new Response(400, [], "Bạn không có quyền xóa phản hồi này", 300, 300)
      );
    return;
  }
  next();
}

async function preProcessGetPostStartFrom(req, res, next) {
  const VALID_PARAM = "tham số không hợp lệ";
  let { index, num } = req.body;
  try {
    index = parseInt(index);
    if (Number.isNaN(index) || index < 0) {
      throw new Error(VALID_PARAM);
    }
    if (typeof num != "undefined" && Number.isNaN(parseInt(num))) {
      throw new Error(VALID_PARAM);
    }

    num = typeof num == "undefined" ? undefined : parseInt(num);
    if (num <= 0) throw new Error(VALID_PARAM);
    req.body.index = index;
    req.body.num = num;
  } catch (error) {
    res.status(400).json(new Response(400, [], VALID_PARAM, 300, 300));
    return;
  }
  next();
}

async function preProccessToGetNewFeed(req, res, next) {
  const index = parseInt(req.body.index);
  const PostIdsHaveRendered = req.body.PostIdsHaveRendered || [];
  req.body.PostIdsHaveRendered = PostIdsHaveRendered.map((postId) =>
    String(postId)
  );
  // console.log(typeof req.body.index);
  if (Number.isNaN(index)) {
    res
      .status(400)
      .json(new Response(400, [], "tham số không hợp lệ", 300, 300));
    return;
  }
  req.body.index = index;
  next();
}

async function preProcessGetPostHavePet(req, res, next) {
  const VALID_PARAM = "Tham số không hợp lệ";
  const { pet_id } = req.body;
  let { before, num } = req.body;
  try {
    if (
      typeof before != "undefined" &&
      !utilHelper.isDateValid(new Date(before))
    ) {
      throw new Error(VALID_PARAM);
    }
    if (typeof num != "undefined" && Number.isNaN(parseInt(num))) {
      throw new Error(VALID_PARAM);
    }
    num = typeof num == "undefined" ? undefined : parseInt(num);
    if (typeof num != "undefined" && num <= 0) throw new Error(VALID_PARAM);
    req.body.before =
      typeof before == "undefined" ? new Date() : new Date(before);
    req.body.num = num;
  } catch (error) {
    res.status(400).json(new Response(400, [], VALID_PARAM, 300, 300));
    return;
  }
  next();
}

module.exports = {
  preProcessAddPost,
  preProcessLikePost,
  checkPostExistMid,
  preProcessCmtPost,
  checkCmtPostExistMid,
  checkReplyPostExistMid,
  preProcessLikeCmtPost,
  preProcessRelyCmtPost,
  preProcessGetCmtPost,
  preProcessGetReplyOfCmtPost,
  preProcessUpdateReplyPost,
  preProcessUpdateCmtPost,
  preProcessDeleteReplyOFCmt,
  preProcessGetPostStartFrom,
  preProcessDeleteComment,
  preProcessDeletePost,
  preProcessUpdatePost_1,
  preProcessUpdatePost_2,
  preProccessToGetNewFeed,
  preProcessGetPostHavePet,
};
