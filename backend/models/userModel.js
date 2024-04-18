const { sqlQuery, nonSQLQuery } = require("./index");
const { Response } = require("./../utils/index");

const getUserByUsername = async (userName) => {
  const sqlStmt =
    "select * from NguoiDung where tai_khoan = ? COLLATE utf8mb4_bin";
  const params = [userName];
  return await sqlQuery(sqlStmt, params)
    .then((data) => {
      return new Response(200, data, "");
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};
const getUserIdByUsername = async (userName) => {
  const sqlStmt =
    "select ma_nguoi_dung from NguoiDung where tai_khoan = ? COLLATE utf8mb4_bin";
  const params = [userName];
  return await sqlQuery(sqlStmt, params)
    .then((data) => {
      if (data.length > 0)
        return { ma_nguoi_dung: parseInt(data[0].ma_nguoi_dung) };
      return { ma_nguoi_dung: undefined };
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};

const getUsernameByUserId = async (user_id) => {
  const sqlStmt = `select tai_khoan from NguoiDung where ma_nguoi_dung = ?`;
  const params = [user_id];
  return await sqlQuery(sqlStmt, params)
    .then((data) => {
      if (data.length > 0) return data[0];
      return { tai_khoan: undefined };
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};

const getUserByEmail = async (email_address) => {
  const sqlStmt = `select * from NguoiDung where email = ? COLLATE utf8mb4_unicode_ci`;
  return await sqlQuery(sqlStmt, [email_address])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const getUserNonActiveByUsername = async (userName) => {
  async function executor(collection, name) {
    return await collection.find({ tai_khoan: name }).toArray();
  }
  return await nonSQLQuery(executor, "NguoiDungChuaChinhThuc", userName).catch(
    (err) => {
      console.log(err);
      throw err;
    }
  );
};

const getUserNonActiveByEmail = async (userEmail) => {
  async function executor(collection) {
    return await collection.find({ email: userEmail }).toArray();
  }
  return await nonSQLQuery(executor, "NguoiDungChuaChinhThuc");
};

const getUserNonActiveByActiveCode = async (active_code) => {
  async function executor(collection) {
    return await collection.find({ active_code: active_code }).toArray();
  }
  return await nonSQLQuery(executor, "NguoiDungChuaChinhThuc");
};

const getUserById = async (userId) => {
  const sqlStmt = "select * from NguoiDung where ma_nguoi_dung =? ";
  const params = [userId];
  return await sqlQuery(sqlStmt, params)
    .then((data) => {
      return new Response(200, data, "");
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};

const addUser = async (user) => {
  const keys = Object.keys(user);
  const fields = keys.join();
  const sqlstmt = `insert into NguoiDung (` + fields + `) values (?)`;
  const values = keys.map((key) => user[key]);
  return await sqlQuery(sqlstmt, [values])
    .then((data) => {
      return new Response(200, [], data);
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};

const addNonActiveUser = async (nonActiveUser) => {
  async function executor(collection, param) {
    return await collection.insertOne(param);
  }
  return await nonSQLQuery(executor, "NguoiDungChuaChinhThuc", nonActiveUser)
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const deleteAllExpireNonActiveUser = async () => {
  async function executor(collection) {
    return await collection.deleteMany({
      thoi_han: {
        $lt: new Date(),
      },
    });
  }
  return await nonSQLQuery(executor, "NguoiDungChuaChinhThuc");
};

const deleteNonActiveUserByActiveCode = async (active_code) => {
  async function executor(collection) {
    return await collection.deleteMany({
      active_code: active_code,
    });
  }
  return await nonSQLQuery(executor, "NguoiDungChuaChinhThuc");
};

const deleteUserToken = async (userid) => {
  const sqlstmt = "UPDATE NguoiDung SET token='' WHERE ma_nguoi_dung=?;";
  return await sqlQuery(sqlstmt, [userid])
    .then((data) => {
      return new Response(200, [], data);
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};

const isFriend = async (person_id_1, person_id_2) => {
  const sqlStmt =
    "select Count(*) as number from LaBanBe where (ma_nguoi_dung_1,ma_nguoi_dung_2) = (?,?)";
  return await sqlQuery(sqlStmt, [person_id_1, person_id_2])
    .then((data) => {
      if (Number(data[0].number) >= 1) {
        return new Response(200, true, "");
      }
      return new Response(200, false, "");
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};

const getUsersByListId = async (listId) => {
  const sqlStmt = `select * from NguoiDung where ma_nguoi_dung in (?)`;
  return await sqlQuery(sqlStmt, [listId])
    .then((data) => {
      return new Response(200, data, "");
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};

const updateUserPasswordByUserName = async (username, newPassword) => {
  const sqlStmt = `UPDATE NguoiDung
                  SET mat_khau = ?
                  WHERE tai_khoan = ?;`;
  return await sqlQuery(sqlStmt, [newPassword, username])
    .then((data) => {
      return new Response(200, data, "");
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};

const getUserPublicInforByListId = async (listId) => {
  const sqlStmt = `select ma_nguoi_dung,ten,ngay_sinh,tai_khoan,email,so_dien_thoai,gioi_tinh from NguoiDung where ma_nguoi_dung in (?)`;
  return await sqlQuery(sqlStmt, [listId])
    .then((data) => {
      return new Response(200, data, "");
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};

// const searchUsersByName = async (searchName) => {
//   const sqlStmt = `SELECT ma_nguoi_dung,ten,ngay_sinh,tai_khoan,email,so_dien_thoai,gioi_tinh from NguoiDung where ten REGEXP '^${searchName}[[:alpha:]]*'`;
//   console.log(sqlStmt);
//   return await sqlQuery(sqlStmt, [])
//     .then((data) => {
//       return new Response(200, data, "");
//     })
//     .catch((err) => {
//       return new Response(400, [], err.sqlMessage, err.errno, err.code);
//     });
// };

const searchUserBySearchKey = async (searchKey, index = 0, range = 20) => {
  const sqlStmt = `SELECT ma_nguoi_dung,ten,ngay_sinh,tai_khoan,email,so_dien_thoai,gioi_tinh 
                    FROM NguoiDung 
                    WHERE 
                        ten REGEXP '^${searchKey}[[:alpha:]]*' OR
                        tai_khoan REGEXP '^${searchKey}[[:alpha:]]*'
                    LIMIT ${index}, ${range}`;
  return await sqlQuery(sqlStmt, [])
    .then((data) => {
      return new Response(200, data, "");
    })
    .catch((err) => {
      return new Response(400, [], err.sqlMessage, err.errno, err.code);
    });
};

const updateUserBasicInfor = async (
  ma_nguoi_dung,
  { ten, ngay_sinh, so_dien_thoai, gioi_tinh }
) => {
  const sqlStmt = `UPDATE NguoiDung SET 
                          ten = ?, 
                          ngay_sinh = ?, 
                          so_dien_thoai = ?, 
                          gioi_tinh = ? 
                        WHERE 
                          ma_nguoi_dung = ?;`;
  // console.log({ ten, ngay_sinh, so_dien_thoai, gioi_tinh });
  // return;
  return await sqlQuery(sqlStmt, [
    ten,
    ngay_sinh,
    so_dien_thoai,
    gioi_tinh,
    ma_nguoi_dung,
  ])
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const getUserIdThatNoteContainUsers = async (
  not_contain_user_id_list,
  limitNum = undefined
) => {
  let sqlStmt = "";
  if (typeof limitNum == "number") {
    sqlStmt = `select DISTINCT ma_nguoi_dung
              from NguoiDung
              where ma_nguoi_dung not in (?)
              limit ?`;
    data = [not_contain_user_id_list, limitNum];
  } else {
    sqlStmt = `select DISTINCT ma_nguoi_dung
                from NguoiDung
                where ma_nguoi_dung not in (?)`;
    data = [not_contain_user_id_list];
  }
  return await sqlQuery(sqlStmt, data)
    .then(
      (data) =>
        new Response(
          200,
          data.map((maNguoiDungObj) => maNguoiDungObj.ma_nguoi_dung),
          ""
        )
    )
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const tenNguoiDungT0MaNguoiDung = async (tenNguoiDung) => {
  const sqlStmt = `select ma_nguoi_dung from NguoiDung where ten = ? COLLATE utf8mb4_vietnamese_ci`;
  return await sqlQuery(sqlStmt, [tenNguoiDung])
    .then((data) => data.map((userIDObj) => parseInt(userIDObj.ma_nguoi_dung)))
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

const getListUserIdsWhenTenContain = async (partOfName) => {
  const sqlStmt =
    `select ma_nguoi_dung from NguoiDung where ten  LIKE '%` +
    partOfName +
    `%' COLLATE utf8mb4_vietnamese_ci`;
  return await sqlQuery(sqlStmt)
    .then((data) => data.map((userIDObj) => parseInt(userIDObj.ma_nguoi_dung)))
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, [], err.sqlMessage, err.errno, err.code));
};

// (async function () {
//   const data = await getListUserIdsWhenTenContain('Hùng');
//   console.log(data);
// })()

// (async function () {
//   const data = await tenNguoiDungT0MaNguoiDung("");
//   console.log(data);
// })();

module.exports = {
  getUserByUsername,
  getUserByEmail,
  getUserById,
  getUserIdByUsername,
  addUser,
  deleteUserToken,
  isFriend,
  getUserNonActiveByUsername,
  getUserNonActiveByEmail,
  addNonActiveUser,
  deleteAllExpireNonActiveUser,
  getUserNonActiveByActiveCode,
  deleteNonActiveUserByActiveCode,
  getUsernameByUserId,
  getUsersByListId,
  getUserPublicInforByListId,
  searchUserBySearchKey,
  updateUserPasswordByUserName,
  updateUserBasicInfor,
  getUserIdThatNoteContainUsers,
  tenNguoiDungT0MaNguoiDung,
  getListUserIdsWhenTenContain,
};
