let selectedConversationId = null

$(async function() {
    await initializeSession()

    const inbox = talkSession.createInbox({ feedConversationTitleMode: 'subject' })
    inbox.mount(document.getElementById('talkjs-container'))

    inbox.on('conversationSelected', function(selectedConversation) {
        if  (selectedConversation) {
            $('#chat-options').removeClass('hidden')
            selectedConversationId = selectedConversation.conversation.id

            if (selectedConversation.others.length > 1 && 
                selectedConversation.others.length < 4) {
                $('#chat-clipboard').removeClass('hidden')
                const port = window.location.port ? `:${window.location.port}` : ''
                const url = `${window.location.protocol}//${window.location.hostname}${port}/talk/invitation/${selectedConversationId}`
                $('#chat-link').val(url)
            } else 
                $('#chat-clipboard').addClass('hidden')


            $('#chat-additions').removeClass('disabled')
        } else {
            selectedConversationId = null
            $('#chat-options').addClass('hidden')
            $('#chat-additions').addClass('disabled')
        }
    })

    $('#chat-additions').on('click', '#chat-link-copy', function(e) {
        e.preventDefault()
        
        $('#chat-link').select()
        document.execCommand("copy")
    })

    $('#chat-additions').on('click', '#chat-leave', function(e) {
        e.preventDefault()

        $.ajax({
            type: 'GET',
            url: `/talk/leave/${selectedConversationId}`
        })
    })

    $('#chat-additions').on('click', '#quick-message', function(e) {
        e.preventDefault()
        
        $.ajax({
            type: 'POST',
            url: `/talk/quick/${selectedConversationId}/`,
            data: { message: $(this).text() }
        })   
    })
})