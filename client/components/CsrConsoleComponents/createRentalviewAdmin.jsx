import React, { useEffect, useState } from 'react';

export default function createrentalview() {
  const [cars, setCars] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRental, setNewRental] = useState({
    carId: '',
    userId: '',
    branchLocation: '',
    lengthOfRental: '',
    ccNumber: '',
    ccExpiry: '',
    checkIn: 'false',
    checkOut: 'false'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/cars');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCars(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = (carId) => {
    setNewRental({ ...newRental, carId });
    setShowModal(true);
  };

  const handleCreateRental = async () => {
    console.log("we are creating a rental");
    if (newRental.userId) {
        console.log(JSON.stringify(newRental, null, 2));
      try {
        const response = await fetch(`http://localhost:3001/api/rentals`, {
          method: 'POST', // Use POST for creating new entries
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            carId: newRental.carId,
            userId: newRental.userId, 
            branchLocation: newRental.branchLocation,
            lengthOfRental: parseInt(newRental.lengthOfRental, 10),
            ccNumber: newRental.ccNumber, 
            ccExpiry: newRental.ccExpiry, 
            checkIn: newRental.checkIn,
            checkOut: newRental.checkOut 
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const rental = await response.json();
        setRentals([...rentals, rental]); 
        setShowModal(false); 
        setNewRental({});
      } catch (error) {
        console.error('Failed to add car:', error);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };
  
  
  return (
    <div className="container mx-auto p-4">
      <ul role="list" className="divide-y divide-gray-200 bg-white shadow overflow-hidden rounded-md">
      <a href="adminView" className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded block w-fit mb-2">
            Back to Admin Console
          </a>
        {cars.map((car) => (
          <li key={car._id} className="flex flex-col md:flex-row justify-between items-center p-4">
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-800">{car.name}</p>
              <p className="text-sm text-gray-600">Brand: {car.brand.name}</p>
              <p className="text-sm text-gray-600">Type: {car.type.name}</p>
              <p className="text-sm text-gray-600">Daily Rental Rate: ${car.dailyRentalRate}</p>
            </div>
            
            {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h2 className="text-lg font-semibold text-gray-900">Create Rental</h2>
            
            <input
              type="text"
              name="userId"
              placeholder="User ID"
              value={newRental.userId}
              onChange={(e) => setNewRental({ ...newRental, userId: e.target.value })}
              className="mt-2 p-2 border rounded"
            />
            <input
              type="number"
              name="LengthOfRental"
              placeholder="Length of Rental (days)"
              value={newRental.lengthOfRental}
              onChange={(e) => setNewRental({ ...newRental, lengthOfRental: e.target.value })}
              className="mt-2 p-2 border rounded"
            />
            <input
              type="text"
              name="ccNumber"
              placeholder="Credit Card Number"
              value={newRental.ccNumber}
              onChange={(e) => setNewRental({ ...newRental, ccNumber: e.target.value })}
              className="mt-2 p-2 border rounded"
            />
            <input
              type="text"
              name="ccExpiry"
              placeholder="Credit Card Expiry Date"
              value={newRental.ccExpiry}
              onChange={(e) => setNewRental({ ...newRental, ccExpiry: e.target.value })}
              className="mt-2 p-2 border rounded"
            />
            <input
              type="text"
              name="branchLocation"
              placeholder="Branch Location"
              value={newRental.branchLocation}
              onChange={(e) => setNewRental({ ...newRental, branchLocation: e.target.value })}
              className="mt-2 p-2 border rounded"
            />
            <div className="flex justify-end mt-4">
              <button
                className="rounded bg-blue-500 py-2 px-4 text-white mr-2"
                onClick={handleCreateRental}
              >
                Add Rental
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
            <button 
              onClick={() => handleOpenModal(car._id)} 
              className="mt-2 md:mt-0 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md">
              Create Rental
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}   