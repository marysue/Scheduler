import React, {useState} from 'react';
import {
    Tabs,
    Tab,
    makeStyles,
} from "@material-ui/core";

import { useHistory,useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  indicator: {
        backgroundColor: 'primary',
    },
}));


const TabNavAgency = () => {

    const tabNameToIndex = {
        0: "agencyCalendar",
        1: "contractorPlacementsTable",
        2: "companyPlacementsTable",
        3: "contractorList",
        4: "companyList",
        5: "logout",
    }

    const indexToTabName = {
        agencyCalendar: 0,
        contractorPlacementsTable: 1,
        companyPlacementsTable: 2,
        contractorList: 3,
        companyList: 4,
        logout: 5,
    }
    const { page } = useParams();

    const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
    const history = useHistory()
    const [image , setImage] = useState('/Logo.png')

    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }


  return (
    <>
        <Tabs style={{marginLeft:"5%"}} indicatorColor={'primary'} value={selectedTab} onChange={handleChange}>
            <Tab value={0} onClick={() => history.push(`/agencyView`)}
                label="Calendar" />
            <Tab value={1} onClick={() => history.push(`/agencyContractorPlacements`)}
                label="Contractor Placements" />
            <Tab value={2} onClick={() => history.push(`/agencyCompanyPlacements`)}
            label="Company Placements" />
            <Tab value={3} onClick={() => history.push('/agencyContractors')}
            label="Contractor List" />
             <Tab value={4} onClick={() => history.push('/agencyCompanies')}
            label="Company List" />
             <Tab value={5} onClick={() => history.push('/logout')}
            label="Logout" />
        </Tabs>

    </>
  )
}

  export default TabNavAgency;
