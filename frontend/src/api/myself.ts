import { compressImage } from "../helper/upload";
import { User } from "../models/user";
import { UserProfile } from "../models/user-profile";
import { authRequest } from "./base";

const getProfile = () => {
  return authRequest<UserProfile>({
    url: "/myself",
    method: "GET",
  });
};

const patchMySelf = async (info: Partial<User>) => {
  const data = new FormData();
  [
    "displayName",
    "aliasName",
    "locale",
    "timezoneName",
    "age",
    "anonymous",
    "additionalProp",
  ].forEach((key) => {
    const field = key as keyof typeof info;
    if (["boolean", "number", "string"].includes(typeof info[field])) {
      // @ts-ignore
      data.append(field, info[field]!);
    } else if (info[field]) {
      data.append(field, JSON.stringify(info[field]));
    }
  });
  // only add photoURL if coverImg is empty
  if (info.avatar) {
    data.append("avatar", await compressImage(info.avatar), info.avatar.name);
  } else if (info.photoURL) {
    data.append("photoURL", info.photoURL);
  }

  // data.

  return await authRequest<User>({
    url: `/myself`,
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: data,
  });
};

export const myselfApi = {
  getProfile,
  patchMySelf,
};
