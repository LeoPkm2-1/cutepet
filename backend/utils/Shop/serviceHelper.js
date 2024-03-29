const shopServiceModel = require("../../models/shop/shopServiceModel");

const checkServiceExistById = async (service_id) => {
  const service = await shopServiceModel.getServiceById(service_id);
  // console.log({ service });
  if (Object.keys(service).length == 0) return false;
  return true;
};

// (async () => {
//   const data = await checkServiceExistById("a6006779df4746e55b1e81e8");
//   console.log({data});
// })();

module.exports = { checkServiceExistById };
