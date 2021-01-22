
function getCookie(ckey) {
    var b = document.cookie.match('(^|;)\\s*' + ckey + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : null;
}

function setCookie(ckey, cvalue) {
    document.cookie = "talkjs-user-" + ckey + "=" + cvalue + ";" + "path=/";
}

//UUID used to give each visitor their own unique ID
function uuidv4() {
    var crypto = window.crypto;
    var randomByte = crypto
        ? function () { return (crypto.getRandomValues(new Uint8Array(1)))[0]; }
        : function () { return Math.floor(Math.random() * 255); };
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
        return (c ^ randomByte() & 15 >> c / 4).toString(16);
    });
}

//Gets the visitor user values from cookie, if it doesn't exist return default values
function getUser() {
    var userId = (getCookie("talkjs-user-id") ? getCookie("talkjs-user-id") : uuidv4());
    var email = (getCookie("talkjs-user-email") && decodeURIComponent(getCookie("talkjs-user-email")));
    var name = (email !== null ? email.substr(0, email.indexOf('@')) : 'Visitor');

    setCookie('id', userId);

    var user = {
        id: userId,
        name: name,
        role: 'visitor'
    };
    return user;
}

function getHtmlPanel(chatObject) {
    //Check if the user email is set in cookie. If it isn't then show the HTML panel
    if (!getCookie("talkjs-user-email")) {
        return chatObject.createHtmlPanel({
            url: "./form-signup.html",
            height: 130
        }).then(function (htmlPanel) {
            //Eventlistener to register when the email has been set and proceed to hide the HTML panel
            htmlPanel.DOMContentLoadedPromise.then(function () {
                var registerForm = htmlPanel.window.document.getElementById("register-form");
                registerForm.addEventListener("submit", function (event) {
                    if (htmlPanel) {
                        htmlPanel.hide();
                        htmlPanel.window.saveForm();
                        event.preventDefault();
                    }
                });
            });
        }).catch(function (error) {
            console.error(error);
        });
    };
}



