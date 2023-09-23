import { useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { UserProfile } from '../models/user-profile';

import './style.scss';
import PageRouting from '../public-pages/page';

const PrivatePagesRouting = () => {
  useEffect(() => {
    document.title = 'Cute Pet';
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
