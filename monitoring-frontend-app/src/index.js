import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
//import dotenv from "dotenv-webpack";
// Store / Redux / React-Redux
import { Provider } from 'react-redux'
import store from './store'
// React Notast Notifications
import { ToastProvider, useToasts } from 'react-toast-notifications';
// Outside Caller
import OutsideCallConsumer, { createCaller } from 'react-outside-call';

// Hack/Trick para usar las notificaciones fuera de los componentes
export const callConfig = createCaller({ useToasts: () => useToasts() });


ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <Provider store={store}>
        <OutsideCallConsumer config={callConfig} >
          <App />
        </OutsideCallConsumer>
      </Provider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
