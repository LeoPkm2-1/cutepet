import Enum from '../utils/enum';
import { UserProfile } from './user-profile';

export interface User {
  id: number;
  displayName: string | null;
  aliasName: string | null;
  email: string | null;
  photoURL: string | null;
  avatar?: File;
  locale: string | null;
  age: number | null;
  timezoneName: string | null;
  timezoneUTCOffset: number | null;
  createdAt: string;
  additionalProp?: Partial<UserAdditionalProp>;
  anonymous?: boolean;
  accountType: number;
}

export interface UserAdditionalProp {
  id: number;
  userId: number;
  title: string;
  address: string | null;
  intro: string | null;
  certificates: string | null;
  languages: string | null;
}

export interface CreateAccountPayload {
  displayName: string;
  email: string;
  accountType: string;
  password: string;
}

export const AccountType = {
  Admin: 'admin',
  Standard: 'standard_user',
  Teacher: 'teacher_user',
  Guest: 'guest_user',
  Supporter: 'event_supporter',
} as const;
export type AccountType = Enum<typeof AccountType>;

export function numToAccountType(num?: number) {
  switch (num) {
    case 0:
      return AccountType.Admin;
    case 1:
      return AccountType.Standard;
    case 2:
      return AccountType.Teacher;
    case 3:
      return AccountType.Guest;
    case 4:
      return AccountType.Supporter;
    default: {
      return undefined;
    }
  }
}

export const AccountTypeNum = {
  Admin: 0,
  Standard: 1,
  Teacher: 2,
  Guest: 3,
  Supporter: 4,
} as const;

export const AccountTypeText = {
  0: 'Admin',
  1: 'Standard',
  2: 'Teacher',
  3: 'Guest',
  4: 'Event supporter',
  admin: 'Admin',
  standard_user: 'Standard',
  teacher_user: 'Teacher',
  guest_user: 'Guest',
  event_supporter: 'Event supporter',
} as const;

export type UserType = User | UserProfile;

export const AccountTypeOptions: {
  label: string;
  value: AccountType;
}[] = [
  {
    label: 'Admin',
    value: AccountType.Admin,
  },
  {
    label: 'Standard',
    value: AccountType.Standard,
  },
  {
    label: 'Teacher',
    value: AccountType.Teacher,
  },
  {
    label: 'Event supporter',
    value: AccountType.Supporter,
  },
  {
    label: 'Guest',
    value: AccountType.Guest,
  },
];

export interface RTDUser {
  accountType: Enum<typeof AccountTypeNum>;
  createdAt: string;
  displayName: string | null;
  email: string;
  firebaseUid: string;
  id: number;
}
