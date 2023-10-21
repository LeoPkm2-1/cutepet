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
import { socket } from '../../../socket';

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

  function sendEmit() {
    socket.emit('chat-message', {
      text: 'Chat test 1',
      user: 'Thuyen',
    });
  }

  useEffect(() => {
    socket.on('LIKE_STATUS_POST', (data) => {
      console.log(data, ' Data chat from server:');
    });
    return () => {
      socket.off('response-message');
    };
  }, []);

  useEffect(() => {
    console.log("Nghe comment");
    
    socket.on('COMMENT_STATUS_POST', (data) => {
      console.log(data, ' Data comment from server:');
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
          <Button onClick={sendEmit}>CLick Send Emit Message</Button>
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
