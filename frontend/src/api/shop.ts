import { authRequest } from './base';

const getMyShop = (shop_id: number | string) => {
  return authRequest<any>({
    url: `/shop/getShopInforById`,
    method: 'POST',
    body: {
      shop_id,
    },
  });
};
const updateAvatarShop = (url_anh_chinh: string) => {
  return authRequest<any>({
    url: `/shop/updateShopMainImage`,
    method: 'POST',
    body: {
      url_anh_chinh,
    },
  });
};
const updateCoverShop = (url_anh_bia: string) => {
  return authRequest<any>({
    url: `/shop/updateShopCoverImage`,
    method: 'POST',
    body: {
      url_anh_bia,
    },
  });
};

const updateShopInfor = (
  ten_cua_hang: string,
  dia_chi: any,
  so_dien_thoai: string,
  khau_hieu: string,
  mo_ta_cua_hang: string,
  thoi_gian_lam_viec: any
) => {
  return authRequest<any>({
    url: `/shop/updateShopInfor`,
    method: 'POST',
    body: {
      ten_cua_hang,
      dia_chi,
      so_dien_thoai,
      khau_hieu,
      mo_ta_cua_hang,
      thoi_gian_lam_viec,
    },
  });
};

const addService = (
  ten_dich_vu: string,
  mo_ta_ngan: string,
  ma_cua_hang: any,
  mo_ta_dich_vu: string,
  anh_dich_vu: string,
  the_loai_dich_vu: string,
  danh_sach_loai_phu_hop: string[],
  don_gia: number | string,
  thoi_luong_dich_vu: number | string
) => {
  return authRequest<any>({
    url: `/shop/addService`,
    method: 'POST',
    body: {
      ten_dich_vu,
      mo_ta_ngan,
      ma_cua_hang,
      mo_ta_dich_vu,
      anh_dich_vu,
      the_loai_dich_vu,
      danh_sach_loai_phu_hop,
      don_gia,
      thoi_luong_dich_vu,
    },
  });
};

const getAllAvailableServiceOfShop = (shop_id: string | number) => {
  return authRequest<any>({
    url: `/shop/getAllAvailableServiceOfShop`,
    method: 'POST',
    body: {
      shop_id,
    },
  });
};

const getServiceById = (service_id: string | number) => {
  return authRequest<any>({
    url: `/shop/getServiceById`,
    method: 'POST',
    body: {
      service_id,
    },
  });
};

const updateService = (
  service_id: string,
  ten_dich_vu: string,
  mo_ta_ngan: string,
  mo_ta_dich_vu: string,
  anh_dich_vu: string,
  the_loai_dich_vu: string[],
  danh_sach_loai_phu_hop: string[],
  don_gia: string | number,
  thoi_luong_dich_vu: string | number
) => {
  return authRequest<any>({
    url: `/shop/updateService`,
    method: 'POST',
    body: {
      service_id,
      ten_dich_vu,
      mo_ta_ngan,
      mo_ta_dich_vu,
      anh_dich_vu,
      the_loai_dich_vu,
      danh_sach_loai_phu_hop,
      don_gia,
      thoi_luong_dich_vu,
    },
  });
};

const deleteService = (service_id: string | number) => {
  return authRequest<any>({
    url: `shop/deleteService`,
    method: 'POST',
    body: {
      service_id,
    },
  });
};

const numFollowerOfShop = (shop_id: string | number) => {
  return authRequest<any>({
    url: `/dashboard/numFollowerOfShop`,
    method: 'POST',
    body: {
      shop_id,
    },
  });
};

const getAllVoteOfShop = (shop_id: string | number) => {
  return authRequest<any>({
    url: `/user/getAllVoteOfShop`,
    method: 'POST',
    body: {
      shop_id,
    },
  });
};

const checkOnlineStatusOfShop = (shop_id: string | number) => {
  return authRequest<any>({
    url: `/shop/checkOnlineStatusOfShop`,
    method: 'POST',
    body: {
      shop_id,
    },
  });
};

const hasFollowedShop = (shop_id: string | number) => {
  return authRequest<any>({
    url: `/user/hasFollowedShop`,
    method: 'POST',
    body: {
      shop_id,
    },
  });
};

const getVoteInforOfUserForService = (
  user_id: string | number,
  service_id: string | number
) => {
  return authRequest<any>({
    url: `shop/getVoteInforOfUserForService`,
    method: 'POST',
    body: {
      user_id,
      service_id,
    },
  });
};

const filterSchedulesListForShop = (
  schedule_status: string | null,
  start_time: string | null,
  end_time: string | null,
  service_id: string | null
) => {
  return authRequest<any>({
    url: `dashboard/filterSchedulesListForShop`,
    method: 'POST',
    body: {
      schedule_status,
      start_time,
      end_time,
      service_id,
    },
  });
};

const getListFollowersOfShop = (
  shop_id: string | number | null,
  start_time: string | null,
  end_time: string | null,
) => {
  return authRequest<any>({
    url: `/dashboard/getListFollowersOfShop`,
    method: 'POST',
    body: {
      shop_id,
      start_time,
      end_time,

    },
  });
};



const shopApi = {
  getMyShop,
  updateAvatarShop,
  updateShopInfor,
  updateCoverShop,
  addService,
  getAllAvailableServiceOfShop,
  getServiceById,
  updateService,
  deleteService,
  numFollowerOfShop,
  getAllVoteOfShop,
  checkOnlineStatusOfShop,
  hasFollowedShop,
  getVoteInforOfUserForService,
  filterSchedulesListForShop,
  getListFollowersOfShop
};

export default shopApi;
