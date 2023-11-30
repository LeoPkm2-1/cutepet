export interface ArticleType {
  id: string;
  title: string;
  main_image: string;
  intro: string;
  content: string;
  categories: string[];
  user_id?: number;
  user_name: string;
  user_avatar: string;
  isUpVote?: boolean;
  isDownVote?: boolean;
  numUpVote?: number;
  numDownVote?: number;
}
