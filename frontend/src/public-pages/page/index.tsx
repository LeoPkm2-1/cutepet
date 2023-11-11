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
import {  TaoBaiChiaSe } from './chia-se-kien-thuc/component/tao-bai-chia-se';
import { TrangChiaSe } from './chia-se-kien-thuc/component/trang-chia-se';
import BaiChiaSe from './chia-se-kien-thuc/component/bai-chia-se';

export default function PageRouting() {
  const matches = useMediaQuery('(min-width:1200px)');
  const [drawerOpen, setDrawerOpen] = useState(matches);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  useEffect(() => {
    window.requestAnimationFrame(() => {
      setDrawerOpen(matches);
    });
  }, [matches]);
  return (
    <Root >
      <Header
        // showHambuger={!matches}
        onHambuger={() => setDrawerOpen(!drawerOpen)}
      />
      <div style={{ position: 'relative', background: "#f9fafb"}} className="row expanded">
        <SideBar open={drawerOpen} mobile={!matches} onClose={closeDrawer} />
        <ScrollView>
          <div className="expanded col">
              <Routes>
                <Route path="mang-xa-hoi" element={<MangXaHoi />} />
                <Route path="trang-ca-nhan" element={<TrangCaNhan/>} />
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
