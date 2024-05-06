import { authRequest } from './base';

const createServiceSchedule = (
  service_id: string,
  schedule_name: string,
  pet_id: string | number,
  happen_at: string
) => {
  return authRequest<any>({
    url: `user/createServiceSchedule`,
    method: 'POST',
    body: {
      service_id,
      schedule_name,
      pet_id,
      happen_at,
    },
  });
};

const voteService = (
  service_id: string,
  num_of_star: number,
  content: string
) => {
  return authRequest<any>({
    url: `shop/voteService`,
    method: 'POST',
    body: {
      service_id,
      num_of_star,
      content
    },
  });
};

const dichVuApi = {
  createServiceSchedule,
  voteService
};

export default dichVuApi;
