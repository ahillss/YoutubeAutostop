var text=`

void((()=>{
    var aElement = document.querySelector(".html5-video-container").querySelector('video');
    var ytplayer = aElement.parentNode.parentNode;
    var vid = ytplayer.getVideoData().video_id;
    //aElement.simPlay = false; //dunno if this does anything
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
})());

`;

var code=document.createTextNode('(function(){'+text+'})();');
var script=document.createElement('script');
script.appendChild(code);

(document.head || document.documentElement || document).appendChild(script);
