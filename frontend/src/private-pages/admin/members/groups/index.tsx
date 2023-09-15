import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  PageContainer,
  PageContentContainer,
  PageHeaderTitle,
  PageTitle,
} from '../../../../components/styled';
import { AccountType } from '../../../../models/user';
import useQuery from '../../../../hooks/use-query';
import DateRangePicker from '../../../../components/DateRangePicker';
import { Group } from '../../../../models/members';
import { companyApi } from '../../../../api/company';
import { TableHeader } from './styled';
import Button from '../../../../components/Button';
import { createSearchQuery } from '../../../../utils/query';
import { useDateRange, useDateRangeQuery } from '../../../../hooks/date-range';
import CreateOrUpdateGroupDialog from '../../../../popups/CreateOrUpdateGroupDialog';
import GroupDetailTable from '../components/GroupDetailTable';
import { GroupsActions } from '../../../../redux/groups';
import { getDataGroups } from '../../../../helper/group';
import { useDispatch } from 'react-redux';

export default function GroupListPage() {
  const { pathname } = useLocation();
  const naviagte = useNavigate();
  const query = useQuery();
  const [list, setList] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [, setDefaultDateRange] = useDateRange();
  const dispatch = useDispatch();

  const dateRange = useDateRangeQuery(query);
  useEffect(() => {
    document.title = 'Members - Mindfully Partner Portal';
  }, []);

  function updateURL(params: {
    keyword?: string;
    page?: number;
    limit?: number;
    start_date?: string;
    end_date?: string;
  }) {
    naviagte({
      pathname,
      search: createSearchQuery({ ...query, ...params }),
    });
  }

  const fetchData = useCallback(() => {
    setLoading(true);
    companyApi
      .getGroups('632b9d47e75825a76ffe5164', {
        startDate: dateRange[0],
        endDate: dateRange[1],
      })
      .then(setList)
      .catch((err) => {
        setList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dateRange]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PageContainer>
      <PageTitle>
        <PageHeaderTitle>
          <span>Members</span>
        </PageHeaderTitle>
        <DateRangePicker
          value={dateRange}
          onChange={([startDate, endDate]) => {
            updateURL({
              start_date: startDate?.unix().toString(),
              end_date: endDate?.unix().toString(),
            });
            setDefaultDateRange({ startDate, endDate });
          }}
        />
      </PageTitle>
      <PageContentContainer>
        <TableHeader>
          <Button
            size="small"
            color="success"
            variant="contained"
            onClick={() => setCreateDialogOpen(true)}
          >
            New group
          </Button>
        </TableHeader>
        <GroupDetailTable
          group={{ subGroups: list } as Group}
          loading={loading}
          onReload={() => fetchData()}
        />
      </PageContentContainer>
      <CreateOrUpdateGroupDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSuccess={() => {
          getDataGroups().then((data) => {
            if (data) {
              dispatch(GroupsActions.setDataGroup(data));
            }
          });
          fetchData();
        }}
        companyId="632b9d47e75825a76ffe5164"
      />
    </PageContainer>
  );
}
