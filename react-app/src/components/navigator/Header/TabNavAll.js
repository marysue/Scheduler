import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ContractorView from '../../Contractor/ContractorView'
import ContractorPlacementTable from '../../Contractor/ContractorPlacementTable'
import CssBaseline from '@material-ui/core/CssBaseline';
import { logout } from '../../../store/authentication';
import { removeUserId, removeUserName, removeUserEmail, removeToken, removeUserType } from  '../../../store/authentication'
import { removeCompanyLocations, removeCompanyId, removeCompanyName, removeCompanyContactName, removeCompanyPhone, removeCompanyEmail, removeCompanyAddr1, removeCompanyAddr2, removeCompanyCity, removeCompanyState, removeCompanyZip } from '../../../store/company'
import { removeAvailableContractors, removeContractorId, removeStaffType, removeContractorName, removeContractorPhone, removeContractorEmail, removeContractorAddr1, removeContractorAddr2, removeContractorCity, removeContractorState, removeContractorZip } from '../../../store/contractor'
import { removePlacementInfo, removePlacementDates } from '../../../store/placement'


// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  let params = undefined;

  let page = undefined;
  let { match } = props;
  const history = useHistory();
  if (match) {
    const { params } = match;
    const { page } = params;
   console.log( "Page came in as:  ", page);
  }

  let tabNameToIndex = {};
  let indexToTabName = {};
  // let page = '';

  const userType = window.localStorage.getItem("userType");

  if (userType === 'contractor') {
    if (page === undefined) {
      page = "contractorView"
    }
    tabNameToIndex = {
       0: "contractorView",
       1: "contractorTable",
       2: "Logout",
   }
    indexToTabName = {
      contractorView: 0,
       contractorTable: 1,
       Logout: 2,
   }
 }

 if (userType === 'company') {
   if (page === undefined) { page = 'Calendar' }
   tabNameToIndex = {
     0: "companyView",
     1: "companyTable",
     2: "companyAddPlacement",
     3: "Logout",
  }
  indexToTabName = {
    companyView: 0,
    companyTable: 1,
    companyAddPlacement: 2,
    Logout: 3,
   }
 }
 if (userType === 'agency') {
   if (page === undefined) { page = 'agencyCalendar' }
    tabNameToIndex = {
     0: "agencyCalendar",
     1: "contractorPlacementsTable",
     2: "companyPlacementsTable",
     3: "contractorList",
     4: "companyList",
     5: "Logout",
   }
   indexToTabName = {
     agencyCalendar: 0,
     contractorPlacementsTable: 1,
     companyPlacementsTable: 2,
     contractorList: 3,
     companyList: 4,
     Logout: 5,
   }
 }

 const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);


  const handleChange = (event, newValue) => {
    console.log("new value = ", newValue, " and IndexToTabName[newValue] = ", tabNameToIndex[newValue])
    if (tabNameToIndex[newValue] === 'Logout') {
    } else {

    history.push(`/${tabNameToIndex[newValue]}`)
    }
    setSelectedTab(newValue);
  };
  const onLogout = async () => {
    console.log("Called Logout...")

    const retVal = await logout();
    if (!retVal.errors) {
        //setAuthenticated(false);

        dispatch(removeUserId());
        dispatch(removeUserName());
        dispatch(removeUserEmail());
        dispatch(removeToken());
        dispatch(removeUserType());

        dispatch(removeCompanyId());
        dispatch(removeCompanyName());
        dispatch(removeCompanyContactName());
        dispatch(removeCompanyPhone());
        dispatch(removeCompanyEmail());
        dispatch(removeCompanyAddr1());
        dispatch(removeCompanyAddr2());
        dispatch(removeCompanyCity());
        dispatch(removeCompanyState());
        dispatch(removeCompanyZip());
        dispatch(removeCompanyLocations());

        dispatch(removeContractorId());
        dispatch(removeStaffType());
        dispatch(removeContractorName());
        dispatch(removeContractorPhone());
        dispatch(removeContractorEmail());
        dispatch(removeContractorAddr1());
        dispatch(removeContractorAddr2());
        dispatch(removeContractorCity());
        dispatch(removeContractorState());
        dispatch(removeContractorZip());
        dispatch(removeAvailableContractors());

        dispatch(removePlacementDates());
        dispatch(removePlacementInfo());

        window.localStorage.removeItem("currentUser")
        window.localStorage.removeItem("userId")
        window.localStorage.removeItem("contractorId")
        window.localStorage.removeItem("companyId")
        window.localStorage.removeItem("agencyId");
        window.localStorage.removeItem("userType");

        console.log("Redirecting to splashPage");
        history.push('/splashPage')

    } else {
      console.log("Error in fetch call for logout.")
    }

};
  return (
    <div className={classes.root}>
      <Tabs value={selectedTab} onChange={handleChange} aria-label="simple tabs example">
      {userType === 'contractor' ? <Tab label="Calendar" /> : null}
      {userType === 'contractor' ? <Tab label='Assignments' /> : null}
      {userType === 'contractor' ? <Tab label='Logout' onClick={onLogout}/> : null}

      { userType === 'company' ? <Tab label='Calendar' /> :null}
      { userType === 'company' ? <Tab label='Placements Detail' /> :null}
      { userType === 'company' ? <Tab label='Add Contractor' /> :null}
      { userType === 'company' ? <Tab label='Logout' onClick={onLogout}/> :null}

      { userType === 'agency' ? <Tab label='Calendar' /> :null}
      { userType === 'agency' ? <Tab label='Contractor Placements' /> :null}
      { userType === 'agency' ? <Tab label='Company Placements' /> :null}
      { userType === 'agency' ? <Tab label='Contractor List' /> :null}
      { userType === 'agency' ? <Tab label='Company List' /> :null}
      { userType === 'agency' ? <Tab label='Logout' onClick={onLogout}/> :null}

      </Tabs>
    </div>
  );
}
