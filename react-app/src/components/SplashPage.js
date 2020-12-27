import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import Login from './auth/LoginForm'
import SignUp from './auth/SignUpForm'

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
            input: {
                textAlign: "center"
            },
            width: "100%",
            justifyContent: 'space-between'
        },
        divDisplay: {
            display: "grid",
            width: "70vw",
            color: theme.primary,
        },
        bodyDisplay: {
            display: "center",
            width: "100%",
            paddingLeft: "160px",
            paddingRight: "160px",
            color: theme.primary,
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
        window.location.replace('sign-up');
        // return <SignUp></SignUp>
    };


    return (
        <div className={classes.divDisplay}>
            <div className={classes.bodyDisplay} width="100%"><img src="fullLogo.png" alt="Placement Scheduler Logo"/></div>
            <div className={classes.bodyDisplay} style={{color: "blue"}}>
                <h3>EMPLOYERS:</h3>
                <p>We know employees cannot always predict when they will have to miss days at work.</p>
                <p>We also know you already have a burgeoning schedule that waits for no-one.</p>
                <p>Finding a replacement for a critical employee can be a time consuming task.</p>
                <p>Placement Scheduler provides you with a one-click option. Place your request for any dental office
                    employee and instantly receive a highly qualified, Covid-tested staff replacement!</p>
                <br/>
                <h3>DENTAL OFFICE STAFF:</h3>
                <p>Set your own schedule. Tell us when you want to work, and when you don't.</p>
                <p>Receive ONLY assignments when you want to work!</p>
                <p>Adjust your schedule on a whim - no worries! Easy as just two clicks!!</p>
            </div>
            <div>
            <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={signUp}
                style={{marginLeft: "250px", width: "15%" }}
            >
                {
                    'Sign Up!'
                }
            </Button>
            <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={login}
                style={{ width: "15%", marginLeft: "40px" }}
            >
                {
                    'Log In'
                }
            </Button>
            </div>

        </div>
    );
}

export default SplashPage;
