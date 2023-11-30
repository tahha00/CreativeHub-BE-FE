let globalID; 

const token = localStorage.getItem("token"); 


async function getUserId(token) {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(`http://localhost:3000/tokens/${token}`, options);

        if (response.status === 200) {
            const data = await response.json();
            
            // Assuming data is an integer value
            globalID = data;
            

            console.log("The user ID is:", globalID);
            return data;
        } else {
            console.log("Could not find a valid token");
            throw new Error("Invalid token");
        }
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}


getUserId(token)
  .then(userId => {
    console.log('User ID:', userId);
    return userId
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

  

async function loadBookings(globalID) {

    const options = {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };
    
     const response = await fetch(`http://localhost:3000/profile/${globalID}`, options)
     
        .then(response => response.json())
        .then(bookings => {
            renderBookings(bookings);
        })
        .catch(error => console.error("Error fetching user bookings:", error));
}



//handles rendering the fetched bookings in the table.

function renderBookings(bookings) {
    const tableBody = document.querySelector("#bookingsTable tbody");

    tableBody.innerHTML = "";

    // Loop through bookings and create table rows
    bookings.forEach(booking => {
        const row = tableBody.insertRow();

    // Insert data into the row cells
    row.insertCell(0).innerText = booking.name;
    // row.insertCell(1).innerText = booking.classdate;
    row.insertCell(1).innerText = booking.classstart;
    row.insertCell(2).innerText = booking.venuename;

    const deleteButton = createDeleteButton(booking.id);
    const actionCell = row.insertCell(4);
    actionCell.appendChild(deleteButton);
    });
}

//creates a delete button for each booking.
function createDeleteButton(bookingId) {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Cancel Booking";
    deleteButton.addEventListener("click", () => deleteBooking(bookingId));
    return deleteButton;
}


//handles the logic for sending a DELETE request to cancel a booking.

async function deleteBooking(bookingId) {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:3000/profile/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
            'Authorization': token,
        }
    })
        .then(response => {
            if (response.ok) {
                // Remove the deleted row from the table
                const rowToDelete = document.querySelector(`#bookingsTable tbody tr[data-booking-id="${bookingId}"]`);
                if (rowToDelete) {
                    rowToDelete.remove();
                }
            } else {
                console.error("Error deleting booking:", response.statusText);
            }
        })
        .catch(error => console.error("Error deleting booking:", error));
}


document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href('../home-page/home.html')
})


// Initial fetching and rendering when the page loads
loadBookings();
