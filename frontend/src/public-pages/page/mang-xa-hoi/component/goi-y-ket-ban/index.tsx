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

export default function GoiYKetBan() {
  const [userList, setUserList] = useState<LoiMoiType[]>([]);

  const [isShowAll, setIsShowAll] = useState(true);
  const [reload, setReload] = useState(false);

  const newRequestAddFriend = useSelector(
    (state: RootState) => state.socket.newRequestAddFriend.request
  );

  useEffect(() => {
    friendApi.getListSuggestedFriends().then((data) => {
      if (data?.status == 200) {
        console.log(data, ' dtaa loi moi');
        if (data?.payload?.length == 0) {
          setUserList([]);
          return;
        }
        const list = data?.payload?.map((item: any) => {
          return {
            name: item?.ten,
            url: item?.anh?.url,
            time: item?.gioi_tinh,
            senderID: item?.ma_nguoi_dung,
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
      <Typography
        sx={{
          fontFamily: 'quicksand',
          fontWeight: '600',
          fontSize: '20px',
          mt: '20px',
        }}
      >
        Gợi ý kết bạn
      </Typography>

      {userList?.length > 0 ? (
        <>
          {!isShowAll ? (
            <>
              {userList.map((item, index) => {
                if (index < 4) {
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
                }
              })}
              {userList?.length >= 4 && (
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
              {userList?.length >= 4 && (
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
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '500',
            fontSize: '16px',
            marginTop: '12px',
          }}
        >
          Chưa có lời gợi ý kết bạn
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

  function handleAddfriend() {
    if (props?.senderID) {
      friendApi
        .addFriendById(props?.senderID)
        .then((data) => {
          if (data?.status == 200) {
            enqueueSnackbar(`Đã gửi lời mời kết bạn với ${props?.name}`, {
              variant: 'info',
            });
            props?.onSuccess?.();
          } else {
            enqueueSnackbar(
              `${data?.message || 'Thất bại vui lòng thử lại !'}`,
              {
                variant: 'error',
              }
            );
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message || 'Thất bại vui lòng thử lại !'}`, {
            variant: 'error',
          });
        });
    }
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
          height={50}
          width={50}
          style={{
            objectFit: 'cover',
            borderRadius: '50px',
            cursor: 'pointer',
          }}
          src={props?.url}
          onClick={() =>
            navigate(`/home/trang-ca-nhan-nguoi-dung/${props?.senderID}`)
          }
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
            {/* <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                fontSize: '12px',
                marginBottom: '12px',
                color: 'gray',
              }}
            >
              {props?.time && timeAgo(props?.time)}
            </Typography> */}
          </Box>

          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Button
              onClick={handleAddfriend}
              sx={{
                minWidth: '100px',
              }}
              variant="contained"
            >
              Kết bạn
            </Button>
            <Button
              onClick={() => props?.onSuccess?.()}
              variant="contained"
              color="inherit"
              sx={{
                minWidth: '100px',
                color: 'gray',
                ml: '20px',
              }}
            >
              Xóa
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
