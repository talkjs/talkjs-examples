Talk.ready.then(function () {
    const me = new Talk.User({
        id: "123456",
        name: "Alice",
        email: "alice@example.com",
        photoUrl: "https://randomuser.me/api/portraits/women/72.jpg",
        welcomeMessage: "Hey there! How are you? :-)",
        //Adding a custom property for the user called questionnaireAnswered
        //This flag can be set to true or false when retrieving the user from an actual database
        custom: {
            "questionnaireAnswered": "false"
        },
        role: "original"
    });
    const session = new Talk.Session({
        appId: "YOUR_APP_ID_HERE",
        me: me
    });
    const other = new Talk.User({
        id: "654321",
        name: "Sebastian",
        email: "Sebastian@example.com",
        photoUrl: "https://randomuser.me/api/portraits/men/9.jpg",
        welcomeMessage: "Hi,\nDo you mind answering a short questionnaire?",
        role: "original"
    });
    const conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, other));
    conversation.setParticipant(me);
    conversation.setParticipant(other);
    
    const chatboxPopup = session.createPopup(conversation, { keepOpen: false });
    chatboxPopup.mount({ show: true });
    //A count variable to keep track of the questions
    let count = 1;
    let questionnaireAnswered = me.custom.questionnaireAnswered;
    //As soon as the user sends a message, this callback will be triggered
    chatboxPopup.onSendMessage(function (data) { 
        //If the count is equal to 0, it means that it is the user's first reply, 
        //and if it is equal to No and if they haven't answered the questionnaire before, we will 
        //display the first question
        if(data.message.text === 'No' && count == 1 && questionnaireAnswered == "false"){
            chatboxPopup.createHtmlPanel({
                url: `questionnaire_panels/question_1.html`,
                height: 100,
                show: true
            });
            //After displaying the panel, we set the flag to true and increment count
            me.custom.questionnaireAnswered = "true"
            count++;
        }
        else if(count == 2){
            console.log(count);
            chatboxPopup.createHtmlPanel({
                url: `questionnaire_panels/question_2.html`,
                height: 100,
                show: true,
            });
            count++;
        }
        else if(count == 3){
            console.log(count);
            chatboxPopup.createHtmlPanel({
                url: `questionnaire_panels/question_3.html`,
                height: 100,
                show: true,
            });
            count++;
        }
        //Once the user has completed all three questions we show them the thank you panel
        else if(count === 4){
            chatboxPopup.createHtmlPanel({
                url: "questionnaire_panels/thank_you.html",
                height: 100,
                show: true
            })
            //Once loaded, it will hide itself after a span of 1.5 seconds. Once this is done,
            //the user can chat as usual with the operator
            .then(function(htmlPanel) {
                setTimeout(() => {htmlPanel.hide();}, 1500);                
            });
            count++;
        }     
        //If the user types in anything else, that means they're not interested
        //in answering the questionnaire and can chat as usual
    })
})


