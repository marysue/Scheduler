import React, { useEffect, useState} from "react";
// import {Date} from 'datetime'
import { Grid } from "@material-ui/core";
import LoggedOutTabNav from "./Header/LoggedOutTabNav";
import { useParams } from "react-router-dom";

import TabNavAll from './Header/TabNavAll';


const Home = ({ setAuthenticated }) => {
    const [, setForceUpdate] = useState(Date.now());

    const { page } = useParams();
    const indexToTabName = {
        home: 0,
        workouts: 1,
        routes: 2,
        explore: 3,
        user: 4,
    }

    const [isLoggedin, setIsLoggedin] = useState(false);
    const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
    const [loaded, setLoaded] = useState(false);


    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

   // const options = [{"key": 0, "value":"home"}, {"key": 1, "value": "workouts"}, {"key": 2, "value": "routes"}, {"key": 3, "value": "explore"}, {"key": 4, "value": "user"}];
    const userType = window.localStorage.getItem("userType");
    const currentUser = window.localStorage.getItem("currentUser");
    if (currentUser) {
        return(
                <Grid style={{ border: "0px solid blue"}} container >
                    { userType === 'agency' ?
                    <h2 style={{marginBottom: "0px", width:"100%"}}>Agency View</h2> : null}
                    { userType === 'contractor' ?
                    <h2 style={{marginBottom: "0px", width:"100%"}}>Contractor View</h2> : null}
                    { userType === 'company' ?
                     <h2 style={{marginBottom: "0px", width:"100%"}}>Company View</h2> : null}
                    <Grid item xs={10} l={10} container justify={"flex-start"} style={{ minWidth: "600px", minHeight: "4em",}}>
                        <TabNavAll setAuthenticated={setAuthenticated}/>
                    </Grid>
                </Grid>
        )
    } else {
        //User not logged in - return logged out tab nav
        return (
            <div style={{ marginTop: "10vh", marginLeft: "auto", marginRight: "auto", borderBottom: "2px solid lightGrey", display: "grid", position: "fixed block", width: "70vw", height: "100%", maxHeight: "10vh", top: "10vh"}}>
            <Grid style={{ border: "0px solid blue"}} container >
                    <Grid item xs={10} l={10} container justify={"flex-start"} style={{ minWidth: "600px", minHeight: "4em",}}>
                        <LoggedOutTabNav setAuthenticated={setAuthenticated}></LoggedOutTabNav>
                    </Grid>

                </Grid>
            </div>
        )

    }
}
export default Home;
