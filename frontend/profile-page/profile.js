function fetchBookings() {
    fetch("http://localhost:3000/profile/:id")
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
    row.insertCell(1).innerText = booking.classdate;
    row.insertCell(2).innerText = booking.classstart;
    row.insertCell(3).innerText = booking.venuename;

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

function deleteBooking(bookingId) {
    fetch(`http://localhost:3000/profile/${bookingId}`, {
        method: "DELETE",
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

// Initial fetching and rendering when the page loads
fetchBookings();