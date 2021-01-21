import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory} from 'react-router-dom';
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
import { setUserEmail, setUserName, setUserId, setUserType } from '../../store/authentication';


const SignUpForm = ({openDialog, authenticated, setAuthenticated}) => {
  console.log("SignUpForm:  Entered signupform...");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(openDialog);
  const [errors, setErrors] = useState('');
  const [values, setValues] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    userType: ''
  });
  const history = useHistory()

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
        setOpen(false);
        setAuthenticated(true);
        dispatch(setUserEmail(user.email));
        dispatch(setUserId(user.id));
        dispatch(setUserName(user.username));
        dispatch(setUserType(user.userType));
        console.log("Redirecting to companyInfo ...")
        window.sessionStorage.setItem("userId",user.id)
        window.sessionStorage.setItem("userType", user.userType)
        window.sessionStorage.setItem("userId", user.id)
        console.log("User Type is:  ", user.userType);
        if (user.userType === "company") {
          history.push('/companyInfo')
        } else if (user.userType === "contractor") {
          console.log("Redirecting to contractorInfo")
          history.push('/contractorInfo')
        } else if (user.userType === "admin") {
          console.log("Redirecting to calendar")
          history.push('/calendar');
      } else {
        setErrors(user.errors);
      }
    } else {
      console.log("Passwords did not match ... ", user.errors);
    }
  }
}

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value});
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
          <Typography component="h6" variant="h6" align="center" color="primary" style={{marginTop: "20px", marginLeft:"30px", marginRight: "30px", fontWeight:"bold"}}>Create Your Placement Scheduler Account</Typography>
        </div>
        { errors ? <div className={classes.root}><Alert severity="error">{errors}</Alert></div> : null}
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
                  <MenuItem value={"agency"}>Agency</MenuItem>
                  <MenuItem value={"contractor"}>Contractor</MenuItem>
                  <MenuItem value={"company"}>Company</MenuItem>
                </Select>
              </FormControl>

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
