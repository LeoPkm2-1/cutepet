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

const responeAddFriend = (
  senderID: number | string,
  acceptOrReject: string
) => {
  return authRequest<any>({
    url: `/friend/responeAddFriendRequestById`,
    method: 'POST',
    body: {
      senderID,
      acceptOrReject,
    },
  });
};

const unFriendById = (friend_id: number | string) => {
  return authRequest<any>({
    url: `/friend/unfriendById`,
    method: 'POST',
    body: {
      friend_id,
    },
  });
};

const addFriendById = (requestID: number | string) => {
  return authRequest<any>({
    url: `/friend/requestAddFriendById`,
    method: 'POST',
    body: {
      requestID,
    },
  });
};

const searchPeople = (searchKey: string, index: number, num: number) => {
  return authRequest<any>({
    url: `/user/searchPeople`,
    method: 'POST',
    body: {
      searchKey,
      index,
      num,
    },
  });
};

const removeRequestAddFriendById = (requestID: number | string) => {
  return authRequest<any>({
    url: `/friend/removeRequestAddFriendById`,
    method: 'POST',
    body: {
      requestID,
    },
  });
};

const getListSuggestedFriends = () => {
  return authRequest<any>({
    url: `/friend/getListSuggestedFriends`,
    method: 'POST',
  });
};



const friendApi = {
  unFriendById,
  addFriendById,
  getListFriend,
  searchPeople,
  getRequestAddFriendList,
  responeAddFriend,
  removeRequestAddFriendById,
  getListSuggestedFriends
};

export default friendApi;
