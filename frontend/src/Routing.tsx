import { BrowserRouter, Route, Routes } from "react-router-dom";
import Private from "./components/Private";
import ForgotPasswordPage from "./public-pages/forgot-password";
import LoginPage from "./public-pages/login";
import RegisterPage from "./public-pages/register";
import PrivatePagesRouting from "./private-pages";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { AuthActions } from "./redux/auth";
import PageRouting from "./public-pages/page";
import MangXaHoi from "./public-pages/page/mang-xa-hoi";

type Props = {};

export default function Routing(props: Props) {
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        {/* <Route path="/home/*" element={<PageRouting />}></Route> */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/mang-xa-hoi" element={<MangXaHoi/>} />

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
