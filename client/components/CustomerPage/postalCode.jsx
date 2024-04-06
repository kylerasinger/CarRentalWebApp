import React, { useState } from 'react';
import Modal from 'react-modal';


const PostalCodeModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(postalCode);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content rounded-md bg-white shadow-lg p-5 mx-auto my-12 max-w-sm w-full">
        <h2>Enter Your First Three Digit Postal Code</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            className="mt-5 mx-3 rounded-md p-2 outline"
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <button className="inline-flex items-center justify-center bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-700 focus:outline-none" type="submit">  Submit</button>
        </form>
      </div>
    </Modal>
  );
};

export default PostalCodeModal;
