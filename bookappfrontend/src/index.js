import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store"
import axios from 'axios'; 

axios.defaults.withCredentials = true
axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);