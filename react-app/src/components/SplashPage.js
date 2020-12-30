import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';
import Login from './auth/LoginForm'
import SignUp from './auth/SignUpForm'
import { AutoComplete } from 'material-ui';

const SplashPage = () => {
    console.log("Entered Splash Page")


    const useStyles = makeStyles((theme) => ({
        MuiGrid: {
            width: "80%"
        },
        MuiDialogActions: {
            justifyContent: "space-around"
        },
        img: {
            display: "block",
            width: "40%",
            marginLeft: "auto",
            marginRight: "auto"
        },
        root: {
            color: theme.primary,
            width: "40%",
            marginLeft: "auto",
            marginRight: "auto",
        },
        body: {
            justifyContent: "center"

        }
    }));
    const classes = useStyles();

    const login = () => {
        console.log("Redirecting to Login");
        window.location.replace("/login");
        // return <Login></Login>
    };
    const signUp = () => {
        console.log("Redirecting to SignUp");
        window.location.replace('signUp');
        // return <SignUp></SignUp>
    };


    return (
        <Box >
            <div><center><img src="fullLogo.png" alt="Placement Scheduler Logo"/></center>
                <Box m={4} >
                </Box>
                <Typography variant="h5" align="center" color="primary">
                    EMPLOYERS
                </Typography>

                <Box >
                <Typography variant="body1" color="primary" align="center" gutterBottom="true">
                    We know employees cannot always predict when they will have to miss days at work.
                    We also know you already have a burgeoning schedule that waits for no-one.
                    Finding a replacement for a critical employee can be a time consuming task.
                    Placement Scheduler provides you with a one-click option. Place your request for any dental office
                        employee and instantly receive a highly qualified, Covid-tested staff replacement!
                </Typography>
                </Box>
                <Box m={4}>

                </Box>
                <Box m={4} >
                <Typography variant="h5" align="center" color="primary" marginTop="80px">
                DENTAL OFFICE STAFF
                </Typography>
                <Typography variant="body1" color="primary" align="center" >
                    Set your own schedule. Tell us when you want to work, and when you don't.
                    Receive ONLY assignments when you want to work!
                    Adjust your schedule on a whim - no worries! Easy as just two clicks!!
                </Typography>
                </Box>
                <Box m={10}>
                <div className={classes.root}>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={signUp}
                        className={classes.root}
                        style={{ margin: "auto",}}

                    >
                        {
                            'Sign Up!'
                        }
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        className={classes.root}
                        onClick={login}
                        style={{ marginLeft: "20px" }}

                    >
                        {
                            'Log In'
                        }
                    </Button>
            </div>
            </Box>
        </div>
        </Box>

    );
}

export default SplashPage;
