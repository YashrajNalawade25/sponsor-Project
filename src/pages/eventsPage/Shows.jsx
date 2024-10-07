import React, { useEffect, useState } from 'react';

function Shows() {

    //dummy data remove afterwards 
    const [bookedShows, setBookedShows] = useState([
        {
            id: 1,
            showName: 'Broadway Musical',
            date: '2024-10-10',
            time: '7:00 PM',
            numberOfPeople: 2,
        },
        {
            id: 2,
            showName: 'Comedy Night',
            date: '2024-10-12',
            time: '9:00 PM',
            numberOfPeople: 4,
        },
        {
            id: 3,
            showName: 'Drama Play',
            date: '2024-10-15',
            time: '6:00 PM',
            numberOfPeople: 1,
        },
    ]);

    const cancelShow = (id) => {

        // restful api call to cancel the booking update the both DB attendees and events
        setBookedShows(bookedShows.filter(show => show.id !== id));
    };

    useEffect(() => {
        //restful call to the attendee DB to list the events he has booked for
    }, [])

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center mb-8">Your Booked Shows</h1>
            <ul className="space-y-6">
                {bookedShows.map(show => (
                    <li key={show.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                        <h3 className="text-2xl font-semibold text-gray-800">{show.showName}</h3>
                        <p className="text-gray-600">Date: {show.date}</p>
                        <p className="text-gray-600">Time: {show.time}</p>
                        <p className="text-gray-600">Number of People: {show.numberOfPeople}</p>
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
