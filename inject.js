var text=`
    void((()=>{
            var checkExist = setInterval(() => {
                var c = document.querySelector(".html5-video-container");
                var aElement = c && c.querySelector('video');
                var ytplayer = aElement && aElement.parentNode && aElement.parentNode.parentNode;
                
                if(ytplayer) {
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
                    
                    clearInterval(checkExist);
                }
            }, 333);
    })());
`;

var code=document.createTextNode('(function(){'+text+'})();');
var script=document.createElement('script');
script.appendChild(code);

(document.head || document.documentElement || document).appendChild(script);
