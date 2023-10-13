const socket = io({
  extraHeaders:{
    authen_token:'xin chao tui la leo ahihi',
  }
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  if(input.value){
    socket.emit('chat message',input.value);
    input.value = '';
  }
});

socket.on('response message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

