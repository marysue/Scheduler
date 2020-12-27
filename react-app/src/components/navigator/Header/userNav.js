import React, {useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Avatar,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const UserNav = () => {
    const history = useHistory()
    const useStyles = theme => ({
        indicator: {
            backgroundColor: 'primary',
        },
    })

    const tabNameToIndex = {
        0: "home",
        1: "workouts",
        2: "routes",
        3: "explore",
        4: "user",
    }

    const indexToTabName = {
        home: 0,
        workouts: 1,
        routes: 2,
        explore: 3,
        user: 4,
    }

    const { page } = useParams();

    const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div style={{marginTop: "10vh", marginLeft: "auto", marginRight: "auto", borderBottom: "2px solid lightGrey", display: "grid", position: "fixed block", width: "75vw", height: "100%", maxHeight: "10vh", top: "10vh"}}>
            <List>
                <ListItem button onClick={handleClick}>
                    <ListItemText primary={<Avatar
                        className={classes.large}
                        />} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit >
                    <ListItem value={3} button onClick={handleLogout}>
                        <ListItemText primary="Log Out" />
                    </ListItem>
                </Collapse>
            </List>
        </div>
    )
}

  export default UserNav;
