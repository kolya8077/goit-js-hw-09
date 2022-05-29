// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btn.disabled = true;

let timerId = null;
let selectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0].getTime();
    validDate(selectedDate);
    getTimer();
  },
};

flatpickr(refs.input, options);

function validDate(date) {
  if (date < options.defaultDate) {
    Notify.failure('Please choose a date in the future', {
      timeout: 1300,
      clickToClose: true,
    });
    refs.btn.disabled = true;
    return;
  }
  refs.btn.disabled = false;
}

function getTimer() {
  const startTime = Date.now();
  const resultTime = selectedDate - startTime;
  const time = convertMs(resultTime);
  console.log('time', time);
  if (resultTime > 0) {
    newClock(time);
  }
  
  if (resultTime < 1000) {
    clearInterval(timerId);
    refs.btn.disabled = false;
  }
}

function newClock({ days, hours, minutes, seconds }) {
  refs.days.innerHTML = days;
  refs.hours.innerHTML = hours;
  refs.minutes.innerHTML = minutes;
  refs.seconds.innerHTML = seconds;
}

refs.btn.addEventListener('click', btnClick);

function btnClick() {
  if (timerId) {
    return;
  }
  timerId = setInterval(getTimer, 1000);
  refs.btn.disabled = true;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
