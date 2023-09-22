const userHelper = require('../../utils/userHelper');

// const posts = [
// 	{
// 		_id: '64fd4517b00c4d6c5dc9a9ed',
// 		text: 'nam 1',
// 		postType: 'status',
// 		media: {
// 			type: 'images',
// 			data: ['google.com', 'facebook.com'],
// 		},
// 		createAt: '2023-09-10T04:24:55.000Z',
// 		numOfLike: 1,
// 		numOfComment: 2,
// 		owner_id: 5,
// 	},
// 	{
// 		_id: '64fd4517b00c4d6c5dc9a9ee',
// 		text: 'nam 2',
// 		postType: 'status',
// 		media: null,
// 		createAt: '2023-09-10T04:24:55.000Z',
// 		numOfLike: 0,
// 		numOfComment: 0,
// 		owner_id: 8,
// 	},
// 	{
// 		_id: '64fd4517b00c4d6c5dc9a9ef',
// 		text: 'Dung 3',
// 		postType: 'status',
// 		media: {
// 			type: 'video',
// 			data: ['titok.com'],
// 		},
// 		createAt: '2023-09-10T04:24:55.000Z',
// 		numOfLike: 0,
// 		numOfComment: 0,
// 		owner_id: 5,
// 	},
// ];

// const cmts = [
// 	{
// 			"_id": "6506706fc1a6868a8bf7d4f3",
// 			"postId": "6501634ea4cdef6e6afc6d2b",
// 			"comment": "lori",
// 			"commentBy": 8,
// 			"commentAt": "2023-09-16T19:20:15.808Z",
// 			"numOfLike": 0,
// 			"numOfReply": 0
// 	},
// 	{
// 			"_id": "6506706fc1a6868a8bf7d4f4",
// 			"postId": "6501634ea4cdef6e6afc6d2b",
// 			"comment": "lori",
// 			"commentBy": 9,
// 			"commentAt": "2023-09-16T18:20:15.808Z",
// 			"numOfLike": 0,
// 			"numOfReply": 0
// 	},
// 	{
// 			"_id": "6506706fc1a6868a8bf7d4f5",
// 			"postId": "6501634ea4cdef6e6afc6d2b",
// 			"comment": "lori",
// 			"commentBy": 10,
// 			"commentAt": "2023-09-16T17:20:15.808Z",
// 			"numOfLike": 0,
// 			"numOfReply": 0
// 	}
// ]



// async function InsertOwnerInforOfListPosts(posts) {
// 	let userId_map_postId = {};
// 	const len = posts.length;
// 	for (let i = 0; i < len; i++) {
// 		if (posts[i].owner_id in userId_map_postId) {
// 			userId_map_postId[posts[i].owner_id].push(i);
// 		} else {
// 			userId_map_postId[posts[i].owner_id] = [i];
// 		}
// 	}
// 	console.log({ userId_map_postId });
// 	user_id_list = Object.keys(userId_map_postId);
// 	console.log({ user_id_list });
// 	const userId_map_userInfor = await userHelper
// 		.getUserPublicInforByListIds(user_id_list)
// 		.then((data) => {
// 			let userId_map_userInfor = {};
// 			data.forEach((userInfor) => {
// 				userId_map_userInfor[userInfor.ma_nguoi_dung] = userInfor;
// 			});
// 			// console.log(data);
// 			return userId_map_userInfor;
// 		});
// 	posts.forEach((post, index) => {
// 		const owner_id = post.owner_id;
// 		posts[index] = { ...post, owner_infor: userId_map_userInfor[owner_id] };
// 	});
// 	return posts;
// }

// replies= [
// 	{
// 			"_id": "6503302d194d1473c3dd746b",
// 			"cmtId": "6501dd56ae68d86a2849b3ec",
// 			"reply": "tui là teo",
// 			"replyBy": 4,
// 			"replyAt": "2023-09-14T16:09:17.867Z",
// 			"numOfLike": 0
// 	},
// 	{
// 			"_id": "6502bdb4fd7f90a0aa52dd25",
// 			"cmtId": "6501dd56ae68d86a2849b3ec",
// 			"reply": "tui là Leo nè",
// 			"replyBy": 5,
// 			"replyAt": "2023-09-14T08:00:52.350Z",
// 			"numOfLike": 0
// 	},
// 	{
// 			"_id": "6502bd69fd7f90a0aa52dd24",
// 			"cmtId": "6501dd56ae68d86a2849b3ec",
// 			"reply": "hài quá",
// 			"replyBy": 5,
// 			"replyAt": "2023-09-14T07:59:37.892Z",
// 			"numOfLike": 0
// 	}
// ];



async function userInfor2ListOfObjectMapByUserId(listObjs,idFieldName,nameFieldOfuserInfor){
	let userId_map_idField = {};
	const len = listObjs.length;
	for (let i = 0; i < len; i++) {
		if (listObjs[i][idFieldName] in userId_map_idField) {
			userId_map_idField[listObjs[i][idFieldName]].push(i);
		} else {
			userId_map_idField[listObjs[i][idFieldName]] = [i];
		}
	}
	// console.log({ userId_map_idField });
	user_id_list = Object.keys(userId_map_idField);
	// console.log({ user_id_list });
	const userId_map_userInfor = await userHelper
		.getUserPublicInforByListIds(user_id_list)
		.then((data) => {
			let userId_map_userInfor = {};
			data.forEach((userInfor) => {
				userId_map_userInfor[userInfor.ma_nguoi_dung] = userInfor;
			});
			// console.log(data);
			return userId_map_userInfor;
		});
	listObjs.forEach((obj, index) => {
		const user_id = obj[idFieldName];
		listObjs[index] = { ...obj, [nameFieldOfuserInfor]: userId_map_userInfor[user_id] };
	});
	return listObjs;
}

async function InsertOwnerInforOfListPosts(posts){
	return await userInfor2ListOfObjectMapByUserId(posts,'owner_id','owner_infor');
}

async function InsertUserCmtInforOfListCmts(listCmts){
	return await userInfor2ListOfObjectMapByUserId(listCmts,'commentBy','userCmtInfor');
}

async function InsertUserReplyInforOfListReplies(listReplies){
	return await userInfor2ListOfObjectMapByUserId(listReplies,'replyBy','userReplyInfor');
}


module.exports = {
	InsertOwnerInforOfListPosts,
	InsertUserCmtInforOfListCmts,
	InsertUserReplyInforOfListReplies,
};

