import io from 'socket.io-client';

const socket = io.connect('//localhost:5000');

export default socket;