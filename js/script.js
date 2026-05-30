const invitation = {
  age: 2,
  eventDate: '2026-06-28T09:00:00',
  dateText: 'Minggu, 28 Juni 2026',
  timeText: '09.00 WIB sampai selesai',
  placeText: 'Rumah Kami',
};

document.getElementById('ageText').innerText = 'Hafsha Prajalita Sutiawan';
document.getElementById('dateText').innerText = invitation.dateText;
document.getElementById('timeText').innerText = invitation.timeText;
document.getElementById('placeText').innerText = invitation.placeText;

const cover = document.getElementById('cover');
const music = document.getElementById('birthdayMusic');
const musicBtn = document.getElementById('musicBtn');

let isPlaying = false;

function openInvitation(){
  cover.classList.add('hide');

  music.play().then(() => {
    isPlaying = true;
    musicBtn.innerText = '❚❚';
  }).catch(() => {
    isPlaying = false;
    musicBtn.innerText = '♫';
  });
}

function toggleMusic(){
  if(isPlaying){
    music.pause();
    musicBtn.innerText = '♫';
  }else{
    music.play();
    musicBtn.innerText = '❚❚';
  }

  isPlaying = !isPlaying;
}

const targetDate = new Date(invitation.eventDate).getTime();

function updateCountdown(){
  const now = new Date().getTime();
  const distance = targetDate - now;

  if(distance <= 0){
    document.getElementById('days').innerText = '00';
    document.getElementById('hours').innerText = '00';
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').innerText = String(days).padStart(2,'0');
  document.getElementById('hours').innerText = String(hours).padStart(2,'0');
  document.getElementById('minutes').innerText = String(minutes).padStart(2,'0');
  document.getElementById('seconds').innerText = String(seconds).padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown,1000);