import React, { useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import CreateRentalview from '../components/CsrConsoleComponents/createRentalviewAdmin';

export default function RentalsAdminView() {
    const [currentView, setCurrentView] = useState('rentals');
    const [rentals, setRentals] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingRental, setEditingRental] = useState(null);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/rentals');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRentals(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRentals();
    }, []);

    const handleEdit = (rental) => {
        console.log("handleEdit")
        setEditingRental({
            checkIn: rental.checkIn,
            checkOut: rental.checkOut,
            userId: rental.user._id,
            carId: rental.car._id,
            lengthOfRental: Number(rental.lengthOfRental), 
            ccNumber: rental.ccNumber,
            ccExpiry: rental.ccExpiry,
            branchLocation: rental.branchLocation,
            _id: rental._id 
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this rental?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3001/api/rentals/delete/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setRentals(rentals.filter(rental => rental._id !== id));
            } catch (error) {
                console.error('Failed to delete rental:', error);
            }
        }
    };

    const handleSubmit = async () => {
        if (!editingRental._id) {
            console.error('Error: No rental selected for editing');
            return;
        }
        if (editingRental && editingRental._id) {
            const { _id, checkIn, checkOut, ...payload } = editingRental;
            payload.checkIn = checkIn;
            payload.checkOut = checkOut;    
            console.log("rental data sent to post: "  + JSON.stringify(editingRental));
            console.log("rental id we are editing: " + editingRental._id)
            try {
                const response = await fetch(`http://localhost:3001/api/rentals/update/${_id}`, {
                    method: 'POST', 
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    });
        
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
        
                    const updatedRental = await response.json();
                    // Update local state with the updated rental
                    setRentals(prevRentals => prevRentals.map(rental => 
                        rental._id === updatedRental._id ? updatedRental : rental
                    ));
                    // Reset editingRental and close the modal
                    setEditingRental(null);
                    setShowModal(false);
                } catch (error) {
                    console.error('Error updating rental:', error);
                }
            }
        };
    const handleViewChange = (view) => {
            setCurrentView(view);
        };
    const getViewComponent = () => {
            switch (currentView) {
              case 'rentals':
                return (
                  <div>
                    <div className="flex justify-between items-center bg-white py-4 px-6">
                      <h1 className="text-lg font-semibold text-gray-900">Admin Rental Console</h1>
                      <button onClick={() => handleViewChange('cars')} className="rounded bg-green-500 py-2 px-4 text-white">Create</button>
                    </div>
        
                    <ul role="list" className="divide-y divide-gray-100 bg-white">
                      {rentals.map((rental, index) => (
                        <li key={index} className="flex justify-between items-center py-5">
                          <div className="flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{rental.car.name}</p>
                            <p className="text-xs text-gray-500">Rented by: {rental.user.name}</p>
                            <p className="text-xs text-gray-500">Email: {rental.user.email}</p>
                            <p className="text-xs text-gray-500">Location: {rental.branchLocation}</p>
                          </div>
                          <div className="flex-grow text-center">
                            <p className="text-xs text-gray-500">Date In: {new Date(rental.dateOut).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-500">Date Out: {new Date(rental.dateOut).toLocaleDateString()}</p>
                          </div>
                          <div className="flex justify-end">
                             <button onClick={() => handleEdit(rental)} className="rounded bg-blue-500 py-2 px-4 text-white mr-2">Edit</button>
                            <button onClick={() => handleDelete(rental._id)} className="rounded bg-red-500 py-2 px-4 text-white">Delete</button>
                          </div>
                        </li>
                        
                      ))}
                    </ul>
                  </div>
                );
              case 'cars':
                return <CreateRentalview />;
              default:
                return null;
            }
          };

    return (
        <div>
            {getViewComponent()}
            
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Edit Rental
                        </h2>
            <input
                type="number"
                name="lengthOfRental"
                placeholder="Length of Rental (days)"
                value={editingRental.lengthOfRental}
                onChange={(e) => setEditingRental({ ...editingRental, lengthOfRental: e.target.value })}
                className="mt-2 p-2 border rounded"
            />
            <input
                type="text"
                name="ccNumber"
                placeholder="Credit Card Number"
                value={editingRental.ccNumber}
                onChange={(e) => setEditingRental({ ...editingRental, ccNumber: e.target.value })}
                className="mt-2 p-2 border rounded"
            />
            <input
                 type="text"
                name="ccExpiry"
                placeholder="Credit Card Expiry Date"
                value={editingRental.ccExpiry}
                onChange={(e) => setEditingRental({ ...editingRental, ccExpiry: e.target.value })}
                className="mt-2 p-2 border rounded"
            />
            <input
                type="text"
                 name="branchLocation"
                placeholder="Branch Location"
                value={editingRental.branchLocation}
                onChange={(e) => setEditingRental({ ...editingRental, branchLocation: e.target.value })}
                className="mt-2 p-2 border rounded"
            />
             <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Check In
            </label>
            <input
                type="checkbox"
                checked={editingRental.checkIn}
                onChange={(e) => setEditingRental({ ...editingRental, checkIn: e.target.checked })}
                className="mt-2"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Check Out
            </label>
            <input
                type="checkbox"
                checked={editingRental.checkOut}
                onChange={(e) => setEditingRental({ ...editingRental, checkOut: e.target.checked })}
                className="mt-2"
            />
            
        </div>
            
            <div className="flex justify-end mt-4">
                            <button
                                className="rounded bg-blue-500 py-2 px-4 text-white mr-2"
                                onClick={handleSubmit}
                            >
                                Update
                            </button>
                            <button
                                className="rounded bg-red-500 py-2 px-4 text-white"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                </div>
                </div>
            </div>
        )}

        </div>
    );
}
