import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

const Dashboard = ({ isAuthenticated = true }) => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchEvents = () => {

                //here to call from database to list the events

                const sampleEvents = [
                    {
                        id: 1,
                        name: 'Music Event',
                        bannerUrl: '/path-to-banner-image',
                        organizer: 'yashraj',
                        date: 'Fri, Aug 23, 2:00 PM',
                        location: 'Westend Mall',
                    },
                    {
                        id: 2,
                        name: 'Tech Conference',
                        bannerUrl: '/path-to-banner-image',
                        organizer: 'Alex',
                        date: 'Sat, Sep 10, 10:00 AM',
                        location: 'Tech Park',
                    },
                ];
                setEvents(sampleEvents);
            };
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
                                src={event.bannerUrl}
                                alt={event.name}
                                className="w-16 h-16 rounded-md object-cover mr-4"
                            />
                            <div>
                                <h3 className="text-lg font-medium">{event.name}</h3>
                                <p className="text-sm text-gray-500 flex items-center">
                                    <span className="mr-2">By {event.organizer}</span>
                                    <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                                    {event.date}
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

            <div className="mt-6">
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => navigate('/admin/auth')}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
