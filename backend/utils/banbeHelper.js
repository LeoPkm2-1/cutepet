const laBanBeModel = require('../models/laBanBeModel');

async function haveFriendShipBetween(idUser_1, idUser_2) {
  const data = await laBanBeModel.friendShipInforBetween(idUser_1, idUser_2);
  return data.payload.length > 0;
}

// (async () => {
//   const data = await haveFriendShipBetween(1, 'adasda');
//   console.log(data);
// })();

module.exports = {
  haveFriendShipBetween
}