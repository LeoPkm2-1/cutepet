import Enum from "../utils/enum";

export const SocialProviderEnum = {
  APPLE: "apple" as "apple",
  GOOGLE: "google" as "google",
  FACEBOOK: "facebook" as "facebook",
  EMAIL: "email" as "email",
};
export type SocialProviderEnum = Enum<typeof SocialProviderEnum>;
