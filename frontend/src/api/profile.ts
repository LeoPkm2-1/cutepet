import { authRequest } from './base';

const getMyProfile = () => {
  return authRequest<any>({
    url: `/profile/myProfile`,
    method: 'POST',
  });
};

const getMyPost = () => {
  return authRequest<any>({
    url: `/profile/myTimelineBackward`,
    method: 'POST',
    body: {
      before: new Date(),
      num: 100,
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

const getPostUserById = (user_id: number | string) => {
  return authRequest<any>({
    url: `/profile/userTimelineBackward`,
    method: 'POST',
    body: {
      user_id,
      before: new Date(),
      num: 100,
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
