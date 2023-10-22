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
}

export interface CommentType {
  photoURL: string;
  name: string;
  text: string;
  createdAt: string;
  id: string;
}
