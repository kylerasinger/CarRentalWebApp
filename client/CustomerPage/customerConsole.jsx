import React, { useState } from 'react';
import PostalCode from './postalCode';
import CarDisplay from '@/components/CARS/carDisplay';
import Footer from "../components/Footer";

export default function CustomerConsole() {
    const [assignedBranch, setAssignedBranch] = useState('');
    const [showModal, setShowModal] = useState(true);
    const [postalCodeSubmitted, setPostalCodeSubmitted] = useState(false);
    const [postalCode, setPostalCode] = useState('');

    const handlePostalCodeSubmit = (postalCode) => {
        // Trim leading and trailing whitespace
        postalCode = postalCode.trim();
    
        // Check if the postal code consists of exactly three characters
        if (postalCode.length !== 3) {
            alert('Please enter a valid 3-character postal code.');
            return;
        }
    
        // Check if all characters in the postal code are alphanumeric
        if (!postalCode.match(/^[0-9a-zA-Z]+$/)) {
            alert('Postal code must contain only letters and numbers.');
            return;
        }
    
        // If the postal code passes validation, continue with further processing
        // Convert postal code to integer
        const postalCodeInt = parseInt(postalCode);
    
        // Divide postal code by 100
        const segment = Math.floor(postalCodeInt / 100);
    
        // Assign branch based on segment
        let branch;
        if (segment === 0) {
            branch = '652 Rue de la Place Publique, Sainte-Dorothée';
        } else if (segment === 1) {
            branch = '1550 Blvd. De Maisonneuve Ouest, Montréal';
        } else {
            branch = '9090 Boul. Leduc, Brossard, QC';
        }
    
        // Set assigned branch and update state
        setAssignedBranch(branch);
        setShowModal(false);
        setPostalCodeSubmitted(true);
    };
    

    const handleChangeBranch = () => {
        // Set showModal to true to reopen the PostalCode modal
        setShowModal(true); 
        // Reset assignedBranch and postalCodeSubmitted state
        setAssignedBranch('');
        setPostalCodeSubmitted(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white px-8">
            {/* Display CarDisplay component */}
            <div className="mt-8 mb-4">
                <CarDisplay />
            </div>
            
            {/* Show PostalCodeModal if showModal is true and postal code is not submitted */}
            <PostalCode
                isOpen={showModal && !postalCodeSubmitted}
                onRequestClose={() => setShowModal(false)}
                onSubmit={handlePostalCodeSubmit}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                maxLength={3}
            />
            
            {/* Display assigned branch after entering postal code */}
            {assignedBranch && !showModal && (
                <div className="mt-4 text-lg font-extrabold text-gray-900">
                    <p>Assigned Branch: {assignedBranch}</p>
                </div>
            )}

            {/* Change Branch button */}
            <div className="mt-2">
                <button onClick={handleChangeBranch} className="text-blue-500 hover:text-blue-700 focus:outline-none w-8 h-8">Change Branch</button>
            </div>
            <Footer/>
        </div>
    );
}














