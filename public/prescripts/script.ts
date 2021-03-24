import { io, Socket } from "socket.io-client";

const socket: Socket = io()

socket.emit("message", "Hello world!")