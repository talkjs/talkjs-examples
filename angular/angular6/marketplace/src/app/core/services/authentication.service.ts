import { Injectable } from "@angular/core";

import { User } from "src/app/shared/models/user.model";
import { UserService } from "src/app/core/services/user.service";
import { reject } from "q";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private static SAVED_USER_STORAGE_KEY = 'currentuser';

    constructor(private userService: UserService) { }

    login(username: string) : Promise<boolean> {
        return new Promise((resolve) => {
            this.userService.getUserForUsername(username).then(user => {
                if (user) {
                    localStorage.setItem(AuthenticationService.SAVED_USER_STORAGE_KEY, username);
                    resolve(true);
                } else {
                    resolve(false);
                }
            });     
        });
    }

    logout() {
        localStorage.removeItem(AuthenticationService.SAVED_USER_STORAGE_KEY);
    }
    
    isLoggedIn() {
        return localStorage.getItem(AuthenticationService.SAVED_USER_STORAGE_KEY);
    }

    getCurrentUser() : Promise<User> {
        return new Promise((resolve) => {
            const currentUserUsername = localStorage.getItem(AuthenticationService.SAVED_USER_STORAGE_KEY);

            if (currentUserUsername) {
                this.userService.getUserForUsername(currentUserUsername).then(user => {
                    resolve(user);
                });
            } else {
                reject(null);   
            }
        });
    }
}