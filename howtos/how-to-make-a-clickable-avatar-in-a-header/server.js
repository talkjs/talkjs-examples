import express from 'express';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

const users = {
    '0': {
        id: 0,
        name: 'Sarah',
        email: 'sarah@test-email.io',
        photoUrl: 'https://talkjs.com/images/avatar-1.jpg',
        welcomeMessage: 'Welcome to the chat!',
        role: 'default'
    },
    '1': {
        id: 1,
        name: 'Marie',
        email: 'marie@test-email.io',
        photoUrl: 'https://talkjs.com/images/avatar-2.jpg',
        welcomeMessage: 'Hi 👋',
        role: 'default'
    },
    '2': {
        id: 2,
        name: 'Jenna',
        email: 'jenna@test-email.io',
        photoUrl: 'https://talkjs.com/images/avatar-3.jpg',
        welcomeMessage: 'Hello friend.',
        role: 'default'
    },
    '3': {
        id: 3,
        name: 'Denis',
        email: 'denis@test-email.io',
        photoUrl: 'https://talkjs.com/images/avatar-4.jpg',
        welcomeMessage: 'How can I help you?',
        role: 'default'
    },
    '4': {
        id: 4,
        name: 'Adam',
        email: 'adam@test-email.io',
        photoUrl: 'https://talkjs.com/images/avatar-5.jpg',
        welcomeMessage: 'Nice to meet you 🐱',
        role: 'default'
    }
};

const config = {
    currentUser: {
        id: '123456',
        name: 'Me',
        email: 'me@test-email.io',
        photoUrl: 'https://talkjs.com/images/avatar-4.jpg',
        welcomeMessage: 'Welcome to the chat!',
        role: 'default'
    },
    appId: '<APP_ID>'
};

app.get('/', (req, res) => {
    res.render('index', { config: JSON.stringify(config), users });
});

app.get('/user-profile/:id', (req, res) => {
    const user = users[req.params.id];
    res.render('profile', { config: JSON.stringify(config), user });
});

app.listen(3000, () => console.log('Server listening on port:', 3000));