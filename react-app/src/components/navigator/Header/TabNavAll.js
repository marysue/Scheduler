import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { logout, removeUserId, removeUserName, removeUserEmail, removeToken, removeUserType, setUserType } from  '../../../store/authentication'
import { removeCompanyLocations, removeCompanyId, removeCompanyName, removeCompanyContactName, removeCompanyPhone, removeCompanyEmail, removeCompanyAddr1, removeCompanyAddr2, removeCompanyCity, removeCompanyState, removeCompanyZip } from '../../../store/company'
import { removeAvailableContractors, removeContractorId, removeStaffType, removeContractorName, removeContractorPhone, removeContractorEmail, removeContractorAddr1, removeContractorAddr2, removeContractorCity, removeContractorState, removeContractorZip } from '../../../store/contractor'
import { removePlacementInfo, removePlacementDates } from '../../../store/placement'


// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `nav-tab-${index}`,
//     'aria-controls': `nav-tabpanel-${index}`,
//   };
// }

// function LinkTab(props) {
//   return (
//     <Tab
//       component="a"
//       onClick={(event) => {
//         event.preventDefault();
//       }}
//       {...props}
//     />
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs({setAuthenticated}, props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  // let params = undefined;

  let page = undefined;
  let { match } = props;
  const history = useHistory();
  if (match) {
    const { params } = match;
    //eslint-disable-next-line
    const { page } = params;
  }

  let tabNameToIndex = {};
  let indexToTabName = {};
  const userType = useSelector(state => state.authentication.userType);

  useEffect(() => {
    console.log("TabNavAll: Entering useEffect.  userType is: ", userType);
    if (!userType) {
      console.log("TabNavAll: useEffect: userType not set.  Attempting to set it.");
      const user = window.sessionStorage.getItem("userType");
      if (user) {
        dispatch(setUserType(user));
      } else {
        dispatch(removeUserType());
      }
    }
   // setIndices();
  }, [userType] );

//function setIndices() {
  if (userType === undefined) {
    console.log("TabNavAll: userType = ", userType);
    if (page === undefined) {
      page = "splashPage"
    }
    tabNameToIndex = {
      0: "login",
      1: "signUp",
    }
    indexToTabName = {
      login: 0,
      signUp: 1
    }
  }

  if (userType === 'contractor') {
    if (page === undefined) {
      page = "calendar"
    }
    tabNameToIndex = {
       0: "calendar",
       1: "contractorTable",
       2: "Logout",
   }
    indexToTabName = {
       calendar: 0,
       contractorTable: 1,
       Logout: 2,
   }
 }

 if (userType === 'company') {
   if (page === undefined) { page = 'Calendar' }
   tabNameToIndex = {
     0: "calendar",
     1: "companyTable",
     2: "companyAddPlacement",
     3: "Logout",
  }
  indexToTabName = {
    calendar: 0,
    companyTable: 1,
    companyAddPlacement: 2,
    Logout: 3,
   }
 }
 if (userType === 'agency') {
   if (page === undefined) { page = 'calendar' }
    tabNameToIndex = {
     0: "calendar",
     1: "contractorPlacementsTable",
     2: "companyPlacementsTable",
     3: "contractorList",
     4: "companyList",
     5: "Logout",
   }
   indexToTabName = {
     calendar: 0,
     contractorPlacementsTable: 1,
     companyPlacementsTable: 2,
     contractorList: 3,
     companyList: 4,
     Logout: 5,
   }
 }

 const [selectedTab, setSelectedTab] = React.useState(0);


  const handleChange = (event, newValue) => {
    if (tabNameToIndex[newValue] === 'Logout') {
    } else {

    history.push(`/${tabNameToIndex[newValue]}`)
    }
    setSelectedTab(newValue);
  };
  const onLogout = async () => {
    console.log("TabNavAll:  Logout pressed ...")
    const retVal = await logout();
    if (!retVal.errors) {
      console.log("TabNavAll:  Removing sessionStorage items");
      window.sessionStorage.removeItem("userId")
      window.sessionStorage.removeItem("contractorId")
      window.sessionStorage.removeItem("companyId")
      window.sessionStorage.removeItem("agencyId");
      window.sessionStorage.removeItem("userType");

      setAuthenticated(false);

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


      console.log("TabNavAll:  Completed removing all data");

        history.push('/splashPage')

    } else {
      console.log("Error in fetch call for logout.")
    }
    console.log("TabNavAll: userType after logout is:  ", userType);
};
if (true) {
  console.log("TabNavAll:  hit return here. UserType:  ", userType)
  return (
    <div>
      <Tabs value={selectedTab} onChange={handleChange} indicatorColor="primary" textColor="primary" centered aria-label="simple tabs example">
      {userType === 'contractor' ? <Tab value={0} label="Calendar" /> : null}
      {userType === 'contractor' ? <Tab value={1} label='Assignments' /> : null}
      {userType === 'contractor' ? <Tab value={2} label='Logout' onClick={onLogout}/> : null}

      { userType === 'company' ? <Tab label='Calendar' /> :null}
      { userType === 'company' ? <Tab label='Placements Detail' /> :null}
      { userType === 'company' ? <Tab label='Hire Contractor' /> :null}
      { userType === 'company' ? <Tab label='Logout' onClick={onLogout}/> :null}

      { userType === 'agency' ? <Tab label='Calendar' /> :null}
      { userType === 'agency' ? <Tab label='Contractor Placements' /> :null}
      { userType === 'agency' ? <Tab label='Company Placements' /> :null}
      { userType === 'agency' ? <Tab label='Contractor List' /> :null}
      { userType === 'agency' ? <Tab label='Company List' /> :null}
      { userType === 'agency' ? <Tab label='Logout' onClick={onLogout}/> :null}

      {/* { userType === undefined ? <Tab label='Login' /> : null }
      { userType === undefined ? <Tab label='Sign Up' /> : null } */}

      </Tabs>
    </div>
  );
}
}
