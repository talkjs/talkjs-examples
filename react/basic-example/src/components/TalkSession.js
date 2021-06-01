/* 
This file acts as a provider that all children components can directly access
the talkSession context and is useful if you may want to interact with TalkJS in different parts 
of your application. 
*/ 

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Talk from 'talkjs';
import { TalkSessionContext } from '../contexts/TalkSessionContext';


function TalkSession(props) {

    const [me, setMe] = useState(null);
    const [talkSession, setTalkSession] = useState(null);

    useEffect(() => {
        
        if(!talkSession) {
            Talk.ready.then(() => {
                const me = new Talk.User(props.me);
                const session = new Talk.Session({
                    me,
                    appId: props.appId,
                });
    
                setMe(me);
                setTalkSession(session);
            });
        }
    }, [props.me, props.appId, talkSession]);

	return (
        <TalkSessionContext.Provider value={{me, talkSession}}>
            {props.children}
        </TalkSessionContext.Provider>
	);
};

TalkSession.propTypes = {
    children: PropTypes.node,
    appId: PropTypes.string.isRequired,
    me: PropTypes.object.isRequired,
}

export default TalkSession;