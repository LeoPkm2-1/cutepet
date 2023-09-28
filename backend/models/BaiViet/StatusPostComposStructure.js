class StatusPost {
	constructor(text, media, owner_id) {
		this.text = text;
		this.postType = 'status';
		this.media = media;
		this.createAt = new Date();
		this.numOfLike = 0;
		this.numOfComment = 0;
		this.modifiedAt = null;
		this.owner_id = owner_id;
	}
}

class CommentPost {
	constructor(post_id, comment, commentBy) {
		this.postId = post_id;
		this.comment = comment;
		this.commentBy = commentBy;
		this.commentAt = new Date();
		this.numOfLike = 0;
		this.numOfReply = 0;
		this.modifiedAt = null;
	}
}


class ReplyComment{
  constructor(cmt_id,reply,replyBy){
		this.cmtId= cmt_id;
		this.reply=reply;
		this.replyBy=replyBy;
		this.replyAt=new Date();
		this.numOfLike=0;
		this.modifiedAt= null;
  }
}
module.exports = { StatusPost, CommentPost,ReplyComment };
