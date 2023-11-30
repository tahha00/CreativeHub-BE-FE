//!REVIEWS

function createReviewElement (data) {
    const review = document.createElement("div")
    review.className = "review";

    const content = document.createElement("p");
    content.textContent = data["review_text"];
    review.appendChild(content);

    return review;
}

document.getElementById("review-form").addEventListener("submit", async (e) => {
    e.preventDefault()

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            authorization: localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            review_text: form.get("content")
        })
    }

    const result = await fetch("http://localhost:3000/reviews", options);

    // console.log("Form Data:", Object.fromEntries(form.entries()));
    // console.log("Fetch Result:", result);


    if (result.status == 201) {
        window.location.reload();
    }
})


async function loadReviews() {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    try {
        const response = await fetch("http://localhost:3000/reviews", options);

        if (response.status === 200) {
            const reviews = await response.json();

            const container = document.getElementById("posts");

            
            reviews.forEach(p => {
                const elem = createReviewElement(p);
                container.appendChild(elem);
            });
        } else {
            console.error("Failed to load reviews. Status code:", response.status);
           
        }
    } catch (error) {
        console.error("Error loading reviews:", error);
    }
}

loadReviews()

//!BOOKING

let globaluserId;

async function getUserId(token){
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch(`http://localhost:3000/tokens/${token}`, options)

    if (response.status === 200){
        const data = await response.json()
        globaluserId = data
        return data;
        console.log(response)
        console.log("id extracted")
    }
    else {
        console.log("could not find a valid token")
    }

   
}
const token = localStorage.getItem("token")
//getUserId(token);

// const userID = getUserId(token)

getUserId(token)
  .then(userId => {
    console.log('User ID:', userId);
    return userId
  })
  .catch(error => {
    console.error('Error:', error.message);
  });


async function classId(id) {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch(`http://localhost:3000/class/${id}`, options)

    if (response.status === 200) {
        console.log("class ID extracted")
    } else {
        console.log("invalid class id")
    }
    
}

//let classid = classId(id)
//console.log(userID)

let classtime = document.querySelector("#classtime").textContent

let classname = document.querySelector("#classtitle").textContent
let classID;

if(classname === "Pottery Mondays!"){
    classID = 1
}
else if(classname === "Jewellery Tuesdays!"){
    classID = 2
}
else if(classname === "Woodwork Wednesdays!"){
    classID = 3
}


async function makeBooking(){


    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: globaluserId,
            class_id: classID,
            class_time: classtime
        })
    }
     console.log(options)

        const response = await fetch("http://localhost:3000/bookings", options);

        if (response.status === 201) {
            alert("Booking successful!");

        } else {
            alert("Booking failed, please try again.");
        }
    
}



const submitData = document.querySelector(".bookBtn")

submitData.addEventListener("click", makeBooking)

















