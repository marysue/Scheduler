import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
//import { login } from "../../services/auth";
import { login } from "../../store/authentication"
import Alert from '@material-ui/lab/Alert';
import { Button,
         Dialog,
         DialogContent,
         Grid,
         Link,
         makeStyles,
         Typography,
         } from '@material-ui/core';
import { setUserEmail, setUserName, setUserId, setUserType } from '../../store/authentication';
import { getContractorInfo,setContractorId, setContractorName, setContractorPhone, setContractorEmail, setContractorAddr1, setContractorAddr2, setContractorCity, setContractorState, setContractorZip } from '../../store/contractor';
import { getCompany, setCompanyId, setCompanyName, setCompanyContactName, setCompanyPhone, setCompanyEmail, setCompanyAddr1, setCompanyAddr2, setCompanyCity, setCompanyState, setCompanyZip } from '../../store/company';
import FullLogo from '../../images/fullLogo.png';

const LoginForm = ({ authenticated, setAuthenticated, openDialog}) => {
    console.log("Entered LoginForm")
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: '',
        password: ''
      });
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState();
    const [errors, setErrors] = useState();
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
    }));
    const classes = useStyles();
    const history = useHistory();

    useEffect (() => {
        setSubmitted(false);
        setOpen(openDialog);
    }, [openDialog]);

    const setLoginDetails = (userId) => {
        setAuthenticated(true);
        setOpen(false);
        window.localStorage.setItem("currentUser", userId)
    }

    const dispatchLoginInfo = (email, id, username, userType) => {
        dispatch(setUserEmail(email));
        dispatch(setUserId(id));
        dispatch(setUserName(username));
        dispatch(setUserType(userType));
    }


    const dispatchSetContractorInfo = ( contractorId, email, name, phone, addr1, addr2, city, state, zip ) => {
        dispatch(setContractorId(contractorId));
        dispatch(setContractorEmail(email));
        dispatch(setContractorName(name));
        dispatch(setContractorPhone(phone));
        dispatch(setContractorAddr1(addr1));
        dispatch(setContractorAddr2(addr2));
        dispatch(setContractorCity(city));
        dispatch(setContractorState(state));
        dispatch(setContractorZip(zip));
    }

    const dispatchSetCompanyInfo = (companyId, companyName, name, email, phone, addr1, addr2, city, state, zip) => {
        dispatch(setCompanyId(companyId));
        dispatch(setCompanyName(companyName));
        dispatch(setCompanyContactName(name));
        dispatch(setCompanyEmail(email));
        dispatch(setCompanyPhone(phone));
        dispatch(setCompanyAddr1(addr1));
        dispatch(setCompanyAddr2(addr2));
        dispatch(setCompanyCity(city));
        dispatch(setCompanyState(state));
        dispatch(setCompanyZip(zip));
    }

    const handleSignIn = async (e) => {
        if (e) { e.preventDefault()};
        const user = await login(values.email, values.password);
        if (!user.errors) {
            console.log("User type is:  ", user.userType)
            dispatchLoginInfo(user.email, user.id, user.username, user.userType)
            setLoginDetails(user.id);
            window.localStorage.setItem("userId", user.id)
            window.localStorage.setItem("userType", user.userType)
            if (user.userType === "contractor") {
                const contractor = await getContractorInfo(user.id);
                if (!contractor.errors) {
                    dispatchSetContractorInfo(contractor.contractorId, contractor.name, contractor.email, contractor.phone, contractor.addr1, contractor.addr2, contractor.city, contractor.state, contractor.zip)
                    window.localStorage.setItem("contractorId", contractor.contractorId);
                    // return <Redirect to="/contractorView" />
                    history.push('/contractorView')
                } else {
                    setErrors(contractor.errors);
                    console.log("LoginForm: No contractor info yet ... need to get it")
                    // return <Redirect to="/contractorInfo" />
                    history.push('/contractorInfo')
                }
            } else if (user.userType === "company") {
                const company = await getCompany(user.id);
                if (!company.errors) {
                    dispatchSetCompanyInfo(company.id, company.companyName, company.name, company.phone, company.email, company.addr1, company.addr2, company.city, company.state, company.zip);
                    window.localStorage.setItem("companyId", company.id);
                    // return <Redirect to="/companyView" />
                    history.push('/companyView')
                } else { setErrors(company.errors);
                    // return <Redirect to="/companyInfo" />
                    history.push('/companyInfo')
                }
            } else if (user.userType === "agency") {
                    // return <Redirect to="/agencyView" />
                    history.push('/agencyView')
            }
        } else {
          setErrors(user.errors);
        }
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // const handleSubmit = () => {
    //     setSubmitted(true , () => {
    //         setTimeout(() => setSubmitted(false), 5000);
    //     });
    // }
    // const goToSignUp = (e) => {
    //     e.preventDefault()
    //     return <Redirect to="/signUp" />
    //   }


    const loginAgencyDemo = async() => {
        const user = await login('agency@agency.com', 'password');
        window.localStorage.setItem("userType", user.userType)
        if (!user.errors) {
            setLoginDetails(user.id);
            dispatchLoginInfo(user.email, user.id, user.username, user.userType)
            window.localStorage.setItem("agencyId", user.id);
            window.localStorage.setItem("currentUser",user.id)
            console.log('login demo - redirecting to agencyView')
            // return <Redirect to="/agencyView" />
            history.push('/agencyView')
        } else {
            setErrors(user.errors);
        }

    }

    const loginCompanyDemo = async() => {
       const user = await login('co1@co1.com', 'password');
       window.localStorage.setItem("userType", user.userType)
       if (!user.errors) {
            dispatchLoginInfo(user.email, user.id, user.username, user.userType)
            window.localStorage.setItem("currentUser",user.id)
            window.localStorage.setItem("userId", user.id)
            setLoginDetails(user.id);
            if (user.userType === "company") {
                const company = await getCompany(user.id);
                if (!company.errors) {
                    dispatch(setCompanyId(company.id));
                    dispatch(setCompanyName(company.companyName));
                    window.localStorage.setItem("companyId", company.id);
                    // return <Redirect to="/companyView"></Redirect>
                    history.push('companyView')
                } else {
                    setErrors(company.errors);
                    // return <Redirect to="/companyInfo" />
                    history.push('companyInfo')
                }
            }
        } else {
            setErrors(user.errors);
        }
    }

    const loginContractorDemo = async () => {
        // const user = await login('demo@aa.io', 'password');
        const user = await login('da2@da2.com', 'password');
        window.localStorage.setItem("userType", user.userType)
        window.localStorage.setItem("currentUser",user.id)
        if (!user.errors) {
            console.log("LoginForm:  loginContractorDemo: Received the following user info: ", user);
            dispatch(setUserEmail(user.email));
            dispatch(setUserId(user.id));
            dispatch(setUserName(user.username));
            dispatch(setUserType(user.userType));

            setLoginDetails(user.id);
            if (user.userType === "contractor") {
                const contractor = await getContractorInfo(user.id);
                if (!contractor.errors) {
                    dispatch(setContractorId(contractor.contractorId));
                    window.localStorage.setItem("contractorId", contractor.contractorId);
                    //   window.location.href="/"
                    // return <Redirect to="/contractorView" />
                    history.push('/contractorView')
                } else {
                    setErrors(contractor.errors);
                    // return <Redirect to="/contractorInfo" />
                    history.push('contractorInfo')
                }
            }
        } else {
            setErrors(user.errors);
        }
    };

    if (authenticated) {
        console.log("Authenticated is true", authenticated);
        let contractorId = null
        let companyId = null
        let agencyId = null
        setTimeout(function() {}, 2000);
             contractorId = window.localStorage.getItem("contractorId");
             companyId = window.localStorage.getItem("companyId");
             agencyId = window.localStorage.getItem("agencyId");
        // }

        if (contractorId) {
            console.log("We have a contractorId, redirecting:  ", contractorId, " with authenticated: ", authenticated);
            // window.location.replace('/contractorView')
            // return <Redirect to='/contractorView' />
            history.push('/contractorView')
        } else if (companyId) {
            console.log("We have a companyId, redirecting: ", companyId, " with authenticated: ", authenticated);
            // window.location.replace('/companyView')
            // return <Redirect to='/companyView'/>
            history.push('/companyView')
        } else if (agencyId) {
            console.log("We have an agencyId, redirecting: ", agencyId, " with authenticated: ", authenticated);
            // window.location.replace('/agencyView')
            // return <Redirect to='/agencyView' />
            history.push('/agencyView')
        } else {
            return null;
        }

    }

    if (!open) {
        return null
    } else {
        return (
            <div>
                <Dialog open={open} style={{width:"100%"}} onClose={handleSignIn} aria-labelledby="form-dialog-title">
                    <div style={{marginTop:"40px"}}>
                         <img src={FullLogo} alt="Placement Scheduler Logo" style={{width:"75%"}} className={classes.img}></img>
                        <Typography component="h6" variant="h6" align="center" color="primary" style={{marginTop: "20px", fontWeight:"bold"}}>Sign In
                        </Typography>
                    </div>

                { errors ? <div className={classes.root}><Alert severity="error">{errors}</Alert></div> : null}

                <DialogContent style={{width:"100%"}}>
                    <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                        <Grid container item xs={10} ></Grid>
                        <ValidatorForm
                                //ref="form"
                                onSubmit={handleSignIn}
                                style={{width:"75%", justifyContent:"center"}}
                            >
                            { errors ? <div>{errors}</div> : null }
                            <TextValidator
                                variant="outlined"
                                label="Email"
                                onChange={handleChange('email')}
                                name="email"
                                value={values.email}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                                style={{width:"100%", justifyContent:"center"}}
                            />
                            <br />
                            <TextValidator
                                variant="outlined"
                                label="Password"
                                onChange={handleChange('password')}
                                name="password"
                                value={values.password}
                                type= {"password"}
                                style={{width:"100%", justifyContent:"center"}}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <br />
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={submitted}
                                style={{display:"block", marginLeft:"auto", marginRight:"auto"}}
                            >
                                {
                                    'Sign In'
                                }
                            </Button>
                            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid container item xs={10} justify="center">
                                    <Typography  style={{marginTop:"40px", marginBottom:"40px"}} align="center" color="primary" >
                                    <Link href="/signUp" >Create your Placement Scheduler account</Link>
                                    </Typography>
                                    <Button variant="contained" style={{marginBottom:"20px", alignItems:"flex-start"}} onClick={loginContractorDemo} color="primary">Demo Contractor Login</Button>
                                    <Button variant="contained" style={{marginBottom:"20px", alignItems:"flex-center"}} onClick={loginCompanyDemo} color="primary">Demo Company Login</Button>
                                    <Button variant="contained" style={{marginBottom:"20px", alignItems:"flex-center"}} onClick={loginAgencyDemo} color="primary">Demo Agency Login</Button>
                                </Grid>

                            </Grid>
                            <Button
                                color="primary"
                                variant="contained"
                                type="button"
                                className="cancel"
                                value="Submit without validation"
                                onClick={e => window.location.href="/"}
                                style={{marginTop:"20px", justifyContent:"flex-end", marginBottom:"20px", marginLeft:"auto", marginRight:"auto"}}
                            >
                                {
                                    ('Cancel')
                                }
                            </Button>
                        </ValidatorForm>
                    </Grid>
                </DialogContent>
                </Dialog>
                </div>


    );
    }
}

export default LoginForm;
