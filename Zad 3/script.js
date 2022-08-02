const getEl = (el) =>{
    return document.querySelector(el);
}
const dispNon = (el) =>{
    el.style.display = 'none';
}
const dispBlock = (el) =>{
    el.style.display = "block"
}
const elDays = getEl(".elDays");
const elHours = getEl(".elHours");
const elMinutes = getEl(".elMinutes");
const elSeconds = getEl(".elSeconds");
const countDownDate = new Date("Aug 09, 2022 23:50:00").getTime();

setInterval(function () {
  let now = new Date().getTime();

  let distance = countDownDate - now;
  if (distance > 0) {
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (days < 10) {
      days = `0${days}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }

    if (days < 1) {
        dispNon(elDays)
      }else{
        dispBlock(elDays)
      }
      if (hours < 1) {
        dispNon(elHours)
      }else{
        dispBlock(elHours)
      }
      if (minutes < 1) {
        dispNon(elMinutes)
      }else{
        dispBlock(elMinutes)
      }
      if (seconds < 1) {
        dispNon(elSeconds)
      }else{
        dispBlock(elSeconds)
      }

    elDays.innerHTML = `${days} dni`;
    elHours.innerHTML = `${hours} godzin`;
    elMinutes.innerHTML = `${minutes} minut`;
    elSeconds.innerHTML = `${seconds} sekund`;
  } else {
    elDays.innerHTML = "00";
    elHours.innerHTML = "00";
    elMinutes.innerHTML = "00";
    elSeconds.innerHTML = "00";
  }
}, 1000);