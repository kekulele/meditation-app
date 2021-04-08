const app = () => {
  const song = document.querySelector('.song');
  const video = document.querySelector('.vid-container video');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const outlineLength = outline.getTotalLength();

  const timeSelect = document.querySelectorAll('.time-select button');
  const timeContainer = document.querySelector('.time-display');
  const soundPicker = document.querySelectorAll('.sound-picker button');

  var fakeDuration = 120;

  outline.style.strokeDashoffset = outlineLength;
  outline.style.strokeDasharray = outlineLength;

  play.addEventListener('click', () => {
    checkPlaying();
  });

  function checkPlaying() {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  }

  timeSelect.forEach(option => {
    option.addEventListener('click', function() {
      fakeDuration = this.dataset.time;
      timeContainer.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
    });
  });

  soundPicker.forEach(option => {
    option.addEventListener('click', function() {
      song.src = this.dataset.sound;
      video.src = this.dataset.video;
      checkPlaying();
    });
  });

  song.ontimeupdate = () => {
    var currentTime = song.currentTime;
    var elapsed = fakeDuration - currentTime;
    timeContainer.textContent = `${Math.floor(elapsed / 60)}:${Math.floor(elapsed % 60)}`;

    var progress = outlineLength - (outlineLength / fakeDuration) * currentTime;
    outline.style.strokeDashoffset = progress;

    if (currentTime >= fakeDuration) {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
      song.currentTime = 0;
    }
  };
};

app ();