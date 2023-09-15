import { useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ScrollView } from '../../components/ScrollView';
import Header from '../../components/Header';
import PermissionRequired from '../../components/PermissionRequired';
import PermissionError from '../../components/PermissionError';
import ProfileHeader from './component/ProfileHeader';
import SideBar from '../../components/SideBar';
import { Root } from '../admin/styled';
import ProfilePage from './profile';
import { PageContainer } from '../../components/styled';
import ChangePasswordPage from './change-password';

export default function MeRouting() {
  const matches = useMediaQuery('(min-width:1200px)');
  const [drawerOpen, setDrawerOpen] = useState(matches);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  useEffect(() => {
    window.requestAnimationFrame(() => {
      setDrawerOpen(matches);
    });
  }, [matches]);
  return (
    <Root>
      <Header
        // showHambuger={!matches}
        onHambuger={() => setDrawerOpen(!drawerOpen)}
      />
      <div style={{ position: 'relative' }} className="row expanded">
        <SideBar open={drawerOpen} mobile={!matches} onClose={closeDrawer} />
        <ScrollView
          contentContainerProps={{
            style: {
              backgroundImage:
                'radial-gradient(at left top, #f4fffd 50%, rgb(125,215,230) 100%)',
            },
          }}
        >
          <div className="expanded col">
            <ProfileHeader />
            <Routes>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />
              <Route path="*" element={<Navigate to="profile" />} />
            </Routes>
          </div>
        </ScrollView>
      </div>
    </Root>
  );
}
