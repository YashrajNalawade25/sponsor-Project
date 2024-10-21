import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [isAuthenticated, setisAuthenticated] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem('jwtToken');

        if (token) {
            setisAuthenticated(true);
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }

        if (isAuthenticated) {
            const fetchEvents = async () => {
                try {
                    const response = await axios.get("http://localhost:8080/event/listing", config);
                    console.log(response.data);

                    // Fetch images for each event
                    const eventsWithImages = await Promise.all(response.data.map(async (event) => {
                        try {
                            const imageResponse = await axios.get(`http://localhost:8080/event/${event.id}/image`, {
                                ...config,
                                responseType: 'blob'
                            });
                            const imageUrl = URL.createObjectURL(imageResponse.data);
                            return { ...event, imageUrl };
                        } catch (error) {
                            console.error(`Error fetching image for event ${event.id}:`, error);
                            return { ...event, imageUrl: null };
                        }
                    }));

                    setEvents(eventsWithImages);
                } catch (error) {
                    console.error("Error fetching events:", error);
                }
            };

            fetchEvents();



            fetchEvents();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="text-center mt-6">
                <h1 className="text-2xl font-semibold">Please log in to access the dashboard</h1>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => navigate('/admin/auth')}
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-6">Welcome to the Dashboard</h1>

            <h2 className="text-2xl font-medium mb-4">Your Events</h2>

            {events.length > 0 ? (
                <div>
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="flex items-center mb-6 bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer"
                            onClick={() => navigate(`/admin/event/${event.id}`)} // Navigate to event details page
                        >
                            <img
                                src={event.imageUrl}
                                alt={event.name}
                                className="w-25 h-24 rounded-md object-cover mr-4"
                            />
                            <div>
                                <h3 className="text-lg font-medium">{event.name}</h3>
                                <p className="text-sm text-gray-500 flex items-center">
                                    <span className="mr-2">By {event.organizerEmail
                                    }</span>
                                    <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                                    {event.eventStart}
                                </p>
                                <p className="text-sm text-gray-500 flex items-center">
                                    <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                                    {event.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">You have no events to manage yet.</p>
            )}
        </div>
    );
};

export default Dashboard;
