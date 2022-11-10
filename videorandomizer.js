const base_url = 'https://www.youtube.com/playlist?list='
const playlist_id = 'PLkQw1IRftefHMLUMmyUbfpKold_3uMJNk'

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// // 3. This function creates an <iframe> (and YouTube player)
// //    after the API code downloads.
// var player;
// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('player', {
//         // videoId: 'ROatPGGMvXg',
//         playerVars: {
//             'playsinline': 1
//         },
//         events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange,
//             'onError': onPlayerError
//         }
//     });
//     console.log('Created player')
// }

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.loadPlaylist({list:playlist_id,
                         listType:'playlist',
                         index:0})
    event.target.shuffle = true
    event.target.loop = true
    console.log(`Queued playlist ${playlist_id}`)
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    console.log(event.data)
    if (event.data == YT.PlayerState.PLAYING && !done) {
        console.log('starting timer')
        setTimeout(nextVideo, 3000);
        done = true;
    }
}

function onPlayerError(event) {
    console.log(`ERROR ${event.data}`)
    if (event.data == 150 || event.data == 101) {
        nextVideo()
    }
}

function stopVideo() {
    player.stopVideo();
}
function nextVideo() {
    console.log('Next Video')
    done = false;
    player.nextVideo()
}


