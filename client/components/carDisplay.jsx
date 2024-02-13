import React from 'react';

const Car = ({ car }) => {

    const {id, name, model, price, images} = car;


  return (
    <div key={id} className="group relative">
      <div className="gallery">
       
       {images.map((image, index) => 
       <img
          key = {index}
          src={image}
          alt={`${name} - ${index}`}
          className="gallery-image"
        />)}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={car.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {car.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{car.model}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{car.price}</p>
      </div>
    </div>
  );
};

export default Car;

