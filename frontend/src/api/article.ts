import { authRequest } from "./base";

const createArticle = (title:string, main_image: string,intro:string, content:string,categories:string[]) => {
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
  const getArticleById = (article_id:string) => {
    return authRequest<any>({
      url: '/post/article/getArticle',
      method: 'POST',
      body: {
        article_id
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



  const articleApi = {
    createArticle,
    getArticleById,
    getAllArticle,
    getCategori
  };
  
  export default articleApi;