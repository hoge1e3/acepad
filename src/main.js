import {initConfig} from './config.js';
import {initCore} from './editorcore.js';
import {getConfig} from './states.js';
//import {sh} from 'acepad-shell';
import {initSessions} from './sessions.js';
import {showMenuButtons,initMenuButtons} from './menu.js';
//iport {setTitle} from './boot.js';
import {makeNgram} from './ngram.js';
import {initMarker} from './marker.js';
//import {FS} from "acepad-os";
//import {open} from "acepad-browser";
//mport {initVConsole} from "./debug.js";
import {getInstance} from "./instance.js";
export async function init(){
  //  if(!document.querySelector("#editor"))
  //  await open(FS.get(__dirname).rel("ace.html"));
  //  initVConsole();
    //setTitle();
    initConfig();
    initCore();
    //const home=FS.get(window.homePath);
    //setHome(home);
    //sh.cd(home);
    initSessions();
    const {menus}=getConfig();
    initMenuButtons();
    if(menus)showMenuButtons(menus);
    makeNgram();
    //initWorker();
    initMarker();
    
    return getInstance();
}
//if(typeof FS==="object")onFileReady();
/*export function initWorker(){
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('pwa/sw.js').then(function(registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }

}
*/