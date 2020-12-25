import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { setCompanyId } from '../store/company'
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
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';


const CompanyAddPlacement = ({authenticated}) => {
  console.log(" *********************Company Add Placement View********************")
  const userId = useSelector(state => state.authentication.userId);
  const companyId = useSelector(state => state.authentication.companyId);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState('');
  const [state, setLocalState] = useState('');
  const [staffType, setLocalStaffType] = useState('');
  const [values, setValues] = useState({
    staffType: '',
    startDate: '',
    endDate: '',
  });
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date('2014-08-18T21:11:54'));
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date('2014-08-18T21:11:54'));
//   useEffect (() => {
//     if (!companyId) {
//         console.log("Setting companyId in redux store")
//         const cid = window.localStorage.getItem("companyId");
//         dispatch(setCompanyId(cid));
//     }
// }, [companyId]);

  const handleDateChangeFrom = (date) => {
    setSelectedDateFrom(date);
  };
  const handleDateChangeTo = (date) => {
    setSelectedDateTo(date);
  };
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
        minWidth: "200px",
    }
  }));
  const classes = useStyles();

  const submit = async (e) => {
    e.preventDefault();

    //   const contractor = await addContractor(userId, staffType);
    //   if (!contractor.errors) {

        // if (!contractorContact.errors) {

        // } else {

        // }
    // } else {
        // setErrors(contractor.errors);
    // }
}
  const cancel = () => {
      console.log("CompanyAddPlacement: Cancel button pressed, should be redirecting to '/' ...");
    // return <Redirect to="/" />
  }

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value});
  }

  //Because the select didn't work with handleChange at all
  const handleStateChange = (event) => {
    setLocalState(event.target.value);
  };

  const handleStaffTypeChange = (event) => {
      setLocalStaffType(event.target.value);
  }


if (!companyId) {
    console.log("Setting companyId in redux store")
    const cid = window.localStorage.getItem("companyId");
    dispatch(setCompanyId(cid));
      return(
          <>
          <DialogContent style={{width:"100%", marginLeft:"auto", marginRight:"auto", justifyContent:"center"}}>
          <Typography component="h6" variant="h6" align="center" color="primary" style={{marginTop: "20px", fontWeight:"bold"}}>Now for a little more information ...</Typography>
            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
            <div className={classes.root}>
              {errors ? <Alert severity="error">{errors}</Alert> : <div></div> }
            </div>
            <ValidatorForm
                onSubmit={submit}
                style={{width:"75%", justifyContent: "center"}}
                >
                <br />
                { errors ? <div className={classes.root}><Alert severity="error">{errors}</Alert></div> : null}
                <FormControl  variant="outlined"  className={classes.formControl}>
                  <InputLabel   id="staffType">Choose staff type</InputLabel>
                  <Select
                    labelId="staffType"
                    id="staffType"
                    value={staffType}
                    onChange={handleStaffTypeChange}
                    label="staffType"
                    className={classes.select}
                  >
                  <MenuItem   value=""><em>None</em></MenuItem>
                  <MenuItem  value={"Dental Assistant"}>Dental Assistant</MenuItem>
                  <MenuItem  value={"Dentist"}>Dentist</MenuItem>
                  <MenuItem value={"Front Office"}>Front Office</MenuItem>
                  <MenuItem value={"Back Office"}>Back Office</MenuItem>
                  <MenuItem value={"Dental Hygenist"}>Dental Hygenist</MenuItem>
                  </Select>
                  </FormControl>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDateFrom}
          onChange={handleDateChangeFrom}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDateTo}
          onChange={handleDateChangeTo}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
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


export default CompanyAddPlacement;
