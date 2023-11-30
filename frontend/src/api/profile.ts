import { authRequest } from './base';

const getMyProfile = () => {
  return authRequest<any>({
    url: `/profile/myProfile`,
    method: 'POST',
  });
};

const getMyPost = (before: any) => {
  return authRequest<any>({
    url: `/profile/myTimelineBackward`,
    method: 'POST',
    body: {
      before,
      num: 10,
    },
  });
};

const getUserProfileById = (user_id: number | string) => {
  return authRequest<any>({
    url: `/profile/userProfile`,
    method: 'POST',
    body: {
      user_id,
    },
  });
};

const getPostUserById = (user_id: number | string, before: any) => {
  return authRequest<any>({
    url: `/profile/userTimelineBackward`,
    method: 'POST',
    body: {
      user_id,
      before,
      num: 10,
    },
  });
};

// Cập nhật thông tin
const updateInfor = (
  ten: string,
  ngay_sinh: string,
  so_dien_thoai: string,
  gioi_tinh: number
) => {
  return authRequest<any>({
    url: `/user/updateInfor`,
    method: 'POST',
    body: {
      ten,
      ngay_sinh,
      so_dien_thoai,
      gioi_tinh,
    },
  });
};

const updateAvatar = (url_anh: string) => {
  return authRequest<any>({
    url: `/user/updateAvatar`,
    method: 'POST',
    body: {
      url_anh,
    },
  });
};

const changePassword = (old_pass:string, new_pass: string,confirm_pass :string) => {
  return authRequest<any>({
    url: `/user/changePassword`,
    method: 'POST',
    body: {
      old_pass,
      new_pass,
      confirm_pass
    },
  });
};


const profileApi = {
  getUserProfileById,
  getMyProfile,
  getMyPost,
  getPostUserById,
  updateInfor,
  updateAvatar,
  changePassword
};

export default profileApi;
