import { authRequest } from './base';

const createArticle = (
  title: string,
  main_image: string,
  intro: string,
  content: string,
  categories: string[]
) => {
  return authRequest<any>({
    url: '/post/article/addArticle',
    method: 'POST',
    body: {
      title,
      main_image,
      intro,
      content,
      categories,
    },
  });
};
const getArticleById = (article_id: string) => {
  return authRequest<any>({
    url: '/post/article/getArticle',
    method: 'POST',
    body: {
      article_id,
    },
  });
};
const getAllArticle = () => {
  return authRequest<any>({
    url: '/post/article/getAllArticleInDB',
    method: 'POST',
  });
};
const getCategori = () => {
  return authRequest<any>({
    url: '/post/article/AllAvailableCategories',
    method: 'POST',
  });
};

const addComment = (article_id: string, comment: string) => {
  return authRequest<any>({
    url: '/post/article/addComment',
    method: 'POST',
    body: {
      article_id,
      comment,
    },
  });
};

const getAllComment = (article_id: string) => {
  return authRequest<any>({
    url: '/post/article/getAllComment',
    method: 'POST',
    body: {
      article_id,
    },
  });
};

const upVoteArticle = (article_id: string) => {
  return authRequest<any>({
    url: '/post/article/upVoteArticle',
    method: 'POST',
    body: {
      article_id,
    },
  });
};

const downVoteArticle = (article_id: string) => {
  return authRequest<any>({
    url: '/post/article/downVoteArticle',
    method: 'POST',
    body: {
      article_id,
    },
  });
};

const isUserFollowedPost = (article_id: string) => {
  return authRequest<any>({
    url: '/post/article/isUserFollowedPost',
    method: 'POST',
    body: {
      article_id,
    },
  });
};

const followArticle = (article_id: string) => {
  return authRequest<any>({
    url: '/post/article/followArticle',
    method: 'POST',
    body: {
      article_id,
    },
  });
};

const unFollowArticle = (article_id: string) => {
  return authRequest<any>({
    url: '/post/article/unFollowArticle',
    method: 'POST',
    body: {
      article_id,
    },
  });
};

const reportArticle = (article_id: string) => {
  return authRequest<any>({
    url: '/post/article/reportArticle',
    method: 'POST',
    body: {
      article_id,
    },
  });
};

const deleteComment = (cmt_id: string) => {
  return authRequest<any>({
    url: '/post/article/deleteComment',
    method: 'POST',
    body: {
      cmt_id,
    },
  });
};

const updateComment = (cmt_id: string, content: string) => {
  return authRequest<any>({
    url: '/post/article/updateComment',
    method: 'POST',
    body: {
      cmt_id,
      content
    },
  });
};



const articleApi = {
  createArticle,
  getArticleById,
  getAllArticle,
  getCategori,
  addComment,
  getAllComment,
  upVoteArticle,
  downVoteArticle,
  isUserFollowedPost,
  followArticle,
  unFollowArticle,
  reportArticle,
  deleteComment,
  updateComment
};

export default articleApi;
