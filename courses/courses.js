// courses.js
const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  sections:[ 
  { 
    sectionNum: 1, 
    roomNum: 'STC 353', 
    enrolled: 26, 
    days: 'TTh', 
    instructor: 'Bro T'
  }, 
  { 
    sectionNum: 2, 
    roomNum: 'STC 347', 
    enrolled: 28, 
    days: 'TTh', 
    instructor: 'Sis A'
  },
],
 updateEnrollment: function(sectionNum, change) {
    const index = this.sections.findIndex(
      section => section.sectionNum === sectionNum
    );

    if (index !== -1) {
      const currentEnrolled = this.sections[index].enrolled;
      const newEnrolled = currentEnrolled + change;

      if (newEnrolled >= 0) {
        this.sections[index].enrolled = newEnrolled;
        const action = change > 0 ? "Enrolled" : "Dropped";
        console.log(`${action} student in section ${sectionNum}. Total now: ${newEnrolled}`);
        renderSections(this.sections);
      } else {
        console.log(`Cannot drop below 0 students in section ${sectionNum}.`);
      }
    } else {
      console.log(`Section ${sectionNum} not found.`);
    }
  }

};

function displayCourseInfo(course) {
    document.getElementById('courseName').textContent = course.name; 
    document.getElementById('courseCode').textContent = course.code;
}

function renderSections(sectionsArray) {
    const tableBody = document.querySelector('#sections tbody');
    tableBody.innerHTML = ''; 

    for (const section of sectionsArray) {
        const row = document.createElement('tr');

        row.innerHTML = 
            `<td>${section.sectionNum}</td>
             <td>${section.roomNum}</td>
             <td>${section.enrolled}</td>
             <td>${section.days}</td>
             <td>${section.instructor}</td>`;

        tableBody.appendChild(row);
    }
}

document.getElementById("enrollStudent").addEventListener("click", function () {
  const sectionNum = parseInt(document.getElementById("sectionNumber").value);
  if (!isNaN(sectionNum)) {
    aCourse.updateEnrollment(sectionNum, 1);
  }
});

document.getElementById("dropStudent").addEventListener("click", function () {
  const sectionNum = parseInt(document.getElementById("sectionNumber").value);
  if (!isNaN(sectionNum)) {
    aCourse.updateEnrollment(sectionNum, -1);
  }
});

displayCourseInfo(aCourse);
renderSections(aCourse.sections);