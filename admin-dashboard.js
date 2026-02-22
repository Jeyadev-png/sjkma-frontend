const token = localStorage.getItem("adminToken");

if (!token) {
  window.location.href = "admin-login.html";
}

const tableBody = document.getElementById("paymentsBody");
const logoutBtn = document.getElementById("logoutBtn");
const emptyState = document.getElementById("emptyState");
const filterButtons = document.querySelectorAll(".filter-btn");

let allPayments = [];
let currentFilter = "All";

/* AUTO LOGOUT ON REFRESH */
// window.addEventListener("load", () => {
//   localStorage.removeItem("adminToken");
// });

/* LOGOUT BUTTON */
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("adminToken");
  window.location.href = "admin-login.html";
});

/* ===============================
   FETCH PAYMENTS
================================ */

async function loadPayments() {
  try {
    const res = await fetch("https://sjkma-backend.onrender.com/api/payments", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "admin-login.html";
      return;
    }

    const data = await res.json();
    allPayments = data;
    renderPayments();

  } catch (error) {
    tableBody.innerHTML = "";
    emptyState.style.display = "block";
    emptyState.textContent = "Error loading payments";
  }
}

/* ===============================
   RENDER TABLE
================================ */

function renderPayments() {
  tableBody.innerHTML = "";

  let filtered = allPayments;

  if (currentFilter !== "All") {
    filtered = allPayments.filter(p => p.status === currentFilter);
  }

  if (filtered.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  filtered.forEach(payment => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${payment.studentName}</td>
      <td>${payment.phone}</td>
      <td>${payment.course}</td>
      <td>₹${payment.amount}</td>
      <td>${payment.transactionId}</td>
      <td>${new Date(payment.paymentDate).toLocaleDateString()}</td>
      <td>
        <span class="status-badge status-${payment.status}">
          ${payment.status}
        </span>
      </td>
      <td>
        <button class="action-btn" onclick="updateStatus('${payment._id}', 'Success')">
          Approve
        </button>
        <button class="action-btn" onclick="updateStatus('${payment._id}', 'Rejected')">
          Reject
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

/* ===============================
   FILTER LOGIC
================================ */

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentFilter = btn.dataset.filter;
    renderPayments();
  });
});

/* ===============================
   UPDATE STATUS
================================ */

async function updateStatus(id, status) {
  try {
    await fetch(`https://sjkma-backend.onrender.com/api/payments/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    loadPayments();

  } catch (error) {
    alert("Failed to update status");
  }
}
/* LOAD ANALYTICS */
async function loadAnalytics() {
  try {
    const res = await fetch("https://sjkma-backend.onrender.com/api/payments/analytics", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    document.getElementById("totalRevenue").textContent = `₹${data.totalRevenue}`;
    document.getElementById("pendingAmount").textContent = `₹${data.pendingAmount}`;
    document.getElementById("totalPayments").textContent = data.totalPayments;
    document.getElementById("pendingCount").textContent = data.pendingCount;

  } catch (error) {
    console.log("Analytics load error");
  }
}

loadAnalytics();
loadPayments();
