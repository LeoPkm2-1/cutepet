import { UserAdditionalProp } from "./user";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  age?: string;
  photoURL?: string;
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
