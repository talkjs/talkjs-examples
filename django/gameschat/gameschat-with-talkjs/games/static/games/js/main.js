const currentSessionKey = 'currentSession'

function initializeUnreadMessages() {
    talkSession.unreads.on('change', function(conversationIds) {
        const amountOfUnreads = conversationIds.length

        $('span#notifier-badge')
            .text(amountOfUnreads)
            .toggle(amountOfUnreads > 0) 
    
        if (amountOfUnreads > 0) 
            document.title = '(' + amountOfUnreads + ') Games Chat'
        else 
            document.title = 'Games Chat'
    })
}

async function createTalkUser(user) { 
    await Talk.ready

    return new Talk.User({
        id: user.id,
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        welcomeMessage: user.welcomeMessage ? user.welcomeMessage : null 
    })
}

function getSessionCredentials() {
    return $.ajax({
        type: 'GET',
        url: `/talk/session/current/`
    })
}

async function buildSession({ me, appId, signature }) {
    await Talk.ready

    window.talkSession = new Talk.Session({
        appId: appId,
        me: await createTalkUser(me),
        signature: signature
    })
}

async function initializeSession() {
    const currentSession = sessionStorage.getItem(currentSessionKey)

    if (currentSession) {
        await buildSession(JSON.parse(currentSession))
        return
    }

    await buildSession(await getSessionCredentials())
    sessionStorage.setItem(currentSessionKey, JSON.stringify(talkSession))  
}

$(async function() {
    await initializeSession()
    initializeUnreadMessages()
})