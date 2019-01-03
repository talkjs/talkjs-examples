import { User } from 'src/shared/models/user.model';
import { getUserForUsername } from './user.module';

const savedUserStorageKey = 'currentuser';

export function login(username: string) : Promise<User> {
    return new Promise((resolve) => {
        getUserForUsername(username).then(user => {
            if (user) {
                localStorage.setItem(savedUserStorageKey, username);
                resolve(user);
            } else {
                resolve(user);
            }
        });     
    });
}

export function logout() {
    localStorage.removeItem(savedUserStorageKey);
}

export function getCurrentUser() : Promise<User> {
    return new Promise((resolve) => {
        const currentUserUsername = localStorage.getItem(savedUserStorageKey);

        if (currentUserUsername) {
            getUserForUsername(currentUserUsername).then(user => {
                resolve(user);
            });
        } else {
            resolve(undefined);   
        }
    });
}