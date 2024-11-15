import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:talkjs_flutter/talkjs_flutter.dart';

/// The object containing the state of the app
class MyAppState with ChangeNotifier {
  final Session session;

  // Private field used by the conversation getter and setter
  Conversation? _conversation;

  MyAppState({required this.session, Conversation? conversation})
      : _conversation = conversation;

  Conversation? get conversation => _conversation;

  set conversation(Conversation? conversation) {
    _conversation = conversation;

    // To automatically trigger a widget update whenever the conversation
    // property is changed
    notifyListeners();
  }
}

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  final session = Session(appId: 'YOUR_APP_ID');

  final me = session.getUser(
    id: '123456',
    name: 'Alice',
    email: ['alice@example.com'],
    photoUrl: 'https://demo.talkjs.com/img/alice.jpg',
    welcomeMessage: 'Hey there! How are you? :-)',
    role: 'default',
  );

  session.me = me;

  final other = session.getUser(
    id: '654321',
    name: 'Sebastian',
    email: ['Sebastian@example.com'],
    photoUrl: 'https://demo.talkjs.com/img/sebastian.jpg',
    welcomeMessage: 'Hey, how can I help?',
    role: 'default',
  );

  final conversation = session.getConversation(
      id: Talk.oneOnOneId(me.id, other.id),
      participants: {Participant(me), Participant(other)});

  runApp(
    // We use ChangeNotifierProvider to have a global app state
    ChangeNotifierProvider(
      // The global app state is created on the create callback, and we
      // initialize it with the newly created Session
      create: (context) =>
          MyAppState(session: session, conversation: conversation),
      child: MaterialApp(
        title: 'TalkJS Demo',
        initialRoute: '/',
        routes: {
          '/': (context) => const MainScreen(),
          '/chatbox': (context) => const ChatBoxScreen(),
          '/conversationlist': (context) => const ConversationListScreen(),
        },
      ),
    ),
  );
}

class MainScreen extends StatelessWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('TalkJS Demo'),
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            child: Center(
              child: ElevatedButton(
                child: const Text('GO TO CHATBOX'),
                onPressed: () {
                  Navigator.pushNamed(context, '/chatbox');
                },
              ),
            ),
          ),
          Expanded(
            child: Center(
              child: ElevatedButton(
                child: const Text('GO TO CONVERSATION LIST'),
                onPressed: () {
                  Navigator.pushNamed(context, '/conversationlist');
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class ChatBoxScreen extends StatelessWidget {
  const ChatBoxScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ChatBox'),
      ),
      // Use a Consumer widget to get the session and conversation,
      // and rebuild the ChatBox when the MyAppState object changes
      body: Consumer<MyAppState>(
        builder: (context, state, child) => ChatBox(
          session: state.session,
          conversation: state.conversation,
        ),
      ),
    );
  }
}

class ConversationListScreen extends StatelessWidget {
  const ConversationListScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var state = context.read<MyAppState>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('ConversationList'),
      ),
      body: ConversationList(
        session: state.session,
        onSelectConversation: (event) {
          // When a conversation is selected, build a Conversation object with
          // the selected conversation id, and set it as the app state
          // Note that setting state.conversation triggers the
          // MyAppState.conversation setter, that calls notifyListeners()
          state.conversation =
              state.session.getConversation(id: event.conversation.id);

          // Navigate to the ChatBox, which will use the selected conversation
          Navigator.pushNamed(context, '/chatbox');
        },
      ),
    );
  }
}
