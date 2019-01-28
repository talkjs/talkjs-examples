import { StyleSheet } from "react-native";

export default StyleSheet.create({
    header: {
        fontSize: 42,
        textAlign: 'center',
        flex: 1
    },
    container: {
        flex: 1
    },
    emptyContainer: {
        flex: 1
    },
    inputContainer: {
        flex: 2
    },
    statusText: {
        alignSelf: 'center',
        padding: 10
    },
    hintText: {
        alignSelf: 'center',
        marginBottom: 10
    },
    incorrectCredentialsText: {
        alignSelf: 'center',
        color: 'red'
    },
    textInput: {
        borderColor: 'lightgray',
        borderWidth: 1,
        marginBottom: 5
    }
});