import {getEditor,getConfig} from './states.js';
import {detachCommands,attachCommands,parseCommands} from './command.js';
import {events} from './events.js';
import {locate,currentLine} from './cursor.js';
import {EventHandler} from "./events.js";
export var sessionMap={};
export function findSessions(){
    let r=[];
    for(let k in sessionMap)r.push(sessionMap[k]);
    return r;
}
export function     changeSession(sn){
    const editor=getEditor();
        let s=typeof sn==="string"? sessionMap[sn] : sn.session ? sn.session : sn;
        if(!s)return alert("No such session "+sn);
        editor.setSession(s);
    }
export function onChangeSession({oldSession, session}){
        const editor=getEditor();
        //console.log("chses",this);
        editor.focus();
        let osi=sessionInfo(oldSession);
        if(osi.onDeactivated){
            osi.onDeactivated(editor);
        }
        detachCommands(osi.commands);
        let si=sessionInfo(session);
        si.lastOpen=new Date().getTime();
        if(si.onActivated){
            si.onActivated(editor);
        }
        attachCommands(si.commands);
        events.fire("changeSession",{oldSession, session});
        setTimeout(()=>configureWorker({},session),500);
    }
    
export function        autoSync(){
        //createSessionList
        const editor=getEditor();
        let session=editor.session;
        let si=sessionInfo(session);
        let f=si.file;
        if(!f)return;
        if(f.isDir())return ;
        if(f.lastUpdate()>si.ts){
            session.setValue(
                f.text());
            si.ts=f.lastUpdate();
        }else if(si.val!=
            session.getValue()){
            f.text(session.getValue());
            si.val=session.getValue();
            si.ts=f.lastUpdate();
        }
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




