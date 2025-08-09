const timer = document.getElementById('time');
const bar = document.getElementById('progress');
const quote = document.getElementById('quote');
const streakText = document.getElementById('streak-count');

// Retrieve session data (set this in page1.html and save to localStorage)
let session = JSON.parse(localStorage.getItem('currentSession')) || {
  topic: "Focus Session",
  duration: "25", // default to 25 minutes
  notes: "",
  date: new Date().toLocaleDateString()
};

let seconds = parseInt(session.duration) * 60;
let streak = parseInt(localStorage.getItem('dailyStreak')) || 0;
let interval;

function startTimer() {
  if (interval) clearInterval(interval); // prevent multiple intervals

  interval = setInterval(() => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timer.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

    bar.style.width = `${100 - (seconds / (parseInt(session.duration) * 60)) * 100}%`;

    if (seconds === 0) {
      clearInterval(interval);
      quote.innerText = 'Well done! Keep it up!';
      streak++;
      localStorage.setItem('dailyStreak', streak);
      streakText.innerText = `${streak} ✨`;

      const history = JSON.parse(localStorage.getItem('focusHistory')) || [];
      history.push(session);
      localStorage.setItem('focusHistory', JSON.stringify(history));
    }

    seconds--;
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  seconds = parseInt(session.duration) * 60;
  timer.innerText = '00:00';
  bar.style.width = '0%';
  quote.innerText = '"Your focus determines your reality."';
}
