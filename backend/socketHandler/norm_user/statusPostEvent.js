const { normUserNamespace } = require('./index');
const StatusPostModel = require('../../models/BaiViet/StatusPostModel');
const followModel = require('../../models/theodoi/followModel');
const UtilsHelper = require('../../utils/UtilsHelper');
const userHelper = require('../../utils/userHelper');
const socketHelper = require('../../utils/socketHelper');

const statusPostEventStruture = require('./statusPostEventStructure');

class StatusPostEventManagement {
	static async sendLikePostNotiToAllFollower(
		sender_id,
		followed_obj_id,
		owner_id = undefined,
		likeAt = new Date()
	) {
		// get owner_id if not provided
		if (typeof owner_id == 'undefined')
			owner_id = await StatusPostModel.getOnwerIdOfPost(followed_obj_id);

		// get all follower
		let userInforList = await socketHelper.getStatusPostFollowerAndFilter(
			followed_obj_id
		);
		if (userInforList.length == 0) return;

		// follower don't contain sender and onwer.
		const follower_not_sender_onwer = userInforList.filter(
			(user) =>
				user.ma_nguoi_dung != sender_id && user.ma_nguoi_dung != owner_id
		);
		console.log('\n\nfollower_not_sender_onwer', follower_not_sender_onwer);

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
			console.log('\n\nsenderInfor', senderInfor);
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
		// console.log('\n\nownerInfor', ownerInfor);

		// send nofitication to follower who is not sender and owner
		const privateRoomNameOfUser = follower_not_sender_onwer.map((user) =>
			socketHelper.getPrivateRoomNameOfUser(user.ma_nguoi_dung)
		);
		const socketOfNonSenderAndOnwer = privateRoomNameOfUser.reduce(
			(acc, room_name_of_user) => acc.to(room_name_of_user),
			normUserNamespace
		);
		socketOfNonSenderAndOnwer.emit(
			statusPostEventStruture.LikePostEvent.getEventName(),
			new statusPostEventStruture.LikePostEvent(
				senderInfor,
				ownerInfor,
				likeAt,
				false
			)
		);
		//  send to owner
		const roomNameOfOwner = socketHelper.getPrivateRoomNameOfUser(owner_id);
		normUserNamespace
			.to(roomNameOfOwner)
			.emit(
				statusPostEventStruture.LikePostEvent.getEventName(),
				new statusPostEventStruture.LikePostEvent(
					senderInfor,
					ownerInfor,
					likeAt,
					true
				)
			);
	}

	static async sendCommentPostNotiToAllFollower(
		comment_user_id,
		status_post_id,
		owner_post_id = undefined,
		comment_At = new Date()
	) {
		if (typeof owner_post_id == 'undefined')
			owner_post_id = await StatusPostModel.getOnwerIdOfPost(status_post_id);
		// get all follower
		let userInforList = await socketHelper.getStatusPostFollowerAndFilter(
			status_post_id
		);
		if (userInforList.length == 0) return;

		// follower don't contain commenter and onwer.
		const follower_not_commenter_onwer = userInforList.filter(
			(user) =>
				user.ma_nguoi_dung != comment_user_id &&
				user.ma_nguoi_dung != owner_post_id
		);

		// commenter infor
		const commenterInfor = await userHelper
			.getUserPublicInforByUserId(comment_user_id)
			.then((user) =>
				UtilsHelper.filter_keys_in_Obj(user, [
					'ma_nguoi_dung',
					'ten',
					'tai_khoan',
					'anh',
				])
			);

		// post owner infor
		const postOwnerInfor = await userHelper
			.getUserPublicInforByUserId(owner_post_id)
			.then((user) =>
				UtilsHelper.filter_keys_in_Obj(user, [
					'ma_nguoi_dung',
					'ten',
					'tai_khoan',
					'anh',
				])
			);
		// send notification to follower who is not commenter and post_owner
		const privateRoomNameOfUser = follower_not_commenter_onwer.map((user) =>
			socketHelper.getPrivateRoomNameOfUser(user.ma_nguoi_dung)
		);
		const socketOfNonCommenterAndOnwer = privateRoomNameOfUser.reduce(
			(acc, room_name_of_user) => acc.to(room_name_of_user),
			normUserNamespace
		);

		socketOfNonCommenterAndOnwer.emit(
			statusPostEventStruture.CommentPostEvent.getEventName(),
			new statusPostEventStruture.CommentPostEvent(
				commenterInfor,
				postOwnerInfor,
				comment_At,
				false
			)
		);
		// send to post owner
		const roomNameOfOwner =
			socketHelper.getPrivateRoomNameOfUser(owner_post_id);
		normUserNamespace
			.to(roomNameOfOwner)
			.emit(
				statusPostEventStruture.CommentPostEvent.getEventName(),
				new statusPostEventStruture.CommentPostEvent(
					commenterInfor,
					postOwnerInfor,
					comment_At,
					true
				)
			);
	}

	constructor() {}
}

// ========================== EMIT ==========================
function test_broadcast_all() {
	const room_name = ['private-user_8', 'private-user_2', 'private-user_10'];
	// normUserNamespace.to(room_name[0]).emit('__TEST__', 'xin chào các bạn');
	const sockets_to_send = room_name.reduce(function (acc, room_name) {
		return acc.to(room_name);
	}, normUserNamespace);
	sockets_to_send.emit('__TEST__', 'đã like rồi nha ahihi');
	// emit to all
	// norm_userHandler.emit('LIKE_STATUS_POST', 'test_broadcast_all');
}

module.exports = { test_broadcast_all, StatusPostEventManagement };
