import { mdiAccountBox, mdiKey } from "@mdi/js";
import { Avatar, SvgIcon, useMediaQuery } from "@mui/material";
import { connect, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../../../redux";
import {
  CoverContainer,
  CoverImg,
  InfoContainer,
  NameContainer,
  Root,
  StyledTab,
  StyledTabs,
} from "./styled";


function ProfileHeader() {
  const isMd = useMediaQuery("(min-width: 600px)");
  const { pathname } = useLocation();
  const tab = pathname.substring("/home/chinh-sua-trang-ca-nhan/".length).split("/")[0];
  const profile = useSelector((state:RootState) => state.user.profile)
  return (
    <Root>
      <CoverContainer>
        <CoverImg src={profile?.photoURL} />
        {/* <CoverImg src={`${process.env.PUBLIC_URL}/assets/images/cover.jpeg`} /> */}
      </CoverContainer>
      <InfoContainer>
        <Avatar
          src={profile?.photoURL}
          sx={{
            width: 126,
            height: 126,
            border: "2px solid #fff",
          }}
        />
        <NameContainer>
          <div className="profile-name">{profile?.name}</div>
          {/* <div>{profile?.additionalProp?.title}</div> */}
        </NameContainer>
      </InfoContainer>
      <div style={{ minWidth: 0 }}>
        <StyledTabs
          value={tab}
          scrollButtons
          variant={isMd ? "standard" : "fullWidth"}
        >
          <StyledTab
            component={Link}
            iconPosition="start"
            icon={
              <SvgIcon>
                <path d={mdiAccountBox} />
              </SvgIcon>
            }
            to="/home/chinh-sua-trang-ca-nhan/profile"
            value="profile"
            label={<span className="tab-label">Trang cá nhân</span>}
          />
          <StyledTab
            value="change-pass"
            label={<span className="tab-label">Thay đổi mật khẩu</span>}
            component={Link}
            to="/home/chinh-sua-trang-ca-nhan/change-pass"
            iconPosition="start"
            icon={
              <SvgIcon>
                <path d={mdiKey} />
              </SvgIcon>
            }
          />
        </StyledTabs>
      </div>
    </Root>
  );
}


export default ProfileHeader;
