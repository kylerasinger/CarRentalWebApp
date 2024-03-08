import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// Import your components
import UsersAdminView from './usersAdminView';
import CarsAdminView from './carsAdminView';
import RentalsAdminView from './rentalsAdminView';

const navigation = [
  { name: 'Users', href: '#', view: 'users' },
  { name: 'Cars', href: '#', view: 'cars' },
  { name: 'Rentals', href: '#', view: 'rentals' }
];

export default function Example() {
  const [currentView, setCurrentView] = useState('users'); // Default view

  function handleViewChange(view) {
    setCurrentView(view);
  }

  function getViewComponent() {
    switch (currentView) {
      case 'users':
        return <UsersAdminView />;
      case 'cars':
        return <CarsAdminView />;
      case 'rentals':
        return <RentalsAdminView />;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-center">
                  <div className="flex items-center justify-between w-full">
                    {/* Admin Console Text */}
                    <div className="text-white font-medium text-lg">Admin Console</div>

                    <div className="md:block">
                      <div className="flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={`rounded-md px-3 py-2 text-sm font-medium ${currentView === item.view ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                            aria-current={currentView === item.view ? 'page' : undefined}
                            onClick={() => handleViewChange(item.view)}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Render the component based on the current view */}
            {getViewComponent()}
          </div>
        </main>
      </div>
    </>
  );
}
