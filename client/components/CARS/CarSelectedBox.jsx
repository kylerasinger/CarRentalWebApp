
import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ReservationBox from '../RESERVATION/ReservationBox';
import ReservationPage from '../RESERVATION/ReservationPage';

const CarSelectedBox = ({ selectedCar, open, onClose }) => {
  const [showReservationForm, setShowReservationForm] = useState(false);
  const imageSrc = `http://localhost:3001/api/cars/images/${selectedCar._id}`;

  console.log(selectedCar.dailyRentalRate);
  const handleFormSubmit = (data) => {
    console.log('Form data:', data);
  };

  const handleReserveNow = () => {
    setShowReservationForm(true);
  };

  const handleClose = () => {
    setShowReservationForm(false);
    onClose();
  };

  if (!selectedCar) {
    return null;
  }

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={handleClose}>
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative z-10 bg-white p-6 rounded-lg shadow-md">
              <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={handleClose}>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {showReservationForm ? (
            
                <ReservationPage selectedCar={selectedCar} onSubmit={handleFormSubmit} onClose={handleClose} />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="aspect-w-1 aspect-h-1">
                    <img src={imageSrc} alt={selectedCar.imageAlt} style={{ maxWidth: '300px', maxHeight: '300px', width: 'auto', height: 'auto' }} className="object-cover object-center rounded-lg" />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-3xl font-bold text-gray-900">{selectedCar.brand.name} {selectedCar.name}</h3>
                      <p className="text-lg text-gray-700 mb-2">Price: {selectedCar.dailyRentalRate}$/day</p>
                      <p className="text-lg text-gray-700 mb-2">
                        <li>Brand: {selectedCar.brand.name}</li>
                        <li>Class of Vehicle: {selectedCar.type.name}</li>
                        <li># of Seats: {selectedCar.numberOfSeats}</li>
                        <li># of Doors: {selectedCar.numberOfDoors}</li>
                        <li>Transmission: {selectedCar.transmission}</li>
                        <li>Air Conditioner: {selectedCar.airConditioner}</li>


                      </p>
                    </div>
                  </div>

                  <ReservationBox onClose={onClose} onReserveNow={handleReserveNow} />
                </>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CarSelectedBox;
