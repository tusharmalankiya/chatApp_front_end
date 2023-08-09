import { useEffect, useRef, useState } from "react";
import useTokenId from "../../hooks/useTokenId";
// import socket from "../../socket";

import "./messages.css";
import { useParams } from "react-router-dom";
import { useSocket } from "../../contexts/SocketContext";

const NewMessageLabel = () => {
  return (
    <span
      style={{
        textAlign: "center",
        border: "1px solid white",
        borderRadius: "100px",
        width: "fit-content",
        margin: "auto",
        padding: "7px 20px",
        display: "block",
      }}
    >
      New Messages
    </span>
  );
};

const MessageComponent = ({ msg, id, emitMarkAsRead }) => {
  if (!msg.markAsRead && msg.senderId !== id) {
    // console.log(msg);
    // console.log("markAsRead emitted from message component");
    emitMarkAsRead(msg);
    msg.markAsRead = true;
  }

  return (
    <>
      <div
        style={{
          textAlign: msg.senderId === id && "right",
        }}
      >
        <div
          style={{
            // border:"1px solid green",
            display: "inline-block",
            padding: "7px 20px",
            borderRadius: "100px",
            background: "lightblue",
            color: "black",
            maxWidth: "70%",
            wordWrap: "break-word",
            margin: "5px 0px",
            position: "relative",
          }}
        >
          {msg.message}
          {msg.senderId === id && (
            <div
              id={msg._id}
              style={{
                position: "absolute",
                background: `${msg.markAsRead ? "green" : "red"}`,
                bottom: "0",
                right: "0",
                border: "1px solid white",
                height: "12px",
                width: "12px",
                borderRadius: "50%",
              }}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};

const Messages = () => {
  const socket = useSocket();

  //params
  const { receiverId } = useParams();

  const { id } = useTokenId();
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);
  const [isNewMessages, setIsNewMessages] = useState(false);
  const [sendMsg, setSendMsg] = useState("");
  const [status, setStatus] = useState("offline");
  const messagesContainerRef = useRef(null);

  const [receiver, setReceiver] = useState(null);

  //------------scroll Bottom--------------------------------------------------
  const scrollBottom = () => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollBottom();
  }, [newMessages, messages]);

  //Initializing Component
  useEffect(() => {
    console.log("JoinChat");
    socket.emit("joinChat", receiverId);
    // console.log("Fetched");
  }, []);

  //-----------------------------------------------------------------------------
  function onMessage(msg) {
    setNewMessages((msgs) => [...msgs, msg]);
  }

  function onStatus(sender) {
    if (sender.receiverId === receiverId && sender.status) {
      setStatus("online");
    } else {
      setStatus("offline");
    }
  }

  function onReceiverInfo(info) {
    setReceiver(info);
    setStatus(() => {
      if (info.online) {
        return "online";
      } else {
        return "offline";
      }
    });
  }

  const onToSender = (msg) => {
    setNewMessages((messages) => [...messages, msg]);
  };

  const onMarkedAsRead = (msg) => {
    console.log("marked As Read");
    document.getElementById(`${msg._id}`).style.background = "green";
  };

  const onPrevChatMessages = (msgs) => {
    setMessages(msgs);
  };

  const onNewChatMessages = (msgs) => {
    setNewMessages(msgs);
    if (msgs.length > 0 && msgs[msgs.length - 1].senderId !== id) {
      setIsNewMessages(true);
    }
  };

  useEffect(() => {
    //private
    socket.on("markedAsRead", onMarkedAsRead);
    socket.on("toReceiver", onMessage);
    socket.on("status", onStatus);
    socket.on("toSender", onToSender);
    socket.on("receiverInfo", onReceiverInfo);
    socket.on("prevChatMessages", onPrevChatMessages);
    socket.on("newChatMessages", onNewChatMessages);

    return () => {
      //private
      socket.off("markedAsRead", onMarkedAsRead);
      socket.off("toReceiver", onMessage);
      socket.off("status", onStatus);
      socket.off("toSender", onToSender);
      socket.off("receiverInfo", onReceiverInfo);
      socket.off("prevChatMessages", onPrevChatMessages);
      socket.off("newChatMessages", onNewChatMessages);

      setMessages([]);
      setNewMessages([]);
      setIsNewMessages(false);
    };
  }, []);

  const sendMessage = (message, toWhom, setState) => {
    socket.emit("chatSender", message, toWhom);
    setState("");
  };

  //marking message as read if not read already
  const emitMarkAsRead = (msg) => {
    socket.emit("markMessageAsRead", msg);
  };

  const onSendMessageEnter = (e) => {
    if (e.key === "Enter") {
      document.getElementById("message-send-button").click();
    }
  };

  return (
    <>
      <div className="messages-container">
        <div className="messages-header">
          {/* <h3>{joined}</h3> */}
          {receiver && <h6>{`${receiver.username} is ${status} `}</h6>}
        </div>

        <div className="messages-body" ref={messagesContainerRef}>
          {messages.length > 0 &&
            messages.map((msg) => {
              return (
                <MessageComponent
                  key={msg._id}
                  msg={msg}
                  id={id}
                  emitMarkAsRead={emitMarkAsRead}
                />
              );
            })}
          {messages.length === 0 && !isNewMessages && <p>No Messages</p>}
          {isNewMessages && <NewMessageLabel />}
          {newMessages.length > 0 &&
            newMessages.map((msg) => {
              return (
                <MessageComponent
                  key={msg._id}
                  msg={msg}
                  id={id}
                  emitMarkAsRead={emitMarkAsRead}
                />
              );
            })}
        </div>

        {/* footer */}
        <div className="messages-footer">
          <div>
            <input
              className="message-box"
              type="text"
              id="send-message-box"
              onChange={(e) => {
                setSendMsg(e.target.value);
              }}
              value={sendMsg}
              onKeyUp={onSendMessageEnter}
            />
          </div>
          <button
            id="message-send-button"
            className="sendButton"
            disabled={sendMsg.length < 1}
            onClick={() => {
              sendMessage(sendMsg, receiverId, setSendMsg);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Messages;
