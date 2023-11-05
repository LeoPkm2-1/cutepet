const articleComposStructure = require("../../models/BaiViet/articleComposStructure");
const articleModel = require("../../models/BaiViet/articleModel");
const statusAndArticleModel = require("../../models/BaiViet/StatusAndArticleModel");
const followhelper = require("../../utils/theodoiHelper");
const { Response } = require("../../utils");

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
        .getUpVoteOfArticleByUser(user_id, article_id)
        .then((data) => data.payload);
      // tăng số lượng upvote của bài viết
      await articleModel.updateNumOfUpVoteArticle(article_id, numOfUpVote + 1);

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
        .getUpVoteOfArticleByUser(user_id, article_id)
        .then((data) => data.payload);
      // === 2.3. tăng số lượng upvote của bài viết
      await articleModel.updateNumOfUpVoteArticle(article_id, numOfUpVote + 1);
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
        .getDownVoteOfArticleByUser(user_id, article_id)
        .then((data) => data.payload);
      // tăng số lượng downvote của bài viết
      await articleModel.updateNumOfDownVoteArticle(
        article_id,
        numOfDownVote + 1
      );

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
        .getDownVoteOfArticleByUser(user_id, article_id)
        .then((data) => data.payload);
      // === 2.3. tăng số lượng downvote của bài viết
      await articleModel.updateNumOfDownVoteArticle(
        article_id,
        numOfDownVote + 1
      );
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
  const insertedReply = await articleModel.getCommentByCmtId(idOfReply);

  res.status(200).json(new Response(200, insertedReply.payload, ""));
}

module.exports = {
  addArticleControler,
  toggleUpVoteArticleControler,
  toggleDownVoteArticleControler,
  addCommentController,
  addReplyController,
};
