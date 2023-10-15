const { normUserNamespace } = require('./index');
const StatusPostModel = require('../../models/BaiViet/StatusPostModel');
const followModel = require('../../models/theodoi/followModel');
const UtilsHelper = require('../../utils/UtilsHelper');
const userHelper = require('../../utils/userHelper');
const { getPrivateRoomNameOfUser } = require('../../utils/socketHelper');
class StatusPostEventManagement {
	// ======================== msg ========================
	static GET_LIKE_POST_NOTI_MSG(user_like_name, onwer_name = 'Bạn') {
		return `${user_like_name} đã thích bài viết của ${onwer_name}`;
	}

	// ======================== action =======================
	static async sendLikePostNotiToAllFollower(
		sender_id,
		followed_obj_id,
		owner_id = undefined
	) {
		// get owner_id if not provided
		if (typeof owner_id == 'undefined') {
			owner_id = await StatusPostModel.getOnwerIdOfPost(followed_obj_id);
		}
		const followers_infor = await followModel.getFollowInforOfStatusPost(
			followed_obj_id
		);
		// end if no follower
		if (followers_infor.length == 0) return;

		const user_id_list = UtilsHelper.filter_keys_in_list_Objs(followers_infor, [
			'follower_Id',
		]).map((follower) => parseInt(follower.follower_Id));
		let userInforList = await userHelper.getUserPublicInforByListIds(
			user_id_list
		);
		userInforList = UtilsHelper.filter_keys_in_list_Objs(userInforList, [
			'ma_nguoi_dung',
			'ten',
			'tai_khoan',
		]);

    // all follower
		userInforList = userInforList.map((user) => {
			return { ...user, isOwner: user.ma_nguoi_dung == owner_id };
		});

    // follower but not a onwer
		let NonOwnFollowerList = userInforList.filter((user) => !user.isOwner);
		console.log(NonOwnFollowerList);
    // sender infor 
		let sender_infor = await userHelper.getUserPublicInforByUserId(sender_id);
		sender_infor = UtilsHelper.filter_keys_in_Obj(sender_infor, [
			'ma_nguoi_dung',
			'ten',
			'tai_khoan',
		]);
		let owner_infor = await userHelper.getUserPublicInforByUserId(owner_id);
		owner_infor = UtilsHelper.filter_keys_in_Obj(owner_infor, [
			'ma_nguoi_dung',
			'ten',
			'tai_khoan',
		]);
		NonOwnFollowerList = NonOwnFollowerList.map((user) => {
			return {
				...user,
				msg: StatusPostEventManagement.GET_LIKE_POST_NOTI_MSG(
					`${sender_infor.ten}@${sender_infor.tai_khoan}`,
					`${owner_infor.ten}@${owner_infor.tai_khoan}`
				),
			};
		});
		// send for non onwer follower
		const privateRoomNameOfUser = NonOwnFollowerList.map((user) =>
			getPrivateRoomNameOfUser(user.ma_nguoi_dung)
		);
		// console.log(privateRoomNameOfUser);
		const sockets_to_send = privateRoomNameOfUser.reduce(function (
			acc,
			room_name_of_user
		) {
			return acc.to(room_name_of_user);
		},
		normUserNamespace);
		sockets_to_send.emit('__TEST__', NonOwnFollowerList[0].msg);
		// send for owner
		const roomNameOfOwner = getPrivateRoomNameOfUser(owner_id);
		normUserNamespace
			.to(roomNameOfOwner)
			.emit('__TEST__', 'đã like rồi nha ahihi');
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
