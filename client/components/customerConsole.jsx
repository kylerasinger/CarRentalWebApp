
import React, { useState } from 'react';
import PostalCode from './postalCode';
import CarDisplay from './CARS/carDisplay';

export default function CustomerConsole() {
    const [assignedBranch, setAssignedBranch] = useState('');
    const [showModal, setShowModal] = useState(true);
    const [postalCodeSubmitted, setPostalCodeSubmitted] = useState(false); // New state to track if postal code is submitted

    const handlePostalCodeSubmit = (postalCode) => {
        if (postalCode.trim() === '') {
            alert('Please enter a postal code.');
            return;
        }
        
        setShowModal(false); // Close the modal after submitting postal code
        setPostalCodeSubmitted(true); // Update state to indicate postal code is submitted
    };

    return (
        <div>
        
            
            {/* Show PostalCodeModal if showModal is true and postal code is not submitted */}
            <PostalCode
              isOpen={showModal && !postalCodeSubmitted}
              onRequestClose={() => setShowModal(false)}
              onSubmit={handlePostalCodeSubmit}
            />
            
            {/* Display CarDisplay component after entering postal code */}
            {!showModal && postalCodeSubmitted && (
                <CarDisplay />
            )}
            
        </div>
    );
}
