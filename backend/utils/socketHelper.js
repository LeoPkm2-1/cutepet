function getPrivateRoomNameOfUser(userId) {
  return `private-user_${userId}`;
}
  

module.exports = { getPrivateRoomNameOfUser };