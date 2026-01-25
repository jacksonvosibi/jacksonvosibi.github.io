const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
  window.location.href = "login.html";
} else {
  document.getElementById("clientName").innerText = user.name;

  // Payment info (default)
  document.getElementById("payStatus").innerText = user.paymentStatus || "Pending";
  document.getElementById("service").innerText = user.service || "Not Assigned";
  document.getElementById("amount").innerText = user.amount || "₦0 / 0 FCFA";
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
