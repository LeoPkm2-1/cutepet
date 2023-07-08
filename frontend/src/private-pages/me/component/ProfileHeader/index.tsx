import { mdiAccountBox, mdiKey } from "@mdi/js";
import { Avatar, SvgIcon, Tab, Tabs, useMediaQuery } from "@mui/material";
import { connect } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
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

type Props = ReturnType<typeof mapStateToProps>;
function ProfileHeader({ profile }: Props) {
  const isMd = useMediaQuery("(min-width: 600px)");
  const { pathname } = useLocation();
  const tab = pathname.substring("/me/".length).split("/")[0];
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
          <div className="profile-name">{profile?.aliasName}</div>
          <div>{profile?.additionalProp?.title}</div>
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
            to="profile"
            value="profile"
            label={<span className="tab-label">Profile</span>}
          />
          <StyledTab
            value="change-password"
            label={<span className="tab-label">Change password</span>}
            component={Link}
            to="change-password"
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

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(ProfileHeader);
