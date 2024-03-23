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

const shopApi = {
  getMyShop,
  updateAvatarShop,
  updateShopInfor,
  updateCoverShop
};

export default shopApi;
