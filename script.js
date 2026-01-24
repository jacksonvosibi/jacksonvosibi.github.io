<!style.css
<html>
<head>
<title>About Jackson Vosibi</title>
<link rel="stylesheet" href="style.css">
</head>

<body>

<header>
<h1>About Me</h1>
</header>

<nav>
<a href="index.html">Home</a>
<a href="about.html">About Me</a>
<a href="services.html">Services</a>
<a href="portfolio.html">Portfolio</a>
<a href="contact.html">Contact</a>
</nav>

<section>
<h2>Hello, I am JACKSON VOSIBI</h2>
<p>I am a professional graphic designer based in Cameroon.</p>
<p>Design is my passion and creativity is my strength.</p>
</section>

</body>
</html>
const toggle = document.getElementById("darkToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggle.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    toggle.textContent = "🌙 Dark Mode";
  }
});

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "☀️ Light Mode";
}
<script>
document.getElementById("commentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;

  const commentDiv = document.createElement("div");
  commentDiv.className = "comment";

  commentDiv.innerHTML = `
    <strong>${name}</strong>
    <p>${comment}</p>
    <button class="like-btn">👍 Like (<span>0</span>)</button>
  `;

  document.getElementById("commentsList").prepend(commentDiv);

  const likeBtn = commentDiv.querySelector(".like-btn");
  const likeCount = likeBtn.querySelector("span");

  likeBtn.addEventListener("click", () => {
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
  });

  document.getElementById("commentForm").reset();
});
</script>
