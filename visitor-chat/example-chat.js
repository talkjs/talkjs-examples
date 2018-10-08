 (function(t,a,l,k,j,s){
    s=a.createElement('script');s.async=1;s.src="https://cdn.talkjs.com/talk.js";a.head.appendChild(s)
    ;k=t.Promise;t.Talk={v:1,ready:{then:function(f){if(k)return new k(function(r,e){l.push([f,r,e])});l
    .push([f])},catch:function(){return k&&new k()},c:l}};})(window,document,[]);

Talk.ready.then(function () {
    
    var user = getUser();
    var me = new Talk.User(user);

    var other = new Talk.User({ 
        id: "1",
        name: "Alice",
        photoUrl: "https://demo.talkjs.com/img/alice.jpg", 
        welcomeMessage: "Hey there! Im currently out of town so be sure to set your email and I will respond to you as soon as possible!"
    });

    talkSession = new Talk.Session({
        appId: "",  // <---- put your appId here. It can be found in your dashboard
        me: me
    });
    
    //create-visitor-panel.js expects a conversation with the format conv-{userId} 
    //The 'conv-' is for clarity sake while the userId is to easily pair the user and conversation. 
    var conversation = talkSession.getOrCreateConversation("conv-" + user.id);
    conversation.setAttributes({
        subject: "Forest Villa",
        photoUrl: "https://demo.talkjs.com/img/12.jpg"
    })

    conversation.setParticipant(me);
    conversation.setParticipant(other);

    var popup = talkSession.createPopup(conversation,{
        keepOpen: false,
        launcher: "always"
    });

    //Calling the actual HTML panel. 
    //Returns a promise.
    getHtmlPanel(popup)

    popup.mount();
});