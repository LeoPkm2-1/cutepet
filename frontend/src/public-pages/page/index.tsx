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
    if(token){
      const socket = io(`http://localhost:3000/norm_user`, {
        extraHeaders: {
          authen_token: JSON.parse(token),
        },
      });
      socket.connect();
  
      socket.on('COMMENT_STATUS_POST', (data) => {
        console.log(data, ' Data comment from server:');
        dispatch(NotiActions.setIncreNumNoti());
        enqueueSnackbar(
          <NotifycationItem
            name={data?.userComment?.ten}
            type="bình luận"
            url={data?.userComment?.anh?.url}
          />,
          {
            variant: 'info',
          }
        );
      });
  
      socket.on('LIKE_STATUS_POST', (data) => {
        console.log(data, ' Data chat from server:');
        dispatch(NotiActions.setIncreNumNoti());
        enqueueSnackbar(
          <NotifycationItem
            name={data?.userLike?.ten}
            type="thích"
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
              <Route path="trang-ca-nhan-nguoi-dung/:id" element={<TrangCaNhanMoiNguoi />} />
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
