import { authRequest, authRequestWithoutExpCheck } from './base';

const createStatus = (
  visibility: string,
  text: string,
  taggedUsersId: string[] | number[],
  myPetIds: string[] | number[],
  type: string,
  data: string[]
) => {
  return authRequest<any>({
    url: '/post/statusPost/addPost',
    method: 'POST',
    body: {
      text: text,
      visibility,
      taggedUsersId,
      myPetIds,
      media: {
        type: type,
        data: data,
      },
    },
  });
};


const addShareServicePost = (
  text: string,
  visibility: string,
  myPetIds: string[] | number[],
  type: string,
  data: string[],
  service_id:string,

) => {
  return authRequest<any>({
    url: '/post/statusPost/addShareServicePost',
    method: 'POST',
    body: {
      text: text,
      visibility,
      myPetIds,
      media: {
        type: type,
        data: data,
      },
      service_id
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

const getStatusById = (post_id: string) => {
  return authRequest<any>({
    url: `/post/statusPost/getPost`,
    method: 'POST',
    body: {
      post_id,
    },
  });
};
const likeComment = (cmt_id: string) => {
  return authRequest<any>({
    url: `/post/statusPost/likeComment`,
    method: 'POST',
    body: {
      cmt_id,
    },
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

const getPostForNewsfeed = (index: number, PostIdsHaveRendered: string[]) => {
  return authRequest<any>({
    url: `post/statusPost/getPostForNewsfeed`,
    method: 'POST',
    body: {
      index,
      PostIdsHaveRendered,
    },
  });
};

const getAllComment = (id: string) => {
  return authRequest<any>({
    url: `/post/statusPost/getAllComment`,
    method: 'POST',
    body: {
      post_id: id,
    },
  });
};

const getAllReply = (id: string) => {
  return authRequest<any>({
    url: `/post/statusPost/getAllReply`,
    method: 'POST',
    body: {
      cmt_id: id,
    },
  });
};

const removePost = (id: string) => {
  return authRequest<any>({
    url: `/post/statusPost/deletePost`,
    method: 'POST',
    body: {
      post_id: id,
    },
  });
};

const removeComment = (id: string) => {
  return authRequest<any>({
    url: `/post/statusPost/deleteComment`,
    method: 'POST',
    body: {
      cmt_id: id,
    },
  });
};

const removeReply = (id: string) => {
  return authRequest<any>({
    url: `/post/statusPost/deleteReply`,
    method: 'POST',
    body: {
      reply_id: id,
    },
  });
};

const getIsUserFollowedPost = (post_id: string) => {
  return authRequest<any>({
    url: `/post/statusPost/isUserFollowedPost`,
    method: 'POST',
    body: {
      post_id,
    },
  });
};

const followPost = (post_id: string) => {
  return authRequest<any>({
    url: `/post/statusPost/followPost`,
    method: 'POST',
    body: {
      post_id,
    },
  });
};

const unFollowPost = (post_id: string) => {
  return authRequest<any>({
    url: `/post/statusPost/unFollowPost`,
    method: 'POST',
    body: {
      post_id,
    },
  });
};

const reportPost = (post_id: string, report_Reason:string) => {
  return authRequest<any>({
    url: `/post/statusPost/reportPost`,
    method: 'POST',
    body: {
      post_id,
      report_Reason
    },
  });
};

const updateComment = (cmt_id: string, content: string) => {
  return authRequest<any>({
    url: `/post/statusPost/updateComment`,
    method: 'POST',
    body: {
      cmt_id,
      content,
    },
  });
};

const updateReply = (reply_id: string, content: string) => {
  return authRequest<any>({
    url: `/post/statusPost/updateReply`,
    method: 'POST',
    body: {
      reply_id,
      content,
    },
  });
};

const updatePost = (
  post_id: string,
  visibility: string,
  text: string,
  taggedUsersId: string[] | number[],
  myPetIds: string[] | number[],
  data: string[]
) => {
  return authRequest<any>({
    url: `/post/statusPost/updatePost`,
    method: 'POST',
    body: {
      post_id,
      text,
      visibility,
      taggedUsersId,
      myPetIds,
      media: {
        type: 'images',
        data: data,
      },
    },
  });
};

const getCommentStartFrom = (post_id: string, index: number, num: number) => {
  return authRequest<any>({
    url: `/post/statusPost/getCommentStartFrom`,
    method: 'POST',
    body: {
      post_id,
      index,
      num,
    },
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
  removeReply,
  getPostForNewsfeed,
  getIsUserFollowedPost,
  followPost,
  unFollowPost,
  reportPost,
  likeComment,
  updateComment,
  updateReply,
  updatePost,
  getCommentStartFrom,
  addShareServicePost
};

export default postApi;
