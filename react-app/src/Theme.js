import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { AutoComplete } from 'material-ui';

const theme = createMuiTheme({
  gradientBackground: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  fontFamily: "Helvetica",
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent:"center",
  },
  MuiBoxRoot1: {
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent:"center",
  },
  palette: {
    primary: {
      main: '#648dae',
    },
    secondary: {
      main: '#0f0'
    }
  },
  typography: {
    fontFamily: "Helvetica"
  },
  switch: {
    color: 'orange',
  },
  thumb: {
    color: 'orange',
  }
});

const Theme = props => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}

export default Theme;
