const list = document.getElementById('list');



/* When the user clicks on the button,
 shows the dropdown content */
function myFunction() {
    
    if (list.style.display === 'none' || list.style.display === '') {
        list.style.display = 'block';
      } else {
        list.style.display = 'none';
      };
  }


  //code to filter dropdown list items based on user input
  function filterFunction() {
    let input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("searchFilter");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }



function fetchClasses(){
    fetch('http://localhost:3000/class')
    .then(resp => resp.json())
    .then(data => displayClasses(data))
}

function displayClasses (data) {
 const classContainer= document.getElementById('classContainer');
 classContainer.innerHTML = '';

 data.forEach(cls => {
    const classElement = document.createElement('div');
    classElement.innerHTML = `
    <img src="${cls.photo}" alt="Class Photo" class="class-photo">
    <h2>${cls.name}</h2>
    <p>Venue: ${cls.venue}</p>
    <p>Review: ${cls.review}</p>
    <p>Date: ${cls.date}</p>
`;
classElement.classList.add('class-separator');
classContainer.appendChild(classElement);
  });
}

function fetchFilteredData() {
    const location = document.querySelector('#location_names').value;
    const date = document.querySelector('#date_names').value;

    const number = parseInt(location)
    const encodedDate = encodeURIComponent(date);

  fetch(`http://localhost:3000/class/filter/${number}/${encodedDate}`)
    .then(response => response.json())
    .then(data => {
      displayClasses(data)
      // Handle the fetched data in the frontend
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// function fetchDateFilter() {
//   const date = document.querySelector('#date_names').value;
//   console.log(date)
//   const encodedDate = encodeURIComponent(date);

// fetch(`http://localhost:3000/class/filter/date/${encodedDate}`)
//   .then(response => response.json())
//   .then(data => {
//     displayClasses(data)
//     // Handle the fetched data in the frontend
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// }

const showDropdown = document.querySelector("#myInput")
showDropdown.addEventListener("click", myFunction);

document.addEventListener('DOMContentLoaded', fetchClasses)

filtersButton.addEventListener('click', fetchFilteredData)
