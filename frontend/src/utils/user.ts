import { User } from '../models/user';
import { UserProfile } from '../models/user-profile';

export function getDisplayNameFromUser(user?: User | UserProfile) {
  if (!user) {
    return 'Mindfully';
  }
  if (user.aliasName) {
    return user.aliasName;
  }
  if (user.displayName) {
    return user.displayName;
  }
  if (user.email) {
    return user.email.split('@')[0];
  }
  return user.id.toString();
}

const ANONYMOUS_AVATAR_URI =
  'https://ddpelntkhg3me.cloudfront.net/AnonymousAvatars';
export function getUserAvatarUri(user?: User | UserProfile) {
  if (!user) {
    return `${process.env.PUBLIC_URL}/assets/images/logo.png`;
  }
  if (user?.photoURL) {
    return user.photoURL;
  }
  const id = ((user?.id ?? 1) % 9) + 1;
  const uri = `${ANONYMOUS_AVATAR_URI}/${id}.jpg`;

  return uri;
}
