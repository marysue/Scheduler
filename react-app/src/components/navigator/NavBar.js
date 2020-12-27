import React, { useEffect, useState} from "react";
// import {Date} from 'datetime'
import { Grid } from "@material-ui/core";
import LoggedOutTabNav from "./Header/LoggedOutTabNav";
import { useParams } from "react-router-dom";
import TabNavAgency from './Header/TabNavAgency';
import TabNavContractor from './Header/TabNavContractor';
import TabNavCompany from './Header/TabNavCompany';


const Home = () => {
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
    const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);


    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

   // const options = [{"key": 0, "value":"home"}, {"key": 1, "value": "workouts"}, {"key": 2, "value": "routes"}, {"key": 3, "value": "explore"}, {"key": 4, "value": "user"}];
    const userType = window.localStorage.getItem("userType");
    const currentUser = window.localStorage.getItem("currentUser");
    if (currentUser) {
        //user logged in, now determine which sort of navigation bar they will get
        if (userType === 'agency') {
            return (
            <div style={{ marginTop: "10vh", marginLeft: "auto", marginRight: "auto", borderBottom: "2px solid lightGrey", display: "grid", position: "fixed block", width: "70vw", height: "100%", maxHeight: "10vh", top: "10vh"}}>

                <Grid style={{ border: "0px solid blue"}} container xs={12}>
                <h2 style={{marginBottom: "0px", width:"100%"}}>Agency View</h2>
                {/* <Grid item xs={10} l={10} container justify={"flex-start"} style={{ minWidth: "600px", minHeight: "4em",}}>
                        <h2>Agency View</h2>
                    </Grid> */}

                    <Grid item xs={10} l={10} container justify={"flex-start"} style={{ minWidth: "600px", minHeight: "4em",}}>
                        <TabNavAgency />
                    </Grid>
                </Grid>
            </div>
            )
        } else if (userType === 'company') {
            return (
                <div style={{ marginTop: "10vh", marginLeft: "auto", marginRight: "auto", borderBottom: "2px solid lightGrey", display: "grid", position: "fixed block", width: "70vw", height: "100%", maxHeight: "10vh", top: "10vh"}}>
                    <Grid style={{ border: "0px solid blue"}} container xs={12}>
                    {/* <Grid item xs={10} l={10} container justify={"flex-start"} style={{ minWidth: "600px", minHeight: "4em",}}>
                        <h2>Company View</h2>
                    </Grid> */}
                        <h2 style={{marginBottom: "0px", width:"100%"}}>Company View</h2>
                        <Grid item xs={10} l={10} container justify={"flex-start"} style={{ minWidth: "600px", minHeight: "4em",}}>
                            <TabNavCompany />
                        </Grid>
                    </Grid>
                </div>
            )
        } else if (userType === 'contractor') {
            return (
                <div style={{ marginTop: "10vh", marginLeft: "auto", marginRight: "auto", borderBottom: "2px solid lightGrey", display: "grid", position: "fixed block", width: "70vw", height: "100%", maxHeight: "10vh", top: "10vh"}}>
                    <Grid style={{ border: "0px solid blue"}} container xs={12}>
                    {/* <Grid item xs={10} l={10} container justify={"flex-start"} style={{ minWidth: "600px", minHeight: "4em",}}>
                        <h2>Contractor View</h2>
                    </Grid> */}
                    <h2 style={{marginBottom: "0px", width:"100%"}}>Contractor View</h2>
                        <Grid item xs={10} l={10} container justify={"flex-start"} style={{ minWidth: "600px", minHeight: "4em",}}>

                            <TabNavContractor />
                        </Grid>
                    </Grid>
                </div>
            )
        } else {
            console.log("User is logged in, but userType is not set!")
        }
    } else {
        //User not logged in - return logged out tab nav
        return (
            <div style={{ marginTop: "10vh", marginLeft: "auto", marginRight: "auto", borderBottom: "2px solid lightGrey", display: "grid", position: "fixed block", width: "70vw", height: "100%", maxHeight: "10vh", top: "10vh"}}>
            <Grid style={{ border: "0px solid blue"}} container xs={12}>
                    <Grid item xs={10} l={10} container justify={"flex-start"} style={{ minWidth: "600px", minHeight: "4em",}}>
                        <LoggedOutTabNav></LoggedOutTabNav>
                    </Grid>

                </Grid>
            </div>
        )

    }
}
export default Home;
