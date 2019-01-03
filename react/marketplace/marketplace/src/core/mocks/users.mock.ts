import { User } from 'src/shared/models/user.model';

export const USERS: User[] = [
    new User(4, 'John', process.env.PUBLIC_URL + '/assets/images/users/john.jpg'),
    new User(2, 'Clarke', process.env.PUBLIC_URL + '/assets/images/users/clarke.jpeg'),
    new User(3, 'Ethan', process.env.PUBLIC_URL + '/assets/images/users/ethan.jpeg'),
    new User(8, 'Max', process.env.PUBLIC_URL + '/assets/images/users/max.jpeg'),
    new User(5, 'Liam', process.env.PUBLIC_URL + '/assets/images/users/liam.jpeg'),
    new User(6, 'Lindsey', process.env.PUBLIC_URL + '/assets/images/users/lindsey.jpeg'),
    new User(7, 'Mary', process.env.PUBLIC_URL + '/assets/images/users/mary.jpeg'),
    new User(1, 'Jason', process.env.PUBLIC_URL + '/assets/images/users/jason.jpeg'),
    new User(9, 'Paul', process.env.PUBLIC_URL + '/assets/images/users/paul.jpeg'),
    new User(10, 'Tom', process.env.PUBLIC_URL + '/assets/images/users/tom.jpeg'),
    new User(11, "Vanessa", process.env.PUBLIC_URL + '/assets/images/users/vanessa.jpeg')
];