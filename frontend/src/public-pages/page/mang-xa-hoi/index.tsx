import { PickerOverlay, PickerInline } from 'filestack-react';
import { uploadMedia } from './upload';
import UploadImage from '../../../components/upload-image';
import PostComponent from './component/bai-viet';
import { Button, Grid, Typography } from '@mui/material';
import CreatePost from './component/tao-bai-viet';
import postApi from '../../../api/post';
import { useEffect, useState } from 'react';
import { StatusType } from '../../../models/post';
import userApis from '../../../api/user';
import LoiMoiKetBan from './component/loi-moi-ket-ban';
import { socket } from '../../../socket';
import { useSnackbar } from 'notistack';
import {NotifycationItem} from '../../../components/NotificationItem';

// Our app
export default function MangXaHoi() {
  const [listPost, setListPost] = useState<StatusType[]>([]);
  const [isLoad, setisLoad] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    postApi.getPostStartFrom(0, 10).then((data:any) => {
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
            taggedUsers: item?.taggedUsers?.map((tagUser:any) => {
              return {
                id: tagUser?.ma_nguoi_dung,
                name: tagUser?.ten,
              }
            }),
          } as StatusType;
        });
        setListPost(list);
      }
    });
  }, [isLoad]);

 

  useEffect(() => {
    console.log("Mở comment");
    
    socket.on('LIKE_STATUS_POST', (data) => {
      console.log(data, ' Data chat from server:');
      enqueueSnackbar(<NotifycationItem 
        name={data?.userLike?.ten}
         type="thích"
         url = {data?.userLike?.anh?.url}
      />, {
        variant: "info",
      });
    });
    return () => {
      socket.off('response-message');
    };
  }, []);

  useEffect(() => { 
    socket.on('COMMENT_STATUS_POST', (data) => {
      console.log(data, ' Data comment from server:');
      enqueueSnackbar(<NotifycationItem 
        name={data?.userComment?.ten}
         type="bình luận"
         url = {data?.userComment?.anh?.url}

      />, {
        variant: "info",
      });
    });
    return () => {
      socket.off('response-message');
    };
  }, []);



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
          <CreatePost />
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


