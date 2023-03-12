function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

const colorSwitcher = {
  //   isActive: false,
  start() {
    // if (this.isActive) {
    //   return;
    // }

    // this.isActive = true;
    refs.startBtn.disabled = true;
    this.timerId = setInterval(() => {
      const currentColor = getRandomHexColor();
      document.body.style.background = currentColor;
      console.log(currentColor);
    }, 1000);
  },
  stop() {
    // this.isActive = false;
    refs.startBtn.disabled = false;
    clearInterval(this.timerId);
  },
};

refs.startBtn.addEventListener(
  'click',
  colorSwitcher.start.bind(colorSwitcher)
);
refs.stopBtn.addEventListener('click', colorSwitcher.stop.bind(colorSwitcher));
