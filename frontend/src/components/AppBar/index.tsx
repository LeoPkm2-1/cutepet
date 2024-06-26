import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux";
import { AspectRatioImg } from "../Image";
import "./style.scss";

type Props = ReturnType<typeof mapStateToProps> & {
  title?: string;
  backgroundColor?: string;
};

const AppBar = (props: Props) => {
  const dispatch = useDispatch();
  return (
    <div
      className="row ph-16 pv-4 livestream-app-bar"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <Link to="/" className="row centering">
        <div className="logo">
          <AspectRatioImg
            className="logo-image"
            style={{
              borderRadius:"100%"
            }}
            src={`${process.env.PUBLIC_URL}/assets/images/cutepet.png`}
          />
        </div>
        <span className="text-medium">Cutepet</span>
      </Link>
      <div className="expanded centering">
        <span className="title">{props.title}</span>
      </div>

      {/* <ProfileButton /> */}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  profile: state.user.profile,
});

export default connect(mapStateToProps)(AppBar);
