
function go() {
    if(!location.pathname.match("(^/watch$)|(^/[uc][^/]*/[^/]+(/featured)?$)")) {
        return;
    }
    
    var checkExist = setInterval(() => {
        let cs = document.querySelectorAll(".html5-video-container");
        
        cs.forEach((c)=>{
            var a = c && c.querySelector('video');
            var p = a && a.parentNode && a.parentNode.parentNode;
            
            if(p) {
                clearInterval(checkExist);
                setTimeout(() => {p.myDone=false;}, 10000);
                
                if(p.myDone) {
                    return;
                }

                p.myDone=true;
                p.cueVideoById(p.getVideoData().video_id,p.getCurrentTime());
                p.seekTo = () => {};
                p.playVideo = () => {};
                //~ p.stopVideo();
            }
        });
    }, 100);
}

document.addEventListener('yt-navigate-finish', go);
go();
