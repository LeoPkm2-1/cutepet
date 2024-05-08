import Enum from "../utils/enum";

export interface FormErrorObj {
  [name: string]: string | undefined;
}

export const UploadTypes = Object.freeze({
  LiveEventMediaSourceUpload: "LiveEventMediaSourceUpload",
  LiveEventCoverUpload: "LiveEventCoverUpload",
  UserAvatarUpload: "UserAvatarUpload",
  GroupCoverUpload: "GroupCoverUpload",
  MedioCoverUpload: "MedioCoverUpload",
  MedioMediaSourceUpload: "MedioMediaSourceUpload",
  FeedbackUpload: "FeedbackUpload",
} as const);

export type UploadTypes = Enum<typeof UploadTypes>;
