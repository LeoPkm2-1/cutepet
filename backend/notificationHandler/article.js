const articleModel = require("../models/BaiViet/articleModel");
const theodoiHelper = require("../utils/theodoiHelper");
const userHelper = require("../utils/userHelper");
const UtilsHelper = require("../utils/UtilsHelper");
const articleEventStructure = require("../socketHandler/norm_user/articleEventStructure");
const articleNotificationModel = require("../models/thongbao/article");
const socketHelper = require("../utils/socketHelper");
const { normUserNamespace } = require("../socketHandler/norm_user");

const prepareBeforeHandleNotiForArticle = async (
  article_id,
  owner_id,
  sender_id
) => {
  const owner_infor = await userHelper
    .getUserPublicInforByUserId(owner_id)
    .then((user) =>
      UtilsHelper.filter_keys_in_Obj(user, [
        "ma_nguoi_dung",
        "ten",
        "tai_khoan",
        "anh",
      ])
    );
  const sender_infor = await userHelper
    .getUserPublicInforByUserId(sender_id)
    .then((user) =>
      UtilsHelper.filter_keys_in_Obj(user, [
        "ma_nguoi_dung",
        "ten",
        "tai_khoan",
        "anh",
      ])
    );
  const article_infor = await articleModel
    .getArticleById(article_id)
    .then((data) => data.payload);
  const isOwnerFollowing = await theodoiHelper.hasUserFollowArticle(
    article_id,
    owner_id
  );
  return {
    owner_infor,
    sender_infor,
    article_infor,
    isOwnerFollowing,
  };
};

const notifyUpVoteArticle = async (
  article_id,
  user_Id,
  owner_id = undefined,
  upVoteAt = new Date()
) => {
  //   console.log("haiahihi");
  if (typeof owner_id === "undefined")
    owner_id = await articleModel.getOwnerIdOfArticle(article_id);

  owner_id = parseInt(owner_id);
  user_Id = parseInt(user_Id);
  const { owner_infor, sender_infor, article_infor, isOwnerFollowing } =
    await prepareBeforeHandleNotiForArticle(article_id, owner_id, user_Id);

  if (isOwnerFollowing && owner_id != user_Id) {
    const notiInforForOwner = new articleEventStructure.UpvoteArticleEvent(
      sender_infor,
      owner_infor,
      article_infor,
      upVoteAt,
      true
    );
    // store notification to database
    await articleNotificationModel.addUpvoteArticleNotification(
      owner_id,
      notiInforForOwner
    );

    // send notification to owner through socket when he/she is following the article
    const socketRoomNameOfOwner = socketHelper.getPrivateRoomNameOfUser(
      owner_infor.ma_nguoi_dung
    );
    normUserNamespace
      .to(socketRoomNameOfOwner)
      .emit(
        articleEventStructure.UpvoteArticleEvent.getEventName(),
        notiInforForOwner
      );
  }
};

const notifyDownVoteArticle = async (
  article_id,
  user_Id,
  owner_id = undefined,
  downVoteAt = new Date()
) => {
  if (typeof owner_id === "undefined")
    owner_id = await articleModel.getOwnerIdOfArticle(article_id);

  owner_id = parseInt(owner_id);
  user_Id = parseInt(user_Id);
  const { owner_infor, sender_infor, article_infor, isOwnerFollowing } =
    await prepareBeforeHandleNotiForArticle(article_id, owner_id, user_Id);

  if (isOwnerFollowing && owner_id != user_Id) {
    const notiInforForOwner = new articleEventStructure.DownvoteArticleEvent(
      sender_infor,
      owner_infor,
      article_infor,
      downVoteAt,
      true
    );
    // store notification to database
    await articleNotificationModel.addDownvoteArticleNotification(
      owner_id,
      notiInforForOwner
    );
    // send notification to owner through socket when he/she is following the article
    const socketRoomNameOfOwner = socketHelper.getPrivateRoomNameOfUser(
      owner_infor.ma_nguoi_dung
    );
    normUserNamespace
      .to(socketRoomNameOfOwner)
      .emit(
        articleEventStructure.DownvoteArticleEvent.getEventName(),
        notiInforForOwner
      );
  }
};

const notifyCommentArticle = async (
  article_id,
  user_Id,
  owner_id = undefined,
  commentAt = new Date()
) => {
  if (typeof owner_id === "undefined")
    owner_id = await articleModel.getOwnerIdOfArticle(article_id);

  owner_id = parseInt(owner_id);
  user_Id = parseInt(user_Id);
  const { owner_infor, sender_infor, article_infor, isOwnerFollowing } =
    await prepareBeforeHandleNotiForArticle(article_id, owner_id, user_Id);

  if (isOwnerFollowing && owner_id != user_Id) {
    const notiInforForOwner = new articleEventStructure.CommentArticleEvent(
      sender_infor,
      owner_infor,
      article_infor,
      commentAt,
      true
    );
    // store notification to database
    await articleNotificationModel.addCommentArticleNotification(
      owner_id,
      notiInforForOwner
    );

    // send notification to owner through socket when he/she is following the article
    const socketRoomNameOfOwner = socketHelper.getPrivateRoomNameOfUser(
      owner_infor.ma_nguoi_dung
    );
    normUserNamespace
      .to(socketRoomNameOfOwner)
      .emit(
        articleEventStructure.CommentArticleEvent.getEventName(),
        notiInforForOwner
      );
  }
};

module.exports = {
  notifyUpVoteArticle,
  notifyDownVoteArticle,
  notifyCommentArticle,
};
