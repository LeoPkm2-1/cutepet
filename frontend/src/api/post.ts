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

const replyCommentStatus = (cmt_id: string, reply: string) => {
  return authRequest<any>({
    url: '/post/statusPost/replyComment',
    method: 'POST',
    body: {
      cmt_id,
      reply,
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
    url: `/post/statusPost/getAllComment`,
    method: 'POST',
    body:{
      post_id: id,
    }
  });
};

const getAllReply= (id: string,) => {
  return authRequest<any>({
    url: `/post/statusPost/getAllReply`,
    method: 'POST',
    body:{
      cmt_id: id,
    }
  });
};

const removePost = (id: string) => {
  return authRequest<any>({
    url: `/post/statusPost/deletePost`,
    method: 'POST',
    body:{
      post_id: id,
    }
  });
};

const removeComment = (id: string) => {
  return authRequest<any>({
    url: `/post/statusPost/deleteComment`,
    method: 'POST',
    body:{
      cmt_id: id,
    }
  });
};

const removeReply = (id: string) => {
  return authRequest<any>({
    url: `/post/statusPost/deleteReply`,
    method: 'POST',
    body:{
      reply_id: id,
    }
  });
};

const postApi = {
  createStatus,
  likeOrUnlikeStatus,
  commentStatus,
  getStatusById,
  getPostStartFrom,
  getAllComment,
  removePost,
  replyCommentStatus,
  getAllReply,
  removeComment,
  removeReply
};

export default postApi;
