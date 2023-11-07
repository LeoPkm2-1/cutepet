import { useLocation, useParams } from 'react-router-dom';
import PostComponent from '../bai-viet';
import { Grid } from '@mui/material';

export default function PostDetail() {
  const { id } = useParams();
  console.log(id, ' id nè');

  return (
    <>
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
    </>
  );
}
