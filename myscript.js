function get_player() {
    var c = document.querySelector(".html5-video-container");
    var aElement = c && c.querySelector('video');
    var ytplayer = aElement && aElement.parentNode && aElement.parentNode.parentNode;
    return ytplayer;
}

function go() {
    if(!location.pathname.match("(^/watch$)|(^/[uc][^/]*/[^/]+(/featured)?$)")) {
        return;
    }
    
    var checkExist = setInterval(() => {
        var ytplayer = get_player();
        
        if(ytplayer) {
            var vid = ytplayer.getVideoData().video_id;
            ytplayer.cueVideoById(vid, ytplayer.getCurrentTime());
            
            var seekTo = ytplayer.seekTo;
            var playVideo = ytplayer.playVideo;

            ytplayer.playVideo = () => {};
            ytplayer.seekTo = (tm) => {ytplayer.cueVideoById(vid, tm);};
            
            ytplayer.addEventListener("onStateChange", function onstate(a) {
                if (a != -1) {
                    ytplayer.playVideo = playVideo;
                    ytplayer.seekTo = seekTo;
                    ytplayer.removeEventListener("onStateChange", onstate);
                }
            });
            
            clearInterval(checkExist);
        }
    }, 100);
}

document.addEventListener('yt-navigate-finish', go);

go();