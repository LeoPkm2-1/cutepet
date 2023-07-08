import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { companyApi } from '../api/company';
import { myselfApi } from '../api/myself';
import { getDataGroups } from '../helper/group';
import { useProfile } from '../hooks/user';
import { Option } from '../models/company';
import { UserProfile } from '../models/user-profile';
import { GroupsActions } from '../redux/groups';
import { UserActions } from '../redux/user';
import AdminRouting from './admin';
import MeRouting from './me';
import './style.scss';

const PrivatePagesRouting = () => {
  const dispatch = useDispatch();
  const profile = useProfile();
  useEffect(() => {
    document.title = 'Mindfully Partner Portal';
    getDataGroups().then((data) => {
      if(data){
        dispatch(GroupsActions.setDataGroup(data))
      }
    });
  }, []);

  useEffect(() => {
    companyApi.getCompanies();
    myselfApi.getProfile().then((res) => {
      dispatch(UserActions.setProfile(res));
    });
  }, [dispatch]);


  if (!profile) {
    return (
      <div className="centering" style={{ padding: '10% 0' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="admin/*" element={<AdminRouting />} />
      <Route path="me/*" element={<MeRouting />} />

      <Route path="*" element={<NotMatchRouting profile={profile} />} />
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
