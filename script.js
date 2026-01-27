document.getElementById("enter-site").addEventListener("click", () => {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("main-content").style.display = "block";
});
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
function speakWelcome() {
  if(!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const userLang = navigator.language || navigator.userLanguage;
  let message;
  if(userLang.startsWith('fr')){
    message = new SpeechSynthesisUtterance("Bienvenue chez AJASCO Design Services. Nous aidons les entreprises et les écoles à se développer en ligne.");
    message.lang = "fr-FR";
  } else {
    message = new SpeechSynthesisUtterance("Welcome to AJASCO Design Services. We help businesses and schools grow online.");
    message.lang = "en-US";
  }
  message.rate=1; message.pitch=1; message.volume=1;
  speechSynthesis.speak(message);
}
window.addEventListener("load", () => setTimeout(speakWelcome, 1000));
const voiceBtn = document.getElementById("welcomeVoice");
if(voiceBtn) voiceBtn.addEventListener("click", speakWelcome);
