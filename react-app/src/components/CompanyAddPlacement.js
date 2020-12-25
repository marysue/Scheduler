import 'date-fns';
import React, { useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { setCompanyId } from '../store/company'
import { getContractorAvail } from '../store/contractor';
import Alert from '@material-ui/lab/Alert'
import { Button,
         DialogContent,
         FormControl,
         InputLabel,
         MenuItem,
         Select,
         Typography,
        } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function CompanyAddPlacement() {
  // The first commit of Material-UI
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
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date());
  const contractorsAvailable = [];

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

  const formatValue = (val) => {
    if (parseInt(val) < 10) {
      val = "0" + val;
    }
    return val
  }

  const formatDateString = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    month = formatValue(month)
    let day = date.getDay();
    day = formatValue(day)
    // let hour = date.getHours();
    // hour = formatValue(hour)
    // let minute = date.getMinutes();
    // minute = formatValue(minute)
    let hour = "00"
    let minute = "00"
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + "00"
  }

  const search = async() => {
    setErrors('');
    //localhost:5000/api/contractor/available?staffType=Dental%20Assistant&
    //dateRange=2021-01-19%2000:00:00/2021-01-25 00:00:00
    let diff = selectedDateFrom - selectedDateTo;

    if (diff > 0) {
      setErrors('Ending date must be greater than or equal to beginning date.')
    }
    const dateFrom = formatDateString(selectedDateFrom);
    const dateTo = formatDateString(selectedDateTo);

    if (staffType === '') {
      setErrors("Staff type must be selected")
    }


    if (errors === '') {
      (async() => {
        const contractors = await getContractorAvail(staffType, dateFrom, dateTo)
        if (!contractors.errors) {
          console.log("Received contractors: ", contractors)
        } else {
          setErrors("Problem processing request.")
          console.log("Problem receiving contractors");
        }

      })()
    }
  }


  if (!companyId) {
    console.log("Setting companyId in redux store")
    const cid = window.localStorage.getItem("companyId");
    dispatch(setCompanyId(cid));
  return (
    <>
    <DialogContent style={{width:"100%", marginLeft:"auto", marginRight:"auto", justifyContent:"center"}}>
      <Typography component="h6" variant="h6" align="center" color="primary" style={{marginTop: "20px", fontWeight:"bold"}}>Now for a little more information ...</Typography>
    </DialogContent>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container direction="column" justify="space-around" alignItems="center" spacing={2}>
              <div className={classes.root}>
                {errors ? <Alert severity="error">{errors}</Alert> : <div></div> }
              </div>
              <ValidatorForm
                  onSubmit={submit}
                  //style={{width:"75%",}}
                  >
                  <br />

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
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value={"Dental Assistant"}>Dental Assistant</MenuItem>
                    <MenuItem value={"Dentist"}>Dentist</MenuItem>
                    <MenuItem value={"Front Office"}>Front Office</MenuItem>
                    <MenuItem value={"Back Office"}>Back Office</MenuItem>
                    <MenuItem value={"Dental Hygenist"}>Dental Hygenist</MenuItem>
                    </Select>
                  </FormControl>
                </ValidatorForm>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog-from"
            label="Select Starting Date"
            format="MM/dd/yyyy"
            value={selectedDateFrom}
            onChange={handleDateChangeFrom}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog-to"
            label="Select Ending Date"
            format="MM/dd/yyyy"
            value={selectedDateTo}
            onChange={handleDateChangeTo}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
           <Button
                    color="primary"
                    variant="contained"
                    type="button"
                    className="cancel"
                    value="Submit without validation"
                    onClick={search}
                    style={{marginTop:"20px", justifyContent:"center", marginBottom:"20px", marginLeft:"20%", marginRight:"0px"}}
                  >
                    {
                        ('Search')
                    }
                  </Button>

            { contractorsAvailable.map((contractor, index) => {
              <div key={index}>{contractor}</div>
            })}
        </Grid>
        </MuiPickersUtilsProvider>

</>
  );
}
}
