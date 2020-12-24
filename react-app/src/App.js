import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import Theme from "./Theme"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SplashPage from "./components/SplashPage";
import CompanyInfo from "./components/CompanyInfo";
import ContractorInfo from "./components/ContractorInfo";
import { authenticate } from "./services/auth";
import Calendar from "./components/CalendarComponent/Calendar";
import SignUpForm from "./components/auth/SignUpForm"
import ContractorView from "./components/ContractorView";
import CompanyView from "./components/CompanyView";
import AgencyView from "./components/AgencyView";
import "./index.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  console.log("App.js: main");

  useEffect(() => {
    (async() => {
      console.log("App.js: Looking for authentication")
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        window.localStorage.setItem("currentUser", user.id)
        console.log("App.js: useEffect:  authenticate(): Set localStorage to currentUser and authenticated = true");
      } else {
        console.log("App.js:  useEffect:  received errors in setting authenticated...", user.errors)
      }
      console.log("App.js:  useEffect: Setting loaded to true.")
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    console.log("App.js:  Not loaded ... returning null");
    return null;
  }

  return (
    <CssBaseline>
      <Theme>
        <BrowserRouter>
            <NavBar setAuthenticated={setAuthenticated} />
            <Switch>
              <Route path="/" exact={true}>
                <SplashPage></SplashPage>
              </Route>
              <Route path="/login" exact={true}>
                <LoginForm
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                  openDialog={true}
                />
              </Route>
              <Route path="/sign-up">
                <SignUpForm
                  openDialog={true}
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}>
                </SignUpForm>
              </Route>
              <ProtectedRoute path="/companyInfo" exact={true} authenticated={authenticated}>
                <CompanyInfo></CompanyInfo>
              </ProtectedRoute>
              <Route path="/contractorInfo" exact={true} authenticated={authenticated}>
                <ContractorInfo></ContractorInfo>
              </Route>
              <ProtectedRoute path="/contractorView" exact={true} authenticated={authenticated}>
                <ContractorView></ContractorView>
              </ProtectedRoute>
              <ProtectedRoute path="/companyView" exact={true} authenticated={authenticated}>
                <CompanyView></CompanyView>
              </ProtectedRoute>
              <ProtectedRoute path="/agencyView" exact={true} authenticated={authenticated}>
                <AgencyView></AgencyView>
              </ProtectedRoute>
              <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
                <UsersList/>
              </ProtectedRoute>
              <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
                <User />
              </ProtectedRoute>
              <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
                <h1>My Home Page</h1>
              </ProtectedRoute>
              <ProtectedRoute path="/calendar" exact={true} authenticated={authenticated}>
                <Calendar  />
              </ProtectedRoute>
              </Switch>
        </BrowserRouter>
        </Theme>
    </CssBaseline>
  );
}

export default App;
