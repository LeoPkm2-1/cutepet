import { authRequest, authRequestWithoutExpCheck } from './base';

const createStatus = (text: string, type: string, data: string[]) => {
  return authRequest<any>({
    url: '/post/statusPost/addPost',
    method: 'POST',
    body: {
      text: text,
      media: {
        type: type,
        data: data,
      },
    },
  });
};
const likeOrUnlikeStatus = (post_id: string) => {
  return authRequest<any>({
    url: '/post/statusPost/likePost',
    method: 'POST',
    body: {
      post_id,
    },
  });
};

const commentStatus = (post_id: string, comment: string) => {
  return authRequest<any>({
    url: '/post/statusPost/addComment',
    method: 'POST',
    body: {
      post_id,
      comment,
    },
  });
};

const getStatusById = (id: string) => {
  return authRequest<any>({
    url: `/post/statusPost/getPost?post_id=${id}`,
    method: 'GET',
  });
};

const getPostStartFrom = (index: number, num: number) => {
  return authRequest<any>({
    url: `post/statusPost/getPostStartFrom`,
    method: 'POST',
    body: {
      index,
      num,
    },
  });
};


const getAllComment = (id: string,) => {
  return authRequest<any>({
    url: `/post/statusPost/getAllComment?post_id=${id}`,
    method: 'GET',
  });
};

const postApi = {
  createStatus,
  likeOrUnlikeStatus,
  commentStatus,
  getStatusById,
  getPostStartFrom,
  getAllComment
};

export default postApi;
