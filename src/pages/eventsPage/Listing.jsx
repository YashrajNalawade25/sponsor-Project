import React, { useState, useEffect } from 'react';
import Popover from './Popover';
import axios from 'axios';

function Landing() {
    const [selectedCategory, setSelectedCategory] = useState('popular');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({});
    const [events, setEvents] = useState([]); // Ensure events is initialized as an empty array
    const [searchQuery, setSearchQuery] = useState(''); // Add search query state
    const [filteredEvents, setFilteredEvents] = useState([]); // State to hold filtered events

    const handleButtonClick = (event) => {
        setCurrentEvent(event);
        setShowPopover(true);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem('jwtToken');

            if (token) {
                setIsLoggedIn(true);
            }

            try {
                const response = await axios.get("http://localhost:8080/landing/allEvents");

                // Fetch images for each event
                const eventsWithImages = await Promise.all(response.data.map(async (event) => {
                    try {
                        const imageResponse = await axios.get(`http://localhost:8080/event/${event.id}/image`, {
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
                setFilteredEvents(eventsWithImages); // Initially show all events
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();

        // Cleanup function
        return () => {
            events.forEach(event => {
                if (event.imageUrl) {
                    URL.revokeObjectURL(event.imageUrl);
                }
            });
        };
    }, []);

    // Function to filter events based on the search query
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const filtered = events.filter((event) =>
                event.name.toLowerCase().includes(query.toLowerCase()) ||
                event.location.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredEvents(filtered);
        } else {
            setFilteredEvents(events); // Reset to all events if query is empty
        }
    };

    const renderEvents = () => {
        if (!Array.isArray(filteredEvents) || filteredEvents.length === 0) {
            return <p>No events available.</p>; // Fallback if no events match the search query
        }

        return filteredEvents.map((event) => (
            <div key={event.id} className="flex space-x-4">
                <div>
                    {event.eventStart ? (() => {
                        const date = new Date(event.eventStart);
                        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        const month = monthNames[date.getMonth()];
                        const day = date.getDate();

                        return (
                            <>
                                <h3 className="text-red-500 text-xl font-bold">
                                    {month} {day} {/* Display the formatted month and date */}
                                </h3>
                                <p className="text-red-500 text-2xl font-bold">
                                    {event.eventStart.split(' ')[1]} {/* Display time */}
                                </p>
                            </>
                        );
                    })() : (
                        <h3 className="text-red-500 text-xl font-bold">TBA</h3>
                    )}
                </div>

                <div className="relative">
                    <img
                        src={event.imageUrl || 'https://via.placeholder.com/200x100'} // Add placeholder image if imageUrl is null
                        alt="Event"
                        className="w-[200px] h-[100px] rounded-lg object-cover"
                    />
                </div>
                <div className="space-y-2">
                    <h3 className="font-bold text-gray-700">{event.name}</h3>
                    <h2>{event.organizerEmail}</h2>
                    <h3>{event.location}</h3>
                    <button
                        className={`bg-red-500 text-white text-sm px-3 py-1 rounded-lg ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => {
                            if (isLoggedIn) {
                                handleButtonClick(event);
                            } else {
                                alert('You need to log in to add this to your list');
                            }
                        }}
                    >
                        {event.ticketDetail}
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <header className="text-center py-16">
                <h1 className="text-5xl font-bold">
                    Discover <span className="relative">
                        <span className="text-red-500">events</span>
                    </span> around you
                </h1>

                {/* Search Bar */}
                <div className="mt-8 flex justify-center items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search events"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)} // Handle search input change
                            className="w-72 pl-10 pr-4 py-2 rounded-lg shadow-md"
                        />
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg" onClick={() => handleSearch(searchQuery)}>
                        Search
                    </button>
                </div>
            </header>

            {/* Events Section */}
            <section className="py-12 rounded-t-lg">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Render Events */}
                    <div className="grid grid-cols-2 gap-8">
                        {renderEvents()}
                    </div>
                </div>
            </section>

            {/* Popover Component */}
            <Popover show={showPopover} event={currentEvent} onClose={() => setShowPopover(false)} />
        </div>
    );
}

export default Landing;
