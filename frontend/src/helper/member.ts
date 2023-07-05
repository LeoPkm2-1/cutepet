// export function getAvatarText(user: User) {
//   const name = user.aliasName ?? user.displayName ?? user.email;
//   if (name?.length) {
//     return name[0].toUpperCase();
//   }
//   return undefined;
// }

export function getPercentColor(p: number) {
  if (p > 90) {
    return 'seagreen';
  }
  if (p < 30) {
    return 'red';
  }
  return 'black';
}
