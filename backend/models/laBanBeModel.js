const { sqlQuery } = require("./index");
const { Response } = require("./../utils/index");

// thêm quan hệ bạn bè của người dùng 1 và người dùng 2 vào bảng là bạn bè
const insertFriendShip = async (idUser_1, idUser_2) => {
  const sqlStmt = `insert into LaBanBe(ma_nguoi_dung_1,ma_nguoi_dung_2) values (?,?),(?,?)`;
  return await sqlQuery(sqlStmt, [idUser_1, idUser_2, idUser_2, idUser_1])
    .then((data) => {
      return new Response(200, data, "");
    })
    .catch((err) => {
      console.log(err);
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};

const friendShipInforBetween = async (idUser_1, idUser_2) => {
  const sqlStmt = `select * from LaBanBe where (ma_nguoi_dung_1,ma_nguoi_dung_2)= (?,?)`;
  return await sqlQuery(sqlStmt, [idUser_1, idUser_2])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const deleteFriendShip = async (idUser_1, idUser_2) => {
  const sqlStmt = `delete from LaBanBe where (ma_nguoi_dung_1,ma_nguoi_dung_2)= (?,?) or (ma_nguoi_dung_1,ma_nguoi_dung_2) = (?,?);`;
  return await sqlQuery(sqlStmt, [idUser_1, idUser_2, idUser_2, idUser_1])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const getAllFriendShipOfUser = async (idUser) => {
  const sqlStmt = `select * from LaBanBe where ma_nguoi_dung_1 = ?`;
  return await sqlQuery(sqlStmt, [idUser])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const getAllFriendIdsOfUser = async (user_id) => {
  const sqlStmt = `select ma_nguoi_dung_2 as friend_id from LaBanBe where ma_nguoi_dung_1 = ?`;
  return await sqlQuery(sqlStmt, [user_id])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const getFriendOfFriendForUser = async (
  user_id,
  not_contain_user_id_list,
  limitNum = undefined
) => {
  let sqlStmt = "";
  let data = [];
  if (typeof limitNum == Number) {
    sqlStmt = `select DISTINCT FRIENDS_OF_FRIENDS.ma_nguoi_dung_2 as friend_of_friend_id
                from LaBanBe as USER_FRIENDS
                join LaBanBe as FRIENDS_OF_FRIENDS
                  on USER_FRIENDS.ma_nguoi_dung_2=FRIENDS_OF_FRIENDS.ma_nguoi_dung_1

                where USER_FRIEND.ma_nguoi_dung_1 =? and 

                          FRIENDS_OF_FRIENDS.ma_nguoi_dung_2 not in (?)

                limit ?`;
    data = [user_id, not_contain_user_id_list, limitNum];
  } else {
    sqlStmt = `select DISTINCT FRIENDS_OF_FRIENDS.ma_nguoi_dung_2 as friend_of_friend_id
                from LaBanBe as USER_FRIENDS
                join LaBanBe as FRIENDS_OF_FRIENDS
                  on USER_FRIENDS.ma_nguoi_dung_2=FRIENDS_OF_FRIENDS.ma_nguoi_dung_1

                where USER_FRIENDS.ma_nguoi_dung_1 =? and 

                          FRIENDS_OF_FRIENDS.ma_nguoi_dung_2 not in (?)`;
    data = [user_id, not_contain_user_id_list];
  }
  return await sqlQuery(sqlStmt, data)
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

// (async function () {
//   const data = await getFriendOfFriendForUser(50, [2]).then((data) =>
//     data.payload.map((idObj) => parseInt(idObj.friend_of_friend_id))
//   );
//   console.log({data});
// })();

const getCommonFriendIdsOfTwoDisTinctUsers = async (user_1, user_2) => {
  const sqlStmt = `
          select DISTINCT USER_2_FRIENDS.ma_nguoi_dung_2 as common_friend_id
          from LaBanBe as USER_1_FRIENDS
          join LaBanBe AS USER_2_FRIENDS 
              on USER_1_FRIENDS.ma_nguoi_dung_2= USER_2_FRIENDS.ma_nguoi_dung_2
          where USER_1_FRIENDS.ma_nguoi_dung_1 = ? and
                USER_2_FRIENDS.ma_nguoi_dung_1 = ? and
                USER_1_FRIENDS.ma_nguoi_dung_1 != USER_2_FRIENDS.ma_nguoi_dung_1

  `;
  return await sqlQuery(sqlStmt, [user_1, user_2])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const getNumberOfCommonFriendOfTwoDisTinctUsers = async (user_1, user_2) => {
  const data = await getCommonFriendIdsOfTwoDisTinctUsers(user_1, user_2);
  return data.payload.length;
};

module.exports = {
  insertFriendShip,
  friendShipInforBetween,
  deleteFriendShip,
  getAllFriendShipOfUser,
  getAllFriendIdsOfUser,
  getFriendOfFriendForUser,
  getCommonFriendIdsOfTwoDisTinctUsers,
  getNumberOfCommonFriendOfTwoDisTinctUsers,
};
