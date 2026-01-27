// Welcome screen
document.getElementById("enter-site").addEventListener("click", () => {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("main-content").style.display = "block";
});

// Hamburger toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));

// Voice welcome
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
  speechSynthesis.speak(message);
}
window.addEventListener("load", () => setTimeout(speakWelcome, 1000));
const voiceBtn = document.getElementById("welcomeVoice");
if(voiceBtn) voiceBtn.addEventListener("click", speakWelcome);

// Animate services
const serviceItems = document.querySelectorAll("#services li");
window.addEventListener("scroll", () => {
  serviceItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if(rect.top < window.innerHeight - 50) item.classList.add("show");
  });
});

// Persistent comments
const form = document.getElementById("comment-form");
const commentsList = document.getElementById("comments-list");
const savedComments = JSON.parse(localStorage.getItem("serviceComments")) || [];
savedComments.forEach(c => {
  const div = document.createElement("div");
  div.classList.add("comment");
  div.innerHTML = `<strong>${c.name}</strong><p>${c.comment}</p>`;
  commentsList.appendChild(div);
});
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;
  savedComments.push({name, comment});
  localStorage.setItem("serviceComments", JSON.stringify(savedComments));
  const div = document.createElement("div");
  div.classList.add("comment");
  div.innerHTML = `<strong>${name}</strong><p>${comment}</p>`;
  commentsList.appendChild(div);
  form.reset();
});

// WhatsApp button
document.getElementById("whatsapp-btn").addEventListener("click", () => {
  const phone = "2376XXXXXXX"; // your number
  const message = encodeURIComponent("Hello! I want to inquire about AJASCO Design Services.");
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
});

// Paystack payment (static download, no backend)
const payButtons = document.querySelectorAll(".pay-btn");
payButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const file = btn.dataset.file;
    const price = btn.dataset.price;

    let handler = PaystackPop.setup({
      key: 'YOUR_PUBLIC_PAYSTACK_KEY', // replace with your Paystack public key
      email: prompt("Enter your email for receipt"),
      amount: price*100,
      currency: "XAF",
      callback: function(response){
        alert('Payment successful! Download will start.');
        window.location.href = file;
      },
      onClose: function(){
        alert('Payment cancelled.');
      }
    });
    handler.openIframe();
  });
});
