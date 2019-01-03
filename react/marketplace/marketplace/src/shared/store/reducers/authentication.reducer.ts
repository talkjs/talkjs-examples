import { LOGIN, LOGOUT, TOGGLE_LOADING } from '../actions/authentication.actions';

export default function authenticationReducer(state = { currentUser: null }, action: any) {
    switch (action.type) {
        case LOGIN:
            return { ...state, currentUser: action.payload.currentUser };
        case LOGOUT:
            return { ...state, currentUser: null}
        case TOGGLE_LOADING:
            return { ...state, isLoading: action.payload.isLoading }
        default:
            return state;
    }
}