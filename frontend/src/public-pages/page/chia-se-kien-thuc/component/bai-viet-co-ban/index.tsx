import { Box, Typography } from '@mui/material';
import { ArticleType } from '../../../../../models/article';
import { useNavigate } from 'react-router-dom';

export function BaiVietCoBan(props: { article: ArticleType }) {
  const navigate = useNavigate();
  return (
    <>
      <Box
        onClick={() => {
          navigate(`/home/trang-chia-se/${props?.article.id}`);
        }}
        sx={{
          boxShadow: 2,
          width: '100%',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '20px',
          transition: '10s',
          position: 'relative',
          ':hover': {
            bottom: '2px',
          },
          cursor: 'pointer',
        }}
      >
        <img
          width={'100%'}
          height={'150px'}
          style={{
            objectFit: 'cover',
          }}
          src={props.article.main_image}
        />
        <Box
          sx={{
            padding: '10px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '600',
              flex: 1,
              fontSize: '16px',
            }}
          >
            {props.article.title || 'Bài viết không có tiêu đề'}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '400',
              flex: 1,
              fontSize: '14px',
              textAlign: 'justify',
              mt: '10px',
              minHeight: '46px',
            }}
          >
            {props.article.intro?.length > 60
              ? props.article.intro.substring(0, 60)
              : props.article.intro}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: '12px',
            }}
          >
            <img
              style={{
                borderRadius: '50px',
              }}
              width={'30px'}
              height={'30px'}
              src={props.article.user_avatar}
            />
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                flex: 1,
                fontSize: '14px',
                ml: '10px',
              }}
            >
              By {props?.article.user_name}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}