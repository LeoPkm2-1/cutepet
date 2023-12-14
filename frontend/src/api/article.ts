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

const editArticle = (
  article_id: string,
  title: string,
  main_image: string,
  intro: string,
  content: string,
  categories: string[]
) => {
  return authRequest<any>({
    url: '/post/article/editArticle',
    method: 'POST',
    body: {
      article_id,
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

const reportArticle = (article_id: string, report_Reason: string) => {
  return authRequest<any>({
    url: '/post/article/reportArticle',
    method: 'POST',
    body: {
      article_id,
      report_Reason,
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
      content,
    },
  });
};

const filterArticles = (
  searchKey: string | null,
  tags: string[] | null,
  index: number | null,
  num: number | null
) => {
  return authRequest<any>({
    url: '/post/article/filterArticles',
    method: 'POST',
    body: {
      searchKey,
      tags,
      index,
      num,
    },
  });
};

const removeArticles = (article_id: string) => {
  return authRequest<any>({
    url: '/post/article/deleteArticle',
    method: 'POST',
    body: {
      article_id,
    },
  });
};

const getCommentStartFrom = (
  article_id: string,
  index: number,
  num: number
) => {
  return authRequest<any>({
    url: 'post/article/getCommentStartFrom',
    method: 'POST',
    body: {
      article_id,
      index,
      num,
    },
  });
};

const getAllAuthorOfArticle = () => {
  return authRequest<any>({
    url: '/post/article/getAllAuthorOfArticle',
    method: 'POST',
  });
};

const filterArticles_v2 = (
  searchKey: string | null,
  tags: string[] | null,
  sortBy:
    | 'TIME_NEWEST_TO_OLDEST'
    | 'TIME_OLDEST_TO_NEWEST'
    | 'NUM_OF_COMMENT_DESC'
    | 'NUM_OF_COMMENT_ASC'
    | 'SCORE_DESC'
    | 'SCORE_ASC',
  authorId: number | null,
  index: number | null,
  num: number | null
) => {
  return authRequest<any>({
    url: '/post/article/filterArticles_v2',
    method: 'POST',
    body: {
      searchKey,
      tags,
      sortBy,
      authorId,
      index,
      num,
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
  updateComment,
  filterArticles,
  editArticle,
  removeArticles,
  getCommentStartFrom,
  getAllAuthorOfArticle,
  filterArticles_v2
};

export default articleApi;
