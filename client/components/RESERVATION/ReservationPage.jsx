import React, { useState } from 'react';

const ReservationPage = ({ selectedCar, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    pickupDate: '',
    returnDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-4">Car Reservation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="aspect-w-1 aspect-h-1">
          <img src={selectedCar.imageSrc} alt={selectedCar.imageAlt} className="object-cover object-center rounded-lg" />
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-3xl font-bold text-gray-900">{selectedCar.name}</h3>
          <p className="text-lg text-gray-700 mb-2">Price: {selectedCar.price}</p>
          <p className="text-lg text-gray-700 mb-2">Description: {selectedCar.description}</p>

          <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="123-456-7890"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">
                Pickup Date
              </label>
              <input
                type="date"
                id="pickupDate"
                name="pickupDate"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="yyyy/mm/dd"
                value={formData.pickupDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">
                Return Date
              </label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="yyyy/mm/dd"
                value={formData.returnDate}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 focus:outline-none"
            >
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;



