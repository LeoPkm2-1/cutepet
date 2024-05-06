import { authRequest } from './base';

const getAllScheduleForUser = () => {
  return authRequest<any>({
    url: `user/getAllScheduleForUser`,
    method: 'POST',
  });
};
const getAllScheduleForShop = () => {
  return authRequest<any>({
    url: `shop/getAllScheduleForShop`,
    method: 'POST',
  });
};
const getScheduleForUserById = (schedule_id: string) => {
  return authRequest<any>({
    url: `user/getServiceScheduleById`,
    method: 'POST',
    body: {
      schedule_id,
    },
  });
};
const getScheduleForShopById = (schedule_id: string) => {
  return authRequest<any>({
    url: `shop/getServiceById`,
    method: 'POST',
    body: {
      schedule_id,
    },
  });
};


const cancelServiceScheduleFromUser = (schedule_id: string, reason: string,) => {
  return authRequest<any>({
    url: `user/getServiceScheduleById`,
    method: 'POST',
    body: {
      schedule_id,
      reason,
    },
  });
};


const lichApi = {
  getAllScheduleForUser,
  getAllScheduleForShop,
  getScheduleForUserById,
  cancelServiceScheduleFromUser,
  getScheduleForShopById
};

export default lichApi;
