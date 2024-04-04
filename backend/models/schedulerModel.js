const { sqlQuery, nonSQLQuery } = require("./index");
const { Response } = require("./../utils/index");
const { ObjectId } = require("mongodb");
const SERVICE_SCHEDULE_PENDING_STATUS_STR = "CHO_XAC_NHAN";
const SERVICE_SCHEDULE_REJECT_STATUS_STR = "DA_HUY";
const SERVICE_SCHEDULE_CONFIRM_STATUS_STR = "DA_XAC_NHAN";
const SERVICE_SCHEDULE_DONE_STATUS_STR = "DA_HOAN_THANH";

class Service_Schedule {
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
    this.scheduleType = this.constructor.type;
    this.createAt = create_at;
    this.modifiedAt = null;
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
  const scheduleObj = new Service_Schedule(
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
  service_schedule_id = service_schedule_id.trim();
  async function executor(collection) {
    return await collection.findOne({
      _id: new ObjectId(service_schedule_id),
      scheduleType: Service_Schedule.type,
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

// (async () => {
//   const data = await isScheduleExist("660ee3fcc7f791c91d18c5a1");
//   console.log(data);
// })();

module.exports = {
  createNewSchedule,
  getServiceScheduleById,
  getScheduleById,
  isScheduleExist,
};
