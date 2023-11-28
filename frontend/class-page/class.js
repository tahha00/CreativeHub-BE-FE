function createReviewElement (data) {
    const review = document.createElement("div")
    review.className = "review";

    const content = document.createElement("p");
    content.textContent = data["content"];
    review.appendChild(content);

    return review;
}

document.getElementById("review-form").addEventListener("submit", async (e) => {
    e.preventDefault()

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: form.get("content")
        })
    }

    const result = await fetch("https://sql-injectors.onrender.com/reviews", options);

    if (result.status == 201) {
        window.location.reload();
    }
})

async function loadReviews() {
    
    const response = await fetch ("https://sql-injectors.onrender.com/reviews");

    if (response.status == 200) {
        const reviews = await response.json();

        const container = document.getElementsByClassName("reviewSection");

        reviews.forEach(p => {
            const elem = createPostElement(p);
            container.appendChild(elem)
        })
    } else {
        window.location.assign("./jewelerryMakingClass.html")
    }
}

