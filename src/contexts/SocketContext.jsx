import React, { createContext, useContext } from 'react';
import socket from './../socket';

const SocketContext = createContext(socket);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {

  return <SocketContext.Provider value={socket}>
    {children}
    </SocketContext.Provider>;
};
