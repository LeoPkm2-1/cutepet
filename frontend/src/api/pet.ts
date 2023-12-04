import { authRequest } from './base';

const getAllPet = () => {
  return authRequest<any>({
    url: `/pet/getAllMyPets`,
    method: 'POST',
  });
};

const getLoai = () => {
  return authRequest<any>({
    url: `/giongloai/danhsachloai`,
    method: 'POST',
  });
};

const getGiong = (ma_loai: number) => {
  return authRequest<any>({
    url: `/giongloai/danhsachgiongTheoLoai/`,
    method: 'POST',
    body: {
      ma_loai,
    },
  });
};

const addPet = (
  ten_thu_cung: string,
  ngay_sinh: string,
  gioi_tinh: number,
  ghi_chu: string,
  ma_loai: number,
  ma_giong: number,
  url_anh: string,
  chieu_cao: number,
  can_nang: number
) => {
  return authRequest<any>({
    url: `/pet/addpet`,
    method: 'POST',
    body: {
      ten_thu_cung,
      ngay_sinh,
      gioi_tinh,
      ghi_chu,
      ma_loai,
      ma_giong,
      url_anh,
      chieu_cao,
      can_nang,
    },
  });
};

const deletePet = (pet_id: number) => {
  return authRequest<any>({
    url: `/pet/deletePet`,
    method: 'POST',
    body: {
      pet_id,
    },
  });
};

const getPostHavePet = (pet_id: number |string, before: any, num: number) => {
  return authRequest<any>({
    url: `/post/statusPost/getPostHavePet`,
    method: 'POST',
    body: {
      pet_id,
      before,
      num
    },
  });
};


const getPetById = (pet_id: number|string) => {
  return authRequest<any>({
    url: `/pet/infor`,
    method: 'POST',
    body: {
      pet_id,
    },
  });
};

const updatePetById = (pet_id: number|string, ten_thu_cung:string,ngay_sinh:string, gioi_tinh:number, ghi_chu: string, ma_giong: number) => {
  return authRequest<any>({
    url: `/pet/capnhatthongtin/${pet_id}`,
    method: 'POST',
    body: {
      ten_thu_cung,
      ngay_sinh,
      gioi_tinh,
      ghi_chu,
      ma_giong
    },
  });
};


const petApi = {
  getLoai,
  getAllPet,
  addPet,
  getGiong,
  deletePet,
  getPostHavePet,
  getPetById,
  updatePetById
};

export default petApi;
