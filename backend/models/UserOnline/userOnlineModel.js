const { sqlQuery, nonSQLQuery } = require("../index");
const { ObjectId } = require("mongodb");
const { Response } = require("../../utils/index");
const { UserOnline } = require("./userOnlineStructure");

const isUserRecordedInDB = async (user_id) => {
  async function executor(collection) {
    return await collection.findOne({ userId: user_id });
  }
  return await nonSQLQuery(executor, "NguoiDungDangOnline").then((data) =>
    data == null ? false : true
  );
};

const insertRecordToDB = async (
  user_id,
  isOnline = true,
  recordAt = new Date(),
  numOfDevices = 1
) => {
  const UserOnlineRecord = new UserOnline(
    user_id,
    isOnline,
    recordAt,
    numOfDevices
  );
  async function executor(collection) {
    return await collection.insertOne(UserOnlineRecord);
  }
  return await nonSQLQuery(executor, "NguoiDungDangOnline")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getOnlineStatusOfUser = async (user_id) => {
  async function executor(collection) {
    return await collection.findOne({ userId: user_id });
  }
  return await nonSQLQuery(executor, "NguoiDungDangOnline")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateOnlyStatus = async (user_id, isOnline) => {
  async function executor(collection) {
    return await collection.updateOne(
      { userId: user_id },
      {
        $set: {
          isOnline: isOnline,
        },
      }
    );
  }
  return await nonSQLQuery(executor, "NguoiDungDangOnline")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateOnlyNumOfDevice = async (user_id, numOfDevices) => {
  async function executor(collection) {
    return await collection.updateOne(
      { userId: user_id },
      {
        $set: { numOfDevices: numOfDevices },
      }
    );
  }
  return await nonSQLQuery(executor, "NguoiDungDangOnline")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateOnlineStatusRecord = async (
  user_id,
  OnlineStatus,
  numOfDevices,
  timeUpdate = undefined
) => {
  async function executor_notime(collection) {
    return await collection.updateOne(
      { userId: user_id },
      {
        $set: { numOfDevices: numOfDevices, isOnline: OnlineStatus },
      }
    );
  }
  async function executor_withtime(collection) {
    return await collection.updateOne(
      { userId: user_id },
      {
        $set: {
          numOfDevices: numOfDevices,
          isOnline: OnlineStatus,
          recordAt: timeUpdate,
        },
      }
    );
  }
  if (typeof timeUpdate == "undefined") {
    return await nonSQLQuery(executor_notime, "NguoiDungDangOnline")
      .then((data) => new Response(200, data, ""))
      .catch((err) => new Response(400, err, "", 300, 300));
  } else {
    return await nonSQLQuery(executor_withtime, "NguoiDungDangOnline")
      .then((data) => new Response(200, data, ""))
      .catch((err) => new Response(400, err, "", 300, 300));
  }
};

const isUserOnline = async (user_id) => {
  async function executor(collection) {
    return await collection.findOne({ userId: user_id });
  }
  return await nonSQLQuery(executor, "NguoiDungDangOnline").then((data) => {
    if (data == null) return null;
    return data.isOnline;
  });
};

const setOnlineStatusForUser = async (user_id, setStatusOnline = true) => {
  try {
    const onlineInfor = await getOnlineStatusOfUser(user_id).then(
      (data) => data.payload
    );
    setStatusOnline = setStatusOnline == true ? true : false;
    // don't have record in DB
    if (onlineInfor == null) {
      await insertRecordToDB(
        user_id,
        setStatusOnline,
        new Date(),
        setStatusOnline ? 1 : 0
      );
      return;
    } else {
      // have record in DB
      if (setStatusOnline) {
        // happen when user online
        await updateOnlineStatusRecord(
          user_id,
          true,
          onlineInfor.numOfDevices + 1
        );
        return;
      } else {
        // happen when user offline
        if (onlineInfor.numOfDevices > 1) {
          await updateOnlyNumOfDevice(user_id, onlineInfor.numOfDevices - 1);
          return;
        } else {
          await updateOnlineStatusRecord(user_id, false, 0, new Date());
          return;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getOnlineUsersByListIds = async (userListIds) => {
  userListIds = userListIds.map((id) => parseInt(id));
  async function executor(collection) {
    return await collection
      .find({
        $and: [
          {
            userId: {
              $in: userListIds,
            },
          },
          {
            isOnline: true,
          },
        ],
      })
      .toArray();
  }
  return await nonSQLQuery(executor, "NguoiDungDangOnline")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};


module.exports = {
  isUserRecordedInDB,
  insertRecordToDB,
  updateOnlyStatus,
  isUserOnline,
  getOnlineStatusOfUser,
  updateOnlyNumOfDevice,
  updateOnlineStatusRecord,
  setOnlineStatusForUser,
  getOnlineUsersByListIds,
};
