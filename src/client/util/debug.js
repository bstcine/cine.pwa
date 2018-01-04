import {getParam} from "@/util/urlUtil";

(()=>{
    if(getParam().__cine_debug){
        document.write('<script src="http://localhost:9000/lib/vconsole/vconsole.min.js"></script>')
        document.write('<script> var vConsole = new VConsole()</script>')
    }
})()