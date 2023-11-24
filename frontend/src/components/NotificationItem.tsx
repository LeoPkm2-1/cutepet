import { Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import React, { useState, useEffect } from 'react';
import notiApi from '../api/noti';
type Props = {
  name?: string;
  url?: string;
  idPost?: string;
  type?: string;
  onClick?: () => void;
  idNoti?: string;
  isReaded?: boolean;
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
  return (
    <>
      <Link
        onClick={() => {
          if (props?.idNoti) {
              console.log("vaof nef");

            notiApi.postNotificationHasReaded(props?.idNoti).then((data) => {
              console.log("vaof nef 1");
              
              setIsReaded(true);
            });
          }
        }}
        to={`post/${props?.idPost}`}
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
              đã {props?.type || 'bình luận'} 
            </Typography>
          </Box>
          {!isReaded && (
            <FiberManualRecordRoundedIcon
              sx={{
                color: '#1876f2',
              }}
            />
          )}
        </Box>
      </Link>
    </>
  );
}
