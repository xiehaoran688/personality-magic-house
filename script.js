function startQuiz() {
  document.getElementById("welcome").style.display = "none";
  document.querySelector(".intro-section").style.display = "none";
  document.getElementById("quiz").style.display = "block";
}

function showResult() {
  const form = document.getElementById("quizForm");
  const formData = new FormData(form);
  const score = { fire: 0, ice: 0, wind: 0, earth: 0 };

  for (const [name, value] of formData.entries()) {
    if (score.hasOwnProperty(value)) {
      score[value]++;
    }
  }

  const result = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
  document.getElementById("quiz").style.display = "none";
  document.getElementById("loadingScreen").style.display = "block";

  setTimeout(() => {
    window.location.href = `${result}.html`;
  }, 3000);
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const banner = document.createElement('div');
  banner.className = 'install-banner';
  banner.innerHTML = `
    <p>✨ Add Personality Magic House to your home screen?</p>
    <button id="installBtn">Install</button>
  `;
  document.body.appendChild(banner);

  document.getElementById('installBtn').addEventListener('click', () => {
    banner.remove();
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      console.log('User choice:', choiceResult.outcome);
      deferredPrompt = null;
    });
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('✅ Service Worker registered'))
      .catch(err => console.error('❌ SW registration failed:', err));
  });
}