import { Box, Typography } from '@mui/material';
import Button from '../../../../../components/Button';
import { useEffect, useState } from 'react';
import friendApi from '../../../../../api/friend';
import { timeAgo } from '../../../../../helper/post';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux';
import { LoiMoiType } from '../../../../../models/user';
import { SocketActions } from '../../../../../redux/socket';
import { useNavigate } from 'react-router-dom';
import { deepCopy } from '@firebase/util';

export default function LoiMoiDaGui(props: { isPageFriend?: boolean }) {
  const [userList, setUserList] = useState<LoiMoiType[]>([]);

  const [isShowAll, setIsShowAll] = useState(true);
  const [reload, setReload] = useState(false);

  const newRequestAddFriend = useSelector(
    (state: RootState) => state.socket.newRequestAddFriend.request
  );

  useEffect(() => {
    friendApi.getListOfAllUserrecievedRequestAddFriendFromMe().then((data) => {
      if (data?.status == 200) {
        if (data?.payload?.length == 0) {
          setUserList([]);
          return;
        }
        const list = data?.payload?.map((item: any) => {
          return {
            name: item?.thong_tin_nguoi_nhan?.ten,
            url: item?.thong_tin_nguoi_nhan?.anh?.url,
            time: item?.ngay_gui,
            senderID: item?.ma_nguoi_nhan,
          };
        });
        if ((list?.length || 0) > 0) {
          if (list?.length > 1) {
            setIsShowAll(false);
          }
          setUserList(list);
        }
      }
    });
  }, [reload]);

  useEffect(() => {
    if (newRequestAddFriend.senderID) {
      const arr: LoiMoiType[] = [];
      arr.push(newRequestAddFriend);
      setUserList([...arr, ...userList]);
    }
  }, [newRequestAddFriend.senderID]);

  return (
    <>
      {userList?.length > 0 ? (
        <>
          {!isShowAll ? (
            <>
              {userList.map((item, index) => {
                if (index < 4) {
                  return (
                    <LoiMoi
                      onSuccess={() => setReload(!reload)}
                      senderID={item?.senderID || 0}
                      name={item?.name || ''}
                      url={item?.url}
                      time={item?.time}
                    />
                  );
                }
              })}
              {userList?.length > 4 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    onClick={() => {
                      setIsShowAll(true);
                    }}
                    sx={{
                      fontFamily: 'quicksand',
                      fontWeight: '600',
                      fontSize: '14px',
                      color: 'rgb(14, 100, 126)',
                      marginTop: '20px',
                    }}
                  >
                    Xem tất cả
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <>
              {userList.map((item, index) => {
                return (
                  <LoiMoi
                    onSuccess={() => {
                      const list: LoiMoiType[] = deepCopy(userList);
                      list.splice(index, 1);
                      setUserList(list);
                    }}
                    senderID={item?.senderID || 0}
                    name={item?.name || ''}
                    url={item?.url}
                    time={item?.time}
                  />
                );
              })}
              {userList?.length > 4 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    onClick={() => {
                      setIsShowAll(false);
                    }}
                    sx={{
                      fontFamily: 'quicksand',
                      fontWeight: '600',
                      fontSize: '14px',
                      color: 'rgb(14, 100, 126)',

                      marginTop: '20px',
                    }}
                  >
                    Ẩn bớt
                  </Button>
                </Box>
              )}
            </>
          )}
        </>
      ) : (
        <Typography
          align="center"
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '500',
            fontSize: '16px',
            marginTop: props?.isPageFriend ? '200px' : '12px',
            marginBottom: '20px',
            color: 'gray',
          }}
        >
          Chưa có lời mời đã gửi
        </Typography>
      )}
    </>
  );
}

type PropsLoiMoi = {
  name: string;
  time?: string;
  url?: string;
  senderID: number | string;
  onSuccess: () => void;
};
function LoiMoi(props: PropsLoiMoi) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatth = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(type: string) {
    friendApi
      .removeRequestAddFriendById(props.senderID)
      .then((data) => {
        if (data?.status == 200) {
          enqueueSnackbar(
            `Đã thu hồi lời mời kết bạn với ${props?.name} thành công`,
            {
              variant: 'info',
            }
          );
          props?.onSuccess();
          dispatth(SocketActions.setNewRequest({}));
        } else if (data?.status == 400) {
          enqueueSnackbar(`Không tồn tại lời mời kết bạn`, {
            variant: 'error',
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${err?.message}`, {
          variant: 'error',
        });
        props?.onSuccess();
      });
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <img
          onClick={() =>
            navigate(`/home/trang-ca-nhan-nguoi-dung/${props?.senderID}`)
          }
          height={50}
          width={50}
          style={{
            objectFit: 'cover',
            borderRadius: '50px',
            cursor: 'pointer',
          }}
          src={props?.url}
        />
        <Box
          sx={{
            marginLeft: '20px',
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              onClick={() =>
                navigate(`/home/trang-ca-nhan-nguoi-dung/${props?.senderID}`)
              }
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '700',
                fontSize: '16px',
                marginBottom: '12px',
                cursor: 'pointer',
              }}
            >
              {props.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                fontSize: '12px',
                marginBottom: '12px',
                color: 'gray',
              }}
            >
              {props?.time && timeAgo(props?.time)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Button
              disabled
              variant="contained"
              color="inherit"
              sx={{
                minWidth: '100px',
                color: 'gray',
                mr: '20px',
              }}
            >
              Đang chờ phản hồi
            </Button>
            <Button
              onClick={() => handleSubmit('accept')}
              color="inherit"
              sx={{
                minWidth: '100px',
                backgroundColor: 'rgb(14, 100, 126)',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(14, 100, 126, 0.9)',
                },
              }}
              variant="contained"
            >
              Thu hồi
            </Button>
            {/* <Button
              onClick={() => handleSubmit('reject')}
              variant="contained"
              color="inherit"
              sx={{
                minWidth: '100px',
                color: 'gray',
                ml: '20px',
              }}
            >
              Xóa
            </Button> */}
          </Box>
        </Box>
      </Box>
    </>
  );
}
