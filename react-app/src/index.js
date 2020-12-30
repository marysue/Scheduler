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
    <Box marginLeft="10%" marginRight="20%" backgroundColor="black">
      <App />
    </Box>
  </Provider>
  ,
  document.getElementById('root')
);
