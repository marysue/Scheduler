import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import authentication from './authentication';
import company from './company';
import blocked from './blocked';
import placement from './placement';
import contractor from './contractor';
import agencyCompanyPlacements from './agencyCompanyPlacements';
import agencyContractorPlacements from './agencyContractorPlacements';
import agencyInfo from './agencyInfo';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const reducer = combineReducers ({
    authentication,
    company,
    blocked,
    placement,
    contractor,
    agencyCompanyPlacements,
    agencyContractorPlacements,
    agencyInfo,
})

const configureStore = (initialState) => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    )
}

export default configureStore
