//from:  https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Ignore write errors.

    }
}

//Then in index.js:
//subscribe watches for changes in the redux state and when seen,
//it will trigger the body of this call
//Theoretically you could get into a race state here when many
//changes are being made to state.  To avoid that, use the lodash
//function wrapper called throttle, and give it a time limit for
//updates -- like at most every second:
//npm install --save lodash

//import throttle from 'lodash/throttle';
//import persistState from './services/persistState'

    // So in index.js:

    // const persistedState = loadState();
    // const store = createStore(
    //     todoApp,
    //     persistedState
    // );

    // store.subscribe(throttle(() => {
    //     saveState(store.getState()); // stores ALL state objects
    //     saveState({
    //         todos: store.getState().todos
    //     })  //to store only certain objects
    // }, 1000));

    // render (
    //     ...
    // )

//Also, the keys of the <li>'s may be confused, so use:
// npm install --save node-uuid
// import { v4 } from 'node-uuid';
// id: v4(),
