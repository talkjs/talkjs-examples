import { combineReducers, createStore } from 'redux';

import authenticationReducer from './reducers/authentication.reducer';

/* Enabling Redux DevTools Extension */
declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}
  
const allReducers = combineReducers({
    authentication: authenticationReducer
});

function configureStore(initialState?: object) {
    return createStore(allReducers, initialState!, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default configureStore({
    authentication: { currentUser: null, isLoading: true }
});