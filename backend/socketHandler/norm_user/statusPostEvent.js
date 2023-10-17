const { normUserNamespace } = require('./index');
const StatusPostModel = require('../../models/BaiViet/StatusPostModel');
const UtilsHelper = require('../../utils/UtilsHelper');
const userHelper = require('../../utils/userHelper');
const socketHelper = require('../../utils/socketHelper');

const statusPostEventStruture = require('./statusPostEventStructure');
const statusPostNotificationModel = require('./../../models/thongbao/statusPost');
class StatusPostEventManagement {
	static async sendLikePostNotiToAllFollower({
		allFollowerInforList,
		owner_infor,
		sender_infor,
		follower_not_sender_onwer,
		isOwnerFollowing,
		isSenderFollowing,
	}) {
		// don't notification when no one follow post
		if (allFollowerInforList == null) return;
		// 1. send notification to owner when he/she is following post
		if (isOwnerFollowing) {
			const notiInforForOwner = new statusPostEventStruture.LikePostEvent(
				sender_infor,
				owner_infor,
				new Date(),
				true
			);
			const socketRoomNameOfOwner = socketHelper.getPrivateRoomNameOfUser(
				owner_infor.ma_nguoi_dung
			);
			normUserNamespace
				.to(socketRoomNameOfOwner)
				.emit(
					statusPostEventStruture.LikePostEvent.getEventName(),
					notiInforForOwner
				);
		}

		// 2. send notification to other follower who are not sender and owner
		if (follower_not_sender_onwer.length > 0) {
			const notiInforForOthers = new statusPostEventStruture.LikePostEvent(
				sender_infor,
				owner_infor,
				new Date(),
				false
			);
			const socketRoomNameOfOthers = follower_not_sender_onwer.map((user) =>
				socketHelper.getPrivateRoomNameOfUser(user.ma_nguoi_dung)
			);
			const socketOfOthers = socketRoomNameOfOthers.reduce(
				(acc, room_name_of_user) => acc.to(room_name_of_user),
				normUserNamespace
			);
			socketOfOthers.emit(
				statusPostEventStruture.LikePostEvent.getEventName(),
				notiInforForOthers
			);
		}
	}



	static async sendCommentPostNotiToAllFollower({
		allFollowerInforList,
		owner_infor,
		sender_infor,
		follower_not_sender_onwer,
		isOwnerFollowing,
		isSenderFollowing,
	}) {
		// don't notification when no one follow post
		if (allFollowerInforList == null) return;
		// 1. send notification to owner when he/she is following post
		if (isOwnerFollowing) {
			const notiInforForOwner = new statusPostEventStruture.CommentPostEvent(
				sender_infor,
				owner_infor,
				new Date(),
				true
			);
			const socketRoomNameOfOwner = socketHelper.getPrivateRoomNameOfUser(
				owner_infor.ma_nguoi_dung
			);
			normUserNamespace
				.to(socketRoomNameOfOwner)
				.emit(
					statusPostEventStruture.CommentPostEvent.getEventName(),
					notiInforForOwner
				);
		}

		// 2. send notification to other follower who are not sender and owner
		if (follower_not_sender_onwer.length > 0) {
			const notiInforForOthers = new statusPostEventStruture.CommentPostEvent(
				sender_infor,
				owner_infor,
				new Date(),
				false
			);
			const socketRoomNameOfOthers = follower_not_sender_onwer.map((user) =>
				socketHelper.getPrivateRoomNameOfUser(user.ma_nguoi_dung)
			);
			const socketOfOthers = socketRoomNameOfOthers.reduce(
				(acc, room_name_of_user) => acc.to(room_name_of_user),
				normUserNamespace
			);
			socketOfOthers.emit(
				statusPostEventStruture.CommentPostEvent.getEventName(),
				notiInforForOthers
			);
		}
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