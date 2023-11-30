import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PageContainer } from "../../../../components/styled";
import ProfileHeader from "./profile-header";
import UpdateProfilePage from "./profile-page";
import ChangePasswordPage from "./change-pass";


export default function MeRouting() {
  useEffect(() => {
    document.title = "Cute pet";
  }, []);

  return (
    <div className="fullsize row" style={{ overflow: "hidden" }}>
     
        <div className="expanded col">
       
          <PageContainer
            maxWidth={1280}
            style={{
              margin: "auto",
              paddingTop: 32,
              paddingBottom: 32,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <ProfileHeader />
            <Routes>
              <Route path="profile" element={<UpdateProfilePage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />
              <Route path="*" element={<Navigate to="profile" />} />
            </Routes>
          </PageContainer>
        </div>
   
    </div>
  );
}
