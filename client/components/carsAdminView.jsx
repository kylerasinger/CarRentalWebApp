import React, { useEffect, useState } from 'react';



export default function CarsAdminView() {
  const [cars, setCars] = useState([]);

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

  const handleEdit = async (car) => {
    //IMPROVEMENT: this can be replace with a better prompt
    const newName = prompt('Enter new car name:', car.name);
    const newDailyRentalRate = prompt('Enter new daily rental rate:', car.dailyRentalRate);

    if (newName && newDailyRentalRate) {
      try {
        const response = await fetch(`http://localhost:3001/api/cars/${car._id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            name: newName,
            brandId: car.brand._id,
            typeId: car.type._id,
            dailyRentalRate: String(newDailyRentalRate),
            numberOfSeats: car.numberOfSeats,
            numberOfDoors: car.numberOfDoors,
            transmission: car.transmission,
            airConditioner: car.airConditioner,
            numberInStock: car.numberInStock,
            }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const updatedCar = await response.json();
        setCars(cars.map(c => c._id === car._id ? updatedCar : c)); // Update the local state
      } catch (error) {
        console.error('Failed to update car:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3001/api/cars/${id}`, {
          method: 'DELETE', // Use DELETE method for removing resources
          headers: {
            'Content-Type': 'application/json',
            // Include other headers like authorization if needed
          },
          // No need for a body in a DELETE request
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result.message);

        // Remove the deleted car from the state to update the UI
        setCars(cars.filter(car => car._id !== id));
      } catch (error) {
        console.error('Failed to delete car:', error);
      }
    }
  };
  

  const handleAddCar = async () => {
    //will need to make a way for users to pick which brand and which type of car.
    const name = prompt('Enter car name:');
    const dailyRentalRate = prompt('Enter daily rental rate:');
    const brandId = "65dbeafdebb2b3599c6e64e5";
    const typeId = "65ea3b9e7f8bf913a45d79c4";
    const numberOfSeats = prompt('Enter number of seats:');
    const numberOfDoors = prompt('Enter number of doors:');
    const transmission = prompt('Enter transmission type (Manual/Automatic):');
    const airConditioner = prompt('Does the car have an air conditioner? (true/false):');
    const numberInStock = prompt('Enter number in stock:');
  
    if (name && dailyRentalRate && brandId && typeId) {
      try {
        const response = await fetch(`http://localhost:3001/api/cars`, {
          method: 'POST', // Use POST for creating new entries
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            brandId,
            typeId,
            dailyRentalRate: String(dailyRentalRate), // Ensure string format if required by your backend
            numberOfSeats: parseInt(numberOfSeats, 10),
            numberOfDoors: parseInt(numberOfDoors, 10),
            transmission,
            airConditioner: airConditioner === 'true', // Convert string to boolean
            numberInStock: parseInt(numberInStock, 10),
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const newCar = await response.json();
        setCars([...cars, newCar]); // Add the new car to the current list
      } catch (error) {
        console.error('Failed to add car:', error);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow overflow-hidden rounded-md">
        <div className="flex justify-between items-center py-4 px-6 border-b">
          <h1 className="text-lg font-semibold text-gray-900">Admin Car Console</h1>
          <button onClick={handleAddCar} className="rounded bg-green-500 py-2 px-4 text-white">Add Car</button>
        </div>
        <ul role="list" className="divide-y divide-gray-200">
          {cars.map((car) => (
            <li key={car._id} className="flex flex-col md:flex-row justify-between items-center p-4">
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">{car.name}</p>
                <p className="text-sm text-gray-600">Brand: {car.brand.name}</p>
                <p className="text-sm text-gray-600">Type: {car.type.name}</p>
                <p className="text-sm text-gray-600">Daily Rental Rate: ${car.dailyRentalRate}</p>
              </div>
              <div className="flex justify-end">
                <button onClick={() => handleEdit(car)} className="rounded bg-blue-500 py-2 px-4 text-white mr-2">Edit</button>
                <button onClick={() => handleDelete(car._id)} className="rounded bg-red-500 py-2 px-4 text-white">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
