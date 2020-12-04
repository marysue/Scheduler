import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alert from '@material-ui/lab/Alert'
import { Button,
         Dialog,
         DialogContent,
         FormControl,
         Grid,
         OutlinedInput,
         InputLabel,
         makeStyles,
         MenuItem,
         Select,
         Typography,
        } from '@material-ui/core';

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [open, setOpen] = useState('true');
  const [errors, setErrors] = useState('');
  const [values, setValues] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    userType: ''
  });

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

  const onSignUp = async (e) => {
    e.preventDefault();
    if (values.password === values.repeatPassword) {
      const user = await signUp(values.username, values.email, values.password, values.userType);
      if (!user.errors) {
        setAuthenticated(true);
        setOpen(false);
        setErrors('');
        window.localStorage.setItem("currentUser", user.id)
      } else {
        setErrors(user.errors);
      }
    } else {
      console.log("Passwords did not match ... ");
    }
  };

  const handleChange = (prop) => (event) => {
    console.log("Inside handleChange for prop: ", prop, " and event.target.value: ", event.target.value)
    setValues({...values, [prop]: event.target.value});
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  if (window.localStorage.getItem("currentUser")) {
    window.location.replace("/");
  }

  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    const len = value.length
    const pwdPortion  = values.password.substring(0, len);
    if (value === pwdPortion) {
      return true;
    } else {
      return false;
    }
  });


  return (
    <>
      <Dialog open={open} style={{width:"100%", marginLeft:"auto", marginRight:"auto", justifyContent:"center"}} aria-labelledby="form-dialog-title">
        <div>
          <Typography component="h6" variant="h6" align="center" color="primary" style={{marginTop: "20px", fontWeight:"bold"}}>Create Your Placement Scheduler Account</Typography>
        </div>

        <DialogContent style={{width:"100%", marginLeft:"auto", marginRight:"auto", justifyContent:"center"}}>
          <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
          <div className={classes.root}>
            {errors ? <Alert severity="error">{errors}</Alert> : <div></div> }
          </div>
            <ValidatorForm
              onSubmit={onSignUp}
              style={{width:"75%", justifyContent: "center"}}
              >
              <br />

              <TextValidator
                variant="outlined"
                label="User Name"
                onChange={handleChange('username')}
                name="username"
                value={values.username}
                validators={['required']}
                errorMessages={['Username field is required']}
                style={{width:"100%", justifyContent:"center"}}
              />

              <br />
              <TextValidator
                variant="outlined"
                label="Email"
                onChange={handleChange('email')}
                name="email"
                value={values.email}
                validators={['required', 'isEmail']}
                errorMessages={['Email is required', 'Email is not valid']}
                sttyle={{width:"100%", justifyContent:"center", marginRight:"0px"}}
              />

              <br />
              <FormControl className={classes.formControl} style={{width:"100%", marginBottom:"20px"}}>
                <InputLabel htmlFor="userType-helper" style={{paddingLeft:"15px"}}>User Type</InputLabel>
                <Select
                value={values.userType}
                onChange={handleChange('userType')}
                input={<OutlinedInput name='userType' id='userType-helper' />}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"contractor"}>Contractor</MenuItem>
                <MenuItem value={"company"}>Company</MenuItem>
              </Select>
              </FormControl>


              {/* <TextValidator
                variant="outlined"
                label="User Type ['admin', 'contractor', 'company']"
                onChange={handleChange('userType')}
                name='userType'
                value={values.userType}
                type={"text"}
                style={{width:"100%", justifyContent:"center"}}
                validators={['required']}
                errorMessages={['User type is required']}
              /> */}

              <br />
              <TextValidator
                variant="outlined"
                label="Password"
                onChange={handleChange('password')}
                name="password"
                value={values.password}
                type={"password"}
                style={{width:"100%", justifyContent:"center"}}
                validators={['required']}
                errorMessages={['Password is required']}
              />

              <br />
              <TextValidator
                variant="outlined"
                label="Confirm Password"
                onChange={handleChange('repeatPassword')}
                name="repeadPassword"
                value={values.repeatPassword}
                type={"password"}
                style={{width:"100%", justifyContent:"center"}}
                validators={['required', 'isPasswordMatch']}
                errorMessages={['Confirm password is required', 'Passwords do not match']}
              />

              <br />
              <Grid container item xs={10} style={{width:"100%", padding:"0px"}} >
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  style={{marginTop:"20px", justifyContent:"flex-start", marginBottom:"20px"}}
                >
                  {
                    ('Sign Up')
                  }
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="button"
                  className="cancel"
                  value="Submit without validation"
                  onClick={e => window.location.href="/"}
                  style={{marginTop:"20px", justifyContent:"flex-end", marginBottom:"20px", marginLeft:"20%", marginRight:"0px"}}
                >
                  {
                      ('Cancel')
                  }
                </Button>
                </Grid>
            </ValidatorForm>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUpForm;
