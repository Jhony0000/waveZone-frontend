import { io } from "socket.io-client";

export const socket = io.connect("http://localhost:8000", {
  withCredentials: true,
});