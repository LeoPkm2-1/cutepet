import { Box, Typography } from '@mui/material';
import Button from '../../../../../components/Button';
import { useEffect, useState } from 'react';
import friendApi from '../../../../../api/friend';
import { timeAgo } from '../../../../../helper/post';

export default function LoiMoiKetBan() {
  const [userList, setUserList] = useState<
    {
      name: string;
      url: string;
      time: string;
    }[]
  >([]);

  const [isShowAll, setIsShowAll] = useState(true);

  useEffect(() => {
    friendApi.getRequestAddFriendList().then((data) => {
      if (data?.status == 200) {
        const list = data?.payload?.map((item: any) => {
          return {
            name: item?.thong_tin_nguoi_gui?.ten,
            url: item?.thong_tin_nguoi_gui?.anh?.url,
            time: item?.ngay_gui,
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
  }, []);
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
      {!isShowAll ? (
        <>
          {userList.map((item, index) => {
            if (index < 4) {
              return (
                <LoiMoi name={item?.name} url={item?.url} time={item?.time} />
              );
            }
          })}
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
        </>
      ) : (
        <>
          {userList.map((item, index) => {
            return (
              <LoiMoi name={item?.name} url={item?.url} time={item?.time} />
            );
          })}
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
        </>
      )}
    </>
  );
}

type PropsLoiMoi = {
  name: string;
  time?: string;
  url?: string;
};
function LoiMoi(props: PropsLoiMoi) {
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
              sx={{
                minWidth: '100px',
              }}
              variant="contained"
            >
              Xác Nhận
            </Button>
            <Button
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
