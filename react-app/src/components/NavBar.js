import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({ setAuthenticated }) => {
  console.log("Entered NavBar, only using setAuthenticate to pass to logout button");
  const userType = useSelector( state => state.authentication.userType)

  if (userType === 'contractor') {
    return (
      <nav>
        <ul>
          <li key={"1"}><NavLink to="/" exact={true} activeClassName="active">Home</NavLink></li>
          <li key={"2"}><NavLink to="/splashPage" exact={true} activeClassName="active">Splash Page</NavLink></li>
          <li key={"5"}><NavLink to ="/contractorInfo" exact={true} activeClassName="active">Contractor Info</NavLink></li>
          <li key={"6"}><NavLink to ="/contractorView" exact={true} activeClassName="active">Contractor Calendar</NavLink></li>
          <li key={"12"}><LogoutButton setAuthenticated={setAuthenticated} /></li>
        </ul>
      </nav>
    )
  } else if (userType === 'company') {
    return (
      <nav>
        <ul>
          <li key={"1"}><NavLink to="/" exact={true} activeClassName="active">Home</NavLink></li>
          <li key={"2"}><NavLink to="/splashPage" exact={true} activeClassName="active">Splash Page</NavLink></li>
          <li key={"7"}><NavLink to ='/companyView' exact={true} activeClassName="active">Company View</NavLink></li>
          <li key={"13"}><NavLink to = '/companyAddPlacement' exact={true} activeClassName="active">Add Contractor Placement</NavLink></li>
          <li key={"4"}><NavLink to="/companyInfo" exact={true} activeClassName="active">Company Info</NavLink></li>
          <li key={"12"}><LogoutButton setAuthenticated={setAuthenticated} /></li>
        </ul>
      </nav>
    )
  } else if (userType === 'agency') {
    return (
     <nav>
        <ul>
          <li key={"1"}><NavLink to="/" exact={true} activeClassName="active">Home</NavLink></li>
          <li key={"2"}><NavLink to="/splashPage" exact={true} activeClassName="active">Splash Page</NavLink></li>
          <li key={"8"}><NavLink to ='/agencyView' exact={true} activeClassName="active">Agency View</NavLink></li>
          <li key={"14"}><NavLink to='/agencyContractorPlacements' exact={true} activeClassName="active">Agency Contractor Placements</NavLink></li>
          <li key={"15"}><NavLink to='/agencyCompanyPlacements' exact={true} activeClassName="active">Agency Company Placements</NavLink></li>
          <li key={"16"}><NavLink to='/agencyCompanies' exact={true} activeClassName="active">Companies List</NavLink></li>
          <li key={"17"}><NavLink to='/agencyContractors' exact={true} activeClassName="active">Contractors List</NavLink></li>
          <li key={"11"}><NavLink to="/users" exact={true} activeClassName="active">Users</NavLink></li>
          <li key={"12"}><LogoutButton setAuthenticated={setAuthenticated} /></li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav>
      <ul>
        <li key={"1"}><NavLink to="/" exact={true} activeClassName="active">Home</NavLink></li>
        <li key={"2"}><NavLink to="/splashPage" exact={true} activeClassName="active">Splash Page</NavLink></li>
        <li key={"9"}><NavLink to="/login" exact={true} activeClassName="active">Login</NavLink></li>
        <li key={"10"}><NavLink to="/sign-up" exact={true} activeClassName="active">Sign Up</NavLink></li>
        <li key={"12"}><LogoutButton setAuthenticated={setAuthenticated} /></li>
      </ul>
    </nav>
    )
  }
}

export default NavBar;
