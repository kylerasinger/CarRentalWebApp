import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const CarSelectedBox = ({ selectedCar, open, onClose }) => {

        if (!selectedCar) {
          
          return null;
        }
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
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
              <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="aspect-w-1 aspect-h-1">
                  <img src={selectedCar.imageSrc} alt={selectedCar.imageAlt} className="object-cover object-center rounded-lg" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-bold text-gray-900">{selectedCar.name}</h3>
                  <p className="text-lg text-gray-700 mb-2">Price: {selectedCar.price}</p>
                  <p className="text-lg text-gray-700 mb-2">Description: {selectedCar.description}</p>
                </div>
              </div>
              <div className="mt-6 text-center md:text-center">
                <button
                  className="bg-orange-600 text-white px-10 py-4 rounded-md hover:bg-orange-700 focus:outline-none"
                  onClick={onClose}
                >
                  Reserve Now
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CarSelectedBox;
