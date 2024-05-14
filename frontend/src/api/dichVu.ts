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

const categoriesForService = (

) => {
  return authRequest<any>({
    url: `/shop/categoriesForService`,
    method: 'POST',
   
  });
};




const filterServices = (
  service_name: string | null,
  service_type: string[] | null,
  num_of_star: number | null,
  price_point:number | null,
  price_search: string |null,
  province_id:string | null,
  district_id:string | null,
  pageNumber:number | null,
  pageSize:number | null,
) => {
  return authRequest<any>({
    url: `shop/filterServices`,
    method: 'POST',
    body: {
      service_name,
      service_type,
      num_of_star,
      price_point,
      price_search,
      province_id,
      district_id,
      pageNumber,
      pageSize,
    },
  });
};

const getVoteInforBefore = (
  service_id : string,
  before: string | null,
  num: number | null,
) => {
  return authRequest<any>({
    url: `shop/getVoteInforBefore`,
    method: 'POST',
   body: {
    service_id,
    before,
    num,
   }
  });
};

const getMyVoteForService = (
  service_id : string,
) => {
  return authRequest<any>({
    url: `/user/getMyVoteForService`,
    method: 'POST',
   body: {
    service_id,

   }
  });
};


const dichVuApi = {
  createServiceSchedule,
  voteService,
  filterServices,
  categoriesForService,
  getVoteInforBefore,
  getMyVoteForService
  
};

export default dichVuApi;
