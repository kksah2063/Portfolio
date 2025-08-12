document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const alertBox = document.getElementById("formAlert");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (!confirm("Are you sure you want to send this message?")) return;

      const formData = {
        username: form.username.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim(),
      };

      try {
        const response = await fetch("/submit-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.text();

        alertBox.classList.remove("d-none", "alert-success", "alert-danger");

        if (response.ok) {
          alertBox.textContent = result;
          alertBox.classList.add("alert-success");
          form.reset(); // ✅ Clear form fields
        } else {
          alertBox.textContent = result;
          alertBox.classList.add("alert-danger");
        }

        setTimeout(() => {
          alertBox.classList.add("d-none");
        }, 3000);
      } catch (err) {
        alertBox.textContent = "❌ Something went wrong. Please try again.";
        alertBox.classList.remove("d-none", "alert-success");
        alertBox.classList.add("alert-danger");

        setTimeout(() => {
          alertBox.classList.add("d-none");
        }, 5000);
      }
    });
  });


  const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
