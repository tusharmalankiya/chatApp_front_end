import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

const useLogin = () => {
  // const { isLogin, setIsLogin } = useContext(LoginContext);

  return useContext(LoginContext);
};

export default useLogin;
