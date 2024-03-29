import {setConfig,getHome,getEditor} from './states.js';
import {toggleFullScreen} from './boot.js';
import {exec} from './command.js';
import {changeSession} from './sessions.js';
import {unsetSel} from './editmode.js';
import {setModifier,renderModifierState} from './modifier.js';
import {run,showConsole} from './debug.js';
export function initConfig(){
    setConfig({
        commands:{
            "ctrl-w":(editor)=>editor.session.foldAll(),
            "ctrl-q":()=>toggleFullScreen(),
            sessions:{bindKey:"ctrl-1",exec(){
                changeSession("*sessions*");
            }},
            reload:{bindKey:"ctrl-r",exec(){
                location.reload();
            }},
            /*find:{bindKey:"ctrl-f",exec(){
                const home=getHome();
                let s=createFind(home);
                changeSession(s);
            }},
            findSel:{exec(editor){
                const home=getHome();
                let t=editor.getSelectedText();
                let s=createFind(home, t);
                changeSession(s);
            }},*/
            quitEdit:{exec(editor){
                unsetSel(editor);
                editor.getSelection().clearSelection();
                setModifier("edit",0);
                renderModifierState();
            }},
            showDebug:{bindKey:"ctrl-d",exec(){
                changeSession("*debug*");
            }},
        },
        menus:{
           /* home(){
                const editor=getEditor();
                const home=getHome();
                editor.setSession(findSessionByFile(home));
            },*/
            full(){
                toggleFullScreen();
            },
            ses(){
                changeSession("*sessions*");
            },
            run(){
                changeSession("*debug*");
            },
            gutt(){
                const editor=getEditor();
                editor.renderer.setShowGutter(
                    !editor.renderer.getShowGutter());
            },
            cons(){
                showConsole();
            },
        },
        jshint:{
            maxerr:10000,
            esnext:false,
            esversion:9,
            undef:true,
        }
    });
}




