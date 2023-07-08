import { useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ScrollView } from '../../components/ScrollView';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import PermissionRequired from '../../components/PermissionRequired';
import PermissionError from '../../components/PermissionError';
import { Root } from './styled';
import DashboardPage from './dashboard';
import MembersRouting from './members';

export default function AdminRouting() {
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
        <ScrollView>
          <div className="expanded col">
            {/* <PermissionRequired
              replaceEl={<PermissionError />}
              accountTypes={[]}
            > */}
              <Routes>
                <Route path="dashboard/*" element={<DashboardPage />} />
                <Route path="members/*" element={<MembersRouting />} />
                <Route path="*" element={<Navigate to="dashboard" />} />
              </Routes>
            {/* </PermissionRequired> */}
          </div>
        </ScrollView>
      </div>
    </Root>
  );
}
