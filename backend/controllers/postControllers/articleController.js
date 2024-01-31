const articleComposStructure = require("../../models/BaiViet/articleComposStructure");
const articleModel = require("../../models/BaiViet/articleModel");
const statusAndArticleModel = require("../../models/BaiViet/StatusAndArticleModel");
const followhelper = require("../../utils/theodoiHelper");
const userHelper = require("../../utils/userHelper");
const articleHelper = require("../../utils/BaiViet/articleHelper");
const { Response } = require("../../utils");
const {
  userUnFollowArticle,
  deleteAllFollowOfArticle,
} = require("../../models/theodoi/followModel");
const {
  notifyUpVoteArticle,
  notifyDownVoteArticle,
  notifyCommentArticle,
} = require("../../notificationHandler/article");

async function addArticleControler(req, res) {
  const { title, main_image, intro, content, categories } = req.body;
  const owner_id = req.auth_decoded.ma_nguoi_dung;

  const articleObj = new articleComposStructure.Article(
    title,
    main_image,
    intro,
    content,
    categories,
    owner_id
  );

  const addProcess = await articleModel.addArticle(articleObj);
  if (Array.isArray(addProcess.payload) && addProcess.payload.length == 0) {
    res.status(400).json(new Response(400, [], "đã có lỗi xảy ra", 300, 300));
    return;
  }
  const article_id = addProcess.payload.insertedId.toString();
  const insertIdArticle = await statusAndArticleModel
    .getPostById(article_id)
    .then((data) => data.payload);
  insertIdArticle[0]._id = insertIdArticle[0]._id.toString();

  // thêm người dùng tạo bài chia sẻ kiến thức vào danh sách theo dõi bài viết đó
  await followhelper.followArticle(article_id, owner_id, false);

  res
    .status(200)
    .json(
      new Response(
        200,
        insertIdArticle,
        "thêm bài chia sẻ kiến thức thành công"
      )
    );

  // thông báo qua socket cho người dung đang theo dõi họ
}

async function toggleUpVoteArticleControler(req, res) {
  try {
    const { article_id, action } = req.body;
    const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
    const numOfUpVote = req.body.ARTICLE_INFOR.numOfUpVote;

    if (action == "JUST_UPVOTE") {
      // thêm thông tin upvote
      const upVoteProcess = await articleModel.addUpVote(article_id, user_id);
      // thông tin upvote
      const upVoteInfor = await articleModel
        .getUpVoteArticleInforOfUser(user_id, article_id)
        .then((data) => data.payload);
      // tăng số lượng upvote của bài viết
      await articleModel.updateNumOfUpVoteArticle(article_id, numOfUpVote + 1);
      // gửi thông báo đến người chủ của article
      notifyUpVoteArticle(article_id, user_id);

      res.status(200).json(new Response(200, upVoteInfor, "upvote thành công"));
      return;
    } else if (action == "REMOVE_UPVOTE") {
      // hủy upvote trước đó
      const removeUpVoteProcess = await articleModel.removeUpVote(
        article_id,
        user_id
      );
      // giảm số lượng upvote
      await articleModel.updateNumOfUpVoteArticle(article_id, numOfUpVote - 1);
      res.status(200).json(
        new Response(
          200,
          {
            articleId: article_id,
          },
          "hủy upvote thành công"
        )
      );
    } else if (action == "REMOVE_DOWNVOTE_BEFORE_UPVOTE") {
      // 1. hủy downvote trước
      // === 1.1. xóa thông tin downvote
      const numOfDownVote = req.body.ARTICLE_INFOR.numOfDownVote;
      await articleModel.removeDownVote(article_id, user_id);
      // === 1.2. giảm số lượng downvote
      await articleModel.updateNumOfDownVoteArticle(
        article_id,
        numOfDownVote - 1
      );
      // 2. upvote
      // === 2.1. thêm thông tin upvote
      const upVoteProcess = await articleModel.addUpVote(article_id, user_id);
      // === 2.2. thông tin upvote
      const upVoteInfor = await articleModel
        .getUpVoteArticleInforOfUser(user_id, article_id)
        .then((data) => data.payload);
      // === 2.3. tăng số lượng upvote của bài viết
      await articleModel.updateNumOfUpVoteArticle(article_id, numOfUpVote + 1);

      // gửi thông báo đến người chủ của article
      notifyUpVoteArticle(article_id, user_id);

      res.status(200).json(new Response(200, upVoteInfor, "upvote thành công"));
    }
  } catch (error) {
    console.log(error);
  }
}

async function toggleDownVoteArticleControler(req, res) {
  try {
    const { article_id, action } = req.body;
    const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
    const numOfDownVote = req.body.ARTICLE_INFOR.numOfDownVote;

    if (action == "JUST_DOWNVOTE") {
      const downVoteProcess = await articleModel.addDownVote(
        article_id,
        user_id
      );
      // thông tin downvote
      const downVoteInfor = await articleModel
        .getDownVoteArticleInforOfUser(user_id, article_id)
        .then((data) => data.payload);
      // tăng số lượng downvote của bài viết
      await articleModel.updateNumOfDownVoteArticle(
        article_id,
        numOfDownVote + 1
      );
      // gửi thông báo đến người chủ của article
      notifyDownVoteArticle(article_id, user_id);

      res
        .status(200)
        .json(new Response(200, downVoteInfor, "downvote thành công"));
      return;
    } else if (action == "REMOVE_DOWNVOTE") {
      // hủy downvote trước đó
      await articleModel.removeDownVote(article_id, user_id);
      // giảm số lượng downvote
      await articleModel.updateNumOfDownVoteArticle(
        article_id,
        numOfDownVote - 1
      );
      res.status(200).json(
        new Response(
          200,
          {
            articleId: article_id,
          },
          "hủy downvote thành công"
        )
      );
    } else if (action == "REMOVE_UPVOTE_BEFORE_DOWNVOTE") {
      // 1. hủy upvote trước
      // === 1.1. xóa thông tin upvote
      const numOfUpVote = req.body.ARTICLE_INFOR.numOfUpVote;
      await articleModel.removeUpVote(article_id, user_id);
      // === 1.2. giảm số lượng upvote
      await articleModel.updateNumOfUpVoteArticle(article_id, numOfUpVote - 1);
      // 2. downvote
      // === 2.1. thêm thông tin downvote
      const downVoteProcess = await articleModel.addDownVote(
        article_id,
        user_id
      );
      // === 2.2. thông tin downvote
      const downVoteInfor = await articleModel
        .getDownVoteArticleInforOfUser(user_id, article_id)
        .then((data) => data.payload);
      // === 2.3. tăng số lượng downvote của bài viết
      await articleModel.updateNumOfDownVoteArticle(
        article_id,
        numOfDownVote + 1
      );

      // gửi thông báo đến người chủ của article
      notifyDownVoteArticle(article_id, user_id);

      res
        .status(200)
        .json(new Response(200, downVoteInfor, "downvote thành công"));
    }
  } catch (error) {
    console.log(error);
  }
}

async function addCommentController(req, res) {
  const comment = req.body.comment;
  const article_id = req.body.article_id;
  const commentBy = req.auth_decoded.ma_nguoi_dung;
  const numOfComment = req.body.ARTICLE_INFOR.numOfComment;
  const commentObj = new articleComposStructure.CommentArticle(
    article_id,
    comment,
    commentBy
  );
  // add comment to db
  const commentProcess = await articleModel.addComment(commentObj);
  // update numOfComment for article
  await articleModel.updateNumOfCommentArticle(article_id, numOfComment + 1);
  const idOfComment = commentProcess.payload.insertedId.toString();
  const insertedComment = await articleModel.getCommentByCmtId(idOfComment);
  // gửi thông báo đến người chủ của article
  notifyCommentArticle(article_id, commentBy);

  res.status(200).json(new Response(200, insertedComment.payload, ""));
}

async function addReplyController(req, res) {
  const reply = req.body.reply;
  const cmt_id = req.body.cmt_id;
  const article_id = req.body.ARTICLE_INFOR._id;
  const replyBy = req.auth_decoded.ma_nguoi_dung;
  const { numOfReply } = req.body.CMT_ARTICLE_INFOR;

  const replyObj = new articleComposStructure.ReplyCommentArticle(
    cmt_id,
    reply,
    replyBy,
    article_id
  );
  // add reply to db
  const addReplyProcess = await articleModel.addReply(replyObj);
  // update numOfReply for comment
  await articleModel.updateNumOfReplyComment(cmt_id, numOfReply + 1);
  const idOfReply = addReplyProcess.payload.insertedId.toString();
  const insertedReply = await articleModel.getReplyByReplyId(idOfReply);

  res.status(200).json(new Response(200, insertedReply.payload, ""));
}

async function updateReplyController(req, res) {
  const { reply_id, content } = req.body;
  const data = await articleModel.updateContentOfReply(reply_id, content);

  res
    .status(200)
    .json(new Response(200, data.payload, "cập nhật phản hồi thành công"));
}

async function updateCommentController(req, res) {
  const { cmt_id, content } = req.body;
  const data = await articleModel.updateContentOfComment(cmt_id, content);
  res
    .status(200)
    .json(new Response(200, data.payload, "cập nhật bình luận thành công"));
}

async function deleteReplyController(req, res) {
  const { reply_id } = req.body;
  const { numOfReply } = req.body.CMT_ARTICLE_INFOR;
  const cmt_id = req.body.REPLY_CMT_ARTICLE_INFOR.cmtId;

  const deleteProcess = await articleModel.deleteReply(reply_id);
  console.log(deleteProcess);
  // delete failed
  if (deleteProcess.payload.deletedCount <= 0) {
    res.status(400).json(new Response(400, [], "xóa phản hồi thất bại"));
    return;
  }
  // delete success
  // update num of reply in cmt
  await articleModel.updateNumOfReplyComment(cmt_id, numOfReply - 1);
  res
    .status(200)
    .json(
      new Response(
        200,
        { ...deleteProcess.payload, reply_id },
        "xóa phản hồi thành công"
      )
    );
}

async function deleteCommentController(req, res) {
  const { cmt_id } = req.body;
  const { numOfComment } = req.body.ARTICLE_INFOR;
  const article_id = req.body.ARTICLE_INFOR._id;
  await Promise.all([
    // delete all reply
    await articleModel.deleteAllReplyOfComment(cmt_id),
    // delete comment
    await articleModel.deleteComment(cmt_id),
    // update num of comment in article
    await articleModel.updateNumOfCommentArticle(article_id, numOfComment - 1),
  ]);
  res
    .status(200)
    .json(new Response(200, { cmt_id }, "xóa bình luận thành công"));
}

async function deleteArticleController(req, res) {
  const { article_id } = req.body;
  await Promise.all([
    // delete all upvote
    await articleModel.deleteAllUpVoteOfArticle(article_id),
    // delete all downvote
    await articleModel.deleteAllDownVoteOfArticle(article_id),
    // delete all comment and reply of article
    await articleModel.deleteAllReplyAndCommentOfArticle(article_id),
    // delete article
    await articleModel.deleteArticle(article_id),
    // delete all follow of article
    await deleteAllFollowOfArticle(article_id),
  ]);
  res
    .status(200)
    .json(new Response(200, { article_id }, "xóa bài viết thành công"));
}

async function getArticleController(req, res, next) {
  const { article_id } = req.body;
  const queryUser_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const articleInfor = req.body.ARTICLE_INFOR;
  const owner_infor = await userHelper.getUserPublicInforByUserId(
    articleInfor.owner_id
  );
  const hasUpVoted = await articleHelper.hasUserUpVotedArticle(
    queryUser_id,
    article_id
  );
  const hasDownVoted = await articleHelper.hasUserDownVotedArticle(
    queryUser_id,
    article_id
  );
  const data = {
    ...articleInfor,
    owner_infor,
    hasUpVoted,
    hasDownVoted,
  };
  res.status(200).json(new Response(200, data, "lấy bài viết thành công"));
}

async function isUserFollowedArticleController(req, res) {
  const { article_id } = req.body;
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const isFollowed = await followhelper.hasUserFollowArticle(
    article_id,
    user_id
  );
  res.status(200).json(new Response(200, { article_id, isFollowed }, ""));
  return;
}

async function followArticleController(req, res) {
  const { article_id } = req.body;
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const isFollowed = await followhelper.hasUserFollowArticle(
    article_id,
    user_id
  );
  // console.log({ isFollowed });
  // return;
  if (isFollowed) {
    res.status(200).json(
      new Response(
        200,
        {
          article_id,
          isFollowed,
        },
        "bạn đã theo dõi bài viết này"
      )
    );
    return;
  }
  await followhelper.followArticle(article_id, user_id);
  res.status(200).json(
    new Response(
      200,
      {
        article_id,
        isFollowed: true,
      },
      "theo dõi bài viết thành công"
    )
  );

  return;
  // res.send("follow article - " + article_id);
}

async function unFollowArticleController(req, res) {
  const { article_id } = req.body;
  const user_id = parseInt(req.auth_decoded.ma_nguoi_dung);
  const isFollowed = await followhelper.hasUserFollowArticle(
    article_id,
    user_id
  );
  if (!isFollowed) {
    res.status(400).json(
      new Response(
        400,
        {
          unfollowed: false,
          message: "bạn chưa theo dõi bài viết này trước đó",
        },
        "bạn chưa theo dõi bài viết này trước đó",
        300,
        300
      )
    );
    return;
  }
  await followhelper.unFollowArticle(article_id, user_id, false);
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
}

async function getAllCmtOfArticleController(req, res) {
  const { article_id } = req.body;
  const comments = await articleModel
    .getAllCommentsOfArticle(article_id)
    .then((data) => data.payload)
    .catch((err) => []);
  // console.log(comments);
  await articleHelper.insertUserCmtInforToListOfCmts(comments);
  const data = {
    comments,
    numOfComments: comments.length,
    numOfRemain: 0,
  };
  res
    .status(200)
    .json(new Response(200, data, "lấy tất cả các bài viết thành công"));
  return;
}

async function getCmtStartFromController(req, res) {
  const { article_id, index, num } = req.body;
  const AllComments = await articleModel
    .getAllCommentsOfArticle(article_id)
    .then((data) => data.payload)
    .catch((err) => []);
  if (AllComments.length <= 0) {
    res.status(200).json(
      new Response(200, {
        comments: [],
        numOfComments: 0,
        numOfRemain: 0,
      })
    );
    return;
  }
  if (typeof num == "undefined") {
    const comments = AllComments.slice(index);
    await articleHelper.insertUserCmtInforToListOfCmts(comments);
    const data = {
      comments,
      numOfComments: comments.length,
      numOfRemain: 0,
    };
    res.status(200).json(new Response(200, data, "lấy bình luận thành công"));
    return;
  } else {
    const comments = AllComments.slice(index, index + num);
    await articleHelper.insertUserCmtInforToListOfCmts(comments);
    const data = {
      comments,
      numOfComments: comments.length,
      numOfRemain:
        AllComments.length <= index + num
          ? 0
          : AllComments.length - (index + num),
    };
    res.status(200).json(new Response(200, data, "lấy bình luận thành công"));
    return;
  }
}

async function getAllArticleInDBController(req, res) {
  const allArticleInDB = await articleModel
    .getAllArticles()
    .then((data) => data.payload)
    .catch((err) => []);
  await articleHelper.insertUserWriteArticleInforToListOfArticle(
    allArticleInDB
  );
  res.status(200).json(new Response(200, allArticleInDB, ""));
  return allArticleInDB;
}

async function getAllCategoriesController(req, res) {
  const allCategories = await articleModel.getAllCategories();
  res
    .status(200)
    .json(
      new Response(200, allCategories, "lấy danh sách các thể loại thành công")
    );
}

async function getMyArticlesController(req, res) {
  const user_id = req.auth_decoded.ma_nguoi_dung;
  const myArticles = await articleModel.getArticleOfUser(user_id);
  res
    .status(200)
    .json(
      new Response(200, myArticles.payload, "lấy danh sách bài viết thành công")
    );
}

async function editArticleController(req, res) {
  const articleBeforeEdit = req.body.ARTICLE_INFOR;
  const { article_id, title, main_image, intro, content, categories } =
    req.body;
  // delete _id field in old object post
  delete articleBeforeEdit._id;
  const newArticle = {
    ...articleBeforeEdit,
    title,
    main_image,
    intro,
    content,
    categories,
    modifiedAt: new Date(),
  };

  const editProcess = await articleModel.updateArticle(article_id, newArticle);

  res
    .status(200)
    .json(
      new Response(
        200,
        newArticle,
        "cập nhật bài chia sẻ trạng thái thành công"
      )
    );
}

const reportArticleController = async (req, res) => {
  const { article_id, report_Reason } = req.body;
  const user_report_id = req.auth_decoded.ma_nguoi_dung;
  const reportProcess = await articleHelper.reportArticle(
    article_id,
    user_report_id,
    report_Reason,
    true
  );
  res.status(200).json(reportProcess);
};

const getArticlesByIndexAndNumController = async (req, res) => {
  const { index, num } = req.body;
  // console.log("tao là leo 123");

  const articles = await articleModel
    .getArticlesByIndexAndNum(index, num)
    .then((data) => data.payload)
    .catch((err) => []);
  await articleHelper.insertUserWriteArticleInforToListOfArticle(articles);
  const totalNumOfArticles = await articleModel
    .getTotalNumOfArticle()
    .then((data) => data.payload);
  const data = {
    articles: articles,
    totalNumOfArticles: totalNumOfArticles,
    remainNumOfArticles:
      index + articles.length - 1 >= totalNumOfArticles - 1
        ? 0
        : totalNumOfArticles - 1 - (index + articles.length - 1),
  };

  res.status(200).json(new Response(200, data, ""));
  return data;
};

const findArticlesByKeyWordInTitleController = async (req, res) => {
  const { searchKey, index, num } = req.body;
  const articles = await articleModel
    .findArticlesByKeyWordInTitle(searchKey, index, num)
    .then((data) => data.payload)
    .catch((err) => []);
  await articleHelper.insertUserWriteArticleInforToListOfArticle(articles);
  const totalNumOfArticles = await articleModel
    .getTotalNumOfArticleHaveKeyWordInTitle(searchKey)
    .then((data) => data.payload);
  const data = {
    articles: articles,
    totalNumOfArticles: totalNumOfArticles,
    remainNumOfArticles:
      index + articles.length - 1 >= totalNumOfArticles - 1
        ? 0
        : totalNumOfArticles - 1 - (index + articles.length - 1),
  };
  res.status(200).json(new Response(200, data, ""));
  return data;
};

const filterArticlesByTagsController = async (req, res) => {
  const { searchKey, tags, index, num } = req.body;
  const articles = await articleModel
    .findArticlesByCategories(tags, index, num)
    .then((data) => data.payload)
    .catch((err) => []);
  await articleHelper.insertUserWriteArticleInforToListOfArticle(articles);
  const totalNumOfArticles = await articleModel
    .getTotalNumOfArticleHaveListOfCategories(tags)
    .then((data) => data.payload);
  // console.log({ totalNumOfArticles });
  const data = {
    articles: articles,
    totalNumOfArticles: totalNumOfArticles,
    remainNumOfArticles:
      index + articles.length - 1 >= totalNumOfArticles - 1
        ? 0
        : totalNumOfArticles - 1 - (index + articles.length - 1),
  };
  res.status(200).json(new Response(200, data, ""));
};

const filterArticlesByTagsAndSearchController = async (req, res) => {
  const { searchKey, tags, index, num } = req.body;
  const articles = await articleModel
    .findArticlesByKeyWordInTitleAndCategories(searchKey, tags, index, num)
    .then((data) => data.payload)
    .catch((err) => []);
  await articleHelper.insertUserWriteArticleInforToListOfArticle(articles);
  const totalNumOfArticles = await articleModel
    .getTotalNumOfArticleHaveKeywWordInTitleAndCategories(searchKey, tags)
    .then((data) => data.payload);

  const data = {
    articles: articles,
    totalNumOfArticles: totalNumOfArticles,
    remainNumOfArticles:
      index + articles.length - 1 >= totalNumOfArticles - 1
        ? 0
        : totalNumOfArticles - 1 - (index + articles.length - 1),
  };
  res.status(200).json(new Response(200, data, ""));
};

const filterArticlesController = async (req, res) => {
  const { FILTER_ACTION } = req.body;
  if (FILTER_ACTION == "JUST_PAGING_BY_INDEX_AND_NUM") {
    await getArticlesByIndexAndNumController(req, res);
    return;
  } else if (FILTER_ACTION == "JUST_SEARCH_BY_TITLE_AND_NO_TAGS") {
    await findArticlesByKeyWordInTitleController(req, res);
    return;
  } else if (FILTER_ACTION == "JUST_FILTER_BY_TAGS_AND_NO_SEARCH") {
    await filterArticlesByTagsController(req, res);
    return;
  } else {
    // FILTER_ACTION == "FILTER_BY_TAGS_AND_SEARCH";
    await filterArticlesByTagsAndSearchController(req, res);
    return;
  }
};

const filterArticlesController_2 = async (req, res) => {
  const { FILTER_PARAMS } = req.body;
  const articles = await articleModel
    .filterArticleModel(FILTER_PARAMS)
    .then((data) => data.payload)
    .catch((err) => []);
  // console.log(FILTER_PARAMS.filterObj);
  await articleHelper.insertUserWriteArticleInforToListOfArticle(articles);
  const totalNumOfArticles = await articleModel
    .getTotalNumOfArticleFilter(FILTER_PARAMS)
    .then((data) =>
      FILTER_PARAMS.type == "FIND"
        ? data.payload
        : data.payload.length <= 0
        ? 0
        : data.payload[0].totalNumOfArticles
    );
  // console.log({ totalNumOfArticles });
  const data = {
    articles: articles,
    totalNumOfArticles: totalNumOfArticles,
    remainNumOfArticles:
      FILTER_PARAMS.index + articles.length - 1 >= totalNumOfArticles - 1
        ? 0
        : totalNumOfArticles - 1 - (FILTER_PARAMS.index + articles.length - 1),
  };
  res.status(200).json(new Response(200, data, ""));
};

const getAllAuthorOfArticleController = async (req, res) => {
  const AllAuthorId = await articleModel
    .getAllAuthorIdOfArticle()
    .then((data) => data.payload.map((userid) => parseInt(userid)));
  const allAuthor = await userHelper.getUserPublicInforByListIds(AllAuthorId);

  res.status(200).json(new Response(200, allAuthor, ""));
};

const filterArticlesController_3 = async (req, res) => {
  const { FILTER_PARAMS } = req.body;
  const articles = await articleModel
    .filterArticleModel(FILTER_PARAMS)
    .then((data) => data.payload)
    .catch((err) => []);
  // console.log(FILTER_PARAMS.filterObj);
  await articleHelper.insertUserWriteArticleInforToListOfArticle(articles);
  const totalNumOfArticles = await articleModel
    .getTotalNumOfArticleFilter(FILTER_PARAMS)
    .then((data) =>
      FILTER_PARAMS.type == "FIND"
        ? data.payload
        : data.payload.length <= 0
        ? 0
        : data.payload[0].totalNumOfArticles
    );
  // console.log({ totalNumOfArticles });
  const data = {
    articles: articles,
    totalNumOfArticles: totalNumOfArticles,
    remainNumOfArticles:
      FILTER_PARAMS.index + articles.length - 1 >= totalNumOfArticles - 1
        ? 0
        : totalNumOfArticles - 1 - (FILTER_PARAMS.index + articles.length - 1),
  };
  res.status(200).json(new Response(200, data, ""));
};

module.exports = {
  addArticleControler,
  toggleUpVoteArticleControler,
  toggleDownVoteArticleControler,
  addCommentController,
  addReplyController,
  updateReplyController,
  updateCommentController,
  deleteReplyController,
  deleteCommentController,
  deleteArticleController,
  getArticleController,
  isUserFollowedArticleController,
  followArticleController,
  unFollowArticleController,
  getAllCmtOfArticleController,
  getCmtStartFromController,
  getAllArticleInDBController,
  getAllCategoriesController,
  getMyArticlesController,
  editArticleController,
  reportArticleController,
  getArticlesByIndexAndNumController,
  filterArticlesController,
  filterArticlesController_2,
  getAllAuthorOfArticleController,
  filterArticlesController_3,
  // filterArticleController,
};
