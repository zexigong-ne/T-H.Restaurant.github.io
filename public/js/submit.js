document.addEventListener("DOMContentLoaded", function () {
  const reservationForm = document.getElementById("reservation-form");
  reservationForm.addEventListener("submit", async function (event) {
    event.preventDefault()
    
    // Get form data for submitting the reservation
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const people = document.getElementById("people").value;

    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("People:", people);

    try {
      // Use fetch API to send a POST request to your server to submit the reservation
      const response = await fetch("/submit-reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, date, time, people }),
      });
      if (response.ok) {
        // Reservation submitted successfully
        console.log("Reservation submitted successfully.");

        // Clear form fields
        reservationForm.reset();

        // Clear reservation details
        reservationDetailsDiv.innerHTML = '';
      } else {
        // Handle error (e.g., show an error message)
        console.error("Error submitting reservation.");
      }
    } catch (error) {
      console.error(error);
    }
  });

  // Add a click event listener to the "Check" button
  const checkButton = document.querySelector(
    "#lookup-form button[type='submit']"
  );
  checkButton.addEventListener("click", async function (event) {
    event.preventDefault();

    // Get form data for checking the reservation
    const lookupName = document.getElementById("lookup-name").value;
    const lookupPhone = document.getElementById("lookup-phone").value;

    try {
      // Use fetch API to send a GET request to your server to retrieve reservation details
      const response = await fetch(
        `/reservation-details?name=${lookupName}&phone=${lookupPhone}`
      );
      if (response.ok) {
        const data = await response.json();

        // Display reservation details on the page
        const reservationDetailsDiv = document.getElementById(
          "reservation-details"
        );
        if (data.length > 0) {
          const reservationInfo = data
            .map((reservation) => {
              return `
                            <p>Name: ${reservation.name}</p>
                            <p>Phone: ${reservation.phone}</p>
                            <p>Date: ${reservation.date}</p>
                            <p>Time: ${reservation.time}</p>
                            <p>People: ${reservation.people}</p>
                            <hr>
                        `;
            })
            .join("");
          reservationDetailsDiv.innerHTML = reservationInfo;
        } else {
          reservationDetailsDiv.innerHTML =
            "No reservations found for the given name and phone number.";
        }
      } else {
        // Handle error (e.g., show an error message)
        console.error("Error retrieving reservation details.");
      }
    } catch (error) {
      console.error(error);
    }
  });
});
