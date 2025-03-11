import React, { useState } from 'react';
import { Calendar, MapPin, FileText, Ticket, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Create = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ticketType, setTicketType] = useState('free');
    const [capacityType, setCapacityType] = useState('unlimited');

    const onSubmit = async (data) => {
        // Modify data as per ticket and capacity type
        const finalCapacity = capacityType === 'unlimited' ? 'unlimited' : data.customCapacity;
        const finalTicketPrice = ticketType === 'free' ? 'free' : data.ticketPrice;

        const finalData = {
            ...data,
            capacity: finalCapacity,
            ticketDetail: finalTicketPrice
        };

        try {
            const token = localStorage.getItem('jwtToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            console.log(finalData);
            const response = await axios.post('http://localhost:8080/event/create', finalData, config);
            console.log(response.data);
            alert('Event created successfully');
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-3 rounded-lg mt-9">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Event Name */}
                <div className="mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Event Name"
                        className="w-full text-3xl font-light text-gray-700 placeholder-gray-400 focus:outline-none"
                        {...register('name', { required: 'Event name is required' })}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Start & End Dates */}
                <div className="flex space-x-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600">Start</label>
                        <input
                            type="datetime-local"
                            name="eventStart"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            {...register('eventStart', { required: 'Start date is required' })}
                        />
                        {errors.eventStart && <p className="text-red-500 text-sm">{errors.eventStart.message}</p>}
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600">End</label>
                        <input
                            type="datetime-local"
                            name="eventEnd"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            {...register('eventEnd', { required: 'End date is required' })}
                        />
                        {errors.eventEnd && <p className="text-red-500 text-sm">{errors.eventEnd.message}</p>}
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
                            {...register('location', { required: 'Location is required' })}
                        />
                    </div>
                    {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                </div>

                {/* Description */}
                <div className="mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <FileText className="w-5 h-5" />
                        <textarea
                            name="description"
                            placeholder="Add Description"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            {...register('description')}
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
                            value={ticketType}
                            onChange={(e) => setTicketType(e.target.value)}
                            className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>
                    {ticketType === 'paid' && (
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                name="ticketPrice"
                                placeholder="Ticket Price"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                {...register('ticketPrice', {
                                    required: 'Ticket price is required for paid events',
                                    min: { value: 1, message: 'Price cannot be negative' },
                                })}
                            />
                            {errors.ticketPrice && <p className="text-red-500 text-sm">{errors.ticketPrice.message}</p>}
                        </div>
                    )}
                </div>

                {/* Capacity */}
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-600">Capacity</span>
                        </div>
                        <select
                            name="capacity"
                            value={capacityType}
                            onChange={(e) => setCapacityType(e.target.value)}
                            className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="unlimited">Unlimited</option>
                            <option value="limited">Limited</option>
                        </select>
                    </div>
                    {capacityType === 'limited' && (
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                name="customCapacity"
                                placeholder="Enter capacity"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                {...register('customCapacity', {
                                    required: 'Custom capacity is required for limited events',
                                    min: { value: 1, message: 'Capacity cannot be negative or zero' },
                                })}
                            />
                            {errors.customCapacity && <p className="text-red-500 text-sm">{errors.customCapacity.message}</p>}
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
