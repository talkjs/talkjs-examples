import { Injectable } from "@angular/core";

import { User } from "src/app/shared/models/user.model";
import { USERS as MOCK_USERS } from "../mocks/users.mock";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    getUser(userId: number) : Promise<User> {
        return new Promise((resolve) => {
            resolve(MOCK_USERS.find(u => u.id == userId));       
        });
    }

    getUserForUsername(username: string) : Promise<User> {
        return new Promise((resolve) => {
            resolve(MOCK_USERS.find(u => u.username === username));
        });
    }

    getUsers() : Promise<User[]> {
        return new Promise((resolve) => {
            resolve(MOCK_USERS);
        });
    }

    getTopUsers() : Promise<User[]> {
        return new Promise((resolve) => {
            resolve([MOCK_USERS[0], MOCK_USERS[6], MOCK_USERS[7]]);
        });
    }
}