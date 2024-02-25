// CarDisplay.js
import React, { Fragment, useState } from 'react';
import CarInfo from './CarInfo';
import CarData from './CarData';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const CarDisplay = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [open, setOpen] = useState(false);

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setOpen(true);
  };

  const handleCarClose = () => {
    setSelectedCar(null);
    setOpen(false);
  };

  return (
    <div className={`bg-white ${selectedCar ? 'filter blur-lg' : ''} flex items-center justify-center min-h-screen`}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Cars Available to Rent</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-12">
          {CarData.map((product) => (
            <div key={product.id} className="group" onClick={() => handleCarSelect(product)}>
              <CarInfo car={product} />
            </div>
          ))}
        </div>
        {selectedCar && (
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={handleCarClose}>
              <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="relative z-10 bg-white p-6 rounded-lg shadow-md">
                    <button
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                      onClick={handleCarClose}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="aspect-w-1 aspect-h-1">
                        <img
                          src={selectedCar.imageSrc}
                          alt={selectedCar.imageAlt}
                          className="object-cover object-center rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">{selectedCar.name}</h3>
                        <p className="text-lg text-gray-700 mb-2">Price: {selectedCar.price}</p>
                        <p className="text-lg text-gray-700 mb-2">Description: {selectedCar.description}</p>
                        <div className="mt-6 text-center md:text-left">
                          <button
                            className="bg-indigo-600 text-white px-10 py-4 rounded-md hover:bg-indigo-700 focus:outline-none"
                            onClick={handleCarClose}
                          >
                            Reserve Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        )}
      </div>
    </div>
  );
};

export default CarDisplay;

