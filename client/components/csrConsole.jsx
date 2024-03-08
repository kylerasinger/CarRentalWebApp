import React from 'react';
import { Inter } from "next/font/google";
const carsData = [
    { model: 'Toyota Camry', dateIn: '2024-03-01', dateOut: '2024-03-10', renter: 'John Doe' },
    { model: 'Honda Accord', dateIn: '2024-03-02', dateOut: '2024-03-12', renter: 'Jane Smith' },
    // ... other car data with renter names
];
export default function CsrConsole() {
    return (
        <div>
            {/* Header with title and Create button */}
            <div className="flex justify-between items-center bg-white py-4 px-6">
                <h1 className="text-lg font-semibold text-gray-900">Customer Service Representative Console</h1>
                <button className="rounded bg-green-500 py-2 px-4 text-white">Create</button>
            </div>

            <ul role="list" className="divide-y divide-gray-100 bg-white">
              {carsData.map((car, index) => (
                <li key={index} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{car.model}</p>
                      <p className="text-xs text-gray-500">Rented by: {car.renter}</p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">Date In: {car.dateIn}</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">Date Out: {car.dateOut}</p>
                  </div>
                  <div>
                    {/* CRUD operation buttons */}
                    <button className="mr-2 rounded bg-blue-500 py-2 px-4 text-white">Edit</button>
                    <button className="rounded bg-red-500 py-2 px-4 text-white">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
        </div>
    )
}