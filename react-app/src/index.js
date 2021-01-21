import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from "./store/configureStore"
import { Provider } from 'react-redux';


const initialState = {}

const store = configureStore(initialState);
//<Provider store={store}>
//  <App />
//</Provider>
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  ,
  document.getElementById('root')
);
