// DOM Elements
const time = document.querySelector('.time'),
  day = document.querySelector('.day'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');
  list = document.querySelector('#list');
  cls = document.querySelector('#close');
  next = document.querySelector('#next');
  quote = document.querySelector('#quote');
  weath = document.querySelector('#closeW');
  weather = document.querySelector('#weath');
  city = document.querySelector('input');

// Constants
const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const month = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December',
];
const timesOfDay = ['night', 'morning', 'day', 'evening'];

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
  const bgItem = getBgGreet(hour);
  if (hour < 6) {
    if (hour === 0) {
      historyBgGreet = initArrayBgGreet();
      localStorage.setItem('histBg', JSON.stringify(historyBgGreet));
    }
    document.body.style.backgroundImage = `url('./assets/images/${bgItem}.jpg')`;
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  } else if (hour < 12) {
    document.body.style.backgroundImage = `url('./assets/images/${bgItem}.jpg')`;
    greeting.textContent = 'Good Morning, ';
    document.body.style.color = 'white';
  } else if (hour < 18) {
    document.body.style.backgroundImage = `url('./assets/images/${bgItem}.jpg')`;
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'white';
  } else if (hour < 24) {
    document.body.style.backgroundImage = `url('./assets/images/${bgItem}.jpg')`;
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// List Bacground
function listBgGreet() {
  const  allBgGreet = JSON.parse(localStorage.getItem('histBg'));
  if (count + hour < 23) {
    count++;
  } else { 
    count = -1 * hour;
  }
  const bgItem = allBgGreet[count + hour];
  document.body.style.backgroundImage = `url('./assets/images/${bgItem}.jpg')`;
  
}

// Choose Bacground
function getBgGreet(item) {
  let historyBgGreet;
  if (localStorage.getItem('histBg') !== null) {
    historyBgGreet = JSON.parse(localStorage.getItem('histBg'));
  } else {
    historyBgGreet = initArrayBgGreet();
  }
  return historyBgGreet[item];
}

// Init array Bacground
function initArrayBgGreet() {
  let historyBgGreet = [];
  const maxOneTimes = 6
  const countImg = 20;
  for (let i = 0; i < 4; i++) {
    countBgGreet = 0;
    for (let j = 0; j < maxOneTimes; j++) {
      while (countBgGreet < maxOneTimes) {
        nextBgGeet = (!Math.floor(Math.random() * countImg) === 1) ? Math.floor(Math.random() * countImg) + 1 : Math.floor(Math.random() * countImg); 
        if (historyBgGreet.indexOf(nextBgGeet) == -1) { 
          const bgGreet = `${timesOfDay[i]}/${nextBgGeet < 10 ? '0'+ nextBgGeet : nextBgGeet}`
          historyBgGreet.push(`${bgGreet}`);
          countBgGreet++; 
        }
      }
    }
  }
  localStorage.setItem('histBg', JSON.stringify(historyBgGreet));
  console.log(historyBgGreet);
  return historyBgGreet;
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
function setFocus(event) {
  if (eevent.type === 'keypress') {
    if (event.which == 13 || event.keyCode == 13) {
      localStorage.setItem('focus', event.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', event.target.innerText);
  }
}

function closeWeather() {  
  document.querySelector('.iconW').setAttribute('src', "");
  const weather = document.querySelector('.weather');
  weather.classList.toggle('none');
  document.querySelector('focus').classList.toggle('none');
    const userCity = localStorage.getItem('city');
    getWeather(userCity);
}

async function getWeather(userCity) {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&lang=en&appid=2f830623220fb1e25841be257b946102&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod !== 200 ){
    document.querySelector('.error').classList.remove('none');
    document.querySelector('.error').textContent = data.message;
  } else {
  document.querySelector('.error').classList.add('none');
   const { temp, humidity } = data.main;
   const { speed } = data.wind;
   const { icon } = data.weather[0];
   console.log(data);
   document.querySelector('.temp').textContent = `Feel like: ${temp}°`;
  document.querySelector('.humidity').textContent = `Wind: ${humidity}m/s`;
  document.querySelector('.wind').textContent = `Humidity: ${speed}%`;
  document.querySelector('.iconW').setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
  }
}

function setCity(value) {
  if (String(value).trim().length !== 0) {
    localStorage.setItem('city', JSON.stringify(value));
  }
  getWeather(value);
}

function closeQuote() {  
  document.querySelector('.quote').classList.toggle('none');
  document.querySelector('focus').classList.toggle('none');
}

async function getQuote() {  
  // const url = `https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  // const url =`https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1`;
  const res = await fetch(url);
  const data = await res.json(); 
  console.log(data );
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
  document.body.style.color = 'black';
}
document.addEventListener('DOMContentLoaded', getQuote);
next.addEventListener('click', getQuote);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
city.addEventListener('blur', setCity);
let count = 0;
list.addEventListener('click', listBgGreet);
cls.addEventListener('click', closeQuote);
quote.addEventListener('click', closeQuote);
weath.addEventListener('click', closeWeather);
weather.addEventListener('click', closeWeather);

// Run
showTime();
showDay();
setBgGreet();
getName();
getFocus();