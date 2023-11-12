const petHeper = require("../utils/petHelper");
const { Response } = require("./../utils/index");

// pre-processer of add pet controller: cleaning and standard input data.
const addPetMiddleWare = (req, res, next) => {
  if (req.body.url_anh == "" || typeof req.body.url_anh === "undefined") {
    req.body.url_anh = undefined;
  }
  const { can_nang, chieu_cao, ghi_chu } = req.body;
  if (
    can_nang == "" ||
    can_nang == "undefined" ||
    typeof can_nang === undefined ||
    can_nang == null ||
    can_nang == "null" ||
    parseFloat(can_nang) <= 0
  ) {
    req.body.can_nang = undefined;
  }
  if (
    chieu_cao == "" ||
    chieu_cao == "undefined" ||
    typeof chieu_cao === undefined ||
    chieu_cao == null ||
    chieu_cao == "null" ||
    parseFloat(chieu_cao) <= 0
  ) {
    req.body.chieu_cao = undefined;
  }
  if (typeof ghi_chu === "undefined") {
    req.body.ghi_chu = "";
  }
  next();
};

const preChangePet = async (req, res, next) => {
  const { pet_id } = req.body;
  const isExist = await petHeper.isPetExist(pet_id);
  const user_id = req.auth_decoded.ma_nguoi_dung;
  // response if pet is not exist
  if (!isExist) {
    res
      .status(400)
      .json(new Response(400, [], "thú cưng không tồn tại", 300, 300));
    return;
  }
  const areYouOwnerOfPet = await petHeper.isOwnPet(pet_id, user_id);
  if (!areYouOwnerOfPet) {
    res
      .status(400)
      .json(new Response(400, [], "bạn không phải là chủ thú cưng", 300, 300));
    return;
  }
  next();
};

module.exports = {
  addPetMiddleWare,
  preChangePet,
};
