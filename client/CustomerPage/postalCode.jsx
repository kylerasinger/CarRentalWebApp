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
      <div className="modal-content">
        <h2>Enter Your First Three Digit Postal Code</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Modal>
  );
};

export default PostalCodeModal;
