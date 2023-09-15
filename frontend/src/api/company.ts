import { Moment } from 'moment';
import { Company } from '../models/company';
import { Group } from '../models/members';
import { authRequest, ListPaginationResponse } from './base';

const getCompanies = () => {
  return authRequest<ListPaginationResponse<Company>>({
    url: '/companies',
    method: 'GET',
  });
};

const getGroups = (
  companyId: string,
  query?: {
    startDate?: Moment | null;
    endDate?: Moment | null;
  }
) => {
  return authRequest<Group[]>({
    url: `/companies/${companyId}/groups`,
    method: 'GET',
    query: query
      ? {
          startDateStr: query.startDate?.toISOString(),
          endDateStr: query.endDate?.toISOString(),
        }
      : undefined,
  });
};

const getGroupDetail = (
  companyId: string,
  groupId: string,
  query?: {
    startDate?: Moment | null;
    endDate?: Moment | null;
  }
) => {
  return authRequest<Group>({
    url: `/companies/${companyId}/groups/${groupId}`,
    query: query
      ? {
          startDateStr: query.startDate?.toISOString(),
          endDateStr: query.endDate?.toISOString(),
        }
      : undefined,
    method: 'GET',
  });
};

const postCreateGroup = (companyId: string, payload: Partial<Group>) => {
  return authRequest<Group>({
    url: `/companies/${companyId}/groups`,
    method: 'POST',
    body: payload,
  });
};

const getAllGroups = (companyId: string) => {
  return authRequest<Group>({
    url: `/companies/${companyId}/allGroups`,
    method: 'GET',
  });
};

const postCreateSubGroup = (
  companyId: string,
  parentId: string,
  payload: Partial<Group>
) => {
  return authRequest<Group>({
    url: `/companies/${companyId}/groups/${parentId}/subGroups`,
    method: 'POST',
    body: payload,
  });
};

const putUpdateGroup = (
  companyId: string,
  parentId: string,
  payload: Partial<Group>
) => {
  return authRequest<Group>({
    url: `/companies/${companyId}/groups/${parentId}`,
    method: 'PUT',
    body: payload,
  });
};

const postAddMembers = (
  companyId: string,
  groupId: string,
  payload: { name: string; email: string }[]
) => {
  return authRequest<any[]>({
    url: `/companies/${companyId}/groups/${groupId}/members`,
    method: 'POST',
    body: payload,
  });
};

const deleteGroup = (
  companyId: string,
  groupId: string,
) => {
  return authRequest<any[]>({
    url: `/companies/${companyId}/groups/${groupId}`,
    method: 'DELETE',
  });
};

export const companyApi = {
  getAllGroups,
  getCompanies,
  getGroups,
  getGroupDetail,
  postCreateGroup,
  postCreateSubGroup,
  putUpdateGroup,
  postAddMembers,
  deleteGroup
};
