const postModel = require('../models/BaiViet/StatusPostModel');

async function hasUserLikeTheStatusPost(user_id, post_id) {
	return await postModel
		.getLikeThePostInfor(user_id, post_id)
		.then((data) => {
			return data.payload.length > 0 ? true : false;
		});
}

async function hasUserLikeTheCmtStatusPost(user_id, cmt_id) {
	return await postModel
		.getLikeCmtPostInfor(user_id, cmt_id)
		.then((data) => {
			return data.payload.length > 0 ? true : false;
		});
}


// (async () => {
// 	const data = await hasUserLikeTheCmtStatusPost(7,'6501d6b7a7499cde4c143603')
// 	console.log(data);
// })();

module.exports = {
	hasUserLikeTheStatusPost,
	hasUserLikeTheCmtStatusPost,
};
