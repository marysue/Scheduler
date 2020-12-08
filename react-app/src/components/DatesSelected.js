import React from 'react';
import ArrowForwardIcon from 'material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core/styles';


const DatesSelected = ({fromDate, toDate}) => {
    console.log("Entered DatesSelected..");

    return(
        <div style={{border: "1px solid grey"}}>
            {dateFrom} <ArrowForwardIcon color="primary" /> {dateTo}
        </div>
    )
}

export default DatesSelected;
