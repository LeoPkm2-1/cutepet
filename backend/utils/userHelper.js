const userModel = require('./../models/userModel');

async function isFriend(person_id_1, person_id_2) {
	const data = await userModel.isFriend(person_id_1, person_id_2);
	if (data.status == 200) {
		return data.payload;
	}
	throw new Error(data.message);
}

async function isSendRequestAddFriend(sender_id, recipient_id) {
	const data = await userModel.isSendRequestAddFriend(
		sender_id,
		recipient_id
	);
	if (data.status == 200) {
		return data.payload;
	}
	throw new Error(data.message);
}
async function conditionToSendAddFriendRequest(sender_id, recipient_id) {
	try {
		const fiend = await isFriend(sender_id, recipient_id);
		const haveSent_1 = await isSendRequestAddFriend(
			sender_id,
			recipient_id
		);
		const haveSent_2 = await isSendRequestAddFriend(
			recipient_id,
			sender_id
		);
		if (fiend || haveSent_1 || haveSent_2) return false;
		return true;
	} catch (error) {
		throw new Error(data.message);
	}
}

module.exports = {
	isFriend,
	isSendRequestAddFriend,
	conditionToSendAddFriendRequest,
};
