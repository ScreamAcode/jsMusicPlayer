const fillbar = document.querySelector(".fill");
const audios = ["audio1.mp3", "audio2.mp3", "audio3.mp3"];
const covers = ["img1.jpg", "img2.jpg", "img3.jpg"];
const currentTime = document.querySelector(".time");
const playBtn = document.querySelector(".playPause");
const decreaseSound = document.querySelector(".decrease").addEventListener('click',decreaseVolume);
const increaseSound = document.querySelector(".increase").addEventListener('click',increaseVolume);
const volumeUp = document.querySelector(".volumeUp");

let audio = new Audio();
let currentSong = 0;

window.onload = playSong;

function playSong() {
  audio.src = audios[currentSong];
  audio.play();
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="far fa-pause-circle"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="far fa-play-circle "></i>';
  }
}


audio.addEventListener("timeupdate", function() {
  let position = audio.currentTime / audio.duration;
  fillbar.style.width = position * 100 + "%";
  convertTime(Math.round(audio.currentTime));

  if (audio.ended) {
    nextAudio();
  }
});

function convertTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.textContent = min + ":" + sec;
  totalTime(Math.round(audio.duration));
}

function totalTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.textContent += " & " + min + ":" + sec;
}

function nextAudio() {
  currentSong++;
  if (currentSong > 2) {
    currentSong = 0;
  }
  playSong();
  playBtn.innerHTML = '<i class="far fa-pause-circle">';
  $(".coverImg img").attr("src", covers[currentSong]);
}

function prevAudio() {
  currentSong--;
  if (currentSong < 0) {
    currentSong = 2;
  }
  playSong();
  playBtn.innerHTML = '<i class="far fa-pause-circle">';
  $(".coverImg img").attr("src", covers[currentSong]);
}

function decreaseVolume() {
  audio.volume -= 0.25;
}

function increaseVolume() {
  audio.volume += 0.25;
}
volumeUp.addEventListener("click", function() {
  if (audio.volume === 1) {
    audio.volume = 0;
    document.querySelector(".volumeUp").innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    audio.volume = 1;
    document.querySelector(".volumeUp").innerHTML = '<i class="fas fa-volume-up"></i>';
  }
});

