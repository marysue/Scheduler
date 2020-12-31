import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alert from '@material-ui/lab/Alert'
import { Button,
         DialogContent,
         FormControl,
         Grid,
         InputLabel,
         MenuItem,
         Select,
         Typography,
        } from '@material-ui/core';

import { makeStyles  } from '@material-ui/core/styles';
import { addCompany, addCompanyContact, setCompanyId, setCompanyName, setCompanyPhone, setCompanyEmail, setCompanyAddr1, setCompanyAddr2, setCompanyCity, setCompanyState, setCompanyZip} from '../../store/company'


const CompanyInfo = () => {
  const userId = useSelector(state => state.authentication.userId);
  console.log("User id is now set to:  ", userId);
  console.log("Company Info:  Entered company info...");
  const dispatch = useDispatch();
  const [errors, setErrors] = useState('');
  const [state, setLocalState] = useState('');
  const history = useHistory();
  const [values, setValues] = useState({
    companyName: '',
    name: '',
    phone: '',
    email: '',
    addr1: '',
    addr2: '',
    city: '',
    state: '',
    zip: '',
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
        width: "75%",
        justifyContent: 'space-between'
    },
    select: {
      minWidth: "100px",
    }
  }));
  const classes = useStyles();

  const submit = async (e) => {
    e.preventDefault();
      let companyId = null;
      const company = await addCompany(userId, values.companyName);
      if (!company.errors) {
        dispatch(setCompanyId(company.id));
        companyId = company.id
        dispatch(setCompanyName(company.companyName));
        const companyContact = await addCompanyContact(companyId, values.companyName, values.name, values.phone, values.email, values.addr1, values.addr2, values.city, state, values.zip)

        if (!companyContact.errors) {
          dispatch(setCompanyName(companyContact.name));
          dispatch(setCompanyPhone(companyContact.phone));
          dispatch(setCompanyEmail(companyContact.email));
          dispatch(setCompanyAddr1(companyContact.addr1));
          dispatch(setCompanyAddr2(companyContact.addr2));
          dispatch(setCompanyCity(companyContact.city));
          dispatch(setCompanyState(companyContact.state));
          dispatch(setCompanyZip(companyContact.zip));
          history.push('/companyView')
      } else {
          setErrors(company.errors);
      }
    }
  }
  const cancel = () => {
    console.log("CompanyInfo: cancel button pressed, should be redirecting to '/'");
    return <Redirect to="/" />
  }

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value});
  }

  //Because the select didn't work with handleChange at all
  const handleStateChange = (event) => {
    setLocalState(event.target.value);
  };
  // if (authenticated) {
  //   alert("SignUpForm:  User is authenticated ... redirecting to '/'");
  //   return <Redirect to="/" />;
  // }

//   if (window.localStorage.getItem("currentUser")) {
//     window.location.replace("/");
//   }
  if (!userId) {
    console.log("UserId is undefined: ", userId)
    return null
  } else {
      return(
          <>
          <DialogContent style={{width:"100%", marginLeft:"auto", marginRight:"auto", justifyContent:"center"}}>
          <Typography component="h6" variant="h6" align="center" color="primary" style={{marginTop: "20px", fontWeight:"bold"}}>Now for a little company information ...</Typography>
            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
            <div className={classes.root}>
              {errors ? <Alert severity="error">{errors}</Alert> : <div></div> }
            </div>
            <ValidatorForm
                onSubmit={submit}
                style={{width:"75%", justifyContent: "center"}}
                >
                   { errors ? <div className={classes.root}><Alert severity="error">{errors}</Alert></div> : null}
                <br />
                <TextValidator
                  variant="outlined"
                  label="Company Name"
                  onChange={handleChange('companyName')}
                  name="companyName"
                  value={values.companyName}
                  validators={['required']}
                  errorMessages={['Company Name is required']}
                  style={{width:"100%", justifyContent:"center"}}
                />
                <br />
                <TextValidator
                  variant="outlined"
                  label="Contact Name"
                  onChange={handleChange('name')}
                  name="name"
                  value={values.name}
                  validators={['required']}
                  errorMessages={['Contact name is required']}
                  style={{width:"100%", justifyContent:"center"}}
                />
                <br />
                <TextValidator
                  variant="outlined"
                  label="Phone"
                  onChange={handleChange('phone')}
                  name="phone"
                  value={values.phone}
                  validators={['required']}
                  errorMessages={['Phone number is required']}
                  style={{width:"100%", justifyContent:"center"}}
                />
                <br />
                <TextValidator
                  variant="outlined"
                  label="Contact Email"
                  onChange={handleChange('email')}
                  name="email"
                  value={values.email}
                  validators={['required', 'isEmail']}
                  errorMessages={['Contact email is required', 'Contact email is not valid']}
                  sttyle={{width:"100%", justifyContent:"center", marginRight:"0px"}}
                />
                <br />
                <TextValidator
                  variant="outlined"
                  label="Address 1"
                  onChange={handleChange('addr1')}
                  name="addr1"
                  value={values.addr1}
                  validators={['required']}
                  errorMessages={['Street address is required']}
                  style={{width:"100%", justifyContent:"center"}}
                />
                <br />
                <TextValidator
                  variant="outlined"
                  label="Address 2"
                  onChange={handleChange('addr2')}
                  name="addr2"
                  value={values.addr2}
                  style={{width:"100%", justifyContent:"center"}}
                />
                <br />
                <TextValidator
                  variant="outlined"
                  label="City"
                  onChange={handleChange('city')}
                  name="city"
                  value={values.city}
                  validators={['required']}
                  errorMessages={['City is required']}
                  style={{width:"100%", justifyContent:"center"}}
                />
                <br />
                <FormControl variant="outlined"  className={classes.formControl}>
                  <InputLabel id="state">State</InputLabel>
                  <Select
                    labelId="state"
                    id="state"
                    value={state}
                    onChange={handleStateChange}
                    // input={<BootstrapInput />}
                    label="State"
                    className={classes.select}
                  >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value={"AL"}>AL</MenuItem>
                  <MenuItem value={"AK"}>AK</MenuItem>
                  <MenuItem value={"AZ"}>AZ</MenuItem>
                  <MenuItem value={"AR"}>AR</MenuItem>
                  <MenuItem value={"CA"}>CA</MenuItem>
                  <MenuItem value={"CO"}>CO</MenuItem>
                  <MenuItem value={"CT"}>CT</MenuItem>
                  <MenuItem value={"DE"}>DE</MenuItem>
                  <MenuItem value={"FL"}>FL</MenuItem>
                  <MenuItem value={"GA"}>GA</MenuItem>
                  <MenuItem value={"HI"}>HI</MenuItem>
                  <MenuItem value={"ID"}>ID</MenuItem>
                  <MenuItem value={"IL"}>IL</MenuItem>
                  <MenuItem value={"IN"}>IN</MenuItem>
                  <MenuItem value={"IA"}>IA</MenuItem>
                  <MenuItem value={"KS"}>KS</MenuItem>
                  <MenuItem value={"KY"}>KY</MenuItem>
                  <MenuItem value={"LA"}>LA</MenuItem>
                  <MenuItem value={"ME"}>ME</MenuItem>
                  <MenuItem value={"MD"}>MD</MenuItem>
                  <MenuItem value={"MA"}>MA</MenuItem>
                  <MenuItem value={"MI"}>MI</MenuItem>
                  <MenuItem value={"MN"}>MN</MenuItem>
                  <MenuItem value={"MS"}>MS</MenuItem>
                  <MenuItem value={"MO"}>MO</MenuItem>
                  <MenuItem value={"MT"}>MT</MenuItem>
                  <MenuItem value={"NE"}>NE</MenuItem>
                  <MenuItem value={"NV"}>NV</MenuItem>
                  <MenuItem value={"NH"}>NH</MenuItem>
                  <MenuItem value={"NJ"}>NJ</MenuItem>
                  <MenuItem value={"NM"}>NM</MenuItem>
                  <MenuItem value={"NY"}>NY</MenuItem>
                  <MenuItem value={"NC"}>NC</MenuItem>
                  <MenuItem value={"ND"}>ND</MenuItem>
                  <MenuItem value={"OH"}>OH</MenuItem>
                  <MenuItem value={"OK"}>OK</MenuItem>
                  <MenuItem value={"OR"}>OR</MenuItem>
                  <MenuItem value={"PA"}>PA</MenuItem>
                  <MenuItem value={"RI"}>RI</MenuItem>
                  <MenuItem value={"SC"}>SC</MenuItem>
                  <MenuItem value={"SD"}>SD</MenuItem>
                  <MenuItem value={"TN"}>TN</MenuItem>
                  <MenuItem value={"TX"}>TX</MenuItem>
                  <MenuItem value={"UT"}>UT</MenuItem>
                  <MenuItem value={"VT"}>VT</MenuItem>
                  <MenuItem value={"VA"}>VA</MenuItem>
                  <MenuItem value={"WA"}>WA</MenuItem>
                  <MenuItem value={"WV"}>WV</MenuItem>
                  <MenuItem value={"WI"}>WI</MenuItem>
                  <MenuItem value={"WY"}>WY</MenuItem>
                  </Select>
              </FormControl>
                <br />
                <TextValidator
                  variant="outlined"
                  label="Zip Code"
                  onChange={handleChange('zip')}
                  name="zip"
                  value={values.zip}
                  validators={['required']}
                  errorMessages={['Zip Code is required']}
                  style={{width:"100%", justifyContent:"center"}}
                />
                <br />
                <br />
                <Grid container item xs={10} style={{width:"100%", padding:"0px"}} >
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    style={{marginTop:"20px", justifyContent:"flex-start", marginBottom:"20px"}}
                  >
                    {
                      ('Submit')
                    }
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    type="button"
                    className="cancel"
                    value="Submit without validation"
                    onClick={cancel}
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
          </>
      );
  }
}


export default CompanyInfo;
