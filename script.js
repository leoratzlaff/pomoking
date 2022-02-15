const d = new Date();
const initial_minutes = d.getMinutes();
const initial_seconds = d.getSeconds();

const config = {
  speed: 1000,
  timeWork: 25 * 60 * 1000,
  timeRest: 5 * 60 * 1000
};

let initial_timer =
  initial_minutes >= 30
    ? (55 - initial_minutes) * 60 * 1000 - initial_seconds * 1000
    : (25 - initial_minutes) * 60 * 1000 - initial_seconds * 1000;
let initial_rest = false;

function enableSound() {
  document.getElementById("soundRest").muted = false;
  document.getElementById("soundWork").muted = false;
  document.getElementById("enable-sound").classList.add("enabled");
  document.getElementById("enable-sound").innerText = "Sound effects enabled";
}

if (initial_timer < 0) {
  initial_timer += 5 * 60 * 1000;
  initial_rest = true;
}

const state = {
  timer: initial_timer,
  atRest: initial_rest
};

function updateStatus() {
  document.getElementById("status").innerHTML = state.atRest
    ? "Rest"
    : "Focus";
  document.getElementById("status2").innerHTML = state.atRest
    ? "Rest"
    : "Focus";
  if (state.atRest) {
    document.getElementById("status_message").classList.add("rest");
  } else {
    document.getElementById("status_message").classList.remove("rest");
  }
}

function updateClock() {
  state.timer -= config.speed;
  if (state.timer === 0) {
    state.atRest = !state.atRest;
    if (state.atRest == true) {
      document.getElementById("soundRest").currentTime = 0;
      document.getElementById("soundRest").play();
      console.log("teste");
      state.timer = config.timeRest;
    } else {
      document.getElementById("soundWork").currentTime = 0;
      document.getElementById("soundWork").play();
      console.log("teste");
      state.timer = config.timeWork;
    }
    updateStatus();
  }
  document.getElementById("timer-diplay").innerHTML = formatSeconds(state.timer);
  document.getElementById("timer-diplay2").innerHTML = formatSeconds(state.timer);
  document.title = "Pomo King (" + formatSeconds(state.timer) + ")";
}

document.getElementById("timer-diplay").innerHTML = formatSeconds(state.timer);
document.getElementById("timer-diplay2").innerHTML = formatSeconds(state.timer);
updateStatus();

function run() {
  setInterval(() => {
    state.timer -= config.speed;
    if (state.timer === 0) {
      state.atRest = !state.atRest;
      if (state.atRest == true) {
        document.getElementById("soundRest").currentTime = 0;
        document.getElementById("soundRest").play();
        state.timer = config.timeRest;
      } else {
        document.getElementById("soundWork").currentTime = 0;
        document.getElementById("soundWork").play();
        state.timer = config.timeWork;
      }
      updateStatus();
    }
    document.getElementById("timer-diplay").innerHTML = formatSeconds(
      state.timer
    );
    document.getElementById("timer-diplay2").innerHTML = formatSeconds(
      state.timer
    );
    document.title = "Pomo King (" + formatSeconds(state.timer) + ")";
  }, config.speed);
}

function formatSeconds(millisecondsLeft) {
  let secondsLeft = millisecondsLeft / 1000;
  let minutes = Math.floor(secondsLeft / 60);
  let seconds = Math.ceil(secondsLeft % 60);

  let maskMinutes =
    seconds === 60
      ? (minutes + 1).toString().padStart(2, "0")
      : minutes.toString().padStart(2, "0");
  let maskSeconds =
    seconds === 60 ? "00" : seconds.toString().padStart(2, "0");

  return maskMinutes + ":" + maskSeconds;
}

function setVolume(value){
  enableSound()
  let newVolume = value/100;
  document.getElementById("soundRest").volume = newVolume;
  document.getElementById("soundWork").volume = newVolume;
  document.getElementById("soundRest").currentTime = 0;
  document.getElementById("soundRest").play();
}

(function () {
  document.getElementById("soundRest").volume = 0.5;
  document.getElementById("soundWork").volume = 0.5;
  run();
  document.body.style.opacity = 1;
})();