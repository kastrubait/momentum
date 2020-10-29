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
const QUOTE = [
  { mess: 'Formal education will make you a living. Self-education will make you a fortune'},
  { mess: 'Never mind your happiness; do your duty'},
  { mess: 'Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe'},
  { mess: 'Being entirely honest with oneself is a good exercise'},
  { mess: 'England and America are two countries separated by the same language'},
  { mess: 'Failure does not mean I\'m a failure; It does mean I have not yet succeeded'},
  { mess: 'This happens to be that the power of laughter and love would beat out the power of fear every time'},
  { mess: 'To be, or not to be: that is the question'},
  { mess: 'Never leave that till tomorrow which you can do today'},
  { mess: 'The more you say, the less people remember'},
  { mess: 'Love as expensive crystal, you with it be cautious'},
  { mess: 'When you gaze long into an abyss the abyss also gazes into you'},
  { mess: 'Loneliness is when you hear as the clock ticks'},
  { mess: 'Being entirely honest with oneself is a good exercise'},
  { mess: 'Love is an irresistible desire to be irresistibly desired'},
  { mess: 'Lost time is never found again'},
  { mess: 'Loneliness is when you hear as the clock ticks'},
  { mess: 'The time for action is now. It’s never too late to do something'}
];
const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const month = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December',
];
const timesOfDay = ['night', 'morning', 'day', 'evening'];

//Options
let isQuote = false;
let isWeather = false;

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
  setTimeout(setBgGreet, 2000);
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
  const nameLS = localStorage.getItem('name');
  if ( nameLS === null ||  nameLS.trim().length === 0) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(event) {
  if (event.type === 'keypress') {
    if (event.which == 13 || event.keyCode == 13) {
      localStorage.setItem('name', event.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', event.target.innerText);
  }
}

// Get Focus
function getFocus() {
  const focusLS = localStorage.getItem('focus');
  if ( focusLS === null || focusLS.trim().length === 0) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(event) {
  if (event.type === 'keypress') {
    if (event.which == 13 || event.keyCode == 13) {
      localStorage.setItem('focus', event.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', event.target.innerText);
  }
}

function closeWeather() {
  if (isQuote) closeQuote();  
  isWeather = !isWeather;
  document.querySelector('.iconW').setAttribute('src', "");
  const weather = document.querySelector('.weather');
  weather.classList.toggle('none');
  document.querySelector('focus').classList.toggle('none');
  const userCity = localStorage.getItem('city');
  city.value = userCity.slice(1,  userCity.length-1);
  getWeather(city.value);
}

async function getWeather(userCity) {  
  isWeaher = true;
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
    document.querySelector('.temp').textContent = `Feel like: ${temp}°`;
    document.querySelector('.humidity').textContent = `Wind: ${speed }m/s`;
    document.querySelector('.wind').textContent = `Humidity: ${humidity}%`;
    document.querySelector('.iconW').setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
  }
}

function setCity(value) {
  if (String(value).trim().length !== 0) {
    localStorage.setItem('city', JSON.stringify(value));
  }
  getWeather(value);
}

// Get City
function getCity() {
  const city = localStorage.getItem('city');
  if ( city === null || city.trim().length === 0) {
    city.value = 'Enter City';
  } else {
    city.value = localStorage.getItem('city');
  }
}

function closeQuote() { 
  if (isWeather) closeWeather();  
  isQuote = !isQuote;
  document.querySelector('.quote').classList.toggle('none');
  document.querySelector('focus').classList.toggle('none');
}

async function getQuote() {  
  isQuote = true;
  //const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  // const res = await fetch(url);
  // const data = await res.json(); 
  const data = QUOTE;
  const numQuote = Math.floor(Math.random() * 18);
  const { mess } = data[numQuote];
  document.querySelector('blockquote').textContent = mess;
  document.querySelector('figcaption').textContent = `ouenglish.ru`;
}

function clearName() {
  name.textContent = "";
};

function clearFocus() {
  focus.textContent = "";
}

document.addEventListener('DOMContentLoaded', getQuote);
next.addEventListener('click', getQuote);
name.addEventListener('keypress', setName);
name.addEventListener('blur', getName);
name.addEventListener('focus', clearName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', getFocus);
focus.addEventListener('focus', clearFocus);
city.addEventListener('blur', getCity);
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
