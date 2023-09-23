import { PickerOverlay, PickerInline } from 'filestack-react';
import { uploadMedia } from './upload';
import UploadImage from '../../../components/upload-image';
import PostComponent from './component/bai-viet';
import { Button, Grid } from '@mui/material';
import CreatePost from './component/tao-bai-viet';
import postApi from '../../../api/post';
import { useEffect, useState } from 'react';
import { StatusType } from '../../../models/post';

// Our app
export default function MangXaHoi() {
  const [listPost, setListPost] = useState<StatusType[]>([]);
  useEffect(() => {
    console.log("vao ne");
    
    postApi.getPostStartFrom(0, 20).then((data) => {
      if (data?.status == 200) {
        console.log(data, 'data');
        const list: StatusType[] = data?.payload?.posts?.map((item: any) => {
          return {
            id: item?._id,
            media: item?.media as {
              type: string;
              data: string[];
            },
            createAt: item?.createAt,
            numOfLike: item?.numOfLike,
            numOfComment: item?.numOfComment,
            userInfor: {
              id: item?.owner_infor?.ma_nguoi_dung,
              name: item?.owner_infor?.ten,
              avatarURL: item?.owner_infor?.anh?.url,
            },
            hasLiked: item?.hasLiked,
            text: item?.text,
          } as StatusType;
        });
        setListPost(list);
      }
    });
  }, []);
  return (
    <>
      <Grid container>
        <Grid xs={8} item>
          <CreatePost />
          {listPost &&
            listPost?.map((status) => {
              return <PostComponent status={status} />;
            })}
        </Grid>
        <Grid xs={4} item>
          {' '}
          Loi moi ket ban
        </Grid>
      </Grid>
    </>
  );
}
