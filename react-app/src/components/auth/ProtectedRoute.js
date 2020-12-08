import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  console.log("Entered ProtectedRoute")

  if (!props.authenticated) {
    console.log("ProtectedRoute:  Not authenticated ... redirecting to /login");
    return <Redirect to="/login"/>
  }

  return (
    <Route {...props}/>
  );
};

export default ProtectedRoute;
