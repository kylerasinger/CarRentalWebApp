import { useState } from 'react';
const carsData = [
    { model: 'Toyota Camry', dateIn: '2024-03-01', dateOut: '2024-03-10', renter: 'John Doe' },
    { model: 'Honda Accord', dateIn: '2024-03-02', dateOut: '2024-03-12', renter: 'Jane Smith' },
    // ... other car data with renter names
];
export default function CsrConsole() {
  const [showModal, setShowModal] = useState(false);
    const [newCar, setNewCar] = useState({
        name: '',
        email: '',
        brand: '',
        dailyRate: '',
        dateOut: '',
    });

    const handleInputChange = (e) => {
        setNewCar({ ...newCar, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
      const apiUrl = 'http://localhost:3001/api/rentals'; // Replace with your actual API endpoint
      console.log("handleSubmit called");

      fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCar),
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          // Optionally, update your state/UI here with the new data
          setShowModal(false); // Close modal after successful submission
      })
      .catch((error) => {
          console.error('Error:', error);
          // Optionally, handle any UI updates or alerts for the error
      });
    };
    return (
        <div>
            {/* Header with title and Create button */}
            <div className="flex justify-between items-center bg-white py-4 px-6">
                <h1 className="text-lg font-semibold text-gray-900">Customer Service Representative Console</h1>
                <button onClick={() => setShowModal(true)} className="rounded bg-green-500 py-2 px-4 text-white">Create</button>
            </div>

            <ul role="list" className="divide-y divide-gray-100 bg-white">
              {carsData.map((car, index) => (
                <li key={index} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{car.model}</p>
                      <p className="text-xs text-gray-500">Rented by: {car.renter}</p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">Date In: {car.dateIn}</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">Date Out: {car.dateOut}</p>
                  </div>
                  <div>
                    {/* CRUD operation buttons */}
                    <button className="mr-2 rounded bg-blue-500 py-2 px-4 text-white">Edit</button>
                    <button className="rounded bg-red-500 py-2 px-4 text-white">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h2 className="text-lg font-semibold text-gray-900">Add New Car</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={handleInputChange}
                            className="mt-2 p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                            className="mt-2 p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="brand"
                            placeholder="Car Brand"
                            onChange={handleInputChange}
                            className="mt-2 p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="dailyRate"
                            placeholder="Daily Rent Rate"
                            onChange={handleInputChange}
                            className="mt-2 p-2 border rounded"
                        />
                        <input
                            type="date"
                            name="dateOut"
                            onChange={handleInputChange}
                            className="mt-2 p-2 border rounded"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                className="rounded bg-blue-500 py-2 px-4 text-white mr-2"
                                onClick={handleSubmit}
                            >
                                Save
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
    )
}