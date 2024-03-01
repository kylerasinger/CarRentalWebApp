import React from 'react';

const ReservationBox = ({ onClose, onReserveNow }) => {
  return (
    <div className="mt-6 text-center md:text-center">
      <button
        className="bg-orange-600 text-white px-10 py-4 rounded-md hover:bg-orange-700 focus:outline-none"
        onClick={() => onReserveNow()}
      >
        Reserve Now
      </button>
    </div>
  );
};

export default ReservationBox;
