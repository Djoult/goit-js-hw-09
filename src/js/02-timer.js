// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

require('flatpickr/dist/themes/confetti.css');

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('.value[data-days]'),
  hoursValue: document.querySelector('.value[data-hours]'),
  minutesValue: document.querySelector('.value[data-minutes]'),
  secondsValue: document.querySelector('.value[data-seconds]'),
};

refs.startBtn.disabled = true;

let selectedData = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedData = selectedDates[0];
    if (selectedData < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

function handleStartTimer() {
  timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedData - currentTime;
    // const { days, hours, minutes, seconds } = convertMs(deltaTime);
    const time = convertMs(deltaTime);
    refs.startBtn.disabled = true;
    if (selectedData <= Date.now()) {
      handleFinishTimer();
      return;
    }
    updateClockface(time);
  }, 1000);
}
function handleFinishTimer() {
  Notiflix.Loading.custom('Time to up. Click to continue', {
    clickToClose: true,
    customSvgUrl:
      'https://notiflix.github.io/content/media/loading/notiflix-loading-nx-light.svg',
  });
  clearInterval(timerId);
}

refs.startBtn.addEventListener('click', handleStartTimer);
const currentDate = flatpickr('input#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysValue.textContent = `${days}`;
  refs.hoursValue.textContent = `${hours}`;
  refs.minutesValue.textContent = `${minutes}`;
  refs.secondsValue.textContent = `${seconds}`;
  console.log(days, hours, minutes, seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
