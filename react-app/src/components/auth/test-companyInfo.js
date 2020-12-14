import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.background.paper,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     padding: '10px 26px 10px 12px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       borderRadius: 4,
//       borderColor: '#80bdff',
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//     },
//   },
// }))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedSelects() {
  const classes = useStyles();
  //const [age, setAge] = React.useState('');
  const [values, setValues] = React.useState({
    companyName: '',
    age: '',
    name: '',
    phone: '',
    email: '',
    addr1: '',
    addr2: '',
    city: '',
    state: '',
    zip: '',
  });
  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value});
  }
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-textbox">Age</InputLabel>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label">Age</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={values.state}
          onChange={handleChange}
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
    </div>
  );
}
