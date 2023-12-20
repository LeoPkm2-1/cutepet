import { Box, Typography } from '@mui/material';
import { ArticleType } from '../../../../../models/article';
import { useNavigate } from 'react-router-dom';
import Tag from '../../../../../components/tag';
import moment from 'moment';
import TextsmsIcon from '@mui/icons-material/Textsms';
import GradeIcon from '@mui/icons-material/Grade';
export function BaiVietCoBan(props: {
  article: ArticleType;
  isSmall?: boolean;
}) {
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
            bottom: props?.isSmall ? '0px' : '2px',
          },
          cursor: 'pointer',
        }}
      >
        <img
          width={'100%'}
          height={props?.isSmall ? '120px' : '150px'}
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
            align="right"
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              fontSize: '12px',
              minWidth: '60px',
              opacity: '0.7',
              fontStyle: 'italic',
            }}
          >
            {moment(props?.article?.createAt).format('DD-MM-YYYY')}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '600',
              flex: 1,
              fontSize: '16px',
            }}
          >
            {props?.article.title?.length > 100
              ? `${props?.article.title?.substring(0, 50)}...`
              : props?.article.title}
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
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: '8px',
            }}
          >
            {props?.article?.categories?.map((item) => {
              return <Tag text={item} />;
            })}
          </Box>
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: '10px',
              mt: '12px',
            }}
          >
            <Typography
              align="center"
              style={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '14px',
                // border: '1px solid rgb(14, 100, 126)',
                borderRadius: '100px',
                padding: '1px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                // color: 'gray',
                // color:"#fff)",
                // backgroundColor:"rgb(14, 100, 126)"
              }}
            >
              <GradeIcon
                sx={{
                  color: '#f39215',
                  mr: '3px',
                  fontSize: '22px',
                }}
              />
              <span>
                {(props?.article?.numUpVote || 0) -
                  (props?.article?.numDownVote || 0)}
              </span>
            </Typography>
            <Typography
              align="right"
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                minWidth: '60px',
              }}
            >
              <span>{props?.article?.numOfComment || 0}</span>
              <TextsmsIcon
                sx={{
                  color: '#8080808f',
                  ml: '5px',
                }}
              />{' '}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
