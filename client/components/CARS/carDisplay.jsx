import React, { useState } from 'react';
import CarID from './carInfo';  // Update the import statement
import CarData from './CarData';
import CarSelectedBox from './CarSelectedBox';

const CarDisplay = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const handleCarClose = () => {
    setSelectedCar(null);
    setModalOpen(false);
  };

  return (
    <div className={`bg-white ${modalOpen ? 'filter blur-lg' : ''} flex items-center justify-center min-h-screen`}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Cars Available to Rent</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-12">
          {CarData.map((product) => (
            <CarID key={product.id} car={product} onClick={() => handleCarSelect(product)} />
          ))}
        </div>
        {selectedCar && (
          <CarSelectedBox selectedCar={selectedCar} open={modalOpen} onClose={handleCarClose} />
        )}
      </div>
    </div>
  );
};

export default CarDisplay;
