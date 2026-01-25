const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
  window.location.href = "login.html";
} else {
  document.getElementById("clientName").innerText = user.name;
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
