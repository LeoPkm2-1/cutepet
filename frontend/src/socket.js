import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
export const socket = io(`${process.env.REACT_APP_SERVER_API_HOST}`);
