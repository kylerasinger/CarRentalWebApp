import React, { useState } from 'react';

const PostalCodeInput = ({ onSubmit }) => {
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(postalCode);
  };

  return (
    <div className="postal-code-input">
      <h2>Enter Your Postal Code</h2>
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
  );
};

export default PostalCodeInput;
