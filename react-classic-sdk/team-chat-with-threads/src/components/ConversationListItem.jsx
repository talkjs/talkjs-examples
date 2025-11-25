import ConversationImage from "./ConversationImage"

const ConversationListItem = ({
  conversation,
  changeConversation,
  unreadMessages,
  currentConversation,
}) => {
  const unread = unreadMessages.find(
    (item) => item.conversation.id === conversation.id
  );

    return (
        <button onClick={() => changeConversation(conversation)} className={`flex flex-row items-center text-gray-400 hover:bg-gray-700 hover:text-white p-2 mx-4 rounded ${currentConversation.id === conversation.id ? 'bg-blue-500 hover:bg-blue-500 !text-white' : ''}`}>
            <div className="mr-2">
                <div>
                    <ConversationImage image={conversation.avatar} imgClass={'w-6'}/>
                </div>
            </div>

            <div className="header">
                <div className={`conversation-name unread text-sm ${unread ? 'font-bold text-white' : ''}`}>
                    {conversation.subject}
                </div>
            </div>
        </button>
    )
}

export default ConversationListItem
