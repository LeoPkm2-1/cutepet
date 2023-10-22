import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object

// export const socket = io(`${process.env.REACT_APP_SERVER_API_HOST}`);

const token = localStorage.getItem("accessToken");
console.log(token, "token: ");
// export const socket = io(`${process.env.REACT_APP_SERVER_API_HOST}`,{
  export const socket = io(`http://localhost:3000/norm_user`,{
    extraHeaders:{
      authen_token: JSON.parse(token),
    }
  });
