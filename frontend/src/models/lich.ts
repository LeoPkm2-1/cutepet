export interface LichType {
  idLich?: string;
  scheduleName?: string;
  scheduleStatus?: string;
  happenAt?: string;
  imageCover?: string;
  petId?: string| number;
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
    ten:string,
    userId: number,
    anh: string,
    so_dien_thoai: string,
  }
}
