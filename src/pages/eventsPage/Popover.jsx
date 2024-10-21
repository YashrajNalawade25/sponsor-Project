import axios from 'axios';
import React from 'react';

function Popover({ show, event, onClose }) {

    if (!show) return null;

    const handleSubmit = async () => {
        // Get the JWT token from localStorage
        const token = localStorage.getItem('jwtToken');

        // Check if the token exists, if not, prompt the user to log in
        if (!token) {
            alert('No token found, please log in.');
            return;
        }

        // Configure the headers with the Bearer token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        // Make the POST request to add the event for the attendee
        try {
            const response = await axios.post(`http://localhost:8080/attendee/addEvent/${event.id}`, {}, config);
            console.log(response.status);
            alert("successfully booked")
            // Close the popover after the request completes
            onClose();
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error confirming your booking. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
                <button className="absolute top-2 right-2" onClick={onClose}>
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
                <p><strong>Event Name:</strong> {event.name}</p>
                <p><strong>Date:</strong> {event.eventStart}</p>
                <p><strong>Price:</strong> {event.ticketDetail}</p>

                {/* Submit Button */}
                <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
                    onClick={handleSubmit}
                >
                    Confirm Booking and Close
                </button>
            </div>
        </div>
    );
}

export default Popover;
