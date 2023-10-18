class GeneralFollow {
	constructor(
		followed_Obj_Id,
		follower_Id = null,
		createAt = new Date(),
		dependOn = null,
		modifiedAt = null
	) {
		this.type = null;
		this.followed_Obj_Id = followed_Obj_Id;
		this.follower_Id = follower_Id;
		this.createAt = createAt;
		this.dependOn = dependOn;
		this.modifiedAt = modifiedAt;
	}
}

class FollowStatusPost extends GeneralFollow {
	static type = 'FOLOW_STATUS_POST';
	constructor(
		statusPost_Id,
		follower_Id = null,
		createAt = new Date(),
		dependOn = null,
		modifiedAt = null
	) {
		super(statusPost_Id, follower_Id, createAt, dependOn, modifiedAt);
		this.type = this.constructor.type;
	}
	static get_type() {
		return FollowStatusPost.type;
	}
}

class FollowUser extends GeneralFollow {
	static type = 'FOLOW_USER';
	constructor(
		user_followed_Id,
		follower_Id = null,
		createAt = new Date(),
		dependOn = null,
		modifiedAt = null
	) {
		super(user_followed_Id, follower_Id, createAt, dependOn, modifiedAt);
		this.type = this.constructor.type;
	}
	static get_type() {
		return FollowUser.type;
	}
}

module.exports = { FollowStatusPost,FollowUser };
