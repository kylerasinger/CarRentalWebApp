import React from 'react';

const ReservationBox = ({ onClose, onReserveNow }) => {
  return (
    <div className=" text-center md:text-center">
      <button
        className="bg-blue-500 text-white px-10 py-4 rounded-md hover:bg-blue-700 focus:outline-none"
        onClick={() => onReserveNow()}
      >
        Reserve Now
      </button>
    </div>
  );
};

export default ReservationBox;