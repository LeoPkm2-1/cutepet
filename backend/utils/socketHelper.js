const followerModel = require('../models/theodoi/followModel');
const userHelper = require('./userHelper');
const UtilsHelper = require('./UtilsHelper');
function getPrivateRoomNameOfUser(userId) {
	return `private-user_${userId}`;
}

async function getStatusPostFollowerAndFilter(statusPost_Id) {
  
	const followers_infor = await followerModel.getFollowInforOfStatusPost(
		statusPost_Id
	);
	// end if no follower
	if (followers_infor.length == 0) return [];
	const user_id_list = followers_infor.map((follower) =>
		parseInt(follower.follower_Id)
	);
	console.log('user_id_list', user_id_list);
	let userInforList = await userHelper.getUserPublicInforByListIds(
		user_id_list
	);
	userInforList = UtilsHelper.filter_keys_in_list_Objs(userInforList, [
		'ma_nguoi_dung',
		'ten',
		'tai_khoan',
		'anh',
	]);
  return userInforList
}

// (async () => {
// 	const data = await getStatusPostFollowerAndFilter('652a98e062b2b7eaf6d45126');
// 	console.log(data);
// })();

module.exports = { getPrivateRoomNameOfUser,getStatusPostFollowerAndFilter };
