const { Response } = require("./../utils");

const followModel = require("../models/theodoi/followModel");

const getNumOfFollewrsForShop = async (req, res) => {
  const { shop_id } = req.body;
  const data = await followModel
    .getListOfUserFollowShop(shop_id)
    .then((data) => data.payload.length);
  console.log({ data });
  res.status(200).json(new Response(200, { num: data }, "Lấy thành công"));
};

module.exports = { getNumOfFollewrsForShop };
