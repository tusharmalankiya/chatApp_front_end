import React, { useState, createContext } from "react";

export const TokenContext = createContext();

const TokenContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [id, setId] = useState(localStorage.getItem("id"));
  return (
    <TokenContext.Provider value={{ token, setToken, id, setId }}>
      {props.children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
