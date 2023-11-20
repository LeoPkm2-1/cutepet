import { authRequest } from './base';

const getAllPet = () => {
  return authRequest<any>({
    url: `/pet/getAllMyPets`,
    method: 'POST',
  });
};

const getLoai = () => {
  return authRequest<any>({
    url: `/giongloai/danhsachloai`,
    method: 'POST',
  });
};


// const searchPeople = (searchKey: string, index: number, num: number) => {
//   return authRequest<any>({
//     url: `/user/searchPeople`,
//     method: 'POST',
//     body: {
//       searchKey,
//       index,
//       num
//     }
//   });
// };

const petApi = {
    getLoai,
    getAllPet
};

export default petApi;
