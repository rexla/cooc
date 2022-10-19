import React, { useState } from "react";
import Logger from "../../lib/Logger";
import LoginPage from "./login";
import PTeacherForgetPassword from "./forget-password";

const logger = new Logger("/pteacher/");

const Pteacher = () => {
  /**
   * isLogin: true -> login page
   * isLogin: false -> change password page
   */
  const [isLogin, setIsLogin] = useState(true);
  return isLogin ? (
    <LoginPage setIsLogin={setIsLogin} />
  ) : (
    <PTeacherForgetPassword setIsLogin={setIsLogin} />
  );
};

export default Pteacher;
