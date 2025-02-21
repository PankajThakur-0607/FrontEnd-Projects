console.log("Welcome To Spotify");

let songIdx = 0;
let audioElm = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = document.querySelectorAll('.songItem');

// Songs array with song details
let songs = [
    { songName: 'Apna Bana Le ', filePath: './songs/1.mp3', coverPath: './covers/1.jpg' },
    { songName: 'Dil Jhoom  Gadar 2  Arijit Singh ', filePath: './songs/2.mp3', coverPath: './covers/2.jpg' },
    { songName: 'Kesariya - Film Version  Brahmāstra', filePath: './songs/3.mp3', coverPath: './covers/3.jpg' },
    { songName: 'Tera Hone Laga Hoon  Atif Aslam', filePath: './songs/4.mp3', coverPath: './covers/4.jpg' },
    { songName: 'Tere Sang Yaara - Rustom', filePath: './songs/5.mp3', coverPath: './covers/5.jpg' },
    { songName: 'Tere Vaaste  Zara Hatke Zara Bachke', filePath: './songs/6.mp3', coverPath: './covers/6.jpg' },
    { songName: 'Thoda Thoda Pyaar', filePath: './songs/7.mp3', coverPath: './covers/7.jpg' },
    { songName: 'Tum Se Hi Lyrcial  Jab We Met', filePath: './songs/8.mp3', coverPath: './covers/8.jpg' },
    { songName: 'Vaaste Song Dhvani Bhanushali', filePath: './songs/9.mp3', coverPath: './covers/9.jpg' },
    { songName: 'Zaalima  Raees', filePath: './songs/10.mp3', coverPath: './covers/10.jpg' },
];

// Initialize the song list
songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// Handle master play/pause button click
masterPlay.addEventListener('click', () => {
    if (audioElm.paused || audioElm.currentTime <= 0) {
        audioElm.play();
        updatePlayButton(masterPlay, true);
        gif.style.opacity = 1;
    } else {
        audioElm.pause();
        updatePlayButton(masterPlay, false);
        gif.style.opacity = 0;
    }
});

// Update progress bar as song plays
audioElm.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElm.currentTime / audioElm.duration) * 100);
    myProgressBar.value = progress;
});

// Seek song position
myProgressBar.addEventListener('change', () => {
    audioElm.currentTime = ((myProgressBar.value * audioElm.duration) / 100);
});

// Play or pause song when clicking on a song item
document.querySelectorAll('.songItemPlay').forEach((element, i) => {
    element.addEventListener('click', (e) => {
        if (songIdx === i && !audioElm.paused) {
            audioElm.pause();
            updatePlayButton(element, false);
            updatePlayButton(masterPlay, false);
            gif.style.opacity = 0;
        } else {
            songIdx = i;
            audioElm.src = songs[songIdx].filePath;
            masterSongName.innerText = songs[songIdx].songName;
            audioElm.currentTime = 0;
            audioElm.play();
            updatePlayButton(masterPlay, true);
            makeAllPlays(element.id);
            updatePlayButton(element, true);
            gif.style.opacity = 1;
        }
    });
});

// Function to update play/pause button icon
function updatePlayButton(element, isPlaying) {
    if (isPlaying) {
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
    } else {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    }
}

// Set all play buttons to play state except the currently playing one
function makeAllPlays(exceptionId) {
    document.querySelectorAll('.songItemPlay').forEach((element) => {
        if (element.id !== exceptionId) {
            updatePlayButton(element, false);
        }
    });
}

// Next song functionality
document.getElementById('next').addEventListener('click', () => {
    if (songIdx >= songs.length - 1) {
        songIdx = 0;
    } else {
        songIdx += 1;
    }
    playSong();
});

// Automatically play next Song after finsihed 
audioElm.addEventListener('ended' , () => {
    playNextSong();
})


function playNextSong(){
    if (songIdx >= songs.length - 1) {
        songIdx = 0; // Wrap around to the first song
    } else {
        songIdx += 1;
    }
    playSong();  // Play The Next Song
}
// Previous song functionality
document.getElementById('previous').addEventListener('click', () => {
    if (songIdx <= 0) {
        songIdx = songs.length - 1;
    } else {
        songIdx -= 1;
    }
    playSong();
});

// Play song based on current song index
function playSong() {
    audioElm.src = songs[songIdx].filePath;
    masterSongName.innerText = songs[songIdx].songName;
    audioElm.currentTime = 0;
    audioElm.play();
    updatePlayButton(masterPlay, true);
    gif.style.opacity = 1;
    makeAllPlays();
    updatePlayButton(document.querySelectorAll('.songItemPlay')[songIdx], true); // Ensure the correct song item gets the play button updated
}





