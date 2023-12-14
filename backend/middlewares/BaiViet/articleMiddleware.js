const statusAndArticleModel = require("./../../models/BaiViet/StatusAndArticleModel");
const articleModel = require("./../../models/BaiViet/articleModel");
const articleHelper = require("./../../utils/BaiViet/articleHelper");
const StatusAndArticleModel = require("./../../models/BaiViet/StatusAndArticleModel");
const { Response } = require("../../utils");
const { getListUserIdsWhenTenContain } = require("../../models/userModel");
const NOT_HAVE_TITLE_ERR = "Tiêu đề không được để trống";
const NOT_HAVE_MAIN_IMG_ERR = "Bài chiase kiến thức phải có ảnh chính";
const NOT_HAVE_CONTENT_ERR = "Nội dung bài viết không được để trống";
const NOT_HAVE_CATEGORIES_ERR = "bài chia sẻ không có thể loại";
const NOT_HAVE_SUITABLE_CATEGORIES_ERR = "các thể loại không phù hợp ";
const WRONG_INTRO_ERR = "intro phải là string";

const articleComposStructure = require("../../models/BaiViet/articleComposStructure");

function hasStringContent(param) {
  return typeof param == "string" && param.length > 0;
}
function hasArrayContent(param) {
  return Array.isArray(param) && param.length > 0;
}
function filterCategoryList(categories) {
  categories = categories.map((category) => {
    category = category.trim();
    category = category.toUpperCase();
    return category;
  });
  // console.log(categories);
  categories = Array.from(new Set(categories));
  categories = categories.filter((element) =>
    articleModel.getAllCategories().includes(element)
  );

  return categories;
}

async function preProcessAddArtticle(req, res, next) {
  //   console.log(req.body);
  const { title, main_image, intro, content } = req.body;
  let { categories } = req.body;
  try {
    // check content of variables
    if (!hasStringContent(title)) throw new Error(NOT_HAVE_TITLE_ERR);
    if (!hasStringContent(main_image)) throw new Error(NOT_HAVE_MAIN_IMG_ERR);
    if (!hasStringContent(content)) throw new Error(NOT_HAVE_CONTENT_ERR);
    if (!hasArrayContent(categories)) throw new Error(NOT_HAVE_CATEGORIES_ERR);
    categories = filterCategoryList(categories);
    if (!hasArrayContent(categories))
      throw new Error(NOT_HAVE_SUITABLE_CATEGORIES_ERR);
    if (intro && typeof intro != "string") throw new Error(WRONG_INTRO_ERR);
    req.body.intro = intro || "";
    req.body.categories = categories;
    next();
    return;
  } catch (error) {
    switch (error.message) {
      case NOT_HAVE_TITLE_ERR:
        res
          .status(400)
          .json(new Response(400, [], NOT_HAVE_TITLE_ERR, 300, 300));
        return;
      case NOT_HAVE_MAIN_IMG_ERR:
        res
          .status(400)
          .json(new Response(400, [], NOT_HAVE_MAIN_IMG_ERR, 300, 300));
        return;
      case NOT_HAVE_CONTENT_ERR:
        res
          .status(400)
          .json(new Response(400, [], NOT_HAVE_CONTENT_ERR, 300, 300));
        return;
      case NOT_HAVE_CATEGORIES_ERR:
        res
          .status(400)
          .json(new Response(400, [], NOT_HAVE_CATEGORIES_ERR, 300, 300));
        return;
      case WRONG_INTRO_ERR:
        res.status(400).json(new Response(400, [], WRONG_INTRO_ERR, 300, 300));
        return;
      case NOT_HAVE_SUITABLE_CATEGORIES_ERR:
        res
          .status(400)
          .json(
            new Response(400, [], NOT_HAVE_SUITABLE_CATEGORIES_ERR, 300, 300)
          );
        return;
      default:
        console.log(error);
        break;
    }
  }
}

async function checkArticleExistMid(req, res, next) {
  const { article_id } = req.body;
  const data = await articleModel
    .getArticleById(article_id)
    .then((data) => data.payload);

  if (data == null) {
    res
      .status(400)
      .json(
        new Response(400, [], "Bài chia sẻ kiến thức không tồn tại", 300, 300)
      );
    return;
  }
  // change type của _id từ object sang string
  data._id = data._id.toString();
  req.body.ARTICLE_INFOR = data;
  // console.log({ ARTICLE_INFOR: req.body.ARTICLE_INFOR });
  next();
}

async function checkCommentExistMid(req, res, next) {
  const cmt_id = req.body.cmt_id;

  // get data of comment article
  const data = await articleModel.getCommentByCmtId(cmt_id);
  if (data.payload == null) {
    res
      .status(400)
      .json(new Response(400, [], "Bình luận không tồn tại", 300, 300));
    return;
  }
  // change type của _id từ object sang string
  data.payload._id = data.payload._id.toString();
  req.body.CMT_ARTICLE_INFOR = data.payload;
  // get data of article
  const articleInfor = await StatusAndArticleModel.getPostById(
    data.payload.articleId
  ).then((data) => data.payload[0]);
  articleInfor._id = articleInfor._id.toString();
  req.body.ARTICLE_INFOR = articleInfor;
  next();
}

// kiểm tra sự tồn tại của reply comment
async function checkReplyExistMid(req, res, next) {
  const { reply_id } = req.body;
  const replyInfor = await articleModel.getReplyByReplyId(reply_id);
  if (replyInfor.payload == null) {
    res
      .status(400)
      .json(new Response(400, [], "Phản hồi không tồn tại", 300, 300));
    return;
  }
  // change type của _id từ object sang string
  replyInfor.payload._id = replyInfor.payload._id.toString();
  req.body.REPLY_CMT_ARTICLE_INFOR = replyInfor.payload;
  // get data of comment article
  req.body.CMT_ARTICLE_INFOR = await articleModel
    .getCommentByCmtId(replyInfor.payload.cmtId)
    .then((data) => {
      data.payload._id = data.payload._id.toString();
      return data.payload;
    });
  // // get data of article
  req.body.ARTICLE_INFOR = await statusAndArticleModel
    .getPostById(replyInfor.payload.articleId)
    .then((data) => {
      data.payload[0]._id = data.payload[0]._id.toString();
      return data.payload[0];
    });

  next();
  return;
}

// middleware tiền xử lý khi toggle upvote bài viết chia sẻ trạng thái
async function preProcessUpVoteArticle(req, res, next) {
  const { article_id } = req.body;
  const userId = parseInt(req.auth_decoded.ma_nguoi_dung);
  const hasUpVoted = await articleHelper.hasUserUpVotedArticle(
    userId,
    article_id
  );
  // user has already upvote the article
  if (hasUpVoted) {
    req.body.action = "REMOVE_UPVOTE";
    next();
    return;
  }
  const hasDownVoted = await articleHelper.hasUserDownVotedArticle(
    userId,
    article_id
  );
  // user has already downvote the article
  if (hasDownVoted) {
    req.body.action = "REMOVE_DOWNVOTE_BEFORE_UPVOTE";
    next();
    return;
  }
  req.body.action = "JUST_UPVOTE";
  next();
  return;
}

// middleware tiền xử lý khi toggle downvote bài viết chia sẻ trạng thái
async function preProcessDownVoteArticle(req, res, next) {
  const { article_id } = req.body;
  const userId = parseInt(req.auth_decoded.ma_nguoi_dung);
  const hasDownVoted = await articleHelper.hasUserDownVotedArticle(
    userId,
    article_id
  );
  // user has already downvote the article
  if (hasDownVoted) {
    req.body.action = "REMOVE_DOWNVOTE";
    next();
    return;
  }
  const hasUpVoted = await articleHelper.hasUserUpVotedArticle(
    userId,
    article_id
  );
  // user has already upvote the article
  if (hasUpVoted) {
    req.body.action = "REMOVE_UPVOTE_BEFORE_DOWNVOTE";
    next();
    return;
  }
  req.body.action = "JUST_DOWNVOTE";
  next();
  return;
}

// tiền xử lý khi add comment vào bài viết chia sẻ trạng thái
async function preProcessAddCmtArticle(req, res, next) {
  const comment = req.body.comment;
  if (typeof comment != "string" || comment.trim() == "") {
    res
      .status(400)
      .json(new Response(400, [], "Bình luận không được để trống", 300, 300));
    return;
  }
  next();
  return;
}

// tiền xử lý khi thêm phải hồi vào bình luận của bài viết chia sẻ trạng thái
async function preProcessAddReplyCmt(req, res, next) {
  const reply = req.body.reply;
  if (typeof reply != "string" || reply.trim() == "") {
    res
      .status(400)
      .json(new Response(400, [], "Phải hồi không được để trống", 300, 300));
    return;
  }
  next();
}

// tiền xử lý khi cập nhậtphản hồi của bình luận
async function preProcessUpdateReply(req, res, next) {
  const content = req.body.content;
  const oldReplyInfor = req.body.REPLY_CMT_ARTICLE_INFOR;
  if (req.auth_decoded.ma_nguoi_dung != oldReplyInfor.replyBy) {
    res
      .status(400)
      .json(
        new Response(400, [], "Không có quyền chỉnh sủa phản hồi", 300, 300)
      );
    return;
  } else if (typeof content != "string" || content.trim() == "") {
    res
      .status(400)
      .json(new Response(400, [], "Nội dung không được để trống", 300, 300));
    return;
  }
  next();
}

async function preProcessUpdateComment(req, res, next) {
  const { content } = req.body;
  const oldCmtInfor = req.body.CMT_ARTICLE_INFOR;
  if (req.auth_decoded.ma_nguoi_dung != oldCmtInfor.commentBy) {
    res
      .status(400)
      .json(
        new Response(400, [], "Không có quyền chỉnh sủa bình luận", 300, 300)
      );
    return;
  } else if (typeof content != "string" || content.trim() == "") {
    res
      .status(400)
      .json(new Response(400, [], "Nội dung không được để trống", 300, 300));
    return;
  }
  next();
}

async function preProcessDeleteReply(req, res, next) {
  const postInfor = req.body.ARTICLE_INFOR;
  const oldReplyInfor = req.body.REPLY_CMT_ARTICLE_INFOR;
  // kiểm tra quyền xóa phản hồi
  if (
    req.auth_decoded.ma_nguoi_dung != oldReplyInfor.replyBy &&
    req.auth_decoded.ma_nguoi_dung != postInfor.owner_id
  ) {
    res
      .status(400)
      .json(new Response(400, [], "Không có quyền xóa phản hồi", 300, 300));
    return;
  }
  next();
  return;
}

async function preProcessDeleteComment(req, res, next) {
  const postInfor = req.body.ARTICLE_INFOR;
  const cmtBeforeDelete = req.body.CMT_ARTICLE_INFOR;
  // kiểm tra quyền xóa bình luận
  if (
    req.auth_decoded.ma_nguoi_dung != cmtBeforeDelete.commentBy &&
    req.auth_decoded.ma_nguoi_dung != postInfor.owner_id
  ) {
    res
      .status(400)
      .json(new Response(400, [], "Không có quyền xóa bình luận", 300, 300));
    return;
  }
  next();
  return;
}

async function preProcessDeleteArticle(req, res, next) {
  const postInfor = req.body.ARTICLE_INFOR;
  // kiểm tra quyền xóa bài viết
  if (req.auth_decoded.ma_nguoi_dung != postInfor.owner_id) {
    res
      .status(400)
      .json(new Response(400, [], "Không có quyền xóa bài viết", 300, 300));
    return;
  }
  next();
  return;
}

async function preProcessGetCmtByIndex(req, res, next) {
  const VALID_PARAM = "tham số không hợp lệ";
  let { article_id, index, num } = req.body;
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
    switch (error.message) {
      case VALID_PARAM:
        res.status(400).json(new Response(400, [], VALID_PARAM, 300, 300));
        return;

      default:
        res.status(400).json(new Response(400, [], error.message, 300, 300));
        return;
    }
  }
  next();
}

async function preProcessEditArticle(req, res, next) {
  const articleBeforeEdit = req.body.ARTICLE_INFOR;
  const userId = req.auth_decoded.ma_nguoi_dung;
  if (userId != articleBeforeEdit.owner_id) {
    res
      .status(400)
      .json(
        new Response(
          400,
          [],
          "Bạn không có quyền chỉnh sửa bài viết này",
          300,
          300
        )
      );
    return;
  }
  next();
}

const prePageingForArticle = async (req, res, next) => {
  const INVALID_PARAMS = "Tham số không hợp lệ";
  let { index, num } = req.body;

  if (
    typeof index != "undefined" &&
    index != null &&
    Number.isNaN(parseInt(index))
  ) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  if (typeof num != "undefined" && num != null && Number.isNaN(parseInt(num))) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  index = typeof index == "number" ? parseInt(index) : 0;
  num = typeof num == "number" ? parseInt(num) : undefined;
  if (typeof num == "number" && num < 0) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  if (typeof index == "number" && index < 0) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  req.body.num = num;
  req.body.index = index;
  next();
};

const preFilterArticleMid = async (req, res, next) => {
  const INVALID_PARAMS = "Tham số không hợp lệ";
  let { searchKey, index, num, tags } = req.body;
  // console.log("\n\nbefore");
  // console.log({ searchKey, index, num, tags });
  // kiểm tra kiểu của searchkey
  if (
    typeof searchKey != undefined &&
    searchKey != null &&
    typeof searchKey != "string"
  ) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  // kiểm tra kiểu của index
  if (
    typeof index != "undefined" &&
    index != null &&
    Number.isNaN(parseInt(index))
  ) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  // kiểm tra kiểu của num
  if (typeof num != "undefined" && num != null && Number.isNaN(parseInt(num))) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  // kiểm tra kiểu của tags
  if (typeof tags != "undefined" && tags != null && !Array.isArray(tags)) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }

  index = typeof index == "number" ? parseInt(index) : 0;
  num = typeof num == "number" ? parseInt(num) : undefined;
  if (typeof num == "number" && num < 0) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  if (typeof index == "number" && index < 0) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  tags =
    typeof tags == "undefined" || tags == null
      ? undefined
      : tags.map((tag) => tag.toUpperCase().trim());

  if (typeof tags == "undefined") req.body.tags = tags;
  else req.body.tags = await articleHelper.filterValidCategoryTags(tags);
  req.body.searchKey =
    typeof searchKey == "undefined" || searchKey == null
      ? undefined
      : searchKey.trim();
  req.body.num = num;
  req.body.index = index;
  // console.log("\n\nafter");
  // console.log({
  //   searchKey: req.body.searchKey,
  //   index: req.body.index,
  //   num: req.body.num,
  //   tags: req.body.tags,
  // });
  next();
};

const preFilterArticleMid_2 = async (req, res, next) => {
  const INVALID_PARAMS = "Tham số không hợp lệ";
  const SORT_TYPES = [
    "TIME_NEWEST_TO_OLDEST",
    "TIME_OLDEST_TO_NEWEST",
    "NUM_OF_COMMENT_DESC",
    "NUM_OF_COMMENT_ASC",
    "SCORE_DESC",
    "SCORE_ASC",
  ];
  let { searchKey, index, num, tags, sortBy, authorName } = req.body;
  // kiểm tra kiểu của searchkey
  if (
    typeof searchKey != undefined &&
    searchKey != null &&
    typeof searchKey != "string"
  ) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  // kiểm tra kiểu của index
  if (
    typeof index != "undefined" &&
    index != null &&
    Number.isNaN(parseInt(index))
  ) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  // kiểm tra kiểu của num
  if (typeof num != "undefined" && num != null && Number.isNaN(parseInt(num))) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  // kiểm tra kiểu của tags
  if (typeof tags != "undefined" && tags != null && !Array.isArray(tags)) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  // kiểm tra kiểu của sortBy
  if (
    typeof sortBy != "undefined" &&
    sortBy != null &&
    typeof sortBy != "string"
  ) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  // kiểm tra kiểu của authorName
  if (
    typeof authorName != "undefined" &&
    authorName != null &&
    typeof authorName != "string"
  ) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }

  // xử lý giá trị===============================================
  index = typeof index == "number" ? parseInt(index) : 0;
  num = typeof num == "number" ? parseInt(num) : undefined;
  if (typeof num == "number" && num < 0) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  if (typeof index == "number" && index < 0) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }

  if (typeof sortBy == "undefined" || sortBy == null || sortBy == "") {
    sortBy = "TIME_NEWEST_TO_OLDEST";
  } else if (!SORT_TYPES.includes(sortBy.toUpperCase())) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  } else sortBy = sortBy.toUpperCase();

  authorName =
    typeof authorName == "undefined" ||
    authorName == null ||
    authorName.trim() == ""
      ? ""
      : authorName.trim();
  const authorIds = await getListUserIdsWhenTenContain(authorName).then(
    (data) => data.payload
  );

  tags =
    typeof tags == "undefined" || tags == null
      ? undefined
      : tags.map((tag) => tag.toUpperCase().trim());

  if (typeof tags == "undefined") req.body.tags = tags;
  else req.body.tags = await articleHelper.filterValidCategoryTags(tags);
  req.body.searchKey =
    typeof searchKey == "undefined" || searchKey == null
      ? undefined
      : searchKey.trim();
  req.body.sortBy = sortBy;
  req.body.num = num;
  req.body.index = index;
  req.body.authorName = authorName;
  req.body.authorIds = authorIds;

  next();
};

const navigateToSuitableFilterArricleMid = async (req, res, next) => {
  const { searchKey, tags, index, num } = req.body;
  req.body.FILTER_ACTION = "";
  if (
    (typeof searchKey == "undefined" || searchKey == "") &&
    (typeof tags == "undefined" || tags.length == 0)
  ) {
    req.body.FILTER_ACTION = "JUST_PAGING_BY_INDEX_AND_NUM";
    next();
    return;
  } else if (
    typeof searchKey != "undefined" &&
    searchKey != "" &&
    (typeof tags == "undefined" || tags.length == 0)
  ) {
    req.body.FILTER_ACTION = "JUST_SEARCH_BY_TITLE_AND_NO_TAGS";
    next();
    return;
  } else if (
    (typeof searchKey == "undefined" || searchKey == "") &&
    typeof tags != "undefined" &&
    tags.length > 0
  ) {
    req.body.FILTER_ACTION = "JUST_FILTER_BY_TAGS_AND_NO_SEARCH";
    next();
    return;
  } else {
    req.body.FILTER_ACTION = "FILTER_BY_TAGS_AND_SEARCH";
    next();
    return;
  }
};

const preProcessReport = async (req, res, next) => {
  let { report_Reason } = req.body;
  report_Reason = report_Reason || "";
  req.body.report_Reason = report_Reason.trim();
  // res.send({ report_Reason: req.body.report_Reason });
  // return;
  next();
};

const navigateToSuitableFilterArricleMid_2 = async (req, res, next) => {
  const { searchKey, tags, index, num, sortBy, authorIds, authorName } =
    req.body;
  const FILTER_PARAMS = {
    type:
      sortBy == "SCORE_DESC" || sortBy == "SCORE_ASC" ? "AGGREGATE" : "FIND",
    filterObj: { postType: articleComposStructure.Article.type },
    index: index,
    num: num,
    scoreObj: undefined,
    sortObj: {},
  };

  if (typeof searchKey != "undefined" && searchKey != "") {
    const key = "title";
    const patern = new RegExp("\\b" + searchKey + "\\b", "i");
    const value = { $regex: patern };
    FILTER_PARAMS.filterObj[key] = value;
  }

  if (typeof tags != "undefined" && tags.length > 0) {
    const key = "categories";
    const value = { $all: tags };
    FILTER_PARAMS.filterObj[key] = value;
  }

  if (typeof authorIds != "undefined" && authorIds.length > 0) {
    const key = "owner_id";
    const value = {
      $in: authorIds,
    };
    FILTER_PARAMS.filterObj[key] = value;
  }
  if (sortBy.includes("TIME")) {
    const value = sortBy == "TIME_NEWEST_TO_OLDEST" ? -1 : 1;
    FILTER_PARAMS.sortObj.createAt = value;
    FILTER_PARAMS.sortObj._id = value;
  } else if (sortBy.includes("NUM_OF_COMMENT")) {
    FILTER_PARAMS.sortObj.numOfComment =
      sortBy == "NUM_OF_COMMENT_DESC" ? -1 : 1;
    FILTER_PARAMS.sortObj._id = -1;
  } else {
    FILTER_PARAMS.scoreObj = {
      $addFields: {
        score: { $subtract: ["$numOfUpVote", "$numOfDownVote"] },
      },
    };
    FILTER_PARAMS.sortObj.score = sortBy == "SCORE_DESC" ? -1 : 1;
    FILTER_PARAMS.sortObj._id = -1;
  }

  // res.json(FILTER_PARAMS);
  req.body.FILTER_PARAMS = FILTER_PARAMS;
  next();
  return;
};

const preFilterArticleMid_3 = async (req, res, next) => {
  const INVALID_PARAMS = "Tham số không hợp lệ";
  const SORT_TYPES = [
    "TIME_NEWEST_TO_OLDEST",
    "TIME_OLDEST_TO_NEWEST",
    "NUM_OF_COMMENT_DESC",
    "NUM_OF_COMMENT_ASC",
    "SCORE_DESC",
    "SCORE_ASC",
  ];
  let { searchKey, index, num, tags, sortBy, authorId } = req.body;
  // kiểm tra kiểu của searchkey
  if (
    typeof searchKey != undefined &&
    searchKey != null &&
    typeof searchKey != "string"
  ) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  // kiểm tra kiểu của index
  if (
    typeof index != "undefined" &&
    index != null &&
    Number.isNaN(parseInt(index))
  ) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  // kiểm tra kiểu của num
  if (typeof num != "undefined" && num != null && Number.isNaN(parseInt(num))) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  // kiểm tra kiểu của tags
  if (typeof tags != "undefined" && tags != null && !Array.isArray(tags)) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  // kiểm tra kiểu của sortBy
  if (
    typeof sortBy != "undefined" &&
    sortBy != null &&
    typeof sortBy != "string"
  ) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  // kiểm tra kiểu của authorId
  if (
    typeof authorId != "undefined" &&
    authorId != null &&
    authorId != "" &&
    Number.isNaN(parseInt(authorId))
  ) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }

  // xử lý giá trị===============================================
  index = typeof index == "number" ? parseInt(index) : 0;
  num = typeof num == "number" ? parseInt(num) : undefined;
  if (typeof num == "number" && num < 0) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }
  if (typeof index == "number" && index < 0) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  }

  if (typeof sortBy == "undefined" || sortBy == null || sortBy == "") {
    sortBy = "TIME_NEWEST_TO_OLDEST";
  } else if (!SORT_TYPES.includes(sortBy.toUpperCase())) {
    res.status(400).json(new Response(400, [], INVALID_PARAMS, 300, 300));
    return;
  } else sortBy = sortBy.toUpperCase();

  authorId = !Number.isNaN(parseInt(authorId)) ? parseInt(authorId) : undefined;
  // const authorIds = await getListUserIdsWhenTenContain(authorId).then(
  //   (data) => data.payload
  // );

  tags =
    typeof tags == "undefined" || tags == null
      ? undefined
      : tags.map((tag) => tag.toUpperCase().trim());

  if (typeof tags == "undefined") req.body.tags = tags;
  else req.body.tags = await articleHelper.filterValidCategoryTags(tags);
  req.body.searchKey =
    typeof searchKey == "undefined" || searchKey == null
      ? undefined
      : searchKey.trim();
  req.body.sortBy = sortBy;
  req.body.num = num;
  req.body.index = index;
  req.body.authorId = authorId;
  // req.body.authorIds = authorIds;

  next();
};

const navigateToSuitableFilterArricleMid_3 = async (req, res, next) => {
  const { searchKey, tags, index, num, sortBy, authorId } = req.body;
  const FILTER_PARAMS = {
    type:
      sortBy == "SCORE_DESC" || sortBy == "SCORE_ASC" ? "AGGREGATE" : "FIND",
    filterObj: { postType: articleComposStructure.Article.type },
    index: index,
    num: num,
    scoreObj: undefined,
    sortObj: {},
  };

  if (typeof searchKey != "undefined" && searchKey != "") {
    const key = "title";
    const patern = new RegExp("\\b" + searchKey + "\\b", "i");
    const value = { $regex: patern };
    FILTER_PARAMS.filterObj[key] = value;
  }

  if (typeof tags != "undefined" && tags.length > 0) {
    const key = "categories";
    const value = { $all: tags };
    FILTER_PARAMS.filterObj[key] = value;
  }

  if (typeof authorId == "number") {
    const key = "owner_id";
    const value = authorId;

    FILTER_PARAMS.filterObj[key] = value;
  }
  if (sortBy.includes("TIME")) {
    const value = sortBy == "TIME_NEWEST_TO_OLDEST" ? -1 : 1;
    FILTER_PARAMS.sortObj.createAt = value;
    FILTER_PARAMS.sortObj._id = value;
  } else if (sortBy.includes("NUM_OF_COMMENT")) {
    FILTER_PARAMS.sortObj.numOfComment =
      sortBy == "NUM_OF_COMMENT_DESC" ? -1 : 1;
    FILTER_PARAMS.sortObj._id = -1;
  } else {
    FILTER_PARAMS.scoreObj = {
      $addFields: {
        score: { $subtract: ["$numOfUpVote", "$numOfDownVote"] },
      },
    };
    FILTER_PARAMS.sortObj.score = sortBy == "SCORE_DESC" ? -1 : 1;
    FILTER_PARAMS.sortObj._id = -1;
  }

  // console.log(FILTER_PARAMS);
  // res.json(FILTER_PARAMS);
  req.body.FILTER_PARAMS = FILTER_PARAMS;
  next();
  return;
};

module.exports = {
  preProcessAddArtticle,
  checkArticleExistMid,
  checkCommentExistMid,
  preProcessUpVoteArticle,
  preProcessDownVoteArticle,
  preProcessAddCmtArticle,
  preProcessAddReplyCmt,
  checkReplyExistMid,
  preProcessUpdateReply,
  preProcessUpdateComment,
  preProcessDeleteReply,
  preProcessDeleteComment,
  preProcessDeleteArticle,
  preProcessGetCmtByIndex,
  preProcessEditArticle,
  prePageingForArticle,
  preFilterArticleMid,
  navigateToSuitableFilterArricleMid,
  navigateToSuitableFilterArricleMid_2,
  preProcessReport,
  preFilterArticleMid_2,
  preFilterArticleMid_3,
  navigateToSuitableFilterArricleMid_3,
  // preProcessFilterArticle_1,
  // preProcessFilterArticle_2,
};
