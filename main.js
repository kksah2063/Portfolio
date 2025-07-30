
  // Handle form submission and show success alert
  const form = document.querySelector(".contact-form");
  const alertBox = document.getElementById("formAlert");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual form submission
    alertBox.classList.remove("d-none"); // Show the success alert
    form.reset(); // Clear the form fields

    setTimeout(() => {
      alertBox.classList.add("d-none"); // Hide alert after 3 seconds
    }, 3000);
  });

  // Confirmation prompt before submitting form
  function confirmSubmission() {
    return confirm("Are you sure you want to send this message?");
  }

  // Scroll to Top Button functionality
  const scrollBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });