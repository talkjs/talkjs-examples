import { User } from 'src/shared/models/user.model';

export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const TOGGLE_LOADING = 'toggleLoading';

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

export function toggleLoading(isLoading: boolean) {
    return {
        type: TOGGLE_LOADING,
        payload: {
            isLoading: isLoading
        }
    }
}