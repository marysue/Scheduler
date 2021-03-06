import 'date-fns';
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { setCompanyId } from '../../store/company'
import { getContractorAvail } from '../../store/contractor';
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
import { makeStyles } from '@material-ui/core/styles';
import CompanyPlacementPickerTable from './CompanyPlacementPickerTable';
import { setAvailableContractors } from '../../store/contractor';
import { formatDateString } from '../../utils/utils';
import { setCompanyLocations, getCompanyInfo } from '../../store/company';
import { setUserType } from '../../store/authentication'
import { setContractorId } from '../../store/contractor';
import { setAgencyId } from '../../store/agencyInfo';

export default function CompanyAddPlacement() {
  // The first commit of Material-UI
  console.log(" *********************Company Add Placement********************")
  const companyId = useSelector(state => state.company.companyId);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState('');
  // const [, setLocalState] = useState('');
  const [staffType, setLocalStaffType] = useState('');
  const [location, setLocation] = useState('');
  // const [values, setValues] = useState({
  //   staffType: '',
  //   startDate: '',
  //   endDate: '',
  // });
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date());
  const contractorsAvailable = [];
  const locations = useSelector( state => state.company.companyLocations);
  const userType = useSelector(store => store.authentication.userType);
  const contractorId = useSelector(store => store.contractor.contractorId);
  const agencyId = useSelector(store => store.agencyInfo.agencyId);




  console.log("CompanyAddPlacement: setInitialAuth(): Locations: ", locations);
  if (locations) {
      for(let i = 0; i < locations.length; i++) {
        console.log(locations[i].name)
        console.log(locations[i].addr1 + " " + locations[i].addr2)
        console.log(locations[i].city)
      }
  }


  useEffect (() => {

    (async() => {
      if (!userType || !companyId) {
        console.log("CompanyAddPlacement: setInitialAuth(): userType: ", userType);
    if (!userType) {
      const ut = window.sessionStorage.getItem("userType")
      dispatch(setUserType(ut));
     }
    if (!companyId && userType === 'company') {
      const cid = window.sessionStorage.getItem("companyId");
      console.log("company ID:  ", cid);
      dispatch(setCompanyId(cid));
      console.log("company ID from store: ", companyId);
     }
    if (!contractorId && userType === 'contractor') {
      const cid = window.sessionStorage.getItem("contractorId");
      dispatch(setContractorId(cid));
     }
     if (!agencyId && userType === 'agency') {
       const aid = window.sessionStorage.getItem("agencyId");
       dispatch(setAgencyId(aid));
     }

      };
      console.log("CompanyAddPlacement: useEffect(): locations: ", locations)
      if (!locations) {
        console.log("companyId: ", companyId)
        console.log("CompanyAddPlacement: loadCompanyLocations: companyId: ", companyId);
        const locs = await getCompanyInfo(companyId);
        console.log("locs:  ", locs.companyContacts);
        if (!locs.errors) {

          console.log("Received locations:  ", locs);
          dispatch(setCompanyLocations(locs.companyContacts));

        } else {
          console.log("Errors received from fetch call to get company locations");
        }
        console.log("CompanyAddPlacement:  locations:  ", locations);
        };
    })()
  }, [dispatch, agencyId, contractorId, userType, companyId, locations] )
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
        color: theme.palette.primary.main,
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
}
  // const cancel = () => {
  //     console.log("CompanyAddPlacement: Cancel button pressed, should be redirecting to '/' ...");
  //   // return <Redirect to="/" />
  // }

  // const handleChange = (prop) => (event) => {
  //   setValues({...values, [prop]: event.target.value});
  // }

  //Because the select didn't work with handleChange at all
  // const handleStateChange = (event) => {
  //   setLocalState(event.target.value);
  // };

  const handleStaffTypeChange = (event) => {
      setLocalStaffType(event.target.value);
  }

  const search = async() => {
    setErrors('');

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
          dispatch(setAvailableContractors(contractors))
        } else {
          setErrors("Problem processing request.")
          console.log("Problem receiving contractors");
        }

      })()
    }
  }

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }

  if (!companyId) {
    console.log("Setting companyId in redux store")
    const cid = window.sessionStorage.getItem("companyId");
    dispatch(setCompanyId(cid));
  }

  return (
    <>
      <DialogContent style={{width:"100%", marginLeft:"auto", marginRight:"auto", justifyContent:"center"}}>
        <Typography component="h6" variant="h6" align="center" color="primary" style={{marginTop: "20px", fontWeight:"bold"}}>Select your staffing needs ...</Typography>
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

                      { locations  && locations.length > 0 ?
                      <>
                        <InputLabel id="staffType" >Choose location </InputLabel>
                        <Select
                        style={{marginRight:"20px"}}
                          labelId="location"
                          id="location"
                          value={location}
                          onChange={handleLocationChange}
                          label="staffType"
                          className={classes.select}
                        >
                        { locations.map( (location) => {
                          return (
                            <MenuItem key={location.id} value={location.id}>{location.name}<br/>{location.addr1 + " " + location.addr2}<br/>{location.city}</MenuItem>
                          )
                        })}
                        </Select>
                        </> : null }

                      </FormControl>


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
                return(<div key={index}>{contractor}</div>)
              })}
          </Grid>
          </MuiPickersUtilsProvider>
          <CompanyPlacementPickerTable locationId={location} startDate={selectedDateFrom} endDate={selectedDateTo}></CompanyPlacementPickerTable>

    </>
  )

}
