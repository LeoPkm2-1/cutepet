import { PickerOverlay, PickerInline } from 'filestack-react';
import { uploadMedia } from './upload';
import UploadImage from '../../../components/upload-image';
import PostComponent from './component/bai-viet';
import { Grid } from '@mui/material';
import CreatePost from './component/tao-bai-viet';

// Our app
export default function MangXaHoi() {
  function handleClick() {
    uploadMedia().then((data) => {
      console.log(data, ' d');
    });
  }
  const YOUR_API_KEY1 = 'A1t5CK0vkR96nivu2NbNAz';
  const YOUR_API_KEY2 = 'A1t5CK0vkR96nivu2NbNAz';
  return (
    <>
      <Grid container>
        <Grid xs={8} item>
          <CreatePost />
          <PostComponent />
          <PostComponent />
          <PostComponent />
        </Grid>
        <Grid xs={4} item>
          {' '}
          Loi moi ket ban
        </Grid>
      </Grid>
    </>
  );
}
