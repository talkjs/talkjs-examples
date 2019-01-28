import { LOGIN, LOGOUT } from "../actions/authentication.actions";

export default function authenticationReducer(state = { currentUser: null }, action: any) {
    switch (action.type) {
        case LOGIN:
            return { ...state, currentUser: action.payload.currentUser };
        case LOGOUT:
            return { ...state, currentUser: null }
        default:
            return state;
    }
}