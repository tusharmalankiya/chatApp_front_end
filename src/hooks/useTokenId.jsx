import { useContext } from "react";
import { TokenContext } from "../contexts/TokenContext";

const useTokenId = () => {
  // const { token, setToken, id, setId } = useContext(TokenContext);

  return useContext(TokenContext);
};

export default useTokenId;
