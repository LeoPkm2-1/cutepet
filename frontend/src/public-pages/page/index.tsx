import { useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ScrollView } from '../../components/ScrollView';
import Header from '../../components/Header';
import PermissionError from '../../components/PermissionError';
import { Root } from './styled';
import HomePage from './home';
import SideBar from '../../components/SideBar';
import MangXaHoi from './mang-xa-hoi';
import { QuanLyThuCung } from './quan-ly-thu-cung';
import ThemThuCung from './quan-ly-thu-cung/component/them-thu-cung';
import { FriendList } from './ban-be';
import PostDetail from './mang-xa-hoi/component/post-detail';
import TrangCaNhan from './trang-ca-nhan';
import { TaoBaiChiaSe } from './chia-se-kien-thuc/component/tao-bai-chia-se';
import { TrangChiaSe } from './chia-se-kien-thuc/component/trang-chia-se';
import BaiChiaSe from './chia-se-kien-thuc/component/bai-chia-se';
// import { socket } from '../../socket';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { NotifycationItem } from '../../components/NotificationItem';
import { NotiActions } from '../../redux/noti';
import { io } from 'socket.io-client';
import TrangCaNhanMoiNguoi from './trang-ca-nhan/trang-ca-nhan-moi-nguoi';
import { SocketActions } from '../../redux/socket';
import { StatusType } from '../../models/post';
import { LoiMoiType } from '../../models/user';

export default function PageRouting() {
  const matches = useMediaQuery('(min-width:1200px)');
  const [drawerOpen, setDrawerOpen] = useState(matches);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  useEffect(() => {
    window.requestAnimationFrame(() => {
      setDrawerOpen(matches);
    });
  }, [matches]);

  console.log('Vaof Thuyen ne');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token, 'token ne lay socket: ');
    console.log('Vào conect fe');
    if (token) {
      const socket = io(`http://localhost:3000/norm_user`, {
        extraHeaders: {
          authen_token: JSON.parse(token),
        },
      });
      socket.connect();

      // 1
      socket.on('COMMENT_STATUS_POST', (data) => {
        console.log(data, ' Data comment from server:');
        dispatch(NotiActions.setIncreNumNoti());
        enqueueSnackbar(
          <NotifycationItem
            name={data?.userComment?.ten}
            type="bình luận một bài viết mà bạn theo dõi"
            url={data?.userComment?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });

      // 2
      socket.on('LIKE_STATUS_POST', (data) => {
        console.log(data, ' Data chat from server:');
        dispatch(NotiActions.setIncreNumNoti());
        enqueueSnackbar(
          <NotifycationItem
            name={data?.userLike?.ten}
            type="thích một bài viết mà bạn theo dõi"
            url={data?.userLike?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });

      // 3
      socket.on('LIKE_COMMENT_IN_STATUS_POST', (data) => {
        console.log(data, ' Data chat from server:');
        dispatch(NotiActions.setIncreNumNoti());
        enqueueSnackbar(
          <NotifycationItem
            name={data?.userLike?.ten}
            type="thích một bình luận của bạn"
            url={data?.userLike?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });
      // 4
      socket.on('REPLY_COMMENT_IN_STATUS_POST', (data) => {
        console.log(data, ' Data chat from server:');
        dispatch(NotiActions.setIncreNumNoti());
        enqueueSnackbar(
          <NotifycationItem
            name={data?.userReply?.ten}
            type="trả lời một bình luận của bạn"
            url={data?.userLike?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });

      // 5
      socket.on('USER_IS_ONLINE', (data) => {
        console.log(data, ' Data online nè:');
        dispatch(SocketActions.setOnline(data?.user_id));
      });

      // 6
      socket.on('USER_IS_OFFLINE', (data) => {
        console.log(data, ' Data chat from server:');
        dispatch(SocketActions.setOffline(data?.user_id));
      });

      // 7
      socket.on('TAG_USER_IN_STATUS_POST', (data) => {
        console.log(data, ' Data chat from server:');
        dispatch(NotiActions.setIncreNumNoti());
        enqueueSnackbar(
          <NotifycationItem
            name={data?.userTag?.ten}
            type="tag tên bạn trong một bài viết"
            url={data?.userLike?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });

      // 8
      socket.on('REQUEST_ADD_FRIEND', (data) => {
        
        console.log(data, ' Data chat from server:');
        dispatch(NotiActions.setIncreNumNoti());
        const loiMoi :LoiMoiType = {
          name: data?.requestUser?.ten,
          url: data?.requestUser?.anh?.url,
          time: data?.requestAt,
          senderID:data?.requestUser?.ma_nguoi_dung,
        }
        dispatch(SocketActions.setNewRequest(loiMoi));
        enqueueSnackbar(
          <NotifycationItem
            name={data?.requestUser?.ten}
            type="gửi lời mời kết bạn"
            url={data?.userLike?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });
      // 9
      socket.on('ACCEPT_ADD_FRIEND', (data) => {
        console.log(data, ' Data chat from server:');
        dispatch(NotiActions.setIncreNumNoti());
        console.log(data?.acceptUser?.ma_nguoi_dung, " data?.acceptUser?.ma_nguoi_dung");
        
        dispatch(SocketActions.setAcceptFriend(data?.acceptUser?.ma_nguoi_dung));
        enqueueSnackbar(
          <NotifycationItem
            name={data?.acceptUser?.ten}
            type="chấp nhận lời mời kết bạn của bạn."
            url={data?.userLike?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });
      // 10
      socket.on('NEW_STATUS_POST_APPEAR', (data) => {
        console.log(data, ' Data chat from server:');
        if(data?.areYouOwner){
          const item = data?.postInfor;
          const post : StatusType = {
            id: `${item?._id}`,
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
            visibility: item?.visibility,
            owner_id: item?.owner_id,
            taggedUsers: item?.taggedUsers?.map((tagUser: any) => {
              return {
                id: tagUser?.ma_nguoi_dung,
                name: tagUser?.ten,
              };
            }),
            taggedPets: item?.withPets?.map((tagPet: any) => {
              return {
                id: tagPet?.ma_thu_cung,
                name: tagPet?.ten_thu_cung,
              };
            }),
          }
          dispatch(SocketActions.setNewPost(post))
        }
      });
      // 11
      socket.on('UPVOTE_ARTICLE', (data) => {
        console.log(data, ' Data chat from server:');
        dispatch(NotiActions.setIncreNumNoti());
        enqueueSnackbar(
          <NotifycationItem
            name={data?.userUpvote?.ten}
            type="thích bài viết chia sẽ của bạn"
            url={data?.userLike?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });
      // 12
      socket.on('DOWNVOTE_ARTICLE', (data) => {
        console.log(data, ' Data chat from server:');
        dispatch(NotiActions.setIncreNumNoti());
        enqueueSnackbar(
          <NotifycationItem
            name={data?.userDownvote?.ten}
            type="không thích bài viết chia sẽ của bạn"
            url={data?.userLike?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });

      return () => {
        console.log('Dis conect fe');
        socket.disconnect();
        socket.off('response-message');
      };
    }
  }, []);

  return (
    <Root>
      <Header
        // showHambuger={!matches}
        onHambuger={() => setDrawerOpen(!drawerOpen)}
      />
      <div
        style={{ position: 'relative', background: '#f9fafb' }}
        className="row expanded"
      >
        <SideBar open={drawerOpen} mobile={!matches} onClose={closeDrawer} />
        <ScrollView>
          <div className="expanded col">
            <Routes>
              <Route path="mang-xa-hoi" element={<MangXaHoi />} />
              <Route path="trang-ca-nhan" element={<TrangCaNhan />} />
              <Route
                path="trang-ca-nhan-nguoi-dung/:id"
                element={<TrangCaNhanMoiNguoi />}
              />
              <Route path="quan-ly-thu-cung" element={<QuanLyThuCung />} />
              <Route path="them-thu-cung" element={<ThemThuCung />} />
              <Route path="ban-be" element={<FriendList />} />
              <Route path="trang-chia-se" element={<TrangChiaSe />} />
              <Route path="trang-chia-se/:id" element={<BaiChiaSe />} />
              <Route path="tao-bai-chia-se" element={<TaoBaiChiaSe />} />
              <Route path="post/:id" element={<PostDetail />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>
        </ScrollView>
      </div>
    </Root>
  );
}
