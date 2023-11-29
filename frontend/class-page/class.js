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

const className = document.getElementsByClassName("title").textContent


async function extractClassId(className){
    
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
        const response = await fetch(`http://localhost:3000/classes/$1{className}`, options);

        if (response.status === 201) {
            alert("Class ID Found!");
        } else {
            alert("Could not extract class_id");
        }   
}



const classID = extractClassId(className)


async function makeBooking(){

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            class_id: classID
            // user_id: ,
            // class_date: ,
            // class_start: ,

        })
    }

        const response = await fetch("http://localhost:3000/bookings", options);

        if (response.status === 201) {
            alert("Booking successful!");
        } else {
            alert("Booking failed, please try again.");
        }
    
}

document.querySelector(".bookBtn").addEventListener("click", makeBooking)






