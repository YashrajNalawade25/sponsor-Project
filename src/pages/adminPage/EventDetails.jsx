import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react'; // Icons for event recap

const EventDetails = () => {
    // Placeholder event details
    const [event, setEvent] = useState({
        date: 'Friday, Aug 23',
        time: '2:00 PM GMT+5:30',
        location: 'Westend Mall',
        guestsCount: 3,
    });

    // Placeholder guest list
    const [guests, setGuests] = useState([
        { name: 'Abhishek', email: 'stealthassaulter@gmail.com', status: 'Going', date: 'Aug 23' },
        { name: 'Yash', email: 'yash.dusankar@gmail.com', status: 'Going', date: 'Aug 23' },
        { name: 'ADITYA YADAV', email: 'aditya.yadav22@vit.edu', status: 'Going', date: 'Aug 23' },
        { name: 'Anonymous', email: 'swarnim.yawale22@vit.edu', status: 'Invited', date: 'Aug 23' },
    ]);

    const [capacity, setCapacity] = useState(100); // Editable event capacity
    const [emailContent, setEmailContent] = useState(''); // Email content for blast

    const handleCapacityChange = (e) => {
        setCapacity(e.target.value);
    };

    const handleSendEmail = () => {
        // Logic to send the email to guests
        console.log('Sending email to guests:', emailContent);
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            {/* Event Recap */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Event Recap</h3>
                <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{event.date}</span>
                </div>
                <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{event.time}</span>
                </div>
                <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{event.location}</span>
                </div>
                <div className="flex items-center mb-2">
                    <Users className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{event.guestsCount} Guests</span>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4">
                    Edit Event
                </button>
            </div>

            {/* Guest List */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Guest List</h3>
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex ml-4">
                        <select className="mr-2 px-3 py-2 border border-gray-300 rounded-md">
                            <option>All Guests</option>
                            <option>Going</option>
                            <option>Invited</option>
                        </select>
                        <select className="px-3 py-2 border border-gray-300 rounded-md">
                            <option>Register Time</option>
                        </select>
                    </div>
                </div>
                <ul className="divide-y divide-gray-200">
                    {guests.map((guest, index) => (
                        <li key={index} className="py-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium">{guest.name}</p>
                                <p className="text-gray-500">{guest.email}</p>
                            </div>
                            <div className="flex items-center">
                                <span
                                    className={`px-3 py-1 rounded-md text-sm ${guest.status === 'Going' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                        }`}
                                >
                                    {guest.status}
                                </span>
                                <span className="ml-4 text-gray-500">{guest.date}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Edit Event Section - Adjust Capacity */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Edit Event</h3>
                <label htmlFor="capacity" className="block text-gray-700 mb-2">Capacity:</label>
                <input
                    type="number"
                    id="capacity"
                    value={capacity}
                    onChange={handleCapacityChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Blast Email Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Send Blast Email</h3>
                <textarea
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="Compose your message here..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
                    onClick={handleSendEmail}
                >
                    Send Email
                </button>
            </div>
        </div>
    );
};

export default EventDetails;
