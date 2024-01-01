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
};

const extracValuesOfFieldFromListObjs = (arr, field) => {
  if (arr.length === 0) return [];
  return arr.map((obj) => obj[field]);
};

// Generate three random, distinct numbers between 1 and 10
function generateNumRandomNumbersInRangeOf10(numOfRandomNumbers) {
  const randomNumbers = [];

  while (randomNumbers.length < numOfRandomNumbers) {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }

  return randomNumbers;
}

// const data = generateNumRandomNumbersInRangeOf10(5);
// console.log({ data });

// (async function () {
// 	const data = extracValuesOfFieldFromListObjs([
// 	  { key: 1 },
// 	  { key: 2 },
// 	],'key');
// 	console.log(data);
//   })();

// ( ()=> {
// 	const arr = [
// 		{name: 'a', age: 1,class:'a-1'},
// 		{name: 'b', age: 2,class:'b-2'},
// 		{name: 'c', age: 3,class:'c-3'},
// 		{name: 'd', age: 3,class:'d-3'},
// 	];
// 	const data = filter_keys_in_list_Objs(arr,['class','age']);
// 	console.log(data);
// })()

const isDateValid = (date) => {
  return date.toString() !== "Invalid Date";
};

const isPhoneNumberValid = (phone_number) => {
  const numericStringPattern = /^\d{4,12}$/;
  return numericStringPattern.test(phone_number);
};

const isValidVietnameseName = (name) => {
  // check both Vietnamese and English characters
  const vietnameseNamePattern = /^[\p{L} ]{1,32}$/u;
  return vietnameseNamePattern.test(name);
};

const areTwoSetsEqual = (setA, setB) => {
  return [...setA].every((value) => setB.has(value)) && setA.size === setB.size;
};

module.exports = {
  filter_keys_in_Obj,
  filter_keys_in_list_Objs,
  isDateValid,
  extracValuesOfFieldFromListObjs,
  isPhoneNumberValid,
  isValidVietnameseName,
  generateNumRandomNumbersInRangeOf10,
  areTwoSetsEqual,
};

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
