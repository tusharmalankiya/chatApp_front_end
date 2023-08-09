import React from 'react';
import "./chat.css";

const IMAGE = "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80";

const Chat = ({username}) => {
  return (
    <div className='chat-container' >
        <div className='chat-image'>
            <img src={IMAGE} alt="img" />
        </div>
        <div className='chat-body'>
            <h3>{username}</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, dolorum!</p>
        </div>
    </div>
  )
}

export default Chat