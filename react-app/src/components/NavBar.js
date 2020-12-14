import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({ setAuthenticated }) => {
  console.log("Entered NavBar, only using setAuthenticate to pass to logout button");
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/splashPage" exact={true} activeClassName="active">
          Splash Page
          </NavLink>
        </li>
        <li>
          <NavLink to="/calendar" exact={true} activeClassName="active">
            Calendar
          </NavLink>
        </li>
        <li>
          <NavLink to="/companyInfo" exact={true} activeClassName="active">Company Info</NavLink>
        </li>
        <li>
          <NavLink to ="/contractorInfo" exact={true} activeClassName="active">Contractor Info</NavLink>
        </li>
        <li>
          <NavLink to ="/contractorCalendar" exact={true} activeClassName="active">Contractor Calendar</NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
