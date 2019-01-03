import { User } from 'src/shared/models/user.model';
import { ChatPreferences } from 'src/shared/models/chat-preferences.model';

export const USERS: User[] = [
    new User(4, 'John', process.env.PUBLIC_URL + '/assets/images/users/john.jpg', new ChatPreferences("#1D1F1E", "Hi! Any questions? Let me know how I can help")),
    new User(2, 'Clarke', process.env.PUBLIC_URL + '/assets/images/users/clarke.jpeg', new ChatPreferences("#FF69B4", "Hi! Whatsup?")),
    new User(3, 'Ethan', process.env.PUBLIC_URL + '/assets/images/users/ethan.jpeg', new ChatPreferences("#CD905A", "Hey there, any questions? Let me know how I can help")),
    new User(8, 'Max', process.env.PUBLIC_URL + '/assets/images/users/max.jpeg', new ChatPreferences("#00AAB4", "Hey there, any questions? Let me know how I can help")),
    new User(5, 'Liam', process.env.PUBLIC_URL + '/assets/images/users/liam.jpeg', new ChatPreferences("#9290A1", "Hey there, any questions? Let me know how I can help")),
    new User(6, 'Lindsey', process.env.PUBLIC_URL + '/assets/images/users/lindsey.jpeg', new ChatPreferences("#37D1DB", "Hey there, any questions? Let me know how I can help")),
    new User(7, 'Mary', process.env.PUBLIC_URL + '/assets/images/users/mary.jpeg', new ChatPreferences("#D3C445", "Hey there, any questions? Let me know how I can help")),
    new User(1, 'Jason', process.env.PUBLIC_URL + '/assets/images/users/jason.jpeg', new ChatPreferences("#FBBEBB", "Hey there, any questions? Let me know how I can help")),
    new User(9, 'Paul', process.env.PUBLIC_URL + '/assets/images/users/paul.jpeg', new ChatPreferences("#08DFB4", "Hey there, any questions? Let me know how I can help")),
    new User(10, 'Tom', process.env.PUBLIC_URL + '/assets/images/users/tom.jpeg', new ChatPreferences("#FF69B4", "Hey there, any questions? Let me know how I can help")),
    new User(11, "Vanessa", process.env.PUBLIC_URL + '/assets/images/users/vanessa.jpeg', new ChatPreferences("#FF69B4", "Hey there, any questions? Let me know how I can help"))
];