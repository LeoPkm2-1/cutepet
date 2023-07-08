import { CircularProgress, Grid, MenuItem } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  PageContainer,
  PageContentContainer,
  PageHeaderTitle,
  PageTitle,
} from '../../../../components/styled';
import useQuery from '../../../../hooks/use-query';
import DateRangePicker from '../../../../components/DateRangePicker';
import { Group } from '../../../../models/members';
import { companyApi } from '../../../../api/company';
import { FilterRow, TableHeader } from './styled';
import Button from '../../../../components/Button';
import GroupDetailTable from '../components/GroupDetailTable';
import { createSearchQuery } from '../../../../utils/query';
import { useDateRange, useDateRangeQuery } from '../../../../hooks/date-range';
import CreateOrUpdateGroupDialog from '../../../../popups/CreateOrUpdateGroupDialog';
import AddMemberToGroupDialog from '../../../../popups/AddMemberToGroupDialog';
import ImportMemberToGroupDialog from '../../../../popups/ImportMemberToGroupDialog';
import PopoverSelect from '../../../../components/Select/popover-select';
import { GroupsActions } from '../../../../redux/groups';
import { getDataGroups } from '../../../../helper/group';
import { useDispatch } from 'react-redux';

export default function GroupDetailPage() {
  const { pathname } = useLocation();
  const params = useParams();
  const naviagte = useNavigate();
  const query = useQuery();
  const [value, setValue] = useState<Group | undefined>();
  const [loading, setLoading] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [importMembersDialogOpen, setImportMembersDialogOpen] = useState(false);
  const [, setDefaultDateRange] = useDateRange();
  const dateRange = useDateRangeQuery(query);
  const dispatch = useDispatch();
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
    if (!params.id) {
      return;
    }
    setLoading(true);
    companyApi
      .getGroupDetail('632b9d47e75825a76ffe5164', params.id!, {
        startDate: dateRange[0],
        endDate: dateRange[1],
      })
      .then(setValue)
      .catch((err) => {
        setValue(undefined);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.id, dateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PageContainer>
      <PageTitle>
        <PageHeaderTitle>
          <span>Members</span>
        </PageHeaderTitle>
      </PageTitle>
      <PageContentContainer>
        <FilterRow>
          <div className="expanded">
            <PopoverSelect isNavigate path = {value?.path} nodeId = {value?.id} label= {value?.name}></PopoverSelect>
          </div>
          <DateRangePicker
            sx={{ mt: 1, mb: 1 }}
            value={dateRange}
            onChange={([startDate, endDate]) => {
              updateURL({
                start_date: startDate?.unix().toString(),
                end_date: endDate?.unix().toString(),
              });
              setDefaultDateRange({ startDate, endDate });
            }}
          />
        </FilterRow>

        <TableHeader>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={1} sx={{ justifyContent: 'flex-end' }}>
                {!value?.members?.length && (
                  <Grid item>
                    <Button
                      size="small"
                      color="success"
                      variant="contained"
                      onClick={() => setCreateDialogOpen(true)}
                    >
                      New sub-group
                    </Button>
                  </Grid>
                )}
                {!value?.subGroups?.length && (
                  <>
                    <Grid item>
                      <Button
                        size="small"
                        color="success"
                        variant="contained"
                        onClick={() => setImportMembersDialogOpen(true)}
                      >
                        Import members
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        size="small"
                        color="success"
                        variant="contained"
                        onClick={() => setAddMemberDialogOpen(true)}
                      >
                        Add member
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </TableHeader>

        {loading ? (
          <div className="centering">
            <CircularProgress />
          </div>
        ) : value ? (
          <GroupDetailTable onReload={() => fetchData()} group={value} />
        ) : null}
      </PageContentContainer>
      <CreateOrUpdateGroupDialog
        companyId="632b9d47e75825a76ffe5164"
        open={createDialogOpen}
        parentGroup={value}
        onSuccess={() => {
          getDataGroups().then((data) => {
            if(data){
              dispatch(GroupsActions.setDataGroup(data))
            }
          });
          fetchData();
        }}
        onClose={() => setCreateDialogOpen(false)}
      />
      {!!value && (
        <>
          <AddMemberToGroupDialog
            companyId="632b9d47e75825a76ffe5164"
            open={addMemberDialogOpen}
            onSuccess={() => fetchData()}
            onClose={() => setAddMemberDialogOpen(false)}
            group={value}
          />
          <ImportMemberToGroupDialog
            companyId="632b9d47e75825a76ffe5164"
            open={importMembersDialogOpen}
            onSuccess={() => fetchData()}
            onClose={() => setImportMembersDialogOpen(false)}
            group={value}
          />
        </>
      )}
    </PageContainer>
  );
}
