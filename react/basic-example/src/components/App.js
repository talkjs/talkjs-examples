
import '../styles/App.css';
import TalkSession from './TalkSession';
import Chatbox from './Chatbox';
import Video from './Video';

function App() {

  // Fetch this from the TalkJS dashboard (https://talkjs.com/dashboard)
  const appId = 'replace with your app id'

  // Mock user to load the chat as, tradditionally this would be fetched this from your database or store
  // properties map to a Talk.User (https://talkjs.com/docs/Reference/JavaScript_Chat_SDK/User.html)
  const me = {
    id: 'example-user-12345',
    name: 'React Example',
    email: 'foo@example.com',
    role: 'default',
  }

  // Mock data for example purposes
  const mockVimeoVideoSrc = 'https://vimeo.com/78812430';
  const mockConversationTopic = 'example-chatroom-test-1';

  return (
      <TalkSession appId={appId} me={me}>
        <div className="container">
          <h1>TalkJS Chatbox example</h1>
          <div className="main-layout">
            <div className="main-layout__video">
              <Video videoSrc={mockVimeoVideoSrc} />
            </div>
            <div className="main-layout__chat">
              <Chatbox conversationId={mockConversationTopic} />
            </div>
          </div>

          <div>
            <p>Need help with TalkJS? Talk to us via our <a href='https://talkjs.com?chat' target='_blank' rel='noopener noreferrer' >livechat</a> for support!</p>
          </div>
        </div>
      </TalkSession>
  );
}

export default App;
