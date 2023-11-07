import { authRequest } from './base';

const getNotificationStartFrom = (index: number, num: number) => {
  return authRequest<any>({
    url: `/notification/getNotificationStartFrom`,
    method: 'POST',
    body: {
        index,
        num
    }
  });
};
const postNotificationHasReaded = (notif_id: string) => {
  return authRequest<any>({
    url: `/notification/markAsRead`,
    method: 'POST',
    body: {
      notif_id,
    }
  });
};
const notiApi = {
    getNotificationStartFrom,
    postNotificationHasReaded
};

export default notiApi;
