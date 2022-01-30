var done= false;

function go() {
    if(!location.pathname.match("(^/watch$)|(^/[uc][^/]*/[^/]+(/featured)?$)") || done) {
        return;
    }
    
    done = true;
    
    var checkExist = setInterval(() => {
        document.querySelectorAll(".html5-video-container").forEach((c)=>{
            var a = c && c.querySelector('video');
            var p = a && a.parentNode && a.parentNode.parentNode;
            
            if(p) {
                p.stopVideo();
                clearInterval(checkExist);
                setTimeout(() => {done=false;}, 500);
            }
        });
    }, 100);
}

document.addEventListener('yt-navigate-finish', go);

go();