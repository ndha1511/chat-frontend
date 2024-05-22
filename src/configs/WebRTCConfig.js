
import { stompClient } from "./SocketConfig";

export const iceServers = {
    iceServer: [
        {
            urls: "stun:stun.l.google.com:19302"
        },
        {
            urls: "turn:relay1.expressturn.com:3478",
            username: "efG2POA1I8C0LY0AMG",
            credential: "gFkpmRvk98yQWbqX"
        }
    ]
}

export let localPeer;
export let localStream;

export const setLocalStream = async (media) => {
    await navigator.mediaDevices.getUserMedia(media)
        .then(stream => {
            localStream = stream;
        })
        .then(() => {
            localStream.getTracks().forEach(track => {
                localPeer.addTrack(track, localStream);
            });
        })
        .catch(error => {
            console.log(error)
        });
};

export const setLocalPeer = () => {
    localPeer = new RTCPeerConnection(iceServers);
}

export const closePeer = () => {
    if (localPeer) {
        localPeer.close();
        localPeer = null;
    }
}

export const closeStream = () => {
    if (localStream) {
        localStream.getAudioTracks().forEach(track => track.stop());
        localStream.getVideoTracks().forEach(track => track.stop());
    }
}

// send message 
export const sendCall = (messageCall, user) => {
    const callTo = messageCall.receiverId === user.email ? messageCall.senderId : messageCall.receiverId
    stompClient.send("/app/call", {}, JSON.stringify({ callTo: callTo, callFrom: user.email }));
}