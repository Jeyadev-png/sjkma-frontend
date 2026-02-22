const form = document.getElementById("adminLoginForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://sjkma-backend.onrender.com/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      statusText.textContent = data.message || "Login failed";
      return;
    }

    localStorage.setItem("adminToken", data.token);

    statusText.textContent = "Login successful. Redirecting...";

    setTimeout(() => {
      window.location.href = "admin-dashboard.html";
    }, 800);

  } catch (error) {
    statusText.textContent = "Server error";
  }
});
