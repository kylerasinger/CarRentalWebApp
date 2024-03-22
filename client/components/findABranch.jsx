import React, { useState } from 'react';

const CustomerCarView = () => {
  const [postalCode, setPostalCode] = useState('');
  const [assignedBranch, setAssignedBranch] = useState('');

  const handlePostalCodeSubmit = () => {
    // Convert postal code to integer
    const postalCodeInt = parseInt(postalCode);

    // Calculate branch based on postal code
    const branch = calculateBranch(postalCodeInt);

    // Set assigned branch
    setAssignedBranch(branch);
  };

  const calculateBranch = (postalCodeInt) => {
    // Divide postal code by 3 and determine the branch
    const branchNumber = Math.floor(postalCodeInt / 3) + 1;
    return `Branch ${branchNumber}`;
  };

  return (
    <div>
      <h2>Customer Car View</h2>
      <button onClick={() => setShowPopup(true)}>Enter Postal Code</button>

      {showPopup && (
        <div className="popup">
          <input
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <button onClick={handlePostalCodeSubmit}>Submit</button>
        </div>
      )}

      {assignedBranch && (
        <div>
          <h3>Assigned Branch:</h3>
          <p>{assignedBranch}</p>
        </div>
      )}
    </div>
  );
};

export default findABranch;
