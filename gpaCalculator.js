function calculateSemesterGPA(semesterId) {
  let semesterDiv = document.getElementById(semesterId);
  let mode = semesterDiv.querySelector('.semester-mode').value;
  let semesterGPA = 0;
  let semesterAKTS = 0;

  if (mode === "direct") {
      // Get manually entered GPA & AKTS
      semesterGPA = parseFloat(semesterDiv.querySelector('.direct-gpa').value) || 0;
      semesterAKTS = parseInt(semesterDiv.querySelector('.direct-akts').value) || 0;
  } else {
      // If detailed mode, calculate based on courses
      let totalPoints = 0;
      let courses = semesterDiv.querySelectorAll('.course-item');

      courses.forEach(course => {
          let grade = course.querySelector('.grade').value;
          let akts = parseFloat(course.querySelector('.akts').value);
          if (grade in gradePoints) {
              totalPoints += gradePoints[grade] * akts;
              semesterAKTS += akts;
          }
      });

      semesterGPA = semesterAKTS > 0 ? (totalPoints / semesterAKTS).toFixed(2) : "0.00";
  }

  // Update UI
  semesterDiv.querySelector(".semester-results").innerHTML = `<p>GPA: <strong>${semesterGPA}</strong> | AKTS: <strong>${semesterAKTS}</strong></p>`;
  
  return semesterGPA;
}



function calculateTotalGPA() {
  let semesters = document.querySelectorAll('.semester');
  let totalPoints = 0;
  let totalAKTS = 0;

  semesters.forEach(semester => {
      let mode = semester.querySelector('.semester-mode').value;
      let semesterGPA = 0;
      let semesterAKTS = 0;

      if (mode === "direct") {
          // Get manually entered GPA & AKTS
          semesterGPA = parseFloat(semester.querySelector('.direct-gpa').value) || 0;
          semesterAKTS = parseInt(semester.querySelector('.direct-akts').value) || 0;

          // Convert GPA to total points
          totalPoints += semesterGPA * semesterAKTS;
          totalAKTS += semesterAKTS;
      } else {
          // If detailed mode, calculate normally
          let courses = semester.querySelectorAll('.course-item');
          courses.forEach(course => {
              let grade = course.querySelector('.grade').value;
              let akts = parseFloat(course.querySelector('.akts').value);
              if (grade in gradePoints) {
                  totalPoints += gradePoints[grade] * akts;
                  totalAKTS += akts;
                  semesterAKTS += akts;
              }
          });

          // Calculate GPA only if there are courses
          semesterGPA = semesterAKTS > 0 ? (totalPoints / semesterAKTS).toFixed(2) : "0.00";
      }

      // Update semester results
      let semesterResults = semester.querySelector(".semester-results");
      semesterResults.innerHTML = `<p>GPA: <strong>${semesterGPA}</strong> | AKTS: <strong>${semesterAKTS}</strong></p>`;
  });

  let finalGPA = totalAKTS > 0 ? (totalPoints / totalAKTS).toFixed(2) : "0.00";
  document.getElementById("totalGPA").innerText = `Total GPA: ${finalGPA}`;
  document.getElementById("totalAKTS").innerText = `Total AKTS: ${totalAKTS}`;
}


