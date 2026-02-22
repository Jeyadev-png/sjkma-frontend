const form = document.getElementById("paymentForm");
const statusText = document.getElementById("paymentStatus");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const paymentData = {
      studentName: formData.get("studentName"),
      phone: formData.get("phone"),
      course: formData.get("course"),
      amount: Number(formData.get("amount")),
      transactionId: formData.get("transactionId")
    };

    try {
      const response = await fetch("https://sjkma-backend.onrender.com/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();

      if (response.ok) {
        statusText.textContent =
          "Payment submitted successfully. Waiting for verification.";
        form.reset();
      } else {
        statusText.textContent = data.error || "Something went wrong.";
      }

    } catch (error) {
      statusText.textContent = "Server error. Please try again.";
    }
  });
}
