const { sqlQuery, nonSQLQuery } = require("./index");
const { Response } = require("./../utils/index");
const { ObjectId } = require("mongodb");
const SERVICE_SCHEDULE_PENDING_STATUS_STR = "CHO_XAC_NHAN";
const SERVICE_SCHEDULE_REJECT_STATUS_STR = "DA_HUY";
const SERVICE_SCHEDULE_MISSING_STATUS_STR = "DA_LO";
const SERVICE_SCHEDULE_CONFIRM_STATUS_STR = "DA_XAC_NHAN";
const SERVICE_SCHEDULE_DONE_STATUS_STR = "DA_HOAN_THANH";

class ServiceSchedule {
  static type = "SERVICE_SCHEDULE";
  constructor(
    schedule_name,
    service_id,
    pet_id,
    user_create,
    shop_infor,
    service_infor,
    happen_at = new Date(),
    create_at = new Date()
  ) {
    this.scheduleName = schedule_name;
    this.serviceId = service_id;
    this.petId = pet_id;
    this.scheduleStatus = SERVICE_SCHEDULE_PENDING_STATUS_STR;
    this.userCreate = user_create;
    this.shopInfor = shop_infor;
    this.serviceInfor = service_infor;
    this.happenAt = happen_at;
    this.type = this.constructor.type;
    this.createAt = create_at;
    this.modifiedAt = null;
    this.HistoryHandleProgress = [];
  }
}

class UpdateServiceScheduleStatus {
  static type = "UPDATE_STATUS_SERVICE_SCHEDULE";
  constructor(
    new_status,
    old_status,
    user_update_infor,
    update_at = new Date(),
    reason = ""
  ) {
    this.newStatus = new_status;
    this.oldStatus = old_status;
    this.userUpdateInfor = user_update_infor;
    this.updateAt = update_at;
    this.reason = reason;
    this.type = this.constructor.type;
  }
}

const createNewSchedule = async (
  schedule_name,
  service_id,
  pet_id,
  user_create,
  shop_infor,
  service_infor,
  happen_at = new Date(),
  create_at = new Date()
) => {
  const scheduleObj = new ServiceSchedule(
    schedule_name,
    service_id,
    pet_id,
    user_create,
    shop_infor,
    service_infor,
    happen_at,
    create_at
  );
  async function executor(collection) {
    return await collection.insertOne(scheduleObj);
  }
  return await nonSQLQuery(executor, "Lich")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getScheduleById = async (schedule_id) => {
  schedule_id = schedule_id.trim();
  async function executor(collection) {
    return await collection.findOne({
      _id: new ObjectId(schedule_id),
    });
  }
  return await nonSQLQuery(executor, "Lich")
    // .then((data) => new Response(200, data == null ? {} : data, ""))
    .then((data) => {
      if (data == null) {
        return {};
      } else {
        return { ...data, _id: data._id.toString() };
      }
    })
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const getServiceScheduleById = async (service_schedule_id) => {
  service_schedule_id = String(service_schedule_id).trim();
  async function executor(collection) {
    return await collection.findOne({
      _id: new ObjectId(service_schedule_id),
      type: ServiceSchedule.type,
    });
  }
  return await nonSQLQuery(executor, "Lich")
    // .then((data) => new Response(200, data == null ? {} : data, ""))
    .then((data) => {
      if (data == null) {
        return {};
      } else {
        return { ...data, _id: data._id.toString() };
      }
    })
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};

const isScheduleExist = async (schedule_id) => {
  const scheduleInfor = await getScheduleById(schedule_id).then(
    (data) => data.payload
  );
  // console.log({ scheduleInfor });
  return Object.keys(scheduleInfor).length != 0;
};

const getAllScheduleOfUser = async (user_id) => {
  user_id = parseInt(user_id);
  async function executor(collection) {
    return await collection
      .find({
        "userCreate.ma_nguoi_dung": user_id,
      })
      .sort({ createAt: -1 })
      .toArray();
  }
  return await nonSQLQuery(executor, "Lich")
    .then(
      (data) =>
        new Response(
          200,
          data.map((schedule) => {
            return { ...schedule, _id: schedule._id.toString() };
          }),
          ""
        )
    )
    .catch((err) => new Response(400, err, "", 300, 300));
};

const updateStatusOfServiceSchedule = async (
  service_schedule_id,
  new_status,
  user_update_infor,
  update_at = new Date(),
  reason = ""
) => {
  const service_Schedule_infor = await getServiceScheduleById(
    service_schedule_id
  ).then((data) => data.payload);
  const old_status = service_Schedule_infor.scheduleStatus;
  const update_status_infor = new UpdateServiceScheduleStatus(
    new_status,
    old_status,
    user_update_infor,
    update_at,
    reason
  );

  async function executor(collection) {
    return await collection.updateOne(
      {
        _id: new ObjectId(service_schedule_id),
      },
      {
        $set: {
          scheduleStatus: new_status,
          HistoryHandleProgress: [
            update_status_infor,
            ...service_Schedule_infor.HistoryHandleProgress,
          ],
        },
      }
    );
  }
  return await nonSQLQuery(executor, "Lich")
    .then((data) => new Response(200, data, ""))
    .catch((err) => new Response(400, err, "", 300, 300));
};
const getAllScheduleOfShop = async (shop_id) => {
  shop_id = parseInt(shop_id);
  async function executor(collection) {
    return await collection
      .find({
        "shopInfor.ma_cua_hang": shop_id,
      })
      .sort({ createAt: -1 })
      .toArray();
  }
  return await nonSQLQuery(executor, "Lich")
    .then(
      (data) =>
        new Response(
          200,
          data.map((schedule) => {
            return { ...schedule, _id: schedule._id.toString() };
          }),
          ""
        )
    )
    .catch((err) => new Response(400, err, "", 300, 300));
};

// (async () => {
//   const data = await getAllScheduleOfShop(536);
//   console.log(data);
// })();

module.exports = {
  SERVICE_SCHEDULE_PENDING_STATUS_STR,
  SERVICE_SCHEDULE_REJECT_STATUS_STR,
  SERVICE_SCHEDULE_MISSING_STATUS_STR,
  SERVICE_SCHEDULE_CONFIRM_STATUS_STR,
  SERVICE_SCHEDULE_DONE_STATUS_STR,
  createNewSchedule,
  getServiceScheduleById,
  getScheduleById,
  isScheduleExist,
  getAllScheduleOfUser,
  getAllScheduleOfShop,
  updateStatusOfServiceSchedule,
};
