export function extractAddOrRemove<T>(origins: T[], newValues: T[]) {
  const removed = origins.filter((v) => !newValues.includes(v));
  const added = newValues.filter((v) => !origins.includes(v));
  return { removed, added };
}
