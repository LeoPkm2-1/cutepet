import { Box, Divider, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';

export default function TrangCaNhan() {
  const profile = useSelector((state: RootState) => state.user.profile);
  return (
    <>
    <Box sx={{
        paddingBottom:"120px"
    }}>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 200px',
        }}
      >
        <img src={profile?.photoURL} height={100} width={100} />
        <Box
          sx={{
            ml: '80px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontSize: '22px',
              fontWeight: '600',
            }}
          >
            Thuyen Nguyen
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontSize: '14px',
              fontWeight: '400',
              my: '5px',
            }}
          >
            @thuyennguyen
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontSize: '14px',
              fontWeight: '500',
              mt: '8px',
            }}
          >
            Gọi tôi là Thuyen Nguyen
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: '10px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontSize: '14px',
                fontWeight: '400',
                marginRight: '30px',
              }}
            >
              <span
                style={{
                  fontWeight: '600',
                  fontSize: '15px',
                }}
              >
                6
              </span>{' '}
              bài viết{' '}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontSize: '14px',
                fontWeight: '400',
              }}
            >
              <span
                style={{
                  fontWeight: '600',
                  fontSize: '15px',
                }}
              >
                100
              </span>{' '}
              bạn bè
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          my: '16px',
        }}
      />
      <Grid container>
        <Grid item xs={3}>
          <PostInfo />
        </Grid>
        <Grid item xs={3}>
          <PostInfo />
        </Grid>
        <Grid item xs={3}>
          <PostInfo />
        </Grid>
        <Grid item xs={3}>
          <PostInfo />
        </Grid>
        <Grid item xs={3}>
          <PostInfo />
        </Grid>{' '}
        <Grid item xs={3}>
          <PostInfo />
        </Grid>{' '}
        <Grid item xs={3}>
          <PostInfo />
        </Grid>
      </Grid>
    </Box>
    </>
  );
}

function PostInfo() {
  return (
    <>
      <Box
        sx={{
          cursor: 'pointer',
          margin: '20px 10px',
          ':hover': {
            opacity: '0.7',
          },
          transition: '0.5s',
        }}
      >
        <img
          style={{
            borderRadius: '6px',
          }}
          height={'100%'}
          width={'100%'}
          src="https://vn-live-01.slatic.net/p/fd72711a1641571e8684323b2bf873bd.jpg"
        />
      </Box>
    </>
  );
}
