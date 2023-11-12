class UserOnline {
  constructor(
    userId,
    isOnline = true,
    recordAt = new Date(),
    numOfDevices = 1
  ) {
    this.userId = userId;
    this.isOnline = isOnline;
    this.recordAt = recordAt;
    this.numOfDevices = numOfDevices;
  }
}

module.exports = {
  UserOnline,
};
