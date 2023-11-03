const notificationStructure = require("./../../models/thongbao/notificationStruture");

class RequestAddFriendEvent {
  static getEventName() {
    return notificationStructure.RequestAddFriendNotification.getNotificationType();
  }
  constructor(requestUser, recipient, requestAt = new Date(), message = "") {
    this.requestUser = requestUser;
    this.recipient = recipient;
    this.requestAt = requestAt;
    this.message = message;
  }
}

module.exports = {
  RequestAddFriendEvent,
};
