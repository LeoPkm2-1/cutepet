const StatusPostModel = require('../models/BaiViet/StatusPostModel');
const socketHelper = require('../utils/socketHelper');
const theodoiHelper = require('../utils/theodoiHelper');
const userHelper = require('../utils/userHelper');
const UtilsHelper = require('../utils/UtilsHelper');
const statusPostEventStruture = require('../socketHandler/norm_user/statusPostEventStructure');
const statusPostNotificationModel = require('../models/thongbao/statusPost');
const {
	StatusPostEventManagement,
} = require('../socketHandler/norm_user/statusPostEvent');

async function prepareUserBeforeHandleNotiForStatusPost(
	sender_id,
	followed_obj_id,
	owner_id
) {
	// get owner_id if not provided
	if (typeof owner_id == 'undefined')
		owner_id = await StatusPostModel.getOnwerIdOfPost(followed_obj_id);
	// prepare user data
	let userInforList = await socketHelper.getStatusPostFollowerAndFilter(
		followed_obj_id
	);
	// exit if dont have any follower
	if (userInforList.length == 0)
		return {
			allFollowerInforList: null, // don't have any follower
			owner_infor: null, // owner is not following so don't get infor
			sender_infor: null, // sender is not following so don't get infor
			post_infor: null, //post don't have follower so don't get infor
			follower_not_sender_onwer: null, // others is not following so don't get infor
			isOwnerFollowing: false, // owner is not following
			isSenderFollowing: false, //sender is not following
		};

	// follower don't contain sender and onwer.
	const follower_not_sender_onwer = userInforList.filter(
		(user) => user.ma_nguoi_dung != sender_id && user.ma_nguoi_dung != owner_id
	);

	// sender information
	const senderInfor = await userHelper
		.getUserPublicInforByUserId(sender_id)
		.then((user) =>
			UtilsHelper.filter_keys_in_Obj(user, [
				'ma_nguoi_dung',
				'ten',
				'tai_khoan',
				'anh',
			])
		);
	// owner information
	const ownerInfor = await userHelper
		.getUserPublicInforByUserId(owner_id)
		.then((user) =>
			UtilsHelper.filter_keys_in_Obj(user, [
				'ma_nguoi_dung',
				'ten',
				'tai_khoan',
				'anh',
			])
		);
	// is user following post
	const is_Owner_following_post = await theodoiHelper.hasUserFollowedStatusPost(
		followed_obj_id,
		owner_id
	);
	const is_Sender_following_post =
		await theodoiHelper.hasUserFollowedStatusPost(followed_obj_id, sender_id);
	let postInfor = await StatusPostModel.getPostById(followed_obj_id).then(
		(data) => data.payload[0]
	);

	postInfor = UtilsHelper.filter_keys_in_Obj(postInfor, [
		'_id',
		'postType',
		'text',
		'createAt',
	]);

	return {
		allFollowerInforList: userInforList, // all follower
		owner_infor: ownerInfor, // owner infor
		sender_infor: senderInfor, // sender infor
		post_infor: postInfor, // post infor
		follower_not_sender_onwer: follower_not_sender_onwer, // others who is following the post and not contain owner or sender
		isOwnerFollowing: is_Owner_following_post, // owner is following
		isSenderFollowing: is_Sender_following_post, //sender is following
	};
}

const notifyLikePost = async (
	sender_id,
	followed_obj_id,
	owner_id = undefined,
	likeAt = new Date()
) => {
	// get owner_id if not provided
	if (typeof owner_id == 'undefined')
		owner_id = await StatusPostModel.getOnwerIdOfPost(followed_obj_id);

	// prepare user data
	const {
		allFollowerInforList,
		owner_infor,
		sender_infor,
		post_infor,
		follower_not_sender_onwer,
		isOwnerFollowing,
		isSenderFollowing,
	} = await prepareUserBeforeHandleNotiForStatusPost(
		sender_id,
		followed_obj_id,
		owner_id
	);

	// exit if dont have any follower
	if (allFollowerInforList == null) return;
	//1. Store notification to database
	// 1.1 store notification infor for owner
	if (isOwnerFollowing) {
		const notiInforForOwner = new statusPostEventStruture.LikePostEvent(
			sender_infor,
			owner_infor,
			post_infor,
			likeAt,
			true
		);

		await statusPostNotificationModel.addLikePostNotification(
			owner_id,
			notiInforForOwner
		);
	}

	// 1.2 store notification infor for others
	if (follower_not_sender_onwer.length > 0) {
		const notiInforForOthers = new statusPostEventStruture.LikePostEvent(
			sender_infor,
			owner_infor,
			post_infor,
			likeAt,
			false
		);
		Promise.all(
			follower_not_sender_onwer.map(async (user) => {
				return await statusPostNotificationModel.addLikePostNotification(
					user.ma_nguoi_dung,
					notiInforForOthers
				);
			})
		);
	}
	// 2. send notification through socket
	StatusPostEventManagement.sendLikePostNotiToAllFollower({
		allFollowerInforList,
		owner_infor,
		sender_infor,
		post_infor,
		follower_not_sender_onwer,
		isOwnerFollowing,
		isSenderFollowing,
	});
};

const notifyCommentPost = async (
	commenter_id,
	statusPost_id,
	owner_id = undefined,
	commentAt = new Date()
) => {
	// get owner_id if not provided
	if (typeof owner_id == 'undefined')
		owner_id = await StatusPostModel.getOnwerIdOfPost(statusPost_id);
	// prepare user data
	const {
		allFollowerInforList,
		owner_infor,
		sender_infor,
		post_infor,
		follower_not_sender_onwer,
		isOwnerFollowing,
		isSenderFollowing,
	} = await prepareUserBeforeHandleNotiForStatusPost(
		commenter_id,
		statusPost_id,
		owner_id
	);
	// exit if dont have any follower
	if (allFollowerInforList == null) return;
	//1. Store notification to database
	// 1.1 store notification infor for owner
	if (isOwnerFollowing) {
		const notiInforForOwner = new statusPostEventStruture.CommentPostEvent(
			sender_infor,
			owner_infor,
			post_infor,
			commentAt,
			true
		);
		await statusPostNotificationModel.addCmtPostNotification(
			owner_id,
			notiInforForOwner
		);
	}
	// 1.2 store notification infor for others
	if (follower_not_sender_onwer.length > 0) {
		const notiInforForOthers = new statusPostEventStruture.CommentPostEvent(
			sender_infor,
			owner_infor,
			post_infor,
			commentAt,
			false
		);
		Promise.all(
			follower_not_sender_onwer.map(async (user) => {
				return await statusPostNotificationModel.addCmtPostNotification(
					user.ma_nguoi_dung,
					notiInforForOthers
				);
			})
		);
	}

	// 2. send notification through socket
	StatusPostEventManagement.sendCommentPostNotiToAllFollower({
		allFollowerInforList,
		owner_infor,
		sender_infor,
		post_infor,
		follower_not_sender_onwer,
		isOwnerFollowing,
		isSenderFollowing,
	});
};

async function prepareUserBeforeHandleNotiForCmtStatusPost(
	sender_id,
	comment_id,
	owner_comment_id
) {
	// get owner_id of comment if not provided
	if (typeof owner_comment_id == 'undefined')
		owner_comment_id = await StatusPostModel.getOnwerIdOfComment(comment_id);
	const comment_infor = await StatusPostModel.getCommentPostById(
		comment_id
	).then((data) => data.payload[0]);
	const postId = comment_infor.postId;
	const post_infor = await StatusPostModel.getPostById(postId).then(
		(data) => data.payload[0]
	);
	// prepare user data
	//       all follower in status post
	const allFollowerInforList =
		await socketHelper.getStatusPostFollowerAndFilter(postId);
	// exit if dont have any follower
	if (allFollowerInforList.length == 0)
		return {
			allFollowerInforList: null, // don't have any follower
			commenterInfor: null, // owner of comment is not following so don't get infor
			senderInfor: null, // sender is not following so don't get infor
			postOwnerInfor: null, // owner of post is not following so don't get infor
			followerNotSenderCommenterPostOwner: null, // others is not following so don't get infor
			isCommenterFollowing: false, // owner of comment is not following
			isSenderFollowing: false, //sender is not following
			isPostOwnerFollowing: false, // owner of post is not following
		};

	const followerNotSenderCommenterPostOwner = allFollowerInforList.filter(
		(user) =>
			user.ma_nguoi_dung != sender_id &&
			user.ma_nguoi_dung != owner_comment_id &&
			user.ma_nguoi_dung != post_infor.owner_id
	);

	//        sender information
	const senderInfor = await userHelper
		.getUserPublicInforByUserId(sender_id)
		.then((user) =>
			UtilsHelper.filter_keys_in_Obj(user, [
				'ma_nguoi_dung',
				'ten',
				'tai_khoan',
				'anh',
			])
		);
	//      owner of comment information
	const commenterInfor = await userHelper
		.getUserPublicInforByUserId(owner_comment_id)
		.then((user) =>
			UtilsHelper.filter_keys_in_Obj(user, [
				'ma_nguoi_dung',
				'ten',
				'tai_khoan',
				'anh',
			])
		);
	// 		owner of post information
	const postOwnerInfor = await userHelper
		.getUserPublicInforByUserId(post_infor.owner_id)
		.then((user) =>
			UtilsHelper.filter_keys_in_Obj(user, [
				'ma_nguoi_dung',
				'ten',
				'tai_khoan',
				'anh',
			])
		);
	// is commenter following post
	const isCommenterFollowing = await theodoiHelper.hasUserFollowedStatusPost(
		postId,
		owner_comment_id
	);
	// is sender following post
	const isSenderFollowing = await theodoiHelper.hasUserFollowedStatusPost(
		postId,
		sender_id
	);
	// is owner of post following post
	const isPostOwnerFollowing = await theodoiHelper.hasUserFollowedStatusPost(
		postId,
		post_infor.owner_id
	);
	return {
		allFollowerInforList, // all follower
		commenterInfor, // owner of comment infor
		senderInfor, // sender infor
		postOwnerInfor, // owner of post infor
		followerNotSenderCommenterPostOwner, // others who is following the post and not contain owner or sender
		isCommenterFollowing, // owner of comment is following
		isSenderFollowing, //sender is following
		isPostOwnerFollowing, // owner of post is following
	};
}

const notifyLikeComment = async (
	userLike_id,
	comment_id,
	owner_comment_id = undefined,
	likeAt = new Date()
) => {
	// get owner_id of comment if not provided
	if (typeof owner_comment_id == 'undefined')
		owner_comment_id = await StatusPostModel.getOnwerIdOfComment(comment_id);
	const comment_infor = await StatusPostModel.getCommentPostById(
		comment_id
	).then((data) => data.payload[0]);
	const postId = comment_infor.postId;
	const post_infor = await StatusPostModel.getPostById(postId).then((data) =>
		UtilsHelper.filter_keys_in_Obj(data.payload[0], ['_id', 'postType'])
	);

	// prepare user data
	const {
		allFollowerInforList,
		commenterInfor,
		senderInfor,
		postOwnerInfor,
		followerNotSenderCommenterPostOwner,
		isCommenterFollowing,
		isSenderFollowing,
		isPostOwnerFollowing,
	} = await prepareUserBeforeHandleNotiForCmtStatusPost(
		userLike_id,
		comment_id,
		owner_comment_id
	);
	// exit if dont have any follower
	if (allFollowerInforList == null) return;
	//1. Store notification to database
	// 1.1 store notification infor for commenter
	if (isCommenterFollowing) {
		const notiInforForCommenter = new statusPostEventStruture.LikeCommentEvent(
			senderInfor,
			commenterInfor,
			likeAt,
			true,
			{
				...post_infor,
				postOwnerInfor,
			}
		);
		await statusPostNotificationModel.addLikeCommentNotification(
			commenterInfor.ma_nguoi_dung,
			notiInforForCommenter
		);
	}
	// 1.2 store notification infor for post owner
	if (isPostOwnerFollowing) {
		const notiInforForPostOwner = new statusPostEventStruture.LikeCommentEvent(
			senderInfor,
			commenterInfor,
			likeAt,
			false,
			{
				...post_infor,
				postOwnerInfor,
			}
		);
		await statusPostNotificationModel.addLikeCommentNotification(
			postOwnerInfor.ma_nguoi_dung,
			notiInforForPostOwner
		);
	}

	// 1.3 store notfification for others
	if (followerNotSenderCommenterPostOwner.length > 0) {
		const notiInforForOthers = new statusPostEventStruture.LikeCommentEvent(
			senderInfor,
			commenterInfor,
			likeAt,
			false,
			{
				...post_infor,
				postOwnerInfor,
			}
		);
		Promise.all(
			followerNotSenderCommenterPostOwner.map(async (user) => {
				return await statusPostNotificationModel.addLikeCommentNotification(
					user.ma_nguoi_dung,
					notiInforForOthers
				);
			})
		);
	}
	// send notification
};

module.exports = {
	notifyLikePost,
	notifyCommentPost,
};
