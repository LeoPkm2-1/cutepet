import { PickerOverlay, PickerInline } from 'filestack-react';
import { uploadMedia } from './upload';
import UploadImage from '../../../components/upload-image';
import PostComponent from './component/bai-viet';
import { Button, Grid } from '@mui/material';
import CreatePost from './component/tao-bai-viet';
import postApi from '../../../api/post';
import { useEffect, useState } from 'react';
import { StatusType } from '../../../models/post';
import userApis from '../../../api/user';
import LoiMoiKetBan from './component/loi-moi-ket-ban';

// Our app
export default function MangXaHoi() {
  const [listPost, setListPost] = useState<StatusType[]>([]);
  const [isLoad, setisLoad] = useState(true);
  useEffect(() => {
    postApi.getPostStartFrom(0, 10).then((data) => {
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
  }, [isLoad]);
  return (
    <>
      <Grid container>
        <Grid xs={8} item>
          <CreatePost />
          <PostComponent idStatus={"650ef7e27eb17e17d2a64573"} />
          {listPost &&
            listPost?.map((status) => {
              return <PostComponent status={status} />;
            })}
        </Grid>
        <Grid
          sx={{
            paddingLeft: '40px',
          }}
          xs={4}
          item
        >
          <LoiMoiKetBan />
        </Grid>
      </Grid>
    </>
  );
}
