import React, { useState, useEffect } from 'react';
import CarInfo from './carInfo';


const CarBrowse = ({cars, onCarSelect }) => {
  cars.map((c)=>console.log(c.name))
  
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const filteredCars = cars.filter((car) =>
      (car.brand.name +" "+car.name).toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Browse Cars</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search cars..."
            className="border p-2 w-full"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-12">
          {filteredCars.map((car) => (
            <CarInfo key={car.brand} car={car} onClick={() => onCarSelect(car)} />
          ))}
        </div>
      </div>
    );
  };
  
  export default CarBrowse;
