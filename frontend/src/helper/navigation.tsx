import React from "react";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";

export function withNavigation(Component: any) {
  return (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    return <Component {...props} navigate={navigate} location={location} />;
  };
}

export type NavigationProps = {
  navigate: NavigateFunction;
  location: Location;
};
