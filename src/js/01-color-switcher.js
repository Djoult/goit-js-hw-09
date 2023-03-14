function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.stopBtn.disabled = true;

const colorSwitcher = {
  start() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    this.timerId = setInterval(() => {
      const currentColor = getRandomHexColor();
      document.body.style.background = currentColor;
      console.log(currentColor);
    }, 1000);
  },
  stop() {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    clearInterval(this.timerId);
  },
};

refs.startBtn.addEventListener(
  'click',
  colorSwitcher.start.bind(colorSwitcher)
);
refs.stopBtn.addEventListener('click', colorSwitcher.stop.bind(colorSwitcher));
