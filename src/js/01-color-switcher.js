const refs = {
  btnPl: document.querySelector('[data-start]'),
  btnMin: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let interval = null;

refs.btnMin.disabled = true;
refs.btnPl.addEventListener('click', onBackraundColor);
refs.btnMin.addEventListener('click', offBackraundColor);

function onBackraundColor() {
  bodyColor()
  interval = setInterval(bodyColor, 1000)
  refs.btnPl.disabled = true;
  refs.btnMin.disabled = false;
}

function offBackraundColor() {
  clearInterval(interval);
  refs.btnPl.disabled = false;
  refs.btnMin.disabled = true;
}

function bodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
