import React, { useState, useEffect } from 'react';
import Popover from './Popover';

function Landing() {
    const [selectedCategory, setSelectedCategory] = useState('popular');
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [showPopover, setShowPopover] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({});
    const [Events, setEvents] = useState([]); // this variable to the store the Events fetched from the DB

    // Dummy event data
    const events = {
        popular: [
            { date: 'Oct 02', title: 'Experia Band live', price: '$20 Onwards', discount: '10%', imageUrl: 'https://via.placeholder.com/200x100' },
            { date: 'Aug 09', title: 'Photography tutorial', price: '$10 Onwards', imageUrl: 'https://via.placeholder.com/200x100' },
        ],
        upcoming: [
            { date: 'Nov 15', title: 'Tech Conference', price: '$50 Onwards', imageUrl: 'https://via.placeholder.com/200x100' },
        ],
        ongoing: [
            { date: 'Sep 25', title: 'Art Exhibition', price: '$15 Onwards', imageUrl: 'https://via.placeholder.com/200x100' },
        ],
        thisWeek: [
            { date: 'Sep 28', title: 'Food Festival', price: 'Free Entry', imageUrl: 'https://via.placeholder.com/200x100' },
        ],
    };

    useEffect(() => {
        // restful api call to the list the events
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setIsLoggedIn(true);
            //over here to call to the DB as response array of obejct is required
        }
    }, [selectedCategory]);

    const handleButtonClick = (event) => {
        setCurrentEvent(event);
        setShowPopover(true);
    };

    const renderEvents = () => {
        return events[selectedCategory]?.map((event, index) => (
            <div key={index} className="flex space-x-4">
                <div>
                    <h3 className="text-red-500 text-xl font-bold">{event.date.split(' ')[0]}</h3>
                    <p className="text-red-500 text-2xl font-bold">{event.date.split(' ')[1]}</p>
                </div>
                <div className="relative">
                    <img
                        src={event.imageUrl}
                        alt="Event"
                        className="w-50 h-40 rounded-lg object-cover"
                    />
                </div>
                <div className="space-y-2">
                    <h3 className="font-bold text-gray-700">{event.title}</h3>
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
                        {event.price}
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <div className="min-h-screen ">
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
                            className="w-72 pl-10 pr-4 py-2 rounded-lg shadow-md"
                        />
                    </div>
                    <input
                        type="date"
                        className="w-48 py-2 px-4 rounded-lg shadow-md"
                        placeholder="Pick a date"
                    />
                    <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg">
                        Search
                    </button>
                </div>
            </header>

            {/* Events Section */}
            <section className="py-12 rounded-t-lg">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Tabs */}
                    <div className="flex items-center space-x-6 mb-10">
                        <nav className="flex space-x-6 text-gray-500">
                            <button
                                className={`hover:text-gray-900 ${selectedCategory === 'popular' ? 'text-gray-900 font-bold' : ''}`}
                                onClick={() => setSelectedCategory('popular')}
                            >
                                Popular
                            </button>
                            <button
                                className={`hover:text-gray-900 ${selectedCategory === 'upcoming' ? 'text-gray-900 font-bold' : ''}`}
                                onClick={() => setSelectedCategory('upcoming')}
                            >
                                Upcoming
                            </button>
                            <button
                                className={`hover:text-gray-900 ${selectedCategory === 'ongoing' ? 'text-gray-900 font-bold' : ''}`}
                                onClick={() => setSelectedCategory('ongoing')}
                            >
                                Ongoing
                            </button>
                            <button
                                className={`hover:text-gray-900 ${selectedCategory === 'thisWeek' ? 'text-gray-900 font-bold' : ''}`}
                                onClick={() => setSelectedCategory('thisWeek')}
                            >
                                This Week
                            </button>
                        </nav>
                    </div>

                    {/* Render Events Based on Selected Category */}
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
