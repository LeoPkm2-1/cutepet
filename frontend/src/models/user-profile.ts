import { UserAdditionalProp } from "./user";

export interface UserProfile {
  id: number;
  displayName: string;
  aliasName?: string;
  email: string;
  age?: number;
  photoURL?: string;
  locale?: string;
  timezone?: string;
  gender?: string;
  birthday?: string;
  preferences?: UserPreference;
  createdAt?: string;
  vip?: VipObject;
  orgs?: Array<any>;
  anonymous: boolean;
  timezoneName: string;
  timezoneUTCOffset: number;
  accountType: number;
  additionalProp?: UserAdditionalProp;
}



export type UserPreference = {
  allowNotification?: boolean;
  allowUpdateNotification?: boolean;
  allowDailyMindfulMomentMessage?: boolean;
  allowMeditationRemind?: boolean;
  periodMeditationRemind?: {
    time: string;
    frequency: string;
  };
};

export interface TokenObject {
  accessToken: string;
  refreshToken?: string;
}

export interface VipObject {
  code: string;
  campaign: string;
  createdAt: string;
  activedAt: string;
  validTo?: string;
  validIn?: number;
  usedBy: number;
}
