// DOM Elements
const time = document.querySelector('.time'),
  day = document.querySelector('.day'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

// Constants
const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const month = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December',
];

// Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date();
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  setTimeout(showTime, 1000);
}

// Show Day
function showDay() {
  let today = new Date();
    dayId = today.getDay(),
    date = today.getDate(),
    monthId = today.getMonth();
  day.innerHTML = `${days[dayId]}, ${date} ${month[monthId]}`;
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date();
    hour = today.getHours();
  const bgItem = '05';
  if (hour < 6) {
    document.body.style.backgroundImage = `url('./assets/images/night/${bgItem}.jpg')`;
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  } else if (hour < 12) {
    document.body.style.backgroundImage = `url('./assets/images/morning/${bgItem}.jpg')`;
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    document.body.style.backgroundImage = `url('./assets/images/day/${bgItem}.jpg')`;
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour < 24) {
    document.body.style.backgroundImage = `url('./assets/images/evening/${bgItem}.jpg')`;
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
showDay();
setBgGreet();
getName();
getFocus();