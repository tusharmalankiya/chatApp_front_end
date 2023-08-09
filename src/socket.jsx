import {  io } from "socket.io-client";

const token = localStorage.getItem("token");

// console.log(token);

const socket =  io("http://192.168.31.119:4000", { auth: { token }, autoConnect: true });

export default socket;