const postModel = require('../models/postModel');

async function hasUserLikeTheStatusPost(user_id, post_id) {
	return await postModel
		.getUserLikeThePostInfor(user_id, post_id)
		.then((data) => {
			return data.payload.length > 0 ? true : false;
		});
}

module.exports = {
	hasUserLikeTheStatusPost,
};
