import {getEditor} from './states.js';
import {onChangeSession,autoSync,createSessionList,changeSession} from './sessions.js';
import {debugSession} from './debug.js';
export function basicSessions(/*home*/){
    let editor=getEditor();
    editor.on("changeSession", onChangeSession);
    /*setInterval(autoSync,100);
    
    let s=createDirList(home);*/
    let s=ace.createEditSession("// Acepad\n");
    createSessionList();
    debugSession();
    changeSession(s);

}

