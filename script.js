// Welcome screen
document.getElementById("enter-site").addEventListener("click", () => {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("main-content").style.display = "block";
});

// Voice Welcome EN/FR
function speakWelcome() {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const userLang = navigator.language || navigator.userLanguage;
  let message;
  if (userLang.startsWith('fr')) {
    message = new SpeechSynthesisUtterance(
      "Bienvenue chez AJASCO Design Services. Nous aidons les entreprises et les écoles à se développer en ligne."
    );
    message.lang = "fr-FR";
  } else {
    message = new SpeechSynthesisUtterance(
      "Welcome to AJASCO Design Services. We help businesses and schools grow online."
    );
    message.lang = "en-US";
  }
  message.rate=1; message.pitch=1; message.volume=1;
  speechSynthesis.speak(message);
}
window.addEventListener("load", () => setTimeout(speakWelcome, 1000));
const voiceBtn = document.getElementById("welcomeVoice");
if (voiceBtn) voiceBtn.addEventListener("click", speakWelcome);

// Persistent comments
const form = document.getElementById("comment-form");
const commentsList = document.getElementById("comments-list");
const savedComments = JSON.parse(localStorage.getItem("serviceComments")) || [];
savedComments.forEach(c => {
  const div = document.createElement("div"); div.classList.add("comment");
  div.innerHTML = `<strong>${c.name}</strong><p>${c.comment}</p>`;
  commentsList.appendChild(div);
});
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;
  const commentData = {name, comment};
  savedComments.push(commentData);
  localStorage.setItem("serviceComments", JSON.stringify(savedComments));
  const div = document.createElement("div"); div.classList.add("comment");
  div.innerHTML = `<strong>${name}</strong><p>${comment}</p>`;
  commentsList.appendChild(div);
  form.reset();
});
