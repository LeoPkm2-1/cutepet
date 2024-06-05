const { normUserNamespace } = require("../socketHandler/norm_user");
const userOnlineModel = require("../models/UserOnline/userOnlineModel");
const socketHelper = require("./../utils/socketHelper");
const {
  addChangeServiceScheduleStatus,
} = require("../models/thongbao/serviceSchedule");
const {
  ServiceScheduleChangeStatus,
} = require("../models/thongbao/notificationStruture");

const nofifyChangeStatusServiceSchedule = async (reciever_id, infor) => {
  await addChangeServiceScheduleStatus(reciever_id, infor);
  const isRecipientOnline = await userOnlineModel.isUserOnline(reciever_id);
  if (isRecipientOnline) {
    const socketNameOfRecipient =
      socketHelper.getPrivateRoomNameOfUser(reciever_id);
    normUserNamespace.to(socketNameOfRecipient).emit("NEW_EVENT", {
      type: ServiceScheduleChangeStatus.NOTIFICATION_TYPE,
      payload: infor,
    });
  }
};

// (async () => {
//     await nofifyChangeStatusServiceSchedule(1,2)
// })()

module.exports = {
  nofifyChangeStatusServiceSchedule,
};
