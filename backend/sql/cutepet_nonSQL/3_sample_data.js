
// post
db.BaiVietTrangThai.insertOne({
	_id: ObjectId('123456789012'), //313233343536373839303132
	text: 'xoa testing',
	postType: 'status',
	media: {
		type: 'images',
		data: ['google.com', 'facebook.com'],
	},
	createAt: new Date('2023-09-10T04:24:55.000+00:00'),
	numOfLike: 2,
	numOfComment: 2,
	modifiedAt: null,
	owner_id: 1,
});



// like post
db.LikeBaiVietTrangThai.insertOne({
	_id: ObjectId('012345678912'),  // 303132333435363738393132
	postId: '313233343536373839303132',
	userLike: 2,
	likeAt: new Date('2023-09-10T04:24:56.000+00:00'),
});

db.LikeBaiVietTrangThai.insertOne({
	_id: ObjectId('012345678913'),  // 303132333435363738393133
	postId: '313233343536373839303132',
	userLike: 3,
	likeAt: new Date('2023-09-10T04:24:57.000+00:00'),
});



// comment post
db.BinhLuanBaiVietTrangThai.insertMany([
	{
		_id: ObjectId('012345678914'),   // 303132333435363738393134
		postId: '313233343536373839303132',
		comment: 'cmt 1',
		commentBy: 1,
		commentAt: new Date('2023-09-10T04:24:57.000+00:00'),
		numOfLike: 2,
		numOfReply: 0,
		modifiedAt: null,
	},{
    _id: ObjectId('012345678915'),  // 303132333435363738393135
		postId: '313233343536373839303132',
		comment: 'cmt 1',
		commentBy: 1,
		commentAt: new Date('2023-09-10T04:24:57.000+00:00'),
		numOfLike: 2,
		numOfReply: 0,
		modifiedAt: new Date('2023-09-10T04:24:58.000+00:00'),
  }
]);



// like comment
db.LikeBinhLuanBaiVietTrangThai.insertMany([
	{
		_id: ObjectId('012345678916'), // 303132333435363738393136
		cmtId: '303132333435363738393134',
		userLike: 5,
    postId:'313233343536373839303132',
		likeAt: new Date('2023-09-10T04:24:58.000+00:00'),
	},
  {
		_id: ObjectId('012345678917'),  // 303132333435363738393137
		cmtId: '303132333435363738393134',
		userLike: 6,
    postId:'313233343536373839303132',
		likeAt: new Date('2023-09-10T04:24:59.000+00:00'),
	},
  {
		_id: ObjectId('012345678918'),  // 303132333435363738393138
		cmtId: '303132333435363738393135',
		userLike: 5,
    postId:'313233343536373839303132',
		likeAt: new Date('2023-09-10T04:25:01.000+00:00'),
	},
  {
		_id: ObjectId('012345678919'),  // 303132333435363738393139
		cmtId: '303132333435363738393135',
		userLike: 6,
    postId:'313233343536373839303132',
		likeAt: new Date('2023-09-10T04:25:02.000+00:00'),
	},
])


// reply comment
db.RelyBinhLuanBaiVietTrangThai.insertMany([
	{
		_id: ObjectId('012345678920'),	// 303132333435363738393230
		cmtId: '303132333435363738393134',
		reply: 'goodbye',
		replyBy: 6,
		replyAt: new Date('2023-09-10T04:25:03.000+00:00'),
		numOfLike: 0,
		postId:'313233343536373839303132',
		modifiedAt: null,
	},
	{
		_id: ObjectId('012345678921'),	// 303132333435363738393231
		cmtId: '303132333435363738393134',
		reply: 'bye',
		replyBy: 1,
		replyAt: new Date('2023-09-10T04:25:04.000+00:00'),
		numOfLike: 0,
		postId:'313233343536373839303132',
		modifiedAt: new Date('2023-09-10T04:25:05.000+00:00'),
	},
	{
		_id: ObjectId('012345678922'),	// 303132333435363738393232
		cmtId: '303132333435363738393135',
		reply: 'xin chào',
		replyBy: 6,
		replyAt: new Date('2023-09-10T04:25:04.000+00:00'),
		numOfLike: 0,
		postId:'313233343536373839303132',
		modifiedAt: new Date('2023-09-10T04:26:04.000+00:00'),
	},
	{
		_id: ObjectId('012345678923'),	// 303132333435363738393233
		cmtId: '303132333435363738393135',
		reply: 'xin chào',
		replyBy: 6,
		replyAt: new Date('2023-09-10T04:25:04.000+00:00'),
		numOfLike: 0,
		postId:'313233343536373839303132',
		modifiedAt: null,
	},
]);
