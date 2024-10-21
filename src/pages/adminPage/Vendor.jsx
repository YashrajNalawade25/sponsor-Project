import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'; // Plus and minus icons
import { useEffect } from 'react';

const VendorManagement = () => {
    const [vendorName, setVendorName] = useState('');
    const [vendorType, setVendorType] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [pricing, setPricing] = useState('');
    const [vendorList, setVendorList] = useState([]);
    const [showForm, setShowForm] = useState(false); // State to manage form visibility
    const { eventId } = useParams();

    const handleAddVendor = async (e) => {
        e.preventDefault();
        const newVendor = {
            name: vendorName,
            type: vendorType,
            phoneNo: phone,
            email: email,
            description: serviceDescription,
            pricing: pricing,
        };

        const token = localStorage.getItem('jwtToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': "application/json"
            }
        }

        const response = await axios.post(`http://localhost:8080/event/${eventId}/vendor/add`, newVendor, config);
        console.log(response.status);


        setVendorList([...vendorList, newVendor]);
        setVendorName('');
        setVendorType('');
        setPhone('');
        setEmail('');
        setServiceDescription('');
        setPricing('');
        setShowForm(false); // Hide form after submission
    };

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': "application/json"
            }
        }

        const fetchVendor = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/event/${eventId}/vendor/listing`, config)
                setVendorList(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchVendor();
    }, [vendorList])

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h2 className="text-xl font-bold mb-6">Vendor Management</h2>

            {/* Add Vendor Button */}
            <button
                onClick={() => setShowForm(!showForm)}
                className="bg-green-500 text-white flex items-center px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
                {showForm ? (
                    <>
                        <AiOutlineMinusCircle className="mr-2" /> Hide Form
                    </>
                ) : (
                    <>
                        <AiOutlinePlusCircle className="mr-2" /> Add New Vendor
                    </>
                )}
            </button>

            {/* Vendor Form, hidden by default */}
            {showForm && (
                <form onSubmit={handleAddVendor} className="bg-white p-6 rounded-lg shadow-md mb-6 mt-6">
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
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Add Vendor
                    </button>
                </form>
            )}

            {/* Vendor List */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-semibold mb-4">Vendor List</h3>
                <ul className="divide-y divide-gray-200">
                    {vendorList.map((vendor) => (
                        <li key={vendor.id} className="py-4 flex justify-between">
                            <div>
                                <p className="font-medium">{vendor.name}</p>
                                <p className="text-gray-500">{vendor.type}</p>
                                <p className="text-gray-500">{vendor.phoneNo}</p>
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
