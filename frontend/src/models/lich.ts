export interface LichType {
  idLich?: string;
  scheduleName?: string;
  scheduleStatus?: string;
  happenAt?: string;
  imageCover?: string;
  petInfo?: {
    ma_thu_cung: string;
    ten_thu_cung: string;
    anh_thu_cung: string;
  };
  shopInfo?: {
    ma_cua_hang: string | number;
    ten: string;
    anh: string;
  };
  dichVuInfo?: {
    ten: string;
    anh: string;
    ma_dich_vu:string;
    gia: string;
    so_sao: number;
  },
  userInfo?:{
    ten:string | number,
    userId: number,
    anh: string,
    so_dien_thoai: string,
  }
}
