import { authRequest } from './base';

const getListFriend = () => {
  return authRequest<any>({
    url: `/friend/getFriendList`,
    method: 'GET',
  });
};
const friendApi = {
  getListFriend,
};

export default friendApi;
