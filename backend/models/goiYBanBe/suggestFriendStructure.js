class SuggestFriend {
  constructor(
    suggestFor,
    suggestedFriends = [],
    friendIdsList = [],
    breedIdsList = [],
    expireAt = new Date()
  ) {
    this.suggestFor = suggestFor;
    this.suggestedFriends = suggestedFriends;
    this.friendIdsList = friendIdsList;
    this.breedIdsList = breedIdsList;
    this.expireAt = expireAt;
  }
}

module.exports = {
  SuggestFriend,
};
