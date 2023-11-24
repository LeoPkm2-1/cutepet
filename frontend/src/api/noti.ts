import { authRequest } from './base';

const getNotificationStartFrom = (index: number, num: number) => {
  return authRequest<any>({
    url: `/notification/getUnReadNotiStartFrom`,
    method: 'POST',
    body: {
      index,
      num,
    },
  });
};
const postNotificationHasReaded = (notif_id: string) => {
  return authRequest<any>({
    url: `/notification/markAsRead`,
    method: 'POST',
    body: {
      notif_id,
    },
  });
};

const markAsRead = () => {
  return authRequest<any>({
    url: `/notification/markAllAsRead`,
    method: 'POST',
  });
};

const notiApi = {
  getNotificationStartFrom,
  postNotificationHasReaded,
  markAsRead,
};

export default notiApi;
