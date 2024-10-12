import React, { useState } from 'react';

function Popover({ show, event, onClose }) {
    const [guests, setGuests] = useState(1); // State to manage the number of guests

    if (!show) return null;

    const handleGuestChange = (e) => {
        setGuests(e.target.value);
    };

    const handleSubmit = () => {

        //restful api call for updatind both attendees DB and the event DB handle token here as well
        //here we have the events object coming as prop from the listing page so uses the events id and update accordingly
        console.log(`Guests coming: ${guests}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
                <button className="absolute top-2 right-2" onClick={onClose}>
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
                <p><strong>Event Name:</strong> {event.title}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Price:</strong> {event.price}</p>

                {/* Number of Guests Input Field */}
                <div className="mt-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="guests">
                        Number of Guests:
                    </label>
                    <input
                        type="number"
                        id="guests"
                        value={guests}
                        onChange={handleGuestChange}
                        min="1"
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-red-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
                    onClick={handleSubmit}
                >
                    Confirm Guests and Close
                </button>
            </div>
        </div>
    );
}

export default Popover;
