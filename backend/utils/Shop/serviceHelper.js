const shopServiceModel = require("../../models/shop/shopServiceModel");

const checkServiceExistById = async (service_id) => {
  const service = await shopServiceModel.getServiceById(service_id);
  // console.log({ service });
  if (Object.keys(service).length == 0) return false;
  return true;
};

const caculateAverageNumOfStarOfService = async (service_id) => {
  const list_of_vote_infor = await shopServiceModel.getAllVoteOfService(
    service_id
  );
  const num_star_list = list_of_vote_infor.map((vote) => vote.numOfStar);
  if (num_star_list.length == 0) return 0;
  // console.log(num_star_list);
  return (
    num_star_list.reduce((acc, curr) => acc + curr, 0) / num_star_list.length
  );
};

const reUpdateNumOfStarOfService = async (service_id) => {
  const star_score = await caculateAverageNumOfStarOfService(service_id);
  // console.log({star_score});
  return await shopServiceModel.updateAverageStarForService(
    service_id,
    star_score
  );
};

// (async () => {
//   const data = await reUpdateNumOfStarOfService(
//     "6610e4c2034b2c1379d2b7fc"
//   );
//   console.log({data});
// })();

module.exports = {
  checkServiceExistById,
  caculateAverageNumOfStarOfService,
  reUpdateNumOfStarOfService,
};
