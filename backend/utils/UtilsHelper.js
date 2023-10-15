const filter_keys_in_Obj = (obj, keys) => {
	if (Object.keys(obj).length === 0) return {};
	if (keys.length === 0) return obj;
	const exist_keys = keys.filter((key) => obj.hasOwnProperty(key));
	result = {};
	exist_keys.forEach((key) => (result[key] = obj[key]));
	return result;
};

const filter_keys_in_list_Objs = (arr, keys) => {
  if (arr.length === 0) return [];
  return arr.map((obj) => filter_keys_in_Obj(obj, keys));
}

module.exports = { filter_keys_in_Obj, filter_keys_in_list_Objs };

// let obj = {
// 	_id: '652b43613183518b824f22b0',
// 	type: 'FOLOW_STATUS_POST',
// 	followed_Obj_Id: '652a98e062b2b7eaf6d45126',
// 	follower_Id: 4,
// 	createAt: '2023-10-15T01:41:53.812Z',
// 	dependOn: null,
// 	modifiedAt: null,
// };
// const list_Obj = [
//   {
//     _id: '652b43613183518b824f22b0',
//     type: 'FOLOW_STATUS_POST',
//     followed_Obj_Id: '652a98e062b2b7eaf6d45126',
//     follower_Id: 4,
//     createAt: '2023-10-15T01:41:53.812Z',
//     dependOn: null,
//     modifiedAt: null,
//   },
//   {
//     _id: 'undefined',
//     type: 'FOLOW_STATUS_POST',
//     followed_Obj_Id: 'undefined',
//     follower_Id: 4,
//     createAt: '812Z',
//     dependOn: undefined,
//     modifiedAt: null,
//   }
// ]

// console.log(filter_keys_in_list_Objs(list_Obj,['_id','createAt']));
