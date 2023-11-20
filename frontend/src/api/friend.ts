import { authRequest } from './base';

const getListFriend = () => {
  return authRequest<any>({
    url: `/friend/getFriendList`,
    method: 'POST',
  });
};

const getRequestAddFriendList = () => {
  return authRequest<any>({
    url: `/friend/getRequestAddFriendList`,
    method: 'POST',
  });
};


const searchPeople = (searchKey: string, index: number, num: number) => {
  return authRequest<any>({
    url: `/user/searchPeople`,
    method: 'POST',
    body: {
      searchKey,
      index,
      num
    }
  });
};

const friendApi = {
  getListFriend,
  searchPeople,
  getRequestAddFriendList
};

export default friendApi;
