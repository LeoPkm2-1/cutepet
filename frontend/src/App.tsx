import { Provider } from 'react-redux';
import { store } from './redux';
import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import Routing from './Routing';
import DialogContext from './context/DialogContext';
// import { socket } from './socket';
import { NotifycationItem } from './components/NotificationItem';
function App() {
//   useEffect(() => {
//     window.oncontextmenu = (e) => {
//       e.preventDefault();
//     };
//   }, []);
// const enqueueSnackbar = useSnackbar();
// useEffect (() => {
//   console.log("Vào conect fe");
//   socket.connect();
  
//   socket.on('COMMENT_STATUS_POST', (data) => {
//     console.log(data, ' Data comment from server:');
//     enqueueSnackbar(<NotifycationItem
//       name={data?.userComment?.ten}
//        type="bình luận"
//        url = {data?.userComment?.anh?.url}

//     />, {
//       variant: "info",
//     });
//   });

//   return () => {
//   console.log("Dis conect fe");
//     socket.disconnect();
//   }
// }, [])

// useEffect(() => {
//   console.log("Mở comment");
  
//   socket.on('LIKE_STATUS_POST', (data) => {
//     console.log(data, ' Data chat from server:');
//     enqueueSnackbar(<NotifycationItem 
//       name={data?.userLike?.ten}
//        type="thích"
//        url = {data?.userLike?.anh?.url}
//     />, {
//       variant: "info",
//     });
//   });
//   return () => {
//     socket.off('response-message');
//   };
// }, []);

// useEffect(() => { 
//   socket.on('COMMENT_STATUS_POST', (data) => {
//     console.log(data, ' Data comment from server:');
//     enqueueSnackbar(<NotifycationItem 
//       name={data?.userComment?.ten}
//        type="bình luận"
//        url = {data?.userComment?.anh?.url}

//     />, {
//       variant: "info",
//     });
//   });
//   return () => {
//     socket.off('response-message');
//   };
// }, []);

  return (
    <Provider store={store}>
      <DialogContext>
        <SnackbarProvider
          autoHideDuration={6000}
          maxSnack={3}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
        >
          <Routing />
        </SnackbarProvider>
      </DialogContext>
    </Provider>
  );
}

export default App;
