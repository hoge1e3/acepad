import {getEditor,getConfig} from './states.js';
import {detachCommands,attachCommands,parseCommands} from './command.js';
import {events} from './events.js';
import {locate,currentLine} from './cursor.js';
import {EventHandler} from "@hoge1e3/events";
export var sessionMap={};
export function findSessions(){
    let r=[];
    for(let k in sessionMap)r.push(sessionMap[k]);
    return r;
}
export function findSession(f){
    if(typeof f==="string"){
        let i=sessionInfo[f];
        return i&&i.session;
    }else if(typeof f!=="function"){
        let t=f;
        f=(s,i)=>s===t||i===t;
    }
    for(let k in sessionMap){
        let s=sessionMap[k];
        if(f(s,sessionInfo(s)))return s;
    }
}
export function     changeSession(sn){
    const editor=getEditor();
        let s=typeof sn==="string"? sessionMap[sn] : sn.session ? sn.session : sn;
        if(!s)return alert("No such session "+sn);
        editor.setSession(s);
    }
export function onChangeSession({editor,oldSession, session}){
        const evt={editor,oldSession, session};
        //console.log("chses",this);
        editor.focus();
        let osi=sessionInfo(oldSession);
        osi.fire("deactivate",evt);
        if(osi.onDeactivated){
            osi.onDeactivated(editor);
        }
        detachCommands(osi.commands);
        let si=sessionInfo(session);
        si.lastOpen=new Date().getTime();
        si.fire("activate",evt);
        if(si.onActivated){
            si.onActivated(editor);
        }
        attachCommands(si.commands);
        events.fire("changeSession",evt);
        setTimeout(()=>configureWorker({},session),500);
    }
    
export function createSessionList(){
        createSession({
            type:"sessions",
            onActivated(editor){
                editor.session.setValue(
                Object.keys(sessionMap).
                //filter(k=>k!="*sessions*").
                sort((a,b)=>
                sessionInfo(sessionMap[b]).lastOpen-
                sessionInfo(sessionMap[a]).lastOpen).
                map(
                (k)=>k
                ).join("\n"));
                locate(1,2);
            },
            commands: {
                return() {
                    changeSession(currentLine());
                }
            },
        });
    }
export function removeSession(session){
    let s=findSession(session);
    if(!s)return false;
    let si=sessionInfo(s);
    let n=si.name;
    si.fire("remove");
    delete sessionMap[n];
    return true;
}
export function    createSession(data){
    data.session=data.session||
    ace.createEditSession(data.text||"");
    data.name=data.name||
    data.file&&data.file.name()||
    data.type&&`*${data.type}*`;
    data.type=data.type||"file";
    data.lastOpen=0;
    data.commands=parseCommands(data.commands);
    sessionInfo(data.session,data);
    //data.session.$worker.send("setOptions",{esversion:8});
    // after changing the session
    data.session.on("changeMode", 
    (...a)=>setTimeout(()=>configureWorker(...a),500));
    events.fire("createSession",data);
    return sessionMap[data.name]=data.session;
}
export function configureWorker(e, session) {
    if (session.getMode().$id == "ace/mode/javascript"){
        const {jshint}=getConfig();
        if (session.$worker) {
            session.$worker.send(
                "changeOptions",
                [ jshint||{esversion:11}],
                (...a)=>console.log(a)
            );
        }
    }
}
export var symsi=Symbol();
    
export function sessionInfo(s,data){
        let si;
        if(data){
            si=sessionInfo(s);
            if(data.name){
                delete sessionMap[si.name];
                sessionMap[data.name]=s;
            }
            Object.assign(si,data);
            si.fire("infochanged",si);
            return si;
        }
        si=s[symsi];
        if(si)return si;
        si=s[symsi]={
            session:s,
        };
        EventHandler.attachTo(si);
        return si;
    }
export function initSessions(){
    let editor=getEditor();
    editor.on("changeSession", (e)=>{
        e.editor=editor;
        onChangeSession(e);
    });
    createSessionList();
}





