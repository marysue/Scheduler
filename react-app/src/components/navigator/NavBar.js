import React from "react";
import { Grid } from "@material-ui/core";
// import { useParams } from "react-router-dom";
import TabNavAll from './Header/TabNavAll';


const Home = ({ setAuthenticated }) => {
    // const [, setForceUpdate] = useState(Date.now());

    // const { page } = useParams();
    // const indexToTabName = {
    //     home: 0,
    //     workouts: 1,
    //     routes: 2,
    //     explore: 3,
    //     user: 4,
    // }

    // const [isLoggedin, setIsLoggedin] = useState(false);
    // const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
    // const [loaded, setLoaded] = useState(false);


    // const [open, setOpen] = useState(false);

    // const handleClick = () => {
    //     setOpen(!open);
    // };

   // const options = [{"key": 0, "value":"home"}, {"key": 1, "value": "workouts"}, {"key": 2, "value": "routes"}, {"key": 3, "value": "explore"}, {"key": 4, "value": "user"}];
    const userType = window.sessionStorage.getItem("userType");
    // const userId = window.sessionStorage.getItem("userId");

        return(
                <Grid container>
                    { userType === 'agency' ?
                    <h2 style={{marginBottom: "0px", marginLeft: "40px",width:"100%"}}>Agency View</h2> : null}
                    { userType === 'contractor' ?
                    <h2 style={{marginBottom: "0px", marginLeft: "40px",width:"100%"}}>Contractor View</h2> : null}
                    { userType === 'company' ?
                     <h2 style={{marginBottom: "0px", marginLeft: "40px", width:"100%"}}>Company View</h2> : null}
                    { userType === undefined ?
                    <h2 style={{marginBottom: "0px", width:"100%"}}>WELCOME View</h2> : null}
                    <Grid >
                        <TabNavAll setAuthenticated={setAuthenticated}/>
                    </Grid>
                </Grid>
        )

}
export default Home;
