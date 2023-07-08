import { BrowserRouter, Route, Routes } from "react-router-dom";
import Private from "./components/Private";
import ForgotPasswordPage from "./public-pages/forgot-password";
import LoginPage from "./public-pages/login";
import PrivatePagesRouting from "./private-pages";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { AuthActions } from "./redux/auth";
import PageRouting from "./public-pages/page";

type Props = {};

export default function Routing(props: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AuthActions.firebaseAuthInit());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/home/*" element={<PageRouting />}></Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/*"
          element={
            <Private>
              <PrivatePagesRouting />
            </Private>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
