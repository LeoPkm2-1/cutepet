import { Navigate, Route, Routes } from 'react-router-dom';
import GroupListPage from './groups';
import GroupDetailPage from './group-detail';
import MemberReportPage from './member-report';

export default function MembersRouting() {
  return (
    <Routes>
      <Route path="groups" element={<GroupListPage />} />
      <Route path="groups/:id" element={<GroupDetailPage />} />
      <Route path="member-report/:id" element={<MemberReportPage />} />
      <Route path="*" element={<Navigate to="groups" />} />
    </Routes>
  );
}
