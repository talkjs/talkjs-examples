$(async function() {
    await Talk.ready
    await initializeSession()

    $(this).on('click', '#private-message', function() {
        const otherId = $(this).data('other-id')
        const subject = $(this).data('conv-subject')

        $.ajax({
            type: 'GET',
            url: `/talk/private/${otherId}/`,
            success: async function(response) {
                const me = await createTalkUser(response.me)
                const other = await createTalkUser(response.other)

                const conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other))
                conversation.setAttributes({subject: subject})
                conversation.setParticipant(me)
                conversation.setParticipant(other)

                const popup = talkSession.createPopup(conversation, { keepOpen: true })
                popup.mount({ show: true })
            },
            error: function(error) {
                console.log(error)
            }
        })   
    })
})

