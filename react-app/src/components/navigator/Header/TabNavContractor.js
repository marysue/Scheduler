import React, {useState} from 'react';
import {
    Tabs,
    Tab,
    makeStyles,
} from "@material-ui/core";
//import LogoutForm from '../../auth/LogoutForm';

import { useHistory,useParams } from "react-router-dom";

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


const TabNavContractor = () => {

    const tabNameToIndex = {
        0: "Calendar",
        1: "Assignments",
        2: "Logout",
    }

    const indexToTabName = {
        Calendar: 0,
        Assignments: 1,
        Logout: 2,
    }
    const { page } = useParams();

    const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
    const history = useHistory()
    const [image , setImage] = useState('/Logo.png')

    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    // const onLogout = () => {
    //   Logout();
    //   history.push('/splashPage')

    // }

  return (
    <>
        <Tabs style={{marginLeft:"5%"}} indicatorColor={'primary'} value={selectedTab} onChange={handleChange}>
            <Tab value={0} onClick={() => history.push(`/contractorView`)}
                label="Calendar" />
            <Tab value={1} onClick={() => history.push(`/contractorTable`)}
                label="Assignments" />
             <Tab value={2} onClick={() => history.push('/logout')}
            label="Logout" />
        </Tabs>
    </>
  )
}
  export default TabNavContractor;
