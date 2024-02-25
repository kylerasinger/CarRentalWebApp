import React, { useState } from 'react';
import CarInfo from './CarInfo';
import CarData from './CarData';

const CarDisplay = () => {
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCarSelect = (car) => {
    setSelectedCar(car);
  };

  const handleCarClose = () => {
    setSelectedCar(null);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Cars Available to Rent</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {CarData.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => handleCarSelect(product)}
            >
              <CarInfo car={product} />
            </div>
          ))}
        </div>
        {selectedCar && (
          <div className="bg-white p-4 mt-4">
            <h2 className="text-2xl font-bold mb-4">{selectedCar.name}</h2>
            <img
              src={selectedCar.imageSrc}
              alt={selectedCar.imageAlt}
              className="h-full w-full object-cover object-center mb-4 rounded-lg"
            />
           <p className="text-gray-700 text-xl font-bold mb-2">Car: {selectedCar.name}</p>
           <p className="text-gray-700 text-xl font-bold mb-2">Price: {selectedCar.price}</p>

            {/* Add other details as needed */}
            <div className="flex space-x-4">
              {/* Add reservation form or any other content as needed */}
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center"
                onClick={handleCarClose}
              >
                Reserve Now
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center"
                onClick={handleCarClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDisplay;
