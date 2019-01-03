import { User } from 'src/shared/models/user.model';
import { USERS as MOCK_USERS } from 'src/core/mocks/users.mock';

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

export function getUsers() : Promise<User[]> {
    return new Promise((resolve) => {
        resolve(MOCK_USERS);
    });
}

export function getTopUsers() : Promise<User[]> {
    return new Promise((resolve) => {
        resolve([MOCK_USERS[0], MOCK_USERS[6], MOCK_USERS[7]]);
    });
}