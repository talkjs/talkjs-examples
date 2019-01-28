import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import authenticationReducer from './reducers/authentication.reducer';
  
const allReducers = combineReducers({
    authentication: authenticationReducer
});

function configureStore(initialState: object) {
    return createStore(allReducers, initialState, composeWithDevTools(applyMiddleware()));
}

export default configureStore({
    authentication: { currentUser: null }
});