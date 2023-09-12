import _ from "lodash";

export function getDifferenceFrom<T>(obj1: T, obj2: T, keys: Array<keyof T>) {
  const result: Partial<T> = {};
  keys.forEach((key) => {
    if (!_.isEqual(obj1[key], obj2[key])) {
      if (typeof obj1[key] !== "undefined" && obj1[key] != null)
        result[key] = obj1[key];
    }
  });
  return result;
}
