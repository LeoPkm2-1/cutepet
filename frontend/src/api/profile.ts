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

const getPostUserById = (user_id: number | string, before:any,) => {
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

const profileApi = {
  getUserProfileById,
  getMyProfile,
  getMyPost,
  getPostUserById
};

export default profileApi;
