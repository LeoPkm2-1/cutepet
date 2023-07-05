import { DateRange } from '@mui/lab';
import moment, { Moment } from 'moment';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { AppActions } from '../redux/app';

export function useDateRange() {
  const value = useSelector((state: RootState) => state.app.dateRange);
  const dispatch = useDispatch();
  const setDateRange = useCallback(
    (range: { startDate?: Moment | null; endDate: Moment | null }) => {
      dispatch(AppActions.setDateRange(range));
    },
    [dispatch]
  );
  return useMemo(() => {
    return [value, setDateRange] as [typeof value, typeof setDateRange];
  }, [value, setDateRange]);
}

export function useDateRangeQuery(query: {
  start_date?: string;
  end_date?: string;
}) {
  const [defaultDateRange] = useDateRange();

  return useMemo(() => {
    const startDate = query.start_date
      ? +(query.start_date as string) * 1000
      : null;
    const endDate = query.end_date ? +(query.end_date as string) * 1000 : null;
    return [
      startDate ? moment(startDate) : defaultDateRange?.startDate,
      endDate ? moment(endDate) : defaultDateRange?.endDate,
    ] as DateRange<Moment>;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.start_date, query.end_date]);
}
