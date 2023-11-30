import { Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import React, { useState, useEffect } from 'react';
import notiApi from '../api/noti';
import { useDispatch, useSelector } from 'react-redux';
import { NotiActions } from '../redux/noti';
import { RootState } from '../redux';
type Props = {
  name?: string;
  url?: string;
  idPost?: string;
  type?: string;
  onClick?: () => void;
  idNoti?: string;
  isReaded?: boolean;
  isRequestFriend?:boolean;
  isFriend?:boolean;
  isArticle?:boolean;
};
export function NotifycationItem(props: Props) {
  return (
    <>
      <Box
        // onClick={props?.isClick ? () => navigate('/home') : () => {}}
        sx={{
          display: 'flex',
          padding: '10px 16px',
          alignItems: 'center',
          borderRadius: '4px',

          transition: '0.3s',
        }}
      >
        <img
          height={50}
          width={50}
          style={{
            objectFit: 'cover',
            borderRadius: '50px',
          }}
          src={
            props?.url ||
            'https://mega.com.vn/media/news/0406_anh-gai-xinh-115.jpg'
          }
        />

        <Typography
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '500',
            fontSize: '15px',
            marginLeft: '10px',
          }}
        >
          <span style={{ fontWeight: '700' }}>{props?.name || 'No name'}</span>{' '}
          đã {props?.type || 'bình luận'}
        </Typography>
      </Box>
    </>
  );
}

export function NotifycationItemClick(props: Props) {
  const [isReaded, setIsReaded] = useState(props?.isReaded);
  useEffect(() => {
    setIsReaded(props?.isReaded);
  }, [props?.idPost, props?.isReaded]);
  const numNoti = useSelector((state:RootState) => state?.noti?.numNoti)
  const dispatch = useDispatch();
  function naviga(){
    if(props?.isRequestFriend){
      return `/home/trang-ca-nhan-nguoi-dung/${props?.idPost}`
    }
    if(props?.isFriend){
      return `/home/trang-ca-nhan-nguoi-dung/${props?.idPost}`
    }
    if(props?.isArticle){
      return `/home/trang-chia-se/${props?.idPost}`;

    }
    return `post/${props?.idPost}`;
  }
  return (
    <>
      <Link
        onClick={() => {
          if (props?.idNoti) {
            notiApi.postNotificationHasReaded(props?.idNoti).then((data) => {
              dispatch(NotiActions.setNumNoti(numNoti - 1));
              setIsReaded(true);
            });
          }
        }}
        to={naviga()}
      >
        <Box
          sx={{
            display: 'flex',
            padding: '10px 16px',
            alignItems: 'center',
            borderRadius: '4px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#e0e0e073',
            },
            transition: '0.3s',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              padding: '10px 16px',
              alignItems: 'center',
              borderRadius: '4px',
            }}
          >
            <img
              height={50}
              width={50}
              style={{
                objectFit: 'cover',
                borderRadius: '50px',
              }}
              src={
                props?.url ||
                'https://mega.com.vn/media/news/0406_anh-gai-xinh-115.jpg'
              }
            />

            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                fontSize: '15px',
                marginLeft: '10px',
              }}
            >
              <span style={{ fontWeight: '700' }}>
                {props?.name || 'No name'}
              </span>{' '}
              đã {props?.type} 
            </Typography>
          </Box>
          {!isReaded && (
            <FiberManualRecordRoundedIcon
              sx={{
                color: "rgb(14, 100, 126)",
              }}
            />
          )}
        </Box>
      </Link>
    </>
  );
}
