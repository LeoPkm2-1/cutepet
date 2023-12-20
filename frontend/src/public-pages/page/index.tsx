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
import { SuaBaiChiaSe } from './chia-se-kien-thuc/component/sua-bai-chia-se';
import ChinhSuaTrangCaNhan from './trang-ca-nhan/chinh-sua-trang-ca-nhan/profile-header';
import UpdateProfilePage from './trang-ca-nhan/chinh-sua-trang-ca-nhan/profile-page';
import ProfileHeader from './trang-ca-nhan/chinh-sua-trang-ca-nhan/profile-header';
import MeRouting from './trang-ca-nhan/chinh-sua-trang-ca-nhan';
import ChangePasswordPage from './trang-ca-nhan/chinh-sua-trang-ca-nhan/change-pass';
import BaiVietThuCung from './quan-ly-thu-cung/component/bai-viet-thu-cung';
import UpdatePost from './mang-xa-hoi/component/chinh-sua-bai-viet';
import ChinhSuaThuCung from './quan-ly-thu-cung/component/chinh-sua-thu-cung';

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


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const socket = io(`http://localhost:3000/norm_user`, {
        extraHeaders: {
          authen_token: JSON.parse(token),
        },
      });
      socket.connect();

      // 1
      socket.on('COMMENT_STATUS_POST', (data) => {
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
        dispatch(NotiActions.setIncreNumNoti());
        enqueueSnackbar(
          <NotifycationItem
            name={data?.userReply?.ten}
            type="trả lời một bình luận của bạn"
            url={data?.userReply?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });

      // 5
      socket.on('USER_IS_ONLINE', (data) => {
        dispatch(SocketActions.setOnline(data?.user_id));
        console.log("Có online");
        
      });

      // 6
      socket.on('USER_IS_OFFLINE', (data) => {
        console.log("Có offline");

        dispatch(SocketActions.setOffline(data?.user_id));
      });

      // 7
      socket.on('TAG_USER_IN_STATUS_POST', (data) => {
        dispatch(NotiActions.setIncreNumNoti());
        enqueueSnackbar(
          <NotifycationItem
            name={data?.userTag?.ten}
            type="tag tên bạn trong một bài viết"
            url={data?.userTag?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });

      // 8
      socket.on('REQUEST_ADD_FRIEND', (data) => {
        dispatch(NotiActions.setIncreNumNoti());
        const loiMoi: LoiMoiType = {
          name: data?.requestUser?.ten,
          url: data?.requestUser?.anh?.url,
          time: data?.requestAt,
          senderID: data?.requestUser?.ma_nguoi_dung,
        };
        dispatch(SocketActions.setNewRequest(loiMoi));
        enqueueSnackbar(
          <NotifycationItem
            name={data?.requestUser?.ten}
            type="gửi lời mời kết bạn"
            url={data?.requestUser?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });
      // 9
      socket.on('ACCEPT_ADD_FRIEND', (data) => {
        dispatch(NotiActions.setIncreNumNoti());

        dispatch(
          SocketActions.setAcceptFriend(data?.acceptUser?.ma_nguoi_dung)
        );
        enqueueSnackbar(
          <NotifycationItem
            name={data?.acceptUser?.ten}
            type="chấp nhận lời mời kết bạn của bạn."
            url={data?.acceptUser?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });
      // 10
      socket.on('NEW_STATUS_POST_APPEAR', (data) => {
        if (data?.areYouOwner) {
          const item = data?.postInfor;
          const post: StatusType = {
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
          };
          dispatch(SocketActions.setNewPost(post));
        }
      });
      // 11
      socket.on('UPVOTE_ARTICLE', (data) => {
        dispatch(NotiActions.setIncreNumNoti());
        enqueueSnackbar(
          <NotifycationItem
            name={data?.userUpvote?.ten}
            type="thích bài viết chia sẽ của bạn"
            url={data?.userUpvote?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });
      // 12
      socket.on('DOWNVOTE_ARTICLE', (data) => {
        dispatch(NotiActions.setIncreNumNoti());
        enqueueSnackbar(
          <NotifycationItem
            name={data?.userDownvote?.ten}
            type="không thích bài viết chia sẽ của bạn"
            url={data?.userDownvote?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });
      // 13
      socket.on('COMMENT_ARTICLE', (data) => {

        dispatch(NotiActions.setIncreNumNoti());
        enqueueSnackbar(
          <NotifycationItem
            name={data?.userComment?.ten}
            type="bình luận bài viết chia sẽ của bạn"
            url={data?.userComment?.anh?.url}
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
        // style={{ position: 'relative', background: 'green', height:"100px" }}
        className="row expanded"
      >
        <SideBar open={drawerOpen} mobile={!matches} onClose={closeDrawer} />
        <ScrollView>
          <div className="expanded col">
            <Routes>
              <Route path="mang-xa-hoi" element={<MangXaHoi />} />
              {/* <Route path="chinh-sua-bai-viet-trang-thai/:id" element={<UpdatePost />} /> */}
              <Route
                path="thong-tin-thu-cung/:id"
                element={<BaiVietThuCung />}
              />
              <Route path="trang-ca-nhan" element={<TrangCaNhan />} />
              <Route path="chinh-sua-trang-ca-nhan" element={<MeRouting />} />
              <Route
                path="chinh-sua-trang-ca-nhan/profile"
                element={<UpdateProfilePage />}
              />
              <Route
                path="chinh-sua-trang-ca-nhan/change-pass"
                element={<ChangePasswordPage />}
              />
              <Route
                path="trang-ca-nhan-nguoi-dung/:id"
                element={<TrangCaNhanMoiNguoi />}
              />
              <Route path="quan-ly-thu-cung" element={<QuanLyThuCung />} />
              <Route path="chinh-sua-thu-cung/:id" element={<ChinhSuaThuCung />} />
              <Route path="them-thu-cung" element={<ThemThuCung />} />
              <Route path="ban-be" element={<FriendList />} />
              <Route path="trang-chia-se" element={<TrangChiaSe />} />
              <Route path="trang-chia-se/:id" element={<BaiChiaSe />} />
              <Route path="tao-bai-chia-se" element={<TaoBaiChiaSe />} />
              <Route path="sua-bai-chia-se/:id" element={<SuaBaiChiaSe />} />
              <Route path="post/:id" element={<PostDetail />} />
              <Route path="*" element={<MangXaHoi />} />
            </Routes>
          </div>
        </ScrollView>
      </div>
    </Root>
  );
}

//   return (
//     // <div className="fullsize row" style={{ overflow: 'hidden' }}>

//       <ScrollView
//         contentContainerProps={{
//           style: {
//             backgroundImage:
//               'radial-gradient(at left top, #f4fffd 50%, rgb(125,215,230) 100%)',
//           },
//         }}
//       >
//         <div className="expanded col">
//           {/* <Header
//             // showHambuger={!matches}
//             onHambuger={() => setDrawerOpen(!drawerOpen)}
//           /> */}
//           <Routes>
//             <Route path="mang-xa-hoi" element={<MangXaHoi />} />
//             {/* <Route path="chinh-sua-bai-viet-trang-thai/:id" element={<UpdatePost />} />  */}
//             <Route path="bai-viet-thu-cung/:id" element={<BaiVietThuCung />} />
//             <Route path="trang-ca-nhan" element={<TrangCaNhan />} />
//             <Route path="chinh-sua-trang-ca-nhan" element={<MeRouting />} />
//             <Route
//               path="chinh-sua-trang-ca-nhan/profile"
//               element={<UpdateProfilePage />}
//             />
//             <Route
//               path="chinh-sua-trang-ca-nhan/change-pass"
//               element={<ChangePasswordPage />}
//             />
//             <Route
//               path="trang-ca-nhan-nguoi-dung/:id"
//               element={<TrangCaNhanMoiNguoi />}
//             />
//             <Route path="quan-ly-thu-cung" element={<QuanLyThuCung />} />
//             <Route path="them-thu-cung" element={<ThemThuCung />} />
//             <Route path="ban-be" element={<FriendList />} />
//             <Route path="trang-chia-se" element={<TrangChiaSe />} />
//             <Route path="trang-chia-se/:id" element={<BaiChiaSe />} />
//             <Route path="tao-bai-chia-se" element={<TaoBaiChiaSe />} />
//             <Route path="sua-bai-chia-se/:id" element={<SuaBaiChiaSe />} />
//             <Route path="post/:id" element={<PostDetail />} />
//             <Route path="*" element={<MangXaHoi />} />
//           </Routes>
//         </div>
//       </ScrollView>
//     // </div>
//   );
// }
