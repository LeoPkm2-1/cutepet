export interface ShopType {
    id?: string,
    ten?: string,
    email?: string,
    so_dien_thoai?: string,
    tai_khoan?: string,
    shopId: number,
    addressInfor?: any,
    sologan?: string,
    descriptionMsg?: string,
    timeServing?: string,
    coverImageUrl?: string;
    avatarImageUrl?:string;
    numOfStar?: number;
  }
  

  export interface DichVuType {
    idDichVu?: any,
    ma_cua_hang?: string,
    ten_dich_vu?: string,
    mo_ta_ngan?: string,
    mo_ta_dich_vu?: string,
    anh_dich_vu?: string,
    the_loai_dich_vu?: any,
    don_gia?: number | string,
    thoi_luong_dich_vu?: number |string,
    numOfStar?: number;

  }

  