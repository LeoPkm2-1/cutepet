export interface StatusType {
  id?: string;
  media?: {
    type: string;
    data: string[];
  };
  createAt?: string;
  numOfLike?: number;
  numOfComment?: number;
  userInfor?: {
    id: number;
    name: string;
    avatarURL: string;
  };
  hasLiked?: boolean;
  text?: string;
  visibility?: string;
  taggedUsers?: {
    id:  number;
    name: string;
  }[];
  taggedPets?: {
    id:  number;
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
  numOfLike?: number;
  numOfReply?: number;
  postUserId?: number;
  hasLiked?: boolean;

}
