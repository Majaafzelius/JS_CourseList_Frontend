'use strict';

window.onload = init;

function init() {
    getData(); // läser in data
}
const courseName =document.getElementById("name")
const courseCode =document.getElementById("code")
const courseProg =document.getElementById("progression")
const courseSyll =document.getElementById("syllabus")
const submit =document.getElementById("submit")

submit.addEventListener("click", createCourse);

// const url = "http://localhost/moment5_webservice_vt23-Majaafzelius/rest.php"
const url = "https://studenter.miun.se/~maaf2200/writeable/dt173g/moment5_webservice_vt23-Majaafzelius/rest.php";


//hämta data
function getData() {
    fetch(url)
    .then(response=> {
        if(response.status != 200) {
            return
        }
        return response.json()
        .then(data => writeCourse(data))
        .catch(err => console.log(err))
    })
}

//skriv ut kurserna på sidan
function writeCourse(courses) {
    const ulEl = document.getElementById("courses");
    ulEl.innerHTML = "";

    courses.forEach(course => {
        ulEl.innerHTML += `<li class="courses" id=${course.id}>${course.courseName} (${course.courseCode}), ${course.courseProgression}, <a href="${course.courseSyllabus}" target="_blank">Webblänk</a></li>`
    });

    let liEl = document.getElementsByClassName("courses");

    for(let i=0; i < liEl.length; i++) {
        liEl[i].addEventListener("click", deleteCourse);
    }
}

// ta bort kurs
function deleteCourse(e) {
    let id = e.target.id;
    console.log(id);

    fetch(url + "?id=" + id, {
        "method": "DELETE"
    })
    .then(response => response.json())
    .then(data => getData())
    .catch(err => console.log(err))
}

//lägg till kurs
function createCourse(event) {
    event.preventDefault();

    let name = courseName.value;
    let code = courseCode.value;
    let prog = courseProg.value;
    let syll = courseSyll.value;

    let jsonStr = JSON.stringify({
        courseName: name,
        courseCode: code,
        courseProgression: prog,
        courseSyllabus: syll,
    })

    fetch(url, {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: jsonStr
    })
    .then(response => response.json())
    .then(data => getData())
    .catch(err => console.log(err))
}
