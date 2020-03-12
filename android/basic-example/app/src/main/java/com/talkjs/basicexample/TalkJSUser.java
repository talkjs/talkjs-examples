package com.talkjs.basicexample;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

/**
 * This class matches the Talk.User object that's used by the TalkJS JavaScript SDK. It's converted
 * to JSON in JavaScriptCallbacks.java and then used in chat.js to synchronize user data. You can either
 * use this class in your apps, or modify chat.js to create Talk.User objects from your existing user classes.
 */
public class TalkJSUser implements Serializable {
    public final String id;
    public final String name;
    public final String email;
    public final String photoUrl;
    public final String welcomeMessage;
    public final String role;

    public TalkJSUser(String id, String name, String email, String photoUrl, String welcomeMessage) {
        this(id, name, email, photoUrl, welcomeMessage, null);
    }

    public TalkJSUser(String id, String name, String email, String photoUrl, String welcomeMessage, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.photoUrl = photoUrl;
        this.welcomeMessage = welcomeMessage;
        this.role = role;
    }

    /**
     * A hardcoded "current user". You'd probably get this data from your app's Model layer in a
     * production app.
     */
    public static final TalkJSUser currentUser = new TalkJSUser(
        "998346",
        "Marco",
        "marco@example.com",
        "https://demo.talkjs.com/img/marco.jpg",
        "Hey there! How are you? :-)",
        "CurrentUser");

    /**
     * Just some hardcoded user data, to populate the "new chat" tab.
     * You'd probably get this data from your app's Model layer in a production app.
     */
    public static final List<TalkJSUser> allUsers = Arrays.asList(
        new TalkJSUser(
            "342144",
            "Sebastian",
            "sebastian@example.com",
            "https://demo.talkjs.com/img/sebastian.jpg",
            "Hey there! How are you? :-)"),
        new TalkJSUser(
            "862643",
            "Alice",
            "alice@example.com",
            "https://demo.talkjs.com/img/alice.jpg",
            "Hey there! How are you? :-)"),
        new TalkJSUser(
            "174984",
            "Christine",
            "christine@example.com",
            "https://demo.talkjs.com/img/christine.jpg",
            "Hey there! How are you? :-)"),
        new TalkJSUser(
            "664936",
            "Daniel",
            "daniel@example.com",
            "https://demo.talkjs.com/img/daniel.jpg",
            "Hey there! How are you? :-)"),
        new TalkJSUser(
            "167386",
            "David",
            "david@example.com",
            "https://demo.talkjs.com/img/david.jpg",
            "Hey there! How are you? :-)"),
        new TalkJSUser(
            "834726",
            "Taylor",
            "taylor@example.com",
            "https://demo.talkjs.com/img/taylor.jpg",
            "Hey there! How are you? :-)")
    );

}
