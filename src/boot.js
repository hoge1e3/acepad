import {dprint,run} from './debug.js';
import {print} from './cursor.js';
import {getHome} from './states.js';
/* global $,FS*/
export function selHome(h){
    /*let hi={};
    try{hi=JSON.parse(
        localStorage.homeHist);
    }catch(e){
        dprint(e+"\n");
    }
    if(localStorage.lastHome){
        hi[localStorage.lastHome]=1;
    }
    if(h){
        localStorage.lastHome=h;
        hi[h]=1;
        localStorage.homeHist=
        JSON.stringify(hi);
        location.reload();
        return ;
    }
    for(let k of Object.keys(hi)){
        print(`selHome("${k}");\n`);
    }*/
}
window.selHome=selHome;
export async function autoexec(){
    /*let autos=[];
    const home=getHome();
    for(let h=home;h;h=h.up()){
        //console.log(h);
        let a=h.rel("autoexec.js");
        //console.log(a,a.exists());
        if(a.exists()){
            autos.unshift(a);
        }
    }
    console.log(autos);
    for(let a of autos){
        await run(a);
    }*/
}
export function setTitle(){
    let n=location.href.split("/");
    n=n.pop();
    document.querySelector("title").innerText=n;
}
export function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
