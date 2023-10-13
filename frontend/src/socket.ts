import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
export const socket = io(`${process.env.PUBLIC_URL}/norm_user`);