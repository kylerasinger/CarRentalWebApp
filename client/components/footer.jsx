import React, { useState, useEffect } from 'react';

function Footer() {
    const [companyName, setCompanyName] = useState('Team X Company');

    useEffect(() => {
        // Fetch the dynamic company name or calculate it
        setCompanyName('Team X Company');
    }, []);

    return (
        <footer className="bg-gray-200 text-center text-sm py-3">
            <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
        </footer>
    );
}

export default Footer;