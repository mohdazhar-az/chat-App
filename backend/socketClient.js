import io from 'socket.io-client';

const socket = io('https://live-chat-app-backend-gsb6.onrender.com', {
  transports: ['websocket'],
  withCredentials: true
});

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected from server:', reason);
});

socket.on('error', (error) => {
  console.error('Socket.IO error:', error);
});


export default socket;
