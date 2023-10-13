import { Provider } from 'react-redux';
import { store } from './redux';
import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import Routing from './Routing';
import DialogContext from './context/DialogContext';
import { socket } from './socket';
function App() {
//   useEffect(() => {
//     window.oncontextmenu = (e) => {
//       e.preventDefault();
//     };
//   }, []);
useEffect (() => {
  socket.connect();
  return () => {
    socket.disconnect();
  }
}, [])
  return (
    <Provider store={store}>
      <DialogContext>
        <SnackbarProvider
          
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
