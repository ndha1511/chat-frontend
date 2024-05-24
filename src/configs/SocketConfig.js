
import SockJS from "sockjs-client";
import { over } from "stompjs";


export var stompClient = null;


export const connect = (onConnected, onError) => {
  let sock = new SockJS('http://54.169.9.168/ws');
  stompClient = over(sock);
  stompClient.connect({}, onConnected, onError);

}

export const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
}


