import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Shows() {

    // State to manage booked shows
    const [bookedShows, setBookedShows] = useState([]);

    // Function to cancel a show
    const cancelShow = (id) => {
        // Update the UI by filtering out the canceled show
        setBookedShows(bookedShows.filter(show => show.id !== id));
        // Here you would add the API call to update the DB as well
    };

    useEffect(() => {
        // Define an async function inside useEffect
        const fetchBookedShows = async () => {
            const token = localStorage.getItem('jwtToken');

            if (!token) {
                alert('No token found, please log in.');
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            try {
                // Make the API call to fetch booked events
                const response = await axios.get("http://localhost:8080/attendee/events", config);
                setBookedShows(response.data);
            } catch (error) {
                console.error('Error fetching booked shows:', error);
                alert('Failed to fetch booked shows.');
            }
        };

        fetchBookedShows();
    }, []); // Empty dependency array to run on mount

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center mb-8">Your Booked Shows</h1>
            <ul className="space-y-6">
                {bookedShows.map(show => (
                    <li key={show.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                        <h3 className="text-2xl font-semibold text-gray-800">{show.name}</h3>
                        <p className="text-gray-600">Date and timing: {show.eventStart}</p>
                        <button
                            onClick={() => cancelShow(show.id)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                        >
                            Cancel Booking
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Shows;
