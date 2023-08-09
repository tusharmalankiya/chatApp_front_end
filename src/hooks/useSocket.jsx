import { useEffect, useRef } from "react";
import io from "socket.io-client";

// import useTokenId from "../../hooks/useTokenId";

const useSocket = () => {
    const token = localStorage.getItem('token');
    console.log("token from 8 useSocket", token);
//   const { token } = useTokenId();
  const socketRef = useRef(null);

  useEffect( () => {
    socketRef.current =  io.connect("http://localhost:4000", {
      auth: { token },
    });

    return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };

}, []);

// console.log(socketRef.current);
//   console.log(socketRef.current);
   return socketRef.current;

};

export default useSocket;
