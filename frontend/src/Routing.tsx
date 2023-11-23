import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Private from './components/Private';
import ForgotPasswordPage from './public-pages/forgot-password';
import LoginPage from './public-pages/login';
import RegisterPage from './public-pages/register';
import XacThucPage from './public-pages/xac-thuc';
import PrivatePagesRouting from './private-pages';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { AuthActions } from './redux/auth';
import PageRouting from './public-pages/page';
import MangXaHoi from './public-pages/page/mang-xa-hoi';
// import { socket } from './socket';
import { useSnackbar } from 'notistack';
import { NotifycationItem } from './components/NotificationItem';
import { NotiActions } from './redux/noti';

type Props = {};

export default function Routing(props: Props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  // useEffect(() => {
  //   console.log('Vào conect fe');
  //   socket.connect();

  //   socket.on('COMMENT_STATUS_POST', (data) => {
  //     console.log(data, ' Data comment from server:');
  //     dispatch(NotiActions.setIncreNumNoti());
  //     enqueueSnackbar(
  //       <NotifycationItem
  //         name={data?.userComment?.ten}
  //         type="bình luận"
  //         url={data?.userComment?.anh?.url}
  //       />,
  //       {
  //         variant: 'info',
  //       }
  //     );
  //   });

  //   socket.on('LIKE_STATUS_POST', (data) => {
  //     console.log(data, ' Data chat from server:');
  //     dispatch(NotiActions.setIncreNumNoti());
  //     enqueueSnackbar(
  //       <NotifycationItem
  //         name={data?.userLike?.ten}
  //         type="thích"
  //         url={data?.userLike?.anh?.url}
  //       />,
  //       {
  //         variant: 'info',
  //       }
  //     );
  //   });

  //   return () => {
  //     console.log('Dis conect fe');
  //     socket.disconnect();
  //     socket.off('response-message');
  //   };
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        {/* <Route path="/home/*" element={<PageRouting />}></Route> */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mang-xa-hoi" element={<MangXaHoi />} />
        <Route path={`/user/confirmRegister/:id`} element={<XacThucPage/>} />

        <Route
          path="/*"
          element={
            <Private>
              <PrivatePagesRouting />
            </Private>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
