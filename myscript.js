(()=>{
    function go() {
        if(!location.pathname.match("(^/watch$)|(^/[uc][^/]*/[^/]+(/featured)?$)")) {
            return;
        }
        
        var checkExist = setInterval(() => {
            var vs = document.querySelectorAll("video");
            
            if(vs.length!=0) {
                 setTimeout(() => { clearInterval(checkExist); }, 1000);
            }
            
            vs.forEach((v,i)=>{
                var p = v.parentNode.parentNode;
                
                if(!p.myDone) {
                    p.myDone=true;
                    p.playVideo = () => {};
                    p.cueVideoById(p.getVideoData().video_id,p.getCurrentTime());
                    setTimeout(() => { p.myDone=false; }, 2000);
                }
            });
        }, 100);
    }

    go();
    var bla=false;
    document.addEventListener('yt-navigate-finish', ()=>{ if(bla) { go(); } bla=true; });
})();