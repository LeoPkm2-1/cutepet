import { useLocation } from 'react-router-dom';
import { parseSearchQuery } from '../utils/query';

export default function useQuery() {
  const { search } = useLocation();
  return parseSearchQuery(search);
}
