import { Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
type Props = {
  name?: string;
  url?: string;
  idPost?: string;
  type?: string;
};
export  function NotifycationItem(props: Props) {
  return (
    <>
      <Box
        // onClick={props?.isClick ? () => navigate('/home') : () => {}}
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
          đã {props?.type || 'bình luận'} một bài viết
        </Typography>
      </Box>
    </>
  );
}

export  function NotifycationItemClick(props: Props) {
    return (
      <>
      <Link to = "home">
        <Box
          // onClick={props?.isClick ? () => navigate('/home') : () => {}}
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
            đã {props?.type || 'bình luận'} một bài viết
          </Typography>
        </Box>
      </Link>
      </>
    );
  }
