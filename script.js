document.addEventListener("DOMContentLoaded", function() {
    const seatsContainer = document.getElementById("seatsContainer");
    const totalTicketsEl = document.getElementById("totalTickets");
    const totalPriceEl = document.getElementById("totalPrice");
    const bookButton = document.getElementById("bookButton");
    const confirmation = document.getElementById("confirmation");
    const confirmationText = document.getElementById("confirmationText");

    const eventSelect = document.getElementById("event");
    const eventDate = document.getElementById("date");

    let selectedSeats = [];
    const seatPrice = parseInt(eventSelect.selectedOptions[0].getAttribute("data-price"));

    // Create seat elements dynamically
    function createSeats() {
        seatsContainer.innerHTML = "";
        for (let i = 1; i <= 20; i++) {
            const seat = document.createElement("div");
            seat.classList.add("seat");
            seat.innerText = i;
            seat.dataset.seatNumber = i;

            seat.addEventListener("click", function() {
                if (!seat.classList.contains("occupied")) {
                    seat.classList.toggle("selected");
                    updateSelectedSeats(seat);
                }
            });

            seatsContainer.appendChild(seat);
        }
    }

    function updateSelectedSeats(seat) {
        const seatNumber = parseInt(seat.dataset.seatNumber);
        if (seat.classList.contains("selected")) {
            selectedSeats.push(seatNumber);
        } else {
            selectedSeats = selectedSeats.filter(num => num !== seatNumber);
        }

        totalTicketsEl.innerText = selectedSeats.length;
        totalPriceEl.innerText = selectedSeats.length * seatPrice;

        bookButton.disabled = selectedSeats.length === 0;
    }

    function resetForm() {
        selectedSeats = [];
        totalTicketsEl.innerText = "0";
        totalPriceEl.innerText = "0";
        bookButton.disabled = true;
        createSeats();
    }

    // Handle booking confirmation
    bookButton.addEventListener("click", function() {
        const eventName = eventSelect.value;
        const eventDateValue = eventDate.value;

        confirmationText.innerText = `You have successfully booked ${selectedSeats.length} ticket(s) for the ${eventName} on ${eventDateValue}. Seat numbers: ${selectedSeats.join(", ")}.`;
        confirmation.classList.remove("hidden");
        resetForm();
    });

    // Initialize the form
    createSeats();

    eventSelect.addEventListener("change", function() {
        resetForm();
    });
});
