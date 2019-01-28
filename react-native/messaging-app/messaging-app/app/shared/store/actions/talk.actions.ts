export const TOGGLE_SHOULD_INJECT = 'toggleShouldInject';
export const SET_SCRIPT = 'setScript';

export function toggleShouldInject(shouldInject: boolean) {
    return {
        type: TOGGLE_SHOULD_INJECT,
        payload: {
            shouldInject: shouldInject
        }
    };
}

export function setScript(script: string) {
    return {
        type: SET_SCRIPT,
        payload: {
            script: script
        }
    }
}