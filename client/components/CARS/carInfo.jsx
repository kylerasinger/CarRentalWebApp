import React from 'react';

const CarInfo = ({ car, onClick }) => {
  // Assuming `car` object now contains `_id` directly from your backend response
  // and you've adjusted any necessary props accordingly (e.g., `price` might be `car.dailyRentalRate` now)
  console.log(car);
  const { _id, name, numberInStock, dailyRentalRate } = car;

  // Construct the image source URL using the image proxy service
  const imageSrc = `http://localhost:3001/api/cars/images/${_id}`;

  return (
    <a href="#!" className="group" onClick={onClick}>
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={imageSrc}
          alt={`Image of ${name}`} // Adjust `alt` text dynamically based on the car's name
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-5 text-xl text-gray-900 italic">{car.brand.name} {name}</h3>
      <p className="mt-2 text-xl font-medium text-gray-900 italic">{`$${dailyRentalRate} per day`}</p> {/* Example of displaying price dynamically */}
    </a>
  );
};

export default CarInfo;
