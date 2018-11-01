// Mock UserModel with example User data
class UserModel {
    constructor() {
        this.users = {
            Sebastian: {
                id: "123456",
                name: "Sebastian",
                email: "sebastian@example.com",
                photoUrl: "https://demo.talkjs.com/img/sebastian.jpg",
                welcomeMessage: "Hey!"
            },
            Alice: {
                id: "654321",
                name: "Alice",
                email: "alice@example.com",
                photoUrl: "https://demo.talkjs.com/img/alice.jpg",
                welcomeMessage: "Hiya!"
            },
            Marco: {
                id: "56789",
                name: "Marco",
                email: "marco@example.com",
                photoUrl: "https://demo.talkjs.com/img/marco.jpg",
                welcomeMessage: "Hi :)"
            }
        }
    }

    findUserByName(name) {
        return this.users[name];
    }
}

module.exports = new UserModel();