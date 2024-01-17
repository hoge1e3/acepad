import {locate,currentLine,print} from './cursor.js';
import {sessionInfo,createSession} from './sessions.js';
import {getEditor} from './states.js';
export function getInstance(){
    return {
        editor: getEditor(),
        getEditor,
        locate,currentLine,print,
        sessionInfo,createSession,
    };
}