const { sqlQuery } = require("./index");
const { Response } = require("./../utils/index");

const getPetByID = async (petID) => {
  const sqlStmt = "select * from ThuCung where ma_thu_cung = ?";
  return await sqlQuery(sqlStmt, petID)
    .then((data) => {
      return new Response(200, data, "");
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};
async function getAllOwnsPetOf(userid) {
  const sqlStmt = "select * from ThuCung where ma_nguoi_chu = ?";
  return await sqlQuery(sqlStmt, userid)
    .then((data) => {
      return new Response(200, data, "");
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
}
const getPetByNameAndUserID = async (petname, userId) => {
  const sqlStmt = `select  * from ThuCung where ma_nguoi_chu=? and ten_thu_cung = ?;`;
  return await sqlQuery(sqlStmt, [userId, petname])
    .then((data) => {
      return new Response(200, data, "");
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};

const addPet = async (
  pet_name,
  pet_birthdate,
  pet_sex,
  pet_note,
  pet_species,
  owner_id
) => {
  const sqlStmt =
    "INSERT INTO ThuCung (ten_thu_cung ,ngay_sinh ,gioi_tinh ,ghi_chu ,ma_giong,ma_nguoi_chu) VALUES(?,?,?,?,?,?) ";
  return await sqlQuery(sqlStmt, [
    pet_name,
    pet_birthdate,
    pet_sex,
    pet_note,
    pet_species,
    owner_id,
  ])
    .then((data) => {
      // console.log('eheh:', data);
      return new Response(200, data, "");
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};

async function updatePetInfor(
  ma_thu_cung,
  ten_thu_cung,
  ngay_sinh,
  gioi_tinh,
  ghi_chu,
  ma_giong
) {
  const sqlStmt = `UPDATE ThuCung
SET ten_thu_cung = ?, ngay_sinh =?, gioi_tinh = ?, ghi_chu = ?, ma_giong = ?
WHERE ma_thu_cung = ?;`;
  return await sqlQuery(sqlStmt, [
    ten_thu_cung,
    ngay_sinh,
    gioi_tinh,
    ghi_chu,
    ma_giong,
    ma_thu_cung,
  ])
    .then((data) => {
      return new Response(200, data, "");
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
}

async function deletePetInfor(pet_id) {
  const sqlStmt = `delete from ThuCung where ma_thu_cung = ?`;
  return await sqlQuery(sqlStmt, [pet_id])
    .then((data) => {
      return new Response(200, data, "");
    })
    .catch((err) => {
      return new Response(400, "", err.sqlMessage, err.errno, err.code);
    });
}

const getListUserIdsHaveGiongOfPetMatchListOfGiong_1 = async (
  listOfMaGiong,
  limitNum = undefined
) => {
  let sqlStmt = "";
  let data = [];
  if (typeof limitNum == "number") {
    sqlStmt = `select DISTINCT ma_nguoi_chu
                    from ThuCung
                    where ma_giong in (?) 
                    limit  ?`;
    data = [listOfMaGiong, limitNum];
  } else {
    sqlStmt = `select DISTINCT ma_nguoi_chu
                  from ThuCung
                  where ma_giong in (?)`;
    data = [listOfMaGiong];
  }
  return await sqlQuery(sqlStmt, data)
    .then(
      (data) =>
        new Response(
          200,
          data.map((maNguoiDungObj) => maNguoiDungObj.ma_nguoi_chu),
          ""
        )
    )
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};
const getListUserIdsHaveGiongOfPetMatchListOfGiong_2 = async (
  listOfMaGiong,
  not_contain_user_id_list,
  limitNum = undefined
) => {
  let sqlStmt = "";
  let data = [];
  if (typeof limitNum == "number") {
    sqlStmt = `select DISTINCT ma_nguoi_chu
                    from ThuCung
                    where ma_giong in (?) and
                          ma_nguoi_chu not in (?)
                    limit  ?`;
    data = [listOfMaGiong, not_contain_user_id_list, limitNum];
  } else {
    sqlStmt = `select DISTINCT ma_nguoi_chu
                  from ThuCung
                  where ma_giong in (?) and
                        ma_nguoi_chu not in (?)`;
    data = [listOfMaGiong, not_contain_user_id_list];
  }
  return await sqlQuery(sqlStmt, data)
    .then(
      (data) =>
        new Response(
          200,
          data.map((maNguoiChuObj) => maNguoiChuObj.ma_nguoi_chu),
          ""
        )
    )
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

// (async function () {
//   const data = await getListUserIdsHaveGiongOfPetMatchListOfGiong_1(
//     [ 403],
//     // [4,7],
//     100
//   );
//   console.log(data);
// })();

module.exports = {
  getPetByID,
  getAllOwnsPetOf,
  getPetByNameAndUserID,
  addPet,
  updatePetInfor,
  deletePetInfor,
  getListUserIdsHaveGiongOfPetMatchListOfGiong_1,
  getListUserIdsHaveGiongOfPetMatchListOfGiong_2,
};
