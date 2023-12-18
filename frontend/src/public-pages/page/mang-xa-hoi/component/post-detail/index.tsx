import { useLocation, useParams } from 'react-router-dom';
import PostComponent from '../bai-viet';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import postApi from '../../../../../api/post';

export default function PostDetail() {
  const { id } = useParams();
  const [isData, setIsData] = useState(true);
  useEffect(() => {
    if (id) {
      postApi
        .getStatusById(id)
        .then((data: any) => {
          if (data?.status !== 200) {
            setIsData(false);
          } else {
            setIsData(true);
          }
        })
        .catch(() => {
          setIsData(false);
        });
    }
  }, [id]);

  return (
    <>
      {isData ? (
        <Grid container>
          <Grid
            sx={{
              paddingBottom: '100px',
            }}
            xs={8}
            item
          >
            <PostComponent idStatus={id} />
          </Grid>
          <Grid
            sx={{
              paddingLeft: '40px',
            }}
            xs={4}
            item
          ></Grid>
        </Grid>
      ) : (
        <Page404 />
      )}
    </>
  );
}

export function Page404() {
  return (
    <>
      <Box
        sx={{
          mt: '120px',
        }}
      >
        <Typography
          align="center"
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '700',
            fontSize: '56px',
            color: 'gray',
          }}
        >
          {' '}
          404
        </Typography>
        <Typography
          align="center"
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '500',
            color: 'gray',
          }}
        >
          {' '}
          Không có dữ liệu , vui lòng kiểm tra lại !
        </Typography>
      </Box>
    </>
  );
}
