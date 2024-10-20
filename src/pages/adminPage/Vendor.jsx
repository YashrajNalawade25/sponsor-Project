import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VendorManagement = () => {
    const [vendorName, setVendorName] = useState('');
    const [vendorType, setVendorType] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [pricing, setPricing] = useState('');
    const [vendorList, setVendorList] = useState([]);
    const { eventId } = useParams();

    const handleAddVendor = (e) => {
        e.preventDefault();
        const newVendor = {
            id: Date.now(),
            name: vendorName,
            type: vendorType,
            phone: phone,
            email: email,
            description: serviceDescription,
            pricing: pricing,
        };
        setVendorList([...vendorList, newVendor]);
        setVendorName('');
        setVendorType('');
        setPhone('');
        setEmail('');
        setServiceDescription('');
        setPricing('');
    };

    const token = localStorage.getItem('jwtToken');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }

    // useEffect(() => {


    //     const vendorList = async () => {
    //         try {
    //             // adding vendor list to the database use the event ID to store this list
    //             const response = await axios.post("", vendorList, config);
    //             console.log(response);
    //         }
    //         catch (error) {
    //             console.error(error)
    //         }

    //     }


    // }, [vendorList, eventId])


    // useEffect(() => {

    //     //here we will be calling for the same DB to get the list of vendors and display this 
    //     const fetchVendors = async () => {
    //         const response = await axios.get("", config);
    //         console.log(response.data);
    //     }
    // }, [])

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h2 className="text-xl font-bold mb-6">Vendor Management</h2>
            <form onSubmit={handleAddVendor} className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700">Vendor Name:</label>
                    <input
                        type="text"
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Vendor Type:</label>
                    <input
                        type="text"
                        value={vendorType}
                        onChange={(e) => setVendorType(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Service Description:</label>
                    <textarea
                        value={serviceDescription}
                        onChange={(e) => setServiceDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Pricing:</label>
                    <input
                        type="text"
                        value={pricing}
                        onChange={(e) => setPricing(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Add Vendor
                </button>
            </form>

            {/* Vendor List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Vendor List</h3>
                <ul className="divide-y divide-gray-200">
                    {vendorList.map((vendor) => (
                        <li key={vendor.id} className="py-4 flex justify-between">
                            <div>
                                <p className="font-medium">{vendor.name}</p>
                                <p className="text-gray-500">{vendor.type}</p>
                                <p className="text-gray-500">{vendor.phone}</p>
                                <a
                                    href={`mailto:${vendor.email}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {vendor.email}
                                </a>
                            </div>
                            <div className="text-gray-500">{vendor.pricing}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VendorManagement;
