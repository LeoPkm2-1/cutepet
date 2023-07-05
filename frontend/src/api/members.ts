// import { Group, Member } from '../models/members';
// import { authRequest, QueryType } from './base';
import { Moment } from 'moment';
import { Company } from '../models/company';
import { Group } from '../models/members';
import { authRequest, ListPaginationResponse } from './base';


// const getGroups = (query?: QueryType) => {
//   // return authRequest<UserProfile>({
//   //   url: "/myself",
//   //   method: "GET",
//   // });
//   return waitOn(200).then(() => {
//     return groups;
//   });
// };

// const getGroupDetail = (
//   id: string | number,
//   query?: QueryType
// ): Promise<Group> => {
//   // return authRequest<UserProfile>({
//   //   url: "/myself",
//   //   method: "GET",
//   // });
//   return waitOn(200).then(() => {
//     const res: Group = {
//       id: +id,
//       name: 'Dev Team',
//       completedPractice: 50,
//       createdAt: '2022-05-02',
//       numberOfMembers: 50,
//       description: '',
//       members: +id % 2 ? members : undefined,
//       subGroups: !(+id % 2)
//         ? groups.map((g) => ({
//             ...g,
//             id: +`${id}${g.id}`,
//             name: `${g.name} id`,
//           }))
//         : undefined,
//     };
//     return res;
//   });
// };

// export const membersApi = {
//   getGroups,
//   getGroupDetail,
// };

// function waitOn(ms: number) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// const members: Member[] = [
//   {
//     id: 11236946971937,
//     name: 'Nguyen Van A',
//     email: 'nguyenvana@gmail.com',
//     completedPractice: 29,
//     signedAt: '2022-05-01',
//   },
//   {
//     id: 21238749618937,
//     name: 'Nguyen Van B',
//     email: 'nguyenvanb@gmail.com',
//     completedPractice: 30,
//     signedAt: '2022-05-02',
//   },
//   {
//     id: 312387647613813,
//     name: 'Nguyen Van C',
//     email: 'nguyenvanc@gmail.com',
//     completedPractice: 90,
//     signedAt: '2022-05-02',
//   },
//   {
//     id: 448126461532876,
//     name: 'Nguyen Van D',
//     email: 'nguyenvand@gmail.com',
//     completedPractice: 91,
//   },
// ];
// // const groups: Group[] = [
// //   {
// //     id: 1,
// //     name: 'Dev Team',
// //     description: 'Lorem development',
// //     completedPractice: 29,
// //     createdAt: '2022-05-01',
// //     numberOfMembers: 100,
// //   },
// //   {
// //     id: 2,
// //     name: 'OP Team',
// //     description: 'Lorem operating issum',
// //     completedPractice: 30,
// //     createdAt: '2022-05-02',
// //     numberOfMembers: 50,
// //   },
// //   {
// //     id: 3,
// //     name: 'Marketing Team',
// //     description: 'Lorem marketing issum',
// //     completedPractice: 90,
// //     createdAt: '2022-05-02',
// //     numberOfMembers: 50,
// //   },
// //   {
// //     id: 4,
// //     name: 'Saling Team',
// //     description: 'Lorem saling issum',
// //     completedPractice: 91,
// //     createdAt: '2022-05-02',
// //     numberOfMembers: 20,
// //   },
// // ];

const deleteMembers= (
    companyId: string,
    groupId: string,
    payload: string[]
  ) => {
    return authRequest<any[]>({
      url: `/companies/${companyId}/groups/${groupId}/members`,
      method: 'DELETE',
      body: payload,
    });
  };

  export const membersApi = {
    deleteMembers,
  };
