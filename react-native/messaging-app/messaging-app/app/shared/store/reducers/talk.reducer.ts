import { TOGGLE_SHOULD_INJECT, SET_SCRIPT } from "../actions/talk.actions";

export default function talkReducer(state = { script: '', shouldInject: false }, action: any) {
    switch (action.type) {
        case TOGGLE_SHOULD_INJECT:
            return { ...state, shouldInject: action.payload.shouldInject };
        case SET_SCRIPT:
            return { ...state, script: action.payload.script }
        default:
            return state;
    }
}