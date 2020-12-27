import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLable';
import FormControl from 'material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import DatesSelected from './DatesSelected';


const setDatesAvailable = ({ dateFrom, dateTo }) => {
    console.log("Entered setDatesAvailable...");
    // need to figure out what the default value is
    // for the state.  Query db to get this info
    const [value, setValue] = useState('Available')

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > svg': {
                margin: theme.spacing(2),
            }
        },
    }));
    const handleChange = (e) => {
        console.log("HandleChange:  value is = ", e.target.value);
        setValue(e.target.value);
    }
    const setDatesChosen = () => {
        //put the fetch call here to set dates available or blocked
        console.log("Inside setDatesChosen");
    }

    return (
        <>
            <DatesSelected dateFrom={dateFrom} dateTo={dateTo} />
            <form onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Set availability: </FormLabel>
                    <RadioGroup aria-label="What is this?" name="whatIsThis?" value={value} onChange={handleChange}>
                        <FormControlLabel value="Available" control={<Radio />} label="available" />
                        <FormControlLabel value="Block" control={<Radio />} label="block" />
                    </RadioGroup>
                </FormControl>
            </form>
        </>
    )
}

export default setDatesAvailable;
