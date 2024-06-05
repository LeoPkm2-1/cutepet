import { authRequest } from './base';



const getAllProvinces = (

) => {
  return authRequest<any>({
    url: `address/hanhchinh/getAllProvinces`,
    method: 'POST',
  });
};

const getAllDistrictsOfProvince = (
  province_id: string |number
) => {
  return authRequest<any>({
    url: `address/hanhchinh/getAllDistrictsOfProvince`,
    method: 'POST',
    body:{
      province_id
    }
  });
};


const getAllWardsOfDistrict = (
  district_id: string |number
) => {
  return authRequest<any>({
    url: `address/hanhchinh/getAllWardsOfDistrict`,
    method: 'POST',
    body:{
      district_id
    }
  });
};



const addressApi = {
  getAllProvinces,
  getAllDistrictsOfProvince,
  getAllWardsOfDistrict
};

export default addressApi;
