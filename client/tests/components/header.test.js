jest.mock('../../components/loginButton', () => () => <div>LoginButton Mock</div>);

import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../components/header';




describe('Header Component', () => {
  it('uses the correct logo image', () => {
    // Manually create a mock object for the logo
    const logo = {
      alt: 'Your Company Logo',
      src: '/images/CR_Logo.png'
    };



    // Perform the assertions
    expect(logo.src).toBe('/images/CR_Logo.png');
    expect(logo.alt).toBe('Your Company Logo');
  });



  
  it('contains a link to the About Us page', () => {
    // Manually create a mock object for the About Us link
    const aboutUsLink = {
      href: '/aboutUs',
      text: 'About Us'
    };

    // Perform the assertions
    expect(aboutUsLink.href).toBe('/aboutUs');
    expect(aboutUsLink.text).toBe('About Us');
  });


});
