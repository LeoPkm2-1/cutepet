posts= [
  {
      "_id": "64fd4517b00c4d6c5dc9a9ed",
      "text": "nam 1",
      "postType": "status",
      "media": {
          "type": "images",
          "data": [
              "google.com",
              "facebook.com"
          ]
      },
      "createAt": "2023-09-10T04:24:55.000Z",
      "numOfLike": 1,
      "numOfComment": 2,
      "owner_id": 5
  },
  {
      "_id": "64fd4517b00c4d6c5dc9a9ee",
      "text": "nam 2",
      "postType": "status",
      "media": null,
      "createAt": "2023-09-10T04:24:55.000Z",
      "numOfLike": 0,
      "numOfComment": 0,
      "owner_id": 8
  },
  {
      "_id": "64fd4517b00c4d6c5dc9a9ef",
      "text": "Dung 3",
      "postType": "status",
      "media": {
          "type": "video",
          "data": [
              "titok.com"
          ]
      },
      "createAt": "2023-09-10T04:24:55.000Z",
      "numOfLike": 0,
      "numOfComment": 0,
      "owner_id": 5
  }
];

async function InsertOwnerInforOfPost(posts) {
	let userId_map_postId = {};
	const len = posts.length;
	for (let i = 0; i < len; i++) {
		if (posts[i].owner_id in userId_map_postId) {
			userId_map_postId[posts[i].owner_id].push(i);
		} else {
      userId_map_postId[posts[i].owner_id] = [i];
    }
	}
  console.log({userId_map_postId});
  user_id_list = Object.keys(userId_map_postId)
  console.log({user_id_list});
}

(async () => {
  await InsertOwnerInforOfPost(posts);
  // console.log(posts);
})();
