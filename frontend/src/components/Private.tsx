import { CircularProgress } from "@mui/material";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux";
import React from "react";

type PrivateProps = ReturnType<typeof mapStateToProps>;

// @ts-ignore
const Private: React.FC<PrivateProps> = ({ children, auth }) => {
  const location = useLocation();
  if (auth.firebaseAuthLoading) {
    return (
      <div style={{ padding: 20, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }
  return auth.firebaseUser && auth.mindfullyAuth ? (
    children
  ) : (
    <Navigate
      to="/login"
      state={{
        from: location,
      }}
      replace
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Private);
