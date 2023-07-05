import { Provider } from 'react-redux';
import { store } from './redux';
import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import Routing from './Routing';
import DialogContext from './context/DialogContext';

function App() {
  // useEffect(() => {
  //   window.oncontextmenu = (e) => {
  //     e.preventDefault();
  //   };
  // }, []);
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
