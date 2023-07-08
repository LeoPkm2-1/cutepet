import { async } from '@firebase/util';
import { mdiAccountDetails, mdiDotsVertical } from '@mdi/js';
import { Assessment, Delete, Edit } from '@mui/icons-material';
import {
  IconButton,
  MenuList,
  Popover,
  PopoverPosition,
  SvgIcon,
  TableRow,
} from '@mui/material';
import { group } from 'console';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { companyApi } from '../../../../api/company';
import { membersApi } from '../../../../api/members';
import CustomMenuItem from '../../../../components/CustomMenuItem';
import Empty from '../../../../components/Empty';
import Image from '../../../../components/Image';
import Table from '../../../../components/Table';
import { StyledTableCell } from '../../../../components/Table/styled';
import { getDataGroups } from '../../../../helper/group';
import { getPercentColor } from '../../../../helper/member';
import { useDateRangeQuery } from '../../../../hooks/date-range';
import { useShowDialog } from '../../../../hooks/dialog';
import useQuery from '../../../../hooks/use-query';
import { Option } from '../../../../models/company';
import { Group, Member } from '../../../../models/members';
import CreateOrUpdateGroupDialog from '../../../../popups/CreateOrUpdateGroupDialog';
import { GroupsActions } from '../../../../redux/groups';

type Props = {
  group: Group;
  parentGroup?: Group;
  loading?: boolean;
  onReload?: () => void;
};

export default function GroupDetailTable(props: Props) {
  if (!props.group.subGroups?.length && !props.group.members?.length) {
    return (
      <Empty
        style={{ marginTop: 16 }}
        text={
          <p>
            This group is empty. You can <b>create sub-group</b>, <b>add</b> or{' '}
            <b>import members</b>.
          </p>
        }
      />
    );
  }

  const Component = props.group.subGroups?.length ? GroupTable : MemberTable;
  return <Component {...props} />;
}

function GroupTable(props: Props) {
  const [optionParam, setOptionParam] = useState<
    | {
        anchorPossition?: PopoverPosition;
        anchorEl?: HTMLElement;
        supgroup: Group;
      }
    | undefined
  >();
  const [editingGroup, setEditingGroup] = useState<Group | undefined>();
  const showConfirm = useShowDialog();
  const naviagte = useNavigate();
  const query = useQuery();
  const dateRange = useDateRangeQuery(query);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const average =
    (props.group.subGroups
      ?.map((a) => a.percentPracticed)
      .reduce((a, b) => a + b, 0) ?? 0) / (props.group.subGroups?.length || 1);


  
  function deleteEmptyGroup(groupId: string) {
    companyApi
      .deleteGroup('632b9d47e75825a76ffe5164', groupId)
      .then((res) => {
        console.log('Thành Công');
        props?.onReload?.();
        enqueueSnackbar(`Delete group succcess !`, { variant: 'success' });
        getDataGroups().then((data) => {
          if(data){
            dispatch(GroupsActions.setDataGroup(data))
          }
        });
      })
      .catch((err) => {
        console.log(err);
        props?.onReload?.();
        enqueueSnackbar(`${err.error.message}`, { variant: 'error' });
        getDataGroups().then((data) => {
          if(data){
            dispatch(GroupsActions.setDataGroup(data))
          }
        });
      });
  }
  // const deleteGroup = async (groupId: string) => {
  //    return companyApi.getGroupDetail('632b9d47e75825a76ffe5164', groupId, {
  //     startDate: dateRange[0],
  //     endDate: dateRange[1],
  //   }).then((dataGroup) => {
  //     console.log("res", dataGroup);
  //     if(dataGroup){
  //       if(dataGroup.members?.length === 0 && dataGroup.subGroups?.length === 0){
  //         deleteEmptyGroup(groupId);
  //       }else if((dataGroup.members?.length || 0) > 0){
  //           let memberIds: string[] = [];
  //           dataGroup.members?.forEach((item) => {
  //             memberIds.push(item.id);
  //           })
  //           console.log("memberIds", memberIds);
  //           membersApi.deleteMembers('632b9d47e75825a76ffe5164', groupId, memberIds).then(() => {
  //             deleteEmptyGroup(groupId);
  //           })
  //       }else{
  //         // dataGroup.subGroups?.forEach()

  //         let arrRequest: any = []
  //         dataGroup.subGroups?.map((item) => {
  //           arrRequest.push(deleteGroup(item.id))
  //           console.log("arrRequest 1", arrRequest );

  //         })

  //         console.log("arrRequest", arrRequest );

  //       }
  //     }
  //   })
  // }
  return (
    <>
      <Table
        loading={props.loading}
        columns={[
          {
            key: 'name',
            dataKey: 'name',
            label: 'Name',
          },
          {
            key: 'description',
            dataKey: 'description',
            label: 'Description',
          },
          {
            key: 'numberOfMembers',
            dataKey: 'numberOfMembers',
            label: 'Members',
          },
          {
            key: 'percentPracticed',
            dataKey: 'percentPracticed',
            label: 'Completed practice',
            render: (data, row) => {
              return (
                <span
                  style={{
                    color: getPercentColor(data),
                    fontWeight: 600,
                  }}
                >
                  {data}%
                </span>
              );
            },
          },
          {
            key: 'createdAt',
            dataKey: 'createdAt',
            label: 'Created at',
            render: (data) => moment(data).format('MMM DD, YYYY'),
          },
          {
            key: 'action',
            dataKey: 'id',
            label: '',
            render: (id: number, row) => (
              <div>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOptionParam({
                      anchorEl: e.currentTarget,
                      supgroup: row,
                    });
                  }}
                >
                  <SvgIcon fontSize="small">
                    <path d={mdiDotsVertical} />
                  </SvgIcon>
                </IconButton>
              </div>
            ),
          },
        ]}
        dataSource={props.group.subGroups ?? []}
        onRowClick={(e, row, idx) => {
          naviagte({
            pathname: `../groups/${row.id}`,
          });
        }}
        onRowContext={(e, row) => {
          e.preventDefault();
          setOptionParam({
            anchorPossition: {
              left: e.clientX,
              top: e.clientY,
            },
            anchorEl: undefined,
            supgroup: row,
          });
        }}
        rowKey={(row) => row.id.toString()}
        tail={
          props.group.subGroups?.length ? (
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              <StyledTableCell />
              <StyledTableCell />
              <StyledTableCell>
                Total: <b>{props.group.numberOfMembers}</b>
              </StyledTableCell>
              <StyledTableCell>
                Avg: <b>{Math.round(average)}%</b>
              </StyledTableCell>
              <StyledTableCell />
              <StyledTableCell />
            </TableRow>
          ) : undefined
        }
      />
      <Popover
        anchorReference={optionParam?.anchorEl ? 'anchorEl' : 'anchorPosition'}
        anchorEl={optionParam?.anchorEl}
        BackdropProps={{
          onContextMenu: (e) => {
            e.preventDefault();
            e.currentTarget.click();
          },
          sx: {
            backgroundColor: 'transparent',
          },
        }}
        anchorPosition={optionParam?.anchorPossition}
        transformOrigin={{
          horizontal: !optionParam?.anchorEl ? 'left' : 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: optionParam?.anchorEl ? 'left' : 'right',
          vertical: 'center',
        }}
        open={!!optionParam}
        onClose={() => setOptionParam(undefined)}
      >
        <MenuList sx={{ p: 0 }}>
          <CustomMenuItem
            icon={<Edit fontSize="inherit" />}
            text="Edit"
            onClick={() => {
              setOptionParam(undefined);
              setTimeout(() => {
                setEditingGroup(optionParam?.supgroup);
              }, 200);
            }}
          />
          <CustomMenuItem
            icon={<Delete fontSize="inherit" />}
            text="Delete"
            color="#c60c0c"
            onClick={() => {
              setOptionParam(undefined);
              setTimeout(() => {
                showConfirm({
                  okText: 'Delete',
                  content: (
                    <div>
                      <div>This action cannot revert,</div>
                      <div>
                        do you want to delete group '
                        <b>{optionParam?.supgroup?.name}</b>'?
                      </div>
                    </div>
                  ),
                  title: 'Caution',
                  okColor: 'error',
                  onOk() {
                    if (optionParam?.supgroup.id) {
                      deleteEmptyGroup(optionParam?.supgroup.id);
                    }
                  },
                });
              }, 200);
            }}
          />
        </MenuList>
      </Popover>
      <CreateOrUpdateGroupDialog
        open={!!editingGroup}
        onClose={() => setEditingGroup(undefined)}
        parentGroup={props.group}
        group={editingGroup}
        companyId="632b9d47e75825a76ffe5164"
        onSuccess={() => {
          getDataGroups().then((data) => {
            if(data){
              dispatch(GroupsActions.setDataGroup(data))
            }
          });
          props?.onReload?.();
        }}
      />
    </>
  );
}

function MemberTable(props: Props) {
  const [optionParam, setOptionParam] = useState<
    | {
        anchorPossition?: PopoverPosition;
        anchorEl?: HTMLElement;
        member: Member;
      }
    | undefined
  >();
  const showConfirm = useShowDialog();
  const naviagte = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // Delete Member
  const deleteMember = (memberId: string, fullName: string) => {
    console.log('id', memberId);
    console.log('name', fullName);
    console.log('group', props.group.id);
    membersApi
      .deleteMembers('632b9d47e75825a76ffe5164', props.group.id, [memberId])
      .then(() => {
        props?.onReload?.();
        enqueueSnackbar(`Delete member ${fullName} succcess !`, {
          variant: 'success',
        });
      })
      .catch((err) => {
        enqueueSnackbar(`${err}`, { variant: 'error' });
      });
  };

  return (
    <>
      <Table
        loading={props.loading}
        columns={[
          {
            key: 'fullName',
            dataKey: 'fullName',
            label: 'Name',
          },
          {
            key: 'email',
            dataKey: 'email',
            label: 'Email',
          },
          {
            key: 'percentPracticed',
            dataKey: 'percentPracticed',
            label: 'Completed practice',
            render: (data) => {
              return (
                <span
                  style={{
                    color: getPercentColor(data),
                  }}
                >
                  {data}%
                </span>
              );
            },
          },
          {
            key: 'lastLogined',
            dataKey: 'lastLogined',
            label: 'Last loged in',
            render: (data) => moment(data).fromNow(),
          },
          {
            key: 'action',
            dataKey: 'id',
            label: '',
            render: (id: number, row) => (
              <div>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOptionParam({
                      anchorEl: e.currentTarget,
                      member: row,
                    });
                  }}
                >
                  <SvgIcon fontSize="small">
                    <path d={mdiDotsVertical} />
                  </SvgIcon>
                </IconButton>
              </div>
            ),
          },
        ]}
        dataSource={props.group.members ?? []}
        onRowClick={(e, row, idx) => {
          naviagte({
            pathname: `../member-report/${row.id}`,
          });
        }}
        onRowContext={(e, row) => {
          e.preventDefault();
          setOptionParam({
            anchorPossition: {
              left: e.clientX,
              top: e.clientY,
            },
            anchorEl: undefined,
            member: row,
          });
        }}
        rowKey={(row) => row.id.toString()}
        // pagination={{
        //   // @ts-ignore
        //   // component: 'tr',
        //   count: 351,
        //   page: 5,
        //   rowsPerPage: 10,
        //   rowsPerPageOptions: [],
        //   onPageChange: (e, page) => {
        //     console.log(page);
        //   },
        // }}
      />
      <Popover
        anchorReference={optionParam?.anchorEl ? 'anchorEl' : 'anchorPosition'}
        anchorEl={optionParam?.anchorEl}
        BackdropProps={{
          onContextMenu: (e) => {
            e.preventDefault();
            e.currentTarget.click();
          },
          sx: {
            backgroundColor: 'transparent',
          },
        }}
        anchorPosition={optionParam?.anchorPossition}
        transformOrigin={{
          horizontal: !optionParam?.anchorEl ? 'left' : 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: optionParam?.anchorEl ? 'left' : 'right',
          vertical: 'center',
        }}
        open={!!optionParam}
        onClose={() => setOptionParam(undefined)}
      >
        <MenuList sx={{ p: 0 }}>
          <CustomMenuItem
            icon={<Assessment fontSize="inherit" />}
            text="View user's report"
            onClick={() => {
              setOptionParam(undefined);
              setTimeout(() => {
                naviagte({
                  pathname: `../member-report/${optionParam?.member.id}`,
                });
              }, 200);
            }}
          />
          <CustomMenuItem
            icon={
              <SvgIcon fontSize="inherit">
                <path d={mdiAccountDetails} />
              </SvgIcon>
            }
            text="View user's informations"
            onClick={() => {
              setOptionParam(undefined);
              setTimeout(() => {
                naviagte({
                  pathname: `../member-report/${optionParam?.member.id}`,
                });
              }, 200);
            }}
          />
          <CustomMenuItem
            icon={<Delete fontSize="inherit" />}
            text="Remove member"
            color="#c60c0c"
            onClick={() => {
              setOptionParam(undefined);
              setTimeout(() => {
                showConfirm({
                  okText: 'Delete',
                  content: (
                    <div>
                      <div>This action cannot revert,</div>
                      <div>
                        do you want to delete member '
                        <b>{optionParam?.member.fullName}</b>'?
                      </div>
                    </div>
                  ),
                  title: 'Caution',
                  okColor: 'error',
                  onOk() {
                    if (optionParam?.member?.id) {
                      deleteMember(
                        optionParam?.member?.id,
                        optionParam?.member.fullName
                      );
                    }
                  },
                });
              }, 200);
            }}
          />
        </MenuList>
      </Popover>
    </>
  );
}
