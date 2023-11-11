import { useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { UserProfile } from '../models/user-profile';

import './style.scss';
import PageRouting from '../public-pages/page';
import MangXaHoi from '../public-pages/page/mang-xa-hoi';
import friendApi from '../api/friend';
import { useDispatch } from 'react-redux';
import { FriendActions } from '../redux/friend';
import { FriendType } from '../models/user';

const PrivatePagesRouting = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = 'Cute Pet';
  }, []);

  useEffect(() => {
    friendApi.getListFriend().then((data) => {
      if (data?.status == 200) {
        console.log(data);
        const list = data?.payload.map((item: any) => {
          return {
            name: item?.ten,
            user: item?.tai_khoan,
            url: item?.anh?.url,
            isOnline: item?.isOnline || false,
            id: item?.ma_nguoi_dung,
          };
        });
        if(list?.length > 0){
          dispatch(FriendActions.setFriend(list))
        }
      }
    });
    
    // const data : FriendType[] = [{
    //   name:"Thuyen",
    //   user: "thuyennguyen12",
    //   id:"1",
    //   isOnline: true,
    //   url: "https://image.hsv-tech.io/reebok/common/b6e2c966-0e02-4934-85a0-8096f63fd06f.webp"
    // },
    // {
    //   name:"Hoang",
    //   user: "thuyennguyen12",
    //   id:"2",
    //   isOnline: true,
    //   url: "https://image.hsv-tech.io/reebok/common/b6e2c966-0e02-4934-85a0-8096f63fd06f.webp"
    // }]
    // dispatch(FriendActions.setFriend(data))
  }, []);

  // if (!profile) {
  //   return (
  //     <div className="centering" style={{ padding: '10% 0' }}>
  //       <CircularProgress />
  //     </div>
  //   );
  // }

  return (
    <Routes>
      {/* <Route path="admin/*" element={<AdminRouting />} />
      <Route path="me/*" element={<MeRouting />} /> */}
      <Route path="mang-xa-hoi/" element={<MangXaHoi />} />
      <Route path="home/*" element={<PageRouting />} />
      {/* <Route path="*" element={<NotMatchRouting profile={profile} />} /> */}
    </Routes>
  );
};

export default PrivatePagesRouting;
const NotMatchRouting = (props: { profile: UserProfile }) => {
  return (
    <Navigate
      to={{
        pathname: '/admin',
      }}
      // to={props.profile.accountType === AccountTypeNum.Admin ? "admin" : "/me"}
    />
  );
};
