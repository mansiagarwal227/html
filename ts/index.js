var music = document.getElementById("audio");
var img = document.getElementById("img");
var play = document.getElementById("play");
var artist = document.getElementById("artist");
var title = document.getElementById("title");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var songSlider = document.getElementById("songSlider");
var currentDuration = document.getElementById("currentDuration");
//let totalDuration: HTMLElement = document.getElementById("totalDuration");
var volumeSlider = document.getElementById("volumeSlider");
var songs = [
    { "id": 1, "name": "song1", "title": "LET ME LOVE YOU", "artist": " JUSTIN BIEBER" },
    { "id": 2, "name": "song2", "title": "MEMORIES ", "artist": "MAROON5" },
    { "id": 3, "name": "song3", "title": "RUNAWAY ", "artist": "AURORA" },
    { "id": 4, "name": "song4", "title": " AT MY WORST", "artist": "PINK SWEAT" },
    { "id": 5, "name": "song5", "title": "PINK ", "artist": " DAVID BOWDEN" },
];
var isPlaying = false;
//for play
var playMusic = function () {
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
};
//for pause
var pauseMusic = function () {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
};
setInterval(updateSliderOfSong, 1000);
function updateSliderOfSong() {
    var currTime = Math.round(music.currentTime);
    songSlider.value = String(currTime);
    currentDuration.textContent = convertTime(currTime);
}
// time to get above songSlider
function convertTime(secs) {
    var min = String(Math.floor(secs / 60));
    var sec = String(secs % 60);
    min = (Number(min) < 10) ? "0" + (min) : min;
    sec = (Number(sec) < 10) ? "0" + sec : sec;
    return (min + ":" + sec);
}
function searchSong() {
    music.currentTime = Number(songSlider.value);
    currentDuration.textContent = convertTime(music.currentTime);
}
play.addEventListener('click', function () {
    if (isPlaying) {
        pauseMusic();
    }
    else {
        playMusic();
    }
});
var loadSong = function (songs) {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "C:/Users/magarwal/Desktop/typescript/music/" + songs.name + ".mp3";
    img.src = "C:/Users/magarwal/Desktop/typescript/image/" + songs.name + ".jpg";
};
var songIndex = 0;
var nextSong = function () {
    songIndex = songIndex + 1 % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};
var prevSong = function () {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};
function manageVolume() {
    // song.value is by default a number hence we will have to typecase the volumeSlider.value into number 
    // since, any HTMLElement gives the value in string format.
    music.volume = Number(volumeSlider.value);
}
function muteUnmute() {
    if (volumeSlider.value != String(0)) {
        volumeSlider.value = String(0);
        music.volume = Number(volumeSlider.value);
        // play.classList.replace("fa-volumeup","fa-mute");
    }
    else {
        volumeSlider.value = String(0.5);
        music.volume = Number(volumeSlider.value);
    }
}
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
