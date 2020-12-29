function showTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59

  if (h == 0) {
    h = 12;
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  var time = h + ":" + m + ":" + s;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;
}

function showDate() {
  const weekdays = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"
  ]
  var date = new Date();

  var year = date.getFullYear(); // 0 - 59
  var month = date.getMonth(); // 0 - 11
  var day = date.getDate(); // 0 - 59
  var weekday = date.getDay(); // 0 - 59

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  var time = weekdays[weekday] + ", " + day + "." + month + "." + year;
  document.getElementById("MyDateDisplay").innerText = time;
  document.getElementById("MyDateDisplay").textContent = time;
}

function showGreeting() {
  var date = new Date();

  var h = date.getHours(); // 0 - 23

  let greeting = 'Guten Morgen'
  if (h >= 11) {
    greeting = 'Guten Mittag'
  }
  if (h >= 17) {
    greeting = 'Guten Abend'
  }

  document.getElementById("MyGreetingDisplay").innerText = greeting;
  document.getElementById("MyGreetingDisplay").textContent = greeting;
}


function render() {
  showTime();
  showDate();
  showGreeting();
}


document.addEventListener("DOMContentLoaded", function (event) {
  setInterval(render, 1000)
});
