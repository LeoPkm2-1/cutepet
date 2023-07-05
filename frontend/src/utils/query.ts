import qs from 'query-string';

export function createSearchQuery(q: { [k: string]: any }) {
  return qs.stringify({ q: window.btoa(qs.stringify(q)) });
}

export function parseSearchQuery(search: string) {
  try {
    const { q } = qs.parse(search);
    if (q) {
      return qs.parse(window.atob(q?.toString()));
    }
    return {};
  } catch {
    return {};
  }
}
