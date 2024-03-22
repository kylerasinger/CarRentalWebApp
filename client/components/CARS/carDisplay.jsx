
import React, { useEffect, useState } from 'react';
import CarInfo from './carInfo';
import CarData from './CarData';
import CarSelectedBox from './CarSelectedBox';
import CarBrowse from './CarBrowse';
import { XMarkIcon } from '@heroicons/react/24/outline';

const CarDisplay = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isBrowsing, setIsBrowsing] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try{
        const response = await fetch('http://localhost:3001/api/cars');
        if(!response.ok)throw new Error("Get Cars response was not okay");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    } 

    fetchCars();
  }, []);

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const handleCarClose = () => {
    setSelectedCar(null);
    setModalOpen(false);
    setIsBrowsing(false);
  };

  const handleBrowseClick = () => {
    setIsBrowsing(true);
    setSelectedCar(null);
    setModalOpen(false);
  };

  const handleExitBrowse = () => {
    setIsBrowsing(false);
  };

  return (
    <div className={`bg-white ${modalOpen ? 'filter blur-lg' : ''} flex items-center justify-center min-h-screen`}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 relative">
        {!isBrowsing && (
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Cars Available to Rent</h2>
        )}
        <div className="flex items-center justify-between mb-4">
          <div></div>
          <div>
            {isBrowsing ? (
              <button
                onClick={handleExitBrowse}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            ) : (
              <button
                onClick={handleBrowseClick}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Browse Cars
              </button>
            )}
          </div>
        </div>
        {isBrowsing ? (
          <CarBrowse cars = {cars} onCarSelect={handleCarSelect} />
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-12">
            {cars.map((car) => (
              <CarInfo key={car._id} car={car} onClick={() => handleCarSelect(car)} />
            ))}
          </div>
        )}
        {selectedCar && (
          <CarSelectedBox selectedCar={selectedCar} open={modalOpen} onClose={handleCarClose}/>
        )}
      </div>
    </div>
  );
};

export default CarDisplay;

