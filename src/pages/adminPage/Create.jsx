import React from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, MapPin, FileText, Ticket, Users, Globe, Image as ImageIcon } from 'lucide-react';

const Create = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {

        console.log(data);
        // Handle form submission with FormData
        // You can send formData via a POST request
    };

    const handleBannerChange = (e) => {
        // Setting file directly in form data
        if (e.target.files[0]) {
            register('banner').onChange(e);
        }
    };

    // Watch ticket type and capacity to conditionally render fields
    const ticketType = watch('ticketType', 'free');
    const capacity = watch('capacity', 'unlimited');

    return (
        <div className="max-w-2xl mx-auto p-3 rounded-lg mt-9">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600">{watch('isPublic', true) ? 'Public' : 'Private'}</span>
                    <button
                        className={`rounded-full p-1 ${watch('isPublic', true) ? 'bg-blue-500' : 'bg-gray-200'}`}
                        onClick={() => register('isPublic').onChange(!watch('isPublic'))}
                    >
                        <Globe className={`w-4 h-4 ${watch('isPublic', true) ? 'text-white' : 'text-gray-600'}`} />
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Event Name"
                        className="w-full text-3xl font-light text-gray-700 placeholder-gray-400 focus:outline-none"
                        {...register('eventName', { required: 'Event name is required' })}
                    />
                    {errors.eventName && <p className="text-red-500">{errors.eventName.message}</p>}
                </div>

                <div className="flex space-x-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600">Start</label>
                        <input
                            type="datetime-local"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            {...register('startDate', { required: 'Start date is required' })}
                        />
                        {errors.startDate && <p className="text-red-500">{errors.startDate.message}</p>}
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-600">End</label>
                        <input
                            type="datetime-local"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            {...register('endDate', { required: 'End date is required' })}
                        />
                        {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Add Event Location"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            {...register('location', { required: 'Location is required' })}
                        />
                        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <FileText className="w-5 h-5" />
                        <textarea
                            placeholder="Add Description"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            {...register('description')}
                        ></textarea>
                    </div>
                </div>

                {/* Event Banner Upload */}
                <div className="mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                        <ImageIcon className="w-5 h-5" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBannerChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            {...register('banner')}
                        />
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Ticket className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-600">Tickets</span>
                        </div>
                        <select
                            {...register('ticketType')}
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
                                placeholder="Ticket Price"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                {...register('ticketPrice', { required: 'Ticket price is required for paid tickets' })}
                            />
                            {errors.ticketPrice && <p className="text-red-500">{errors.ticketPrice.message}</p>}
                        </div>
                    )}

                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-600">Capacity</span>
                        </div>
                        <select
                            {...register('capacity')}
                            className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="unlimited">Unlimited</option>
                            <option value="limited">Limited</option>
                        </select>
                    </div>
                    {capacity === 'limited' && (
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                placeholder="Enter capacity"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                {...register('customCapacity', { required: 'Custom capacity is required when limited' })}
                            />
                            {errors.customCapacity && <p className="text-red-500">{errors.customCapacity.message}</p>}
                        </div>
                    )}
                </div>

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
