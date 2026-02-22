const chips = document.querySelectorAll(".chip");
const interestInput = document.getElementById("interest");
const form = document.getElementById("enrollForm");
const status = document.getElementById("formStatus");

// CHIP SELECTION
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    interestInput.value = chip.textContent;
  });
});

// FORM VALIDATION
form.addEventListener("submit", e => {
  e.preventDefault();
  let valid = true;

  // Interest
  if (!interestInput.value) {
    document.querySelector(".interest-group .error").style.display = "block";
    valid = false;
  } else {
    document.querySelector(".interest-group .error").style.display = "none";
  }

  // Inputs
  form.querySelectorAll("input[required], textarea[required]").forEach(field => {
    const error = field.nextElementSibling;
    if (!field.value.trim()) {
      error.style.display = "block";
      valid = false;
    } else {
      error.style.display = "none";
    }
  });

  if (!valid) {
    status.textContent = "One or more fields have an error. Please check and try again.";
    return;
  }

  // SUCCESS (placeholder)
  status.textContent = "Request sent successfully. We will contact you soon.";
  form.reset();
  chips.forEach(c => c.classList.remove("active"));
});
