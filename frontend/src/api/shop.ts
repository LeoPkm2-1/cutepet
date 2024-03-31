import { authRequest } from './base';

const getMyShop = (shop_id: number) => {
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
  ma_cua_hang: any,
  mo_ta_dich_vu: string,
  anh_dich_vu: string,
  the_loai_dich_vu: string,
  don_gia: number | string,
  thoi_luong_dich_vu: number | string
) => {
  return authRequest<any>({
    url: `/shop/addService`,
    method: 'POST',
    body: {
      ten_dich_vu,
      ma_cua_hang,
      mo_ta_dich_vu,
      anh_dich_vu,
      the_loai_dich_vu,
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



const shopApi = {
  getMyShop,
  updateAvatarShop,
  updateShopInfor,
  updateCoverShop,
  addService,
  getAllAvailableServiceOfShop
};

export default shopApi;
