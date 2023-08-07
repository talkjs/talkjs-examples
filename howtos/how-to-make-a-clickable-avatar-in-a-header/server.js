import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

const users = [
    {
        id: 0,
        name: 'Ken',
        email: 'ken@test-email.io',
        photoUrl: 'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
        welcomeMessage: 'Welcome to the chat!',
        role: 'default'
    },
    {
        id: 1,
        name: 'Denis',
        email: 'denis@test-email.io',
        photoUrl: 'https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4',
        welcomeMessage: 'Hi',
        role: 'default'
    },
    {
        id: 2,
        name: 'Tim',
        email: 'tim@test-email.io',
        photoUrl: 'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ',
        welcomeMessage: 'Hello friend',
        role: 'default'
    },
    {
        id: 3,
        name: 'Sarah',
        email: 'sarah@test-email.io',
        photoUrl: 'https://fastly.picsum.photos/id/3/5000/3333.jpg?hmac=GDjZ2uNWE3V59PkdDaOzTOuV3tPWWxJSf4fNcxu4S2g',
        welcomeMessage: 'How can I help you?',
        role: 'default'
    },
    {
        id: 4,
        name: 'Adam',
        email: 'adam@test-email.io',
        photoUrl: 'https://fastly.picsum.photos/id/4/5000/3333.jpg?hmac=ghf06FdmgiD0-G4c9DdNM8RnBIN7BO0-ZGEw47khHP4',
        welcomeMessage: 'What\'s up?',
        role: 'default'
    }
];

const config = {
    currentUser: {
        id: '123456',
        name: 'Me',
        email: 'me@test-email.io',
        photoUrl: 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
        welcomeMessage: 'Welcome to the chat!',
        role: 'default'
    },
    appId: 'APP_ID'
};

app.get('/', (req, res) => {
    res.render('index', { config: JSON.stringify(config), users });
});

app.get('/user-profile/:id', (req, res) => {
    const id = +req.params.id;
    const user = users.find(user => user.id === id);
    res.render('profile', { config: JSON.stringify(config), user });
});

app.listen(3000, () => console.log("Server Listening on port:", 3000));