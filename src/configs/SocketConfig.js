
import SockJS from "sockjs-client";
import { over } from "stompjs";


export var stompClient = null;


export const connect = (onConnected, onError) => {
  let sock = new SockJS('https://spring-chat-app-1-2.onrender.com/ws');
  stompClient = over(sock);
  stompClient.connect({}, onConnected, onError);

}

export const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
}


