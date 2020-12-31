import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import Theme from "./Theme"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
// import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import SplashPage from "./components/SplashPage";
import CompanyInfo from "./components/Company/CompanyInfo";
import ContractorInfo from "./components/Contractor/ContractorInfo";
import CompanyAddPlacement from "./components/Company/CompanyAddPlacement";
import CompanyPlacementTable from "./components/Company/CompanyPlacementTable";
import { authenticate } from "./services/auth";
import SignUpForm from "./components/auth/SignUpForm"
import ContractorView from "./components/Contractor/ContractorView";
import ContractorPlacementTable from "./components/Contractor/ContractorPlacementTable";
import CompanyView from "./components/Company/CompanyView";
import AgencyView from "./components/Agency/AgencyView";
import "./index.css";
import AgencyCompanies from "./components/Agency/AgencyCompanies";
import AgencyContractors from "./components/Agency/AgencyContractors";
import AgencyContractorPlacements from './components/Agency/AgencyContractorPlacements';
import AgencyCompanyPlacementTable from './components/Agency/AgencyCompanyPlacementTable';
import NavBar2 from './components/navigator/NavBar';
import AgencyContractorPlacementTable from './components/Agency/AgencyContractorPlacementTable';

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
            {/* <NavBar setAuthenticated={setAuthenticated} /> */}
            <NavBar2 setAuthenticated={setAuthenticated}></NavBar2>
            <Switch>
              {/* { userType === 'contractor' ?
                <Redirect exact from="/" to="/contractorView" /> : null }
              { userType === 'company' ?
                <Redirect exact from="/" to="/companyView" /> : null }
              { userType === 'agency' ?
                <Redirect exact from="/" to="/agencyView" /> : null } */}
              <Route path="/" exact={true}>
                <SplashPage></SplashPage>
              </Route>
              <Route path='/splashPage' exact={true}>
                <SplashPage></SplashPage>
              </Route>
              <Route path="/login" exact={true}>
                <LoginForm
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                  openDialog={true}
                />
              </Route>
              <Route path="/signup">
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
              <ProtectedRoute path="/contractorTable" exact={true} authenticated={authenticated}>
                <ContractorPlacementTable></ContractorPlacementTable>
              </ProtectedRoute>
              <ProtectedRoute path="/companyView" exact={true} authenticated={authenticated}>
                <CompanyView></CompanyView>
              </ProtectedRoute>
              <ProtectedRoute path="/companyTable" exact={true} authenticated={authenticated}>
                <CompanyPlacementTable></CompanyPlacementTable>
              </ProtectedRoute>
              <ProtectedRoute path="/companyAddPlacement" exact={true} authenticated={authenticated}>
                <CompanyAddPlacement></CompanyAddPlacement>
              </ProtectedRoute>
              <ProtectedRoute path="/agencyView" exact={true} authenticated={authenticated}>
                <AgencyView></AgencyView>
              </ProtectedRoute>
              <ProtectedRoute path="/agencyCalendar" exact={true} authenticated={authenticated}>
                <AgencyView></AgencyView>
              </ProtectedRoute>
              <ProtectedRoute path="/agencyContractorPlacements" exact={true} authenticated={authenticated}>
                <AgencyContractorPlacements></AgencyContractorPlacements>
              </ProtectedRoute>
                <ProtectedRoute path='/agencyCompanies' exact={true} authenticated={authenticated}>
                  <AgencyCompanies></AgencyCompanies>
                </ProtectedRoute>
                <ProtectedRoute path='/contractorPlacementsTable' exact={true} authenticated={authenticated}>
                <AgencyContractorPlacementTable></AgencyContractorPlacementTable>
                </ProtectedRoute>
                <ProtectedRoute path='/companyPlacementsTable' exact={true} authenticated={authenticated}>
                <AgencyCompanyPlacementTable></AgencyCompanyPlacementTable>
                </ProtectedRoute>
                <ProtectedRoute path='/contractorList' exact={true} authenticated={authenticated}>
                  <AgencyContractorPlacementTable></AgencyContractorPlacementTable>
                </ProtectedRoute>
                <ProtectedRoute path='/companyList' exact={true} authenticated={authenticated}>
                  <AgencyCompanyPlacementTable></AgencyCompanyPlacementTable>
                </ProtectedRoute>
                <ProtectedRoute path='/agencyContractors' exact={true} authenticated={authenticated}>
                  <AgencyContractors></AgencyContractors>
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
              </Switch>
        </BrowserRouter>
        </Theme>
    </CssBaseline>
  );
}

export default App;
