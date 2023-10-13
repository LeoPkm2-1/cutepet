const socket = io('/norm_user',{
  extraHeaders:{
    authen_token:'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJtYV9uZ3VvaV9kdW5nIjoxLCJ0ZW4iOiJOYW0iLCJuZ2F5X3NpbmgiOiIxOTkxLTA5LTI4VDE3OjAwOjAwLjAwMFoiLCJ0YWlfa2hvYW4iOiJuYW0iLCJlbWFpbCI6Im5hbUBnbWFpbC5jb20iLCJzb19kaWVuX3Rob2FpIjoiMDkxMjM0NTY3OCIsImdpb2lfdGluaCI6MSwiaWF0IjoxNjk3MTgxMzE2LCJleHAiOjE2OTcyMTEzMTZ9.9z8yS-rrLGT7uzTntZn2jvj4v2Y_bhxLpYvPEHq1oMBhHtPUQqJO-2gJI06n2-9Dybvtuv7eW7mMUS8ENC3oKw',
  }
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  if(input.value){
    socket.emit('chat message',input.value,(msg)=>{
      console.log(msg);
    });
    input.value = '';
  }
});

socket.on('TEST_ROOM_1',(msg)=>{
  msg = `TEST_ROOM_1: ${msg}`;
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
  console.log(msg);
})

socket.on('response message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

