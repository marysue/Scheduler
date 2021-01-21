import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import Theme from "./Theme"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
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
import ContractorPlacementTable from "./components/Contractor/ContractorPlacementTable";
import "./index.css";
import AgencyCompanies from "./components/Agency/AgencyCompanies";
import AgencyContractors from "./components/Agency/AgencyContractors";
import AgencyContractorPlacements from './components/Agency/AgencyContractorPlacements';
import AgencyCompanyPlacementTable from './components/Agency/AgencyCompanyPlacementTable';
import NavBar2 from './components/navigator/NavBar';
import AgencyContractorPlacementTable from './components/Agency/AgencyContractorPlacementTable';
import Calendar from './components/CalendarComponent/Calendar';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        window.sessionStorage.setItem("userId", user.id)
      }

      setLoaded(true);
      setTimeout(function() {}, 1000);

      console.log("App.js:  setting Loaded to true: ", loaded)
    })();
  }, []);

  if (!loaded) {
    console.log("App.js:  not loaded");
    return null;
  }

  return (
    <CssBaseline>
      <Theme >
        <BrowserRouter>
            <NavBar2 setAuthenticated={setAuthenticated}></NavBar2>
            <Switch>
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
              <ProtectedRoute path="/calendar" exact={true} authenticated={authenticated}>
                <Calendar></Calendar>
              </ProtectedRoute>
              <ProtectedRoute path="/companyInfo" exact={true} authenticated={authenticated}>
                <CompanyInfo></CompanyInfo>
              </ProtectedRoute>
              <Route path="/contractorInfo" exact={true} authenticated={authenticated}>
                <ContractorInfo></ContractorInfo>
              </Route>
              <ProtectedRoute path="/contractorTable" exact={true} authenticated={authenticated}>
                <ContractorPlacementTable></ContractorPlacementTable>
              </ProtectedRoute>
              <ProtectedRoute path="/companyTable" exact={true} authenticated={authenticated}>
                <CompanyPlacementTable></CompanyPlacementTable>
              </ProtectedRoute>
              <ProtectedRoute path="/companyAddPlacement" exact={true} authenticated={authenticated}>
                <CompanyAddPlacement></CompanyAddPlacement>
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
