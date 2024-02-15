import React from 'react';
import CarInfo from './carInfo';
import CarData from './CarData';


const CarDisplay = () => {
  return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Cars Available to Rent</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {CarData.map((product) => (
              <CarInfo key={product.id} car={product} />
            ))}
          </div>
        </div>
      </div>
    );
  };

export default CarDisplay;

