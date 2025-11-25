var crypto = require("crypto");

// Import a mock user Model
var User = require("../models/User");

// Set this secret in the .env file for use with identity verification, see:
// https://talkjs.com/docs/Features/Identity_Verification.html
const secret = process.env.SECRET;

exports.index = (req, res) => {
    // Mock DB calls to find the current user and the person they wish to chat with
    let me = User.findUserByName(req.query.me);
    let other = User.findUserByName(req.query.other);

    // If both the users can be found, render the view and pass in the user information
    if (me && other) {
        return res.render("chat", {
            me: me,
            other: other,
            signature: crypto.createHmac("sha256", secret).update(me.id).digest("hex")
        })
    }

    res.send("No users found!");
}

exports.dual = (req, res) => {
    let sebastian = User.findUserByName("Sebastian");
    let alice = User.findUserByName("Alice");
    let marco = User.findUserByName("Marco");

    res.render("dual-chat", {
        // Sebastian will be the 'left' side chat window
        sebastian: sebastian,
        sebastianSig: crypto.createHmac("sha256", secret).update(sebastian.id).digest("hex"),

        // Alice will be the 'right' side chat window
        alice: alice,
        aliceSig: crypto.createHmac("sha256", secret).update(alice.id).digest("hex"),
        // Marco will a be a member of the group conversation
        marco: marco,
        // Generate a unique conversation ID for the group chat by using the user's IDs alphabetically sorted (by name)
        // see: https://talkjs.com/docs/Concepts/Conversations
        convId: alice.id + marco.id + sebastian.id
    })
}