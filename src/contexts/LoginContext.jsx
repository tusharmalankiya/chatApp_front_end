import React, { useState, createContext } from "react";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const isLoggedIn = localStorage.getItem("id") ? true: false;
  const [isLogin, setIsLogin] = useState(isLoggedIn);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
