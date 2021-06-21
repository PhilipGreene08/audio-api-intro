

const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['hey', 'summer', 'ukulele']

//track songs

let songIndex = 0

//load song details into DOM

loadSong(songs[songIndex])

//update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add(`play`)
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
}

function pauseSong() {
  musicContainer.classList.remove(`play`)
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}

function prevSong() {
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length + 1
  }

  loadSong(songs[songIndex])

  playSong()
}

function nextSong() {
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }

  loadSong(songs[songIndex])
  playSong()

}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  //console.log(progressPercent);
  progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
  console.log(this);
  const width = this.clientWidth
  console.log(e);
  const clickX = e.offsetX
console.log(audio.duration);
  const duration = audio.duration
  audio.currentTime = (clickX/width) * duration


}

//event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains(`play`);

  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

//change song
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)


//time song update 
audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)

