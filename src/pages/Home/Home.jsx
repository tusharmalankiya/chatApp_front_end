import { useEffect, useState } from "react";

// import socket from "../../socket";
import "./home.css";
import Chat from "../../components/Chat/Chat";

import { useSocket } from "../../contexts/SocketContext";
import { Link } from "react-router-dom";

const Home = () => {
  const socket = useSocket();
  const [chats, setChats] = useState([]);

  function onCurrentChats(chats) {
    console.log(chats);
    setChats(chats);
  }

  useEffect(() => {
    socket.emit("sendChats");
    socket.on("currentChats", onCurrentChats);

    return () => {
      socket.off("currentChats", onCurrentChats);
    };
  }, []);

  return (
    <>
      <div className="chats-container">
        {/* <Link to="/chat/1">
          <Chat username="Tushar" />
        </Link>
        <Chat username="Tushar" /> */}
        {chats.length > 0 &&
          chats.map((chat) => {
            return (
              <Link to={`/chat/${chat._id}`} key={chat._id}>
                <Chat  username={chat.username || chat.name} id={chat._id} />
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Home;
