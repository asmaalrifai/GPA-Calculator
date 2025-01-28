let semesterCount = 0;

function generateSemesters() {
  let count = parseInt(document.getElementById("semesterCount").value);
  if (isNaN(count) || count < 1) {
    alert("Please enter a valid number of semesters.");
    return;
  }

  document.getElementById("semestersContainer").innerHTML = "";
  semesterCount = 0;
  for (let i = 0; i < count; i++) {
    addNewSemester();
  }
}

function addNewSemester() {
  semesterCount++;
  let semesterDiv = document.createElement("div");
  semesterDiv.classList.add("semester");
  semesterDiv.id = `semester${semesterCount}`;

  semesterDiv.innerHTML = `
    <div class="semester-header">
        <h3>Semester ${semesterCount}</h3>
        <button class="remove-btn" onclick="removeSemester('${semesterDiv.id}')">Remove</button>
    </div>

    <select class="semester-mode" onchange="toggleSemesterMode('${semesterDiv.id}')">
        <option value="detailed">Enter Each Course</option>
        <option value="direct">Enter GPA & AKTS</option>
    </select>

    <div class="direct-inputs hidden">
        <input type="number" class="direct-gpa" placeholder="GPA" step="0.01" min="0" max="4">
        <input type="number" class="direct-akts" placeholder="AKTS" min="1">
    </div>

    <div class="detailed-inputs">
        <div class="semester-controls">
            <button class="add-btn" onclick="addCourse('${semesterDiv.id}')">+ Add Course</button>
        </div>
        <div class="course-list"></div>
    </div>

    <div class="semester-results">GPA: <strong>0.00</strong> | AKTS: <strong>0</strong></div>
    `;

  document.getElementById("semestersContainer").appendChild(semesterDiv);
}

function removeSemester(semesterId) {
  document.getElementById(semesterId).remove();
}

function addCourse(semesterId) {
  let semesterDiv = document
    .getElementById(semesterId)
    .querySelector(".course-list");
  let courseDiv = document.createElement("div");
  courseDiv.classList.add("course-item");

  courseDiv.innerHTML = `
        <select class="grade">
            ${Object.keys(gradePoints)
              .map((grade) => `<option value="${grade}">${grade}</option>`)
              .join("")}
        </select>
        <input type="number" class="akts" placeholder="AKTS" min="1">
        <button class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
    `;

  semesterDiv.appendChild(courseDiv);
}

function toggleSemesterMode(semesterId) {
    let semesterDiv = document.getElementById(semesterId);
    let mode = semesterDiv.querySelector('.semester-mode').value;
    let directInputs = semesterDiv.querySelector('.direct-inputs');
    let detailedInputs = semesterDiv.querySelector('.detailed-inputs');

    if (mode === "direct") {
        directInputs.classList.remove("hidden");
        detailedInputs.classList.add("hidden");
    } else {
        directInputs.classList.add("hidden");
        detailedInputs.classList.remove("hidden");
    }
}

// Dark Mode Toggle Functionality
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode-container");
    document.querySelector(".results").classList.toggle("dark-mode-results");
    document.querySelectorAll(".semester").forEach(el => el.classList.toggle("dark-mode-semester"));
    document.querySelectorAll(".semester-results").forEach(el => el.classList.toggle("dark-mode-results"));
    document.querySelectorAll("h1, h2").forEach(el => el.classList.toggle("dark-mode-text"));
    
    let darkModeButton = document.querySelector(".dark-mode-btn");
    if (document.body.classList.contains("dark-mode")) {
        darkModeButton.innerText = "☀️ Light Mode";
    } else {
        darkModeButton.innerText = "🌙 Dark Mode";
    }
}

// Add Dark Mode Button
window.onload = function() {
    let darkModeButton = document.createElement("button");
    darkModeButton.innerText = "🌙 Dark Mode";
    darkModeButton.classList.add("dark-mode-btn");
    darkModeButton.onclick = toggleDarkMode;
    document.body.appendChild(darkModeButton);
};
