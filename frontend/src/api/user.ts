import { compressImage } from "../helper/upload";
import {
  AccountType,
  CreateAccountPayload,
  RTDUser,
  User,
} from "../models/user";
import {
  authRequest,
  CancelOption,
  ListPagination,
  ListPaginationResponse,
} from "./base";

const getUserInfo = (
  userId: number | string,
  query?: {
    includeAdditionalProp?: boolean;
    fieldNames?: keyof User;
  }
) => {
  return authRequest<User>({
    url: `/users/${userId}`,
    query,
    method: "GET",
  });
};

const getMultiUserInfo = (userIds: number[]) => {
  return authRequest<User[]>({
    url: "/users",
    method: "PUT",
    body: { userIds },
  });
};

const getUsers = (query?: GetUserQueryData, cancelOptions?: CancelOption) => {
  const page = +(query?.page ?? 1);
  const limit = +(query?.limit ?? 20);
  const offset = (page - 1) * limit;
  return authRequest<ListPaginationResponse<User>>(
    {
      url: "/users",
      query: {
        accountType: query?.accountType,
        search: query?.search,
        pgOffset: offset,
        pgLimit: limit,
      },
      method: "GET",
    },
    cancelOptions
  ).then(
    (res) =>
      ({
        items: res.items,
        currentPage: res.pageIndex + 1,
        limit: res.totalItems,
        totalPages: res.totalPages,
      } as ListPagination<User>)
  );
};

const postCreateAccount = (data: Partial<CreateAccountPayload>) => {
  return authRequest<RTDUser>({
    url: "/users",
    method: "POST",
    body: data,
  });
};

const patchUser = async (userId: number | string, info: Partial<User>) => {
  const data = new FormData();
  [
    "displayName",
    "aliasName",
    "locale",
    "timezoneName",
    "age",
    "anonymous",
    "accountType",
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
    data.append("avatar", await compressImage(info.avatar));
  } else if (info.photoURL) {
    data.append("photoURL", info.photoURL);
  }

  // data.

  return await authRequest<User>({
    url: `/users/${userId}`,
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: data,
  });
};

const userApis = {
  getUserInfo,
  getMultiUserInfo,
  postCreateAccount,
  getUsers,
  patchUser,
};

export default userApis;

export interface GetUserQueryData {
  search?: string;
  accountType?: AccountType;
  page?: number;
  limit?: number;
}
