class ChatSettings {
    defaultPhotoUrl = 'https://www.pnglot.com/pngfile/detail/107-1071726_chat-icon-png-icon-for-group-chat.png'

    constructor(subject = '', welcomeMessage = '', photoUrl = ''){
        this.subject = subject
        this.welcomeMessage = welcomeMessage
        
        if (!photoUrl && photoUrl === '') {
            this.photoUrl = this.defaultPhotoUrl
            this.isDefaultPhotoUsed = true
        } else {
            this.isDefaultPhotoUsed = false
            this.photoUrl = photoUrl
        }
    }
}

let invitedUsersIds = []
let chatSettings = new ChatSettings()
let chatActionsShown = false

function initializeConversation(conversation, participants, me, isPrivateChat, isChatWithMe = false) {
    const chatbox = talkSession.createChatbox(conversation, { showChatHeader: false })
    chatbox.mount(document.getElementById('talkjs-container'))

    let imageUrl = chatSettings.photoUrl
    const headerUsernames = isChatWithMe 
        ? `${me.name} (you)` 
        : participants.filter(p => p.id !== me.id).map(p => p.name).join(', ')
    
    if (isChatWithMe) {
        imageUrl = participants[0].photoUrl
    } else if (isPrivateChat && chatSettings.isDefaultPhotoUsed) {
        imageUrl = participants.filter(p => p.id !== me.id)[0].photoUrl
    }

    $('#header-avatar').css('background-image', 'url(' + imageUrl + ')')
    $('#header-usernames').text(headerUsernames)
    $('#header-subject').text(chatSettings.subject)
}

function reset() {  
    invitedUsersIds = []
    $('button#invite-user')
        .removeClass('btn-danger')
        .addClass('btn-primary')
        .text('Invite')
    $('#invited-users-count').text(`Selected ${invitedUsersIds.length}/4`)
    $('#chat-actions').fadeOut()
    chatActionsShown = false
    chatSettings = new ChatSettings()
    $("#chat-options-modal")
        .find("input")
        .val('')
        .end()
}

$(async function() {
    await Talk.ready
    await initializeSession()
    
    // Initial conversation with me, myself and I
    const me = await createTalkUser(talkSession.me)
    const conversation = talkSession.getOrCreateConversation(me.id)
    conversation.setParticipant(me)
    initializeConversation(conversation, [me], me, false, true)
    
    $(this).on('click', '#invite-user', function() {
        const otherId = $(this).data('other-id').toString()

        if (invitedUsersIds.indexOf(otherId) === -1 &&
            invitedUsersIds.length < 4) {
            invitedUsersIds.push(otherId)

            $(this)
                .text('Remove')
                .removeClass('btn-primary')
                .addClass('btn-danger')
        } else if (invitedUsersIds.indexOf(otherId) !== -1 &&
                invitedUsersIds.length < 5){
            invitedUsersIds.splice(invitedUsersIds.indexOf(otherId), 1)
            
            $(this)
                .text('Invite')
                .removeClass('btn-danger')
                .addClass('btn-primary')
        }
        
        if (invitedUsersIds.length == 1) {
            if (!chatActionsShown) {
                $('#chat-actions').css('display', 'flex').hide().fadeIn()
                chatActionsShown = true
            }

            $('#create-chat').text('Create private chat')
        } else if (invitedUsersIds.length > 1) 
            $('#create-chat').text('Create group chat')
        else if (invitedUsersIds.length == 0) {
            $('#chat-actions').fadeOut()
            chatActionsShown = false
        }

        $('#invited-users-count').text(`Selected ${invitedUsersIds.length}/4`)
    })

    $('#create-chat').on('click', function() {
        const { subject, welcomeMessage, photoUrl } = chatSettings

        $.ajax({
            type: 'POST',
            url: `/talk/chat/`,
            data: {
                participants: invitedUsersIds,
                subject,
                welcomeMessage,
                photoUrl
            },
            success: async function({ conversationId, participants }) {
                const conversation = talkSession.getOrCreateConversation(conversationId)
                const mappedParticipants = await Promise.all(participants.map(p => new Promise(resolve => resolve(createTalkUser(p)))))

                initializeConversation(conversation, mappedParticipants, me, invitedUsersIds.length == 1)
                reset()
            },
            error: function(error) {
                reset()
                console.log(error)
            }
        })   
    })

    $('#chat-options-modal').on('hide.bs.modal', function() {
        const subject = $(this).find('#chat-subject').val()
        const welcomeMessage = $(this).find('#chat-welcome-message').val()
        let photoUrl

        if ($(this).find('#chat-photo-url').val())
            photoUrl = $(this).find('#chat-photo-url').val()

        chatSettings = new ChatSettings(subject, welcomeMessage, photoUrl)
    })
})