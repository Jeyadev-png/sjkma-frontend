const form = document.getElementById("paymentForm");
const stepForm = document.getElementById("step-form");
const stepPayment = document.getElementById("step-payment");
const stepSuccess = document.getElementById("step-success");
const confirmBtn = document.getElementById("confirmPayment");

let paymentData = {};

form.addEventListener("submit", function(e) {
  e.preventDefault();

  paymentData = {
    studentName: document.getElementById("studentName").value,
    phone: document.getElementById("phone").value,
    course: document.getElementById("course").value,
    amount: document.getElementById("amount").value
  };

  stepForm.classList.add("hidden");
  stepPayment.classList.remove("hidden");
});

const confirmText = document.getElementById("confirmText");
const confirmLoader = document.getElementById("confirmLoader");

confirmBtn.addEventListener("click", async function() {

  const transactionId = document.getElementById("transactionId").value;

  if (!transactionId) {
    alert("Enter transaction ID");
    return;
  }

  // 🔥 Start loading state
  confirmBtn.disabled = true;
  confirmText.textContent = "Submitting...";
  confirmLoader.classList.remove("hidden");

  const finalData = {
    ...paymentData,
    transactionId
  };

  try {

    const response = await fetch("https://sjkma-backend.onrender.com/api/payments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalData)
    });

    if (response.ok) {
      stepPayment.classList.add("hidden");
      stepSuccess.classList.remove("hidden");
    } else {
      alert("Error submitting payment");
    }

  } catch (err) {
    alert("Server error");
  }

  // 🔥 Restore button (in case of error)
  confirmBtn.disabled = false;
  confirmText.textContent = "Confirm Payment";
  confirmLoader.classList.add("hidden");

});