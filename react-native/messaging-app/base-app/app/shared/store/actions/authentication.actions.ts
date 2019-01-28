import { User } from "../../models/user.model";

export const LOGIN = 'login';
export const LOGOUT = 'logout';

export function login(user: User) {
    return {
        type: LOGIN,
        payload: {
            currentUser: user
        }
    };
}

export function logout() {
    return {
        type: LOGOUT
    }
}