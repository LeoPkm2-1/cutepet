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

const isVaildInt = (value) => {
  value = parseInt(value);
  return !isNaN(value);
};

const isValidNumber = (value) => {
  // console.log(parseFloat(value));
  // return typeof value == "number" || !isNaN(parseFloat(value));
  return /^-?\d+(\.\d+)?$/.test(value) && Number.isFinite(parseFloat(value));
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
  isVaildInt,
  isValidNumber,
};
