import React, { useState } from 'react';
import { Calendar, MapPin, FileText, Ticket, Users, Globe } from 'lucide-react';
import axios from 'axios';

const Create = () => {
    const [formData, setFormData] = useState({
        name: '',
        eventStart: '',
        eventEnd: '',
        location: '',
        description: '',
        ticketType: 'free',  // Default to free
        ticketPrice: '0',  // Default price for free ticket
        capacity: 'unlimited',  // Default capacity
        customCapacity: '0'  // Default custom capacity
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Setting defaults if not chosen by the user
        let finalCapacity = formData.capacity;
        let finalTicketType = formData.ticketType;

        if (formData.capacity === 'unlimited') {
            finalCapacity = 'unlimited';  // Default to unlimited if not set
        } else if (formData.customCapacity !== '0' && formData.capacity === 'limited') {
            finalCapacity = formData.customCapacity;  // Set to user-defined capacity
        }

        if (formData.ticketType === 'free') {
            finalTicketType = 'free';  // Default to free if not updated
        } else {
            finalTicketType = formData.ticketPrice;  // Set to custom ticket price if it's paid
        }

        const finalData = {
            ...formData,
            capacity: finalCapacity,
            ticketDetail: finalTicketType
        };

        try {
            const token = localStorage.getItem('jwtToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            };

            console.log(finalData);
            const response = await axios.post("http://localhost:8080/event/create", finalData, config);
            console.log(response.data);
            alert("event created successfully")
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-3 rounded-lg mt-9">
            <form onSubmit={handleSubmit}>
                {/* Event Name */}
                <div className="mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Event Name"
                        className="w-full text-3xl font-light text-gray-700 placeholder-gray-400 focus:outline-none"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Start & End Dates */}
                <div className="flex space-x-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600">Start</label>
                        <input
                            type="datetime-local"
                            name="eventStart"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={formData.eventStart}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600">End</label>
                        <input
                            type="datetime-local"
                            name="eventEnd"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={formData.eventEnd}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Location */}
                <div className="mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <input
                            type="text"
                            name="location"
                            placeholder="Add Event Location"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <FileText className="w-5 h-5" />
                        <textarea
                            name="description"
                            placeholder="Add Description"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>

                {/* Ticket Type & Price */}
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Ticket className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-600">Tickets</span>
                        </div>
                        <select
                            name="ticketType"
                            value={formData.ticketType}
                            onChange={handleChange}
                            className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>
                    {formData.ticketType === 'paid' && (
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                name="ticketPrice"
                                placeholder="Ticket Price"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                value={formData.ticketPrice}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {/* Capacity */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-600">Capacity</span>
                        </div>
                        <select
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="unlimited">Unlimited</option>
                            <option value="limited">Limited</option>
                        </select>
                    </div>
                    {formData.capacity === 'limited' && (
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                name="customCapacity"
                                placeholder="Enter capacity"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                value={formData.customCapacity}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default Create;
