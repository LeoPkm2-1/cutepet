const articleModel = require("../../models/BaiViet/articleModel");
const userHelper = require("../../utils/userHelper");

async function hasUserUpVotedArticle(user_id, article_id) {
  return await articleModel
    .getUpVoteArticleInforOfUser(user_id, article_id)
    .then((data) => data.payload != null);
}

async function hasUserDownVotedArticle(user_id, article_id) {
  return await articleModel
    .getDownVoteArticleInforOfUser(user_id, article_id)
    .then((data) => data.payload != null);
}

const data = [
  {
    _id: "654b2da812940018c371ab52",
    articleId: "6548f00bb7221c7de43e80f6",
    type: "COMMENT_ARTICLE",
    comment: "cmt socola 3",
    commentBy: 10,
    numOfUpVote: 0,
    numOfDownVote: 0,
    numOfReply: 0,
    modifiedAt: null,
  },
  {
    _id: "654b2da812940018c371ab52",
    articleId: "6548f00bb7221c7de43e80f6",
    type: "COMMENT_ARTICLE",
    comment: "cmt socola 3",
    commentBy: 10,
    numOfUpVote: 0,
    numOfDownVote: 0,
    numOfReply: 0,
    modifiedAt: null,
  },
  {
    _id: "654b2d9f12940018c371ab51",
    articleId: "6548f00bb7221c7de43e80f6",
    type: "COMMENT_ARTICLE",
    comment: "cmt socola 2",
    commentBy: 8,
    numOfUpVote: 0,
    numOfDownVote: 0,
    numOfReply: 0,
    modifiedAt: null,
  },
  {
    _id: "654b2d9012940018c371ab50",
    articleId: "6548f00bb7221c7de43e80f6",
    type: "COMMENT_ARTICLE",
    comment: "cmt socola 1",
    commentBy: 4,
    numOfUpVote: 0,
    numOfDownVote: 0,
    numOfReply: 0,
    modifiedAt: null,
  },
];

async function userInfor2ListOfObjectMapByUserId(
  listObjs,
  idFieldName,
  nameFieldOfuserInfor
) {
  // key: user_id, value: list index of element in listObjs which has idFieldName: user_id
  let userId_map_idField = {};
  const len = listObjs.length;
  for (let i = 0; i < len; i++) {
    if (listObjs[i][idFieldName] in userId_map_idField) {
      userId_map_idField[listObjs[i][idFieldName]].push(i);
    } else {
      userId_map_idField[listObjs[i][idFieldName]] = [i];
    }
  }

  // console.log(userId_map_idField);
  let user_id_list = Object.keys(userId_map_idField);
  // console.log(user_id_list);
  const userId_map_userInfor = await userHelper
    .getUserPublicInforByListIds(user_id_list)
    .then((data) => {
      let userId_map_userInfor = {};
      data.forEach((userInfor) => {
        userId_map_userInfor[userInfor.ma_nguoi_dung] = userInfor;
      });
      return userId_map_userInfor;
    });
  listObjs.forEach((obj, index) => {
    const user_id = obj[idFieldName];
    listObjs[index] = {
      ...obj,
      [nameFieldOfuserInfor]: userId_map_userInfor[user_id],
    };
  });
  return listObjs;
}

async function insertUserWriteArticleInforToListOfArticle(listOfArticles) {
  return await userInfor2ListOfObjectMapByUserId(
    listOfArticles,
    "owner_id",
    "owner_infor"
  );
}

async function insertUserCmtInforToListOfCmts(listCmts) {
  return await userInfor2ListOfObjectMapByUserId(
    listCmts,
    "commentBy",
    "userCmtInfor"
  );
}

// (async function () {
//   const a = await insertUserCmtInforToListOfCmts(data);
//   console.log(a);
// })()

// (async function () {
//   const a = await userInfor2ListOfObjectMapByUserId(data, "commentBy", "ahihi");
//   console.log(a);
// })();

module.exports = {
  hasUserUpVotedArticle,
  hasUserDownVotedArticle,
  insertUserWriteArticleInforToListOfArticle,
  insertUserCmtInforToListOfCmts,
};
