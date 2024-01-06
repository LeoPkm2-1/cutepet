const { nonSQLQuery } = require("../index");
const { Response } = require("../../utils/index");
const { SuggestFriend } = require("./suggestFriendStructure");

const getSuggestedFriendForUser = async (user_id) => {
  async function executor(collection) {
    return await collection.findOne({
      suggestFor: user_id,
    });
  }
  return await nonSQLQuery(executor, "GoiYBanBe")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const insertSuggestedFriendForUser = async (
  user_id,
  suggestedFriendsList = [],
  friendIdsList = [],
  breedIdsList = [],
  expireAt = new Date()
) => {
  const suggestFriendRecord = new SuggestFriend(
    user_id,
    suggestedFriendsList,
    friendIdsList,
    breedIdsList,
    expireAt
  );
  async function executor(collection) {
    return await collection.insertOne(suggestFriendRecord);
  }
  return await nonSQLQuery(executor, "GoiYBanBe")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const deleteSuggestedFriendOfUser = async (user_id) => {
  async function executor(collection) {
    return await collection.deleteOne({
      suggestFor: user_id,
    });
  }
  return await nonSQLQuery(executor, "GoiYBanBe")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

// (async () => {
//   const data = await insertSuggestedFriendForUser(
//     3,
//     [20],
//     [2, 1],
//     [300, 107, 404, 409, 114, 118, 111],
//     new Date()
//   );
//   console.log(data);
// })();

// (async () => {
//     const data = await deleteSuggestedFriendOfUser(3);
//     console.log(data);
// })();

// (async () => {
//   const data = await getSuggestedFriendForUser(3);
//   console.log(data);
// })();

module.exports = {
  getSuggestedFriendForUser,
  insertSuggestedFriendForUser,
  deleteSuggestedFriendOfUser,
};
