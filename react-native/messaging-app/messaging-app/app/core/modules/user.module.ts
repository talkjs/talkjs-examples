import { USERS as MOCK_USERS } from '../mocks/users.mock';
import { User } from "../../shared/models/user.model";

export function getUser(userId: number) : Promise<User> {
    return new Promise((resolve) => {
        resolve(MOCK_USERS.find(u => u.id == userId));       
    });
}

export function getUserForUsername(username: string) : Promise<User> {
    return new Promise((resolve) => {
        resolve(MOCK_USERS.find(u => u.username.toLocaleLowerCase() === username.toLocaleLowerCase()));
    });
}