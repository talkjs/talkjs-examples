import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import authenticationReducer from './reducers/authentication.reducer';
import talkReducer from './reducers/talk.reducer';
  
const allReducers = combineReducers({
    authentication: authenticationReducer,
    talk: talkReducer
});

function configureStore(initialState: object) {
    return createStore(allReducers, initialState, composeWithDevTools(applyMiddleware()));
}

export default configureStore({
    authentication: { currentUser: null },
    talk: {
        script: '',
        shouldInject: false
    }
});