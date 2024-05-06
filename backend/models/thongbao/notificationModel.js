const { sqlQuery, nonSQLQuery } = require("../index");
const { ObjectId } = require("mongodb");
const { Response } = require("../../utils/index");

const addNotification = async (notification) => {
  async function executor(collection) {
    return await collection.insertOne(notification);
  }
  return await nonSQLQuery(executor, "ThongBao")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getNotificationByIndexAndRange = async (user_id, index, range) => {
  index = parseInt(index);
  //   range = parseInt(range);
  async function executor(collection) {
    return await collection
      .find({ receiver_id: user_id })
      //   .limit(index + range)
      .sort({ createAt: -1 })
      .toArray();
  }
  return await nonSQLQuery(executor, "ThongBao")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getUnReadNotifiByIndexAndRange = async (user_id, index, range) => {
  index = parseInt(index);
  range = typeof range == "undefined" ? undefined : parseInt(range);
  let executor = null;
  if (typeof range == "undefined") {
    executor = async (collection) => {
      return await collection
        .find({
          $and: [{ receiver_id: user_id }, { hasRead: false }],
        })
        //   .limit(index + range)
        .sort({ createAt: -1 })
        .toArray();
    };
  } else {
    executor = async (collection) => {
      return await collection
        .find({
          $and: [{ receiver_id: user_id }, { hasRead: false }],
        })
        .limit(index + range)
        .sort({ createAt: -1 })
        .toArray();
    };
  }
  return await nonSQLQuery(executor, "ThongBao")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getNotificationBeforeTime = async (receiver_id, before, range) => {
  let executor = null;
  if (typeof range == "undefined") {
    executor = async (collection) => {
      return await collection
        .find({
          $and: [
            { receiver_id: receiver_id },
            {
              createAt: {
                $lte: before,
              },
            },
          ],
        })
        .sort({ createAt: -1 })
        .toArray();
    };
  } else {
    executor = async (collection) => {
      return await collection
        .find({
          $and: [
            { receiver_id: receiver_id },
            {
              createAt: {
                $lte: before,
              },
            },
          ],
        })
        .limit(range)
        .sort({ createAt: -1 })
        .toArray();
    };
  }

  return await nonSQLQuery(executor, "ThongBao")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getUnReadNotifiBeforeTime = async (receiver_id, before, range) => {
  let executor = null;
  if (typeof range == "undefined") {
    executor = async (collection) => {
      return await collection
        .find({
          $and: [
            { receiver_id: receiver_id },
            {
              createAt: {
                $lte: before,
              },
            },
            { hasRead: false },
          ],
        })
        .sort({ createAt: -1 })
        .toArray();
    };
  } else {
    executor = async (collection) => {
      return await collection
        .find({
          $and: [
            { receiver_id: receiver_id },
            {
              createAt: {
                $lte: before,
              },
            },
            { hasRead: false },
          ],
        })
        .limit(range)
        .sort({ createAt: -1 })
        .toArray();
    };
  }
  return await nonSQLQuery(executor, "ThongBao")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getNotificationById = async (notification_id) => {
  async function executor(collection) {
    return await collection.findOne({ _id: new ObjectId(notification_id) });
  }
  return await nonSQLQuery(executor, "ThongBao")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateNotificationhasReadField = async (
  notification_id,
  hasRead = true
) => {
  async function executor(collection) {
    return await collection.updateOne(
      { _id: new ObjectId(notification_id) },
      { $set: { hasRead: hasRead } }
    );
  }
  return await nonSQLQuery(executor, "ThongBao")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};
const markAllUnReadNotifToRead = async (user_id) => {
  async function executor(collection) {
    return await collection.updateMany(
      {
        $and: [{ receiver_id: user_id }, { hasRead: false }],
      },
      {
        $set: {
          hasRead: true,
        },
      }
    );
  }
  return await nonSQLQuery(executor, "ThongBao")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

module.exports = {
  addNotification,
  getNotificationByIndexAndRange,
  getNotificationBeforeTime,
  getNotificationById,
  updateNotificationhasReadField,
  markAllUnReadNotifToRead,
  getUnReadNotifiBeforeTime,
  getUnReadNotifiByIndexAndRange,
};
