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

export default function LoiMoiKetBan() {
  const [userList, setUserList] = useState<
  LoiMoiType[]
  >([]);

  const [isShowAll, setIsShowAll] = useState(true);
  const [reload, setReload] = useState(false);

  const newRequestAddFriend= useSelector((state:RootState) => state.socket.newRequestAddFriend.request)

  useEffect(() => {
    friendApi.getRequestAddFriendList().then((data) => {
      if (data?.status == 200) {
        console.log(data, ' dtaa loi moi');
        if(data?.payload?.length == 0){
          setUserList([]);
          return;
        }
        const list = data?.payload?.map((item: any) => {
          return {
            name: item?.thong_tin_nguoi_gui?.ten,
            url: item?.thong_tin_nguoi_gui?.anh?.url,
            time: item?.ngay_gui,
            senderID: item?.ma_nguoi_gui,
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
    if(newRequestAddFriend.senderID){
      console.log("vào nè hihi sénderID");
      
      const arr:LoiMoiType[] = [];
      arr.push(newRequestAddFriend);
      setUserList([...arr, ...userList]);
    }
  }, [newRequestAddFriend.senderID])

  return (
    <>
      <Typography
        sx={{
          fontFamily: 'quicksand',
          fontWeight: '700',
          fontSize: '24px',
        }}
      >
        Lời mời kết bạn
      </Typography>
      {/* {userList.map((item, index) => {
        if (index < 4) {
          return <LoiMoi name={item?.name} url={item?.url} time={item?.time} />;
        }
      })} */}
      {/* <LoiMoi name ="Bach Tran"/>
      <LoiMoi name ="Dung Nguyen"/>
      <LoiMoi name ="Tung"/>
      <LoiMoi name ="Ngoc Anh"/> */}
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
                      name={item?.name || ""}
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
                      color: 'blue',
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
                    onSuccess={() => setReload(!reload)}
                    senderID={item?.senderID || 0}
                    name={item?.name ||""}
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
                      color: 'blue',
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
          Chưa có lời mời kết bạn
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
  function handleSubmit(type: string) {
    friendApi.responeAddFriend(props.senderID, type).then((data) => {
      console.log(data, ' dtata nef');
      if (data?.status == 200) {
        if (data?.payload?.accepted) {
          enqueueSnackbar(`Kết bạn với ${props?.name} thành công`, {
            variant:"info"
          });
        } else {
          enqueueSnackbar(`Xóa lời mời kết bạn với ${props?.name} thành công`, {
            variant: "info"
          });
        }
        props?.onSuccess();
        dispatth(SocketActions.setNewRequest({}))
      }
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
          height={50}
          width={50}
          style={{
            objectFit: 'cover',
            borderRadius: '50px',
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
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '700',
                fontSize: '16px',
                marginBottom: '12px',
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
              onClick={() => handleSubmit('accept')}
              sx={{
                minWidth: '100px',
              }}
              variant="contained"
            >
              Xác Nhận
            </Button>
            <Button
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
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
