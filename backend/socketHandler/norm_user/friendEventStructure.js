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

class AcceptAddFriendEvent {
  static getEventName() {
    return notificationStructure.AcceptAddFriendNotification.getNotificationType();
  }

  constructor(acceptUser, requestUser, acceptAt = new Date(), message = "") {
    this.acceptUser = acceptUser;
    this.requestUser = requestUser;
    this.acceptAt = acceptAt;
    this.message = message;
  }
}

module.exports = {
  RequestAddFriendEvent,
  AcceptAddFriendEvent,
};
