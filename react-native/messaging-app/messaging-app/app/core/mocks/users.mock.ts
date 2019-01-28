import { User } from "../../shared/models/user.model";

export const USERS: User[] = [
    new User(4, 'John'),
    new User(2, 'Clarke'),
    new User(3, 'Ethan'),
    new User(8, 'Max'),
    new User(5, 'Liam'),
    new User(6, 'Lindsey'),
    new User(7, 'Mary'),
    new User(1, 'Jason'),
    new User(9, 'Paul'),
    new User(10, 'Tom'),
    new User(11, "Vanessa")
];

export const USERS_WITH_SECTIONS: { title: string, data: string[] }[] = [
    { title: 'C', data: ['Clarke'] },
    { title: 'E', data: ['Ethan'] },
    { title: 'J', data: ['John', 'Jason'] },
    { title: 'L', data: ['Liam', 'Lindsey'] },
    { title: 'M', data: ['Max', 'Mary'] },
    { title: 'P', data: ['Paul'] },
    { title: 'T', data: ['Tom'] },
    { title: 'V', data: ['Vanessa'] }
];