function previewForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  const data = { name, email, password };

  // Store record
  let records = JSON.parse(localStorage.getItem("signUpRecords")) || [];
  records.push(data);
  localStorage.setItem("signUpRecords", JSON.stringify(records));

  // ✅ Alert message for successful submission
  alert("Successfully signed up!");

  // Show preview modal
  document.getElementById("preview-data").innerHTML = `
    <li><strong>Name:</strong> ${name}</li>
    <li><strong>Email:</strong> ${email}</li>
    <li><strong>Password:</strong> ${'*'.repeat(password.length)}</li>
  `;
  document.getElementById("preview-modal").style.display = "block";
}

// This block runs when the document loads
document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("record-list");

  // Load records if on records.html
  if (list) {
    const records = JSON.parse(localStorage.getItem("signUpRecords")) || [];

    if (records.length === 0) {
      list.innerHTML = "<li>No sign-up records found.</li>";
    } else {
      records.forEach((record, index) => {
        list.innerHTML += `
          <li>
            <strong>Record ${index + 1}</strong><br>
            Name: ${record.name}<br>
            Email: ${record.email}<br>
            Password: ${'*'.repeat(record.password.length)}
          </li><br>
        `;
      });
    }

    // Clear Records functionality
    const clearBtn = document.getElementById("clear-records-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        localStorage.removeItem("signUpRecords");
        list.innerHTML = "<li>No sign-up records found.</li>";
        alert("All records have been cleared.");
      });
    }
  }
});
