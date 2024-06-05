import { authRequest } from './base';

const sentMessage = (
  receiver_id: number,
  message_type: string,
  message_content: string
) => {
  return authRequest<any>({
    url: `chatting/sendMessage`,
    method: 'POST',
    body: {
      receiver_id,
      message_type,
      message_content,
    },
  });
};
const getMyConversationsList = () => {
  return authRequest<any>({
    url: `chatting/getMyConversationsList`,
    method: 'POST',
  });
};

const getMessagesBeforeTime = (
  before: string,
  num: number,
  chatter_id: number
) => {
  return authRequest<any>({
    url: `chatting/getMessagesBeforeTime`,
    method: 'POST',
    body: {
      before,
      num,
      chatter_id,
    },
  });
};

const markMessagesAsRead = (message_ids: string[]) => {
  return authRequest<any>({
    url: `chatting/markMessagesAsRead`,
    method: 'POST',
    body: {
      message_ids,
    },
  });
};

const messageApi = {
  sentMessage,
  getMyConversationsList,
  getMessagesBeforeTime,
  markMessagesAsRead,
};

export default messageApi;
