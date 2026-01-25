
const ADMIN_PASSWORD = "admin123"; // change this!

function login() {
  const pass = document.getElementById("adminPass").value;

  if (pass === ADMIN_PASSWORD) {
    document.getElementById("adminPanel").style.display = "block";
    loadAdminComments();
  } else {
    alert("Wrong password");
  }
}

function loadAdminComments() {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  const container = document.getElementById("adminComments");

  container.innerHTML = "";

  comments.forEach((c, index) => {
    const div = document.createElement("div");
    div.className = "comment-box";
    div.innerHTML = `
      <strong>${c.name}</strong>
      <p>${c.comment}</p>
      <button onclick="deleteComment(${index})">Delete</button>
    `;
    container.appendChild(div);
  });
}

function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.splice(index, 1);
  localStorage.setItem("comments", JSON.stringify(comments));
  loadAdminComments();
}
