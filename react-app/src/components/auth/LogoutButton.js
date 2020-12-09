import React from "react";
//import { logout } from "../../services/auth";
import { logout } from '../../store/authentication';
import { useDispatch } from 'react-redux';
import { removeUserId, removeUserName, removeUserEmail, removeToken, removeUserType } from '../../store/authentication';

const LogoutButton = ({setAuthenticated}) => {
  console.log("Entered LogoutButton")
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    console.log("onLogout...")
    await logout();

    setAuthenticated(false);

    dispatch(removeUserId());
    dispatch(removeUserName());
    dispatch(removeUserEmail());
    dispatch(removeToken());
    dispatch(removeUserType());

    window.localStorage.removeItem("currentUser")
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
