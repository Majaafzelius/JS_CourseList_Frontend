"use strict";function init(){getData()}window.onload=init;const courseName=document.getElementById("name"),courseCode=document.getElementById("code"),courseProg=document.getElementById("progression"),courseSyll=document.getElementById("syllabus"),submit=document.getElementById("submit");submit.addEventListener("click",createCourse);const url="https://studenter.miun.se/~maaf2200/writeable/dt173g/moment5_webservice_vt23-Majaafzelius/rest.php";function getData(){fetch(url).then((e=>{if(200==e.status)return e.json().then((e=>writeCourse(e))).catch((e=>console.log(e)))}))}function writeCourse(e){const t=document.getElementById("courses");t.innerHTML="",e.forEach((e=>{t.innerHTML+=`<li class="courses" id=${e.id}>${e.courseName} (${e.courseCode}), ${e.courseProgression}, <a href="${e.courseSyllabus}" target="_blank">Webblänk</a></li>`}));let o=document.getElementsByClassName("courses");for(let e=0;e<o.length;e++)o[e].addEventListener("click",deleteCourse)}function deleteCourse(e){let t=e.target.id;console.log(t),fetch(url+"?id="+t,{method:"DELETE"}).then((e=>e.json())).then((e=>getData())).catch((e=>console.log(e)))}function createCourse(e){e.preventDefault();let t=courseName.value,o=courseCode.value,s=courseProg.value,n=courseSyll.value,c=JSON.stringify({courseName:t,courseCode:o,courseProgression:s,courseSyllabus:n});fetch(url,{method:"POST",headers:{"content-type":"application/json"},body:c}).then((e=>e.json())).then((e=>getData())).catch((e=>console.log(e)))}