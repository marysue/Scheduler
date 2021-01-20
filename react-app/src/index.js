import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from "./store/configureStore"
import { Provider } from 'react-redux';
import { Box } from '@material-ui/core';

const initialState = {}

const store = configureStore(initialState);
//<Provider store={store}>
//  <App />
//</Provider>
ReactDOM.render(
  <Provider store={store}>
    <Box style={{display:"block", justifyContent:"space-around", marginLeft:"auto", marginRight:"auto"}}>
      <App />
    </Box>
  </Provider>
  ,
  document.getElementById('root')
);
