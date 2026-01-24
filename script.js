document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("commentForm");
  const commentsList = document.getElementById("commentsList");

  if (!form) {
    console.error("Comment form not found");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const comment = document.getElementById("comment").value.trim();

    if (name === "" || comment === "") return;

    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";

    commentDiv.innerHTML = `
      <strong>${name}</strong>
      <p>${comment}</p>
      <button class="like-btn">👍 Like (<span>0</span>)</button>
    `;

    commentsList.prepend(commentDiv);

    const likeBtn = commentDiv.querySelector(".like-btn");
    const count = likeBtn.querySelector("span");

    likeBtn.addEventListener("click", function () {
      count.textContent = parseInt(count.textContent) + 1;
    });

    form.reset();
  });

});
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const msg = document.getElementById("loginMsg");

  // Demo credentials (you can change them)
  if (user === "client" && pass === "1234") {
    window.location.href = "dashboard.html";
  } else {
    msg.textContent = "Invalid login details";
    msg.style.color = "red";
  }
}
