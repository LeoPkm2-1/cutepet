export interface StatusType {
  id: string;
  media: {
    type: string;
    data: string[];
  };
  createAt: string;
  numOfLike: number;
  numOfComment: number;
  userInfor: {
    id: number | string;
    name: string;
    avatarURL: string;
  };
  hasLiked: boolean;
  text: string;
  visibility?: string;
  taggedUsers?: {
    id: string | number;
    name: string;
  }[];
  taggedPets?: {
    id: string | number;
    name: string;
  }[];
  owner_id?: number;
}

export interface CommentType {
  photoURL: string;
  name: string;
  userId: number;
  text: string;
  createdAt: string;
  id: string;
}
