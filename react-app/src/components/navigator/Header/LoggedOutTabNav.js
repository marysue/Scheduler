import React, {useState } from 'react';
import {
    Tabs,
    Tab,
    makeStyles,
} from "@material-ui/core";

import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  indicator: {
        backgroundColor: 'primary',
    },
}));


const LoggedOutTabNav = () => {

    const tabNameToIndex = {
        0: "home",
        1: "login",
        2: "signUp",
    }

    const indexToTabName = {
        home: 0,
        login: 1,
        signUp: 2,
    }
    const { page } = useParams();

    const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
    const history = useHistory()
    const classes = useStyles();

    const handleChange = (event, newValue) => {
      console.log("New value: ", newValue);
        setSelectedTab(newValue);
    }

  return (
    <>
        <Tabs indicatorColor={'primary'} value={selectedTab} onChange={handleChange}>
            <Tab value={0} onClick={() => history.push('/')}
                label={ <img className={classes.large} style={{maxHeight: "3em", maxWidth: "3em"}} src='/Logo.png'/>}>
            </Tab>
            <Tab value={1} onClick={() => history.push('/login')}
              label={ "LOGIN" } >
            </Tab>
            <Tab value={2} onClick={() => history.push('/login')}
              label={ "SIGN UP!" } >
            </Tab>
        </Tabs>
    </>
  )}

  export default LoggedOutTabNav;
