import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
    const [event, setEvent] = useState({});
    const { eventId } = useParams();
    const [guests, setGuests] = useState([]);
    const [emailContent, setEmailContent] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // Add search query state
    const navigate = useNavigate();
    const [eventBanner, setEventBanner] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/event/listing', config);
                const eventsArray = response.data;
                const eventDetails = eventsArray.find((obj) => obj.id == eventId);
                setEvent(eventDetails);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        const fetchGuests = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/event/${eventId}/attendees`, config);
                setGuests(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvents();
        fetchGuests();
    }, [eventId]);

    const handleFileUpload = async (file) => {
        const token = localStorage.getItem('jwtToken');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`http://localhost:8080/event/${eventId}/image/upload`, formData, config);
            console.log(response.status);
            setEventBanner(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        setEventBanner(file);
        handleFileUpload(file);
    };

    const handleSendEmail = () => {
        console.log('Sending email to guests:', emailContent);
    };

    // Filter guests based on search query
    const filteredGuests = guests.filter((guest) =>
        guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Event Details</h3>
                <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{event.eventEnd}</span>
                </div>
                <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{event.eventStart}</span>
                </div>
                <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{event.location}</span>
                </div>
                <div className="flex items-center mb-2">
                    <Users className="w-5 h-5 text-gray-500 mr-2" />
                    <span>{filteredGuests.length} Guests</span>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Guest List</h3>
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                        placeholder="Search..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <ul className="divide-y divide-gray-200">
                    {filteredGuests.map((guest, index) => (
                        <li key={index} className="py-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium">{guest.name}</p>
                                <p className="text-gray-500">{guest.email}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-6 text-center">Edit Event</h3>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="eventBanner" className="block text-gray-700 mb-2">Upload Event Banner:</label>
                        <input
                            type="file"
                            id="eventBanner"
                            onChange={handleChange}
                            className="mb-6"
                        />
                    </div>
                </form>

                <div className="space-y-4 mt-6">
                    <button
                        className="bg-teal-500 text-white rounded-lg shadow-md p-2 w-full text-center hover:bg-teal-600"
                        onClick={() => navigate(`/admin/vendor/${eventId}`)}
                    >
                        Manage Vendor
                    </button>
                    <button
                        className="bg-teal-500 text-white rounded-lg shadow-md p-2 w-full text-center hover:bg-teal-600"
                        onClick={() => navigate(`/admin/drag/${eventId}`)}
                    >
                        Manage Tasks
                    </button>
                </div>
            </div>

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
