import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TalkSessionContext } from '../contexts/TalkSessionContext';

/* 
This is an example component that uses one of TalkJS' pre-built UI modes - or more specifically, the 'Chatbox' UI mode
The Chatbox UI is typically used when the chat may be related to a speicific 'topic' such as a video, product order etc.
*/
function Chatbox(props) {

    const chatContainer = useRef();
    const {me, talkSession} = useContext(TalkSessionContext);

    useEffect(() => {

        if(talkSession && props.conversationId) {
            
           const conv = talkSession.getOrCreateConversation(props.conversationId); 
           conv.setParticipant(me);
           conv.setAttributes({
               subject: 'Example chat subject',
           });

           const chatbox = talkSession.createChatbox(conv);
           chatbox.mount(chatContainer.current);
        }

    }, [props, me, talkSession]);

	return (
        <div ref={chatContainer} style={{height: '700px', width: '450px'}}></div>
	);
};

Chatbox.propTypes = {
    conversationId: PropTypes.string,
}

export default Chatbox;