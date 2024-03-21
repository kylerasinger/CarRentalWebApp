import React from 'react';
import Header from "../../components/header"

//For Viktor
//  This page should run and show you the header aswell as the "rental data for Aventador" with my name under.
//  Page is at http://localhost:3000/rentals/65fb9e0beed7d53520cfaa52
//
// So the goal of this page is to show the user the details of their reservation. 
// They must know the following
//  Name, car 
//  status of rental (checkin and checkout flags)
//  date the car was rented (dateout)
//  date the car needs to be brough back (checkout)
//      (add the lengthOfRental to the date to get the checkOut date)
//  Cost of rental (length*price)
//  location to checkin and checkout
//  the process for checkin and checkout
//
//User needs to see all this, make sure it follows what prof needs for sprint 3 (within reason)
//
// Extra notes:
//  checkIn is when they pick up the car
//  checkout is when they leave it.


const RentalDetails = ({ rental }) => {
  // Render your rental details using the `rental` prop
  return (
    <div>
        <Header></Header>   
      <h1>Rental Details for {rental.car.name}</h1>
      <p>User: {rental.user.name}</p>
      <p>Email: {rental.user.email}</p>
      <p>Location: {rental.branchLocation}</p>
      {/* Add more details as needed */}
    </div>
  );
};

//dont need to touch this, this is the API call
export async function getServerSideProps(context) {
  const { id } = context.params; // Access the dynamic ID
  const res = await fetch(`http://localhost:3001/api/rentals/${id}`);
  const rental = await res.json();

  return {
    props: { rental }, // Pass the rental data to the page as props
  };
}

export default RentalDetails;
