import React from 'react';
import moment from "moment";

const DatesBlocked = ({datesBlocked}) => {
    if (datesBlocked.length > 0) {
        console.log("datesBlocked:  ", datesBlocked);
    } else {
        console.log("No dates blocked...", datesBlocked);
    }



    return(
        <>
            { datesBlocked.length > 0 ? datesBlocked.map( (item, idx) =>
            {   const newMoment = moment(item);
                return ( <div key={idx}> Date Blocked: {newMoment.format('MM/DD/YYYY')}</div> ) } ): <div>Dates Blocked evaluates to false</div> }
            {/* { datesBlocked.map( (item, idx) => {
                return (
                    <div key={idx}>
                        Date Blocked:  {item}
                    </div>
                )
            })}; */}
        </>

    );

}

export default DatesBlocked;
