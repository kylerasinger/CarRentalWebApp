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
  return (
    <div>
      <Header/>
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">Thank you for renting with us!</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Rental Details:</h2>
          <p><span className="font-semibold">Car:</span> {rental.car.name}</p>
          <p><span className="font-semibold">User:</span> {rental.user.name}</p>
          <p><span className="font-semibold">Email:</span> {rental.user.email}</p>
          <p><span className="font-semibold">Location:</span> {rental.branchLocation}</p>
          {/* Add more details as needed */}
        </div>
      </div>

      <div className="max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Pickup Details:</h2>
          <p className="text-lg">Pick up your car the 22nd March 2024 at 1:00 pm at the following address:</p>
          <p className="text-lg">123 Smith Str. Montreal</p>

        </div>

        <div className="max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Drop Off Details:</h2>
          <p className="text-lg">Drop off up your car the 31nd March 2024 at 1:00 pm at the following address:</p>
          <p className="text-lg">123 Smith Str. Montreal</p>

          <div className="flex justify-center pt-8">
          <a href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to Homepage
          </a>
        </div>
        </div>

{/*Added the form in a list format*/}
<div className="max-w-3xl mx-auto mb-8 pt-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">1. Renter's Information:</h2>
          <p>Name: {rental.user.name}</p>
          <p>Address: 3078  St Jean Baptiste St, Laval</p>
          <p>Contact Number: 514-838-2425</p>
          <p>Email Address: {rental.user.email}</p>
          <p>Driver's License Number: T7284-040801-05</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">2. Vehicle Information:</h2>
          <p>Make: Lamborghini </p>
          <p>Model: {rental.car.name}</p>
          <p>Year: 2016</p>
          <p>License Plate Number: S7A 1DE</p>
          <p>Vehicle Identification Number (VIN): B3AG7HK9R4E2M1N8P</p>
          <p>Color: White</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">3. Rental Details:</h2>
          <p>Rental Start Date: 2024-03-22</p>
          <p>Rental End Date: 2024-03-31</p>
          <p>Pick-up Location: {rental.branchLocation}</p>
          <p>Drop-off Location: {rental.branchLocation}</p>
          <p>Rental Period: {rental.lengthOfRental}</p>
          <p>Rental Rate: {rental.car.dailyRentalRate}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">4. Rental Terms and Conditions:</h2>
          <p>The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.</p>
          <p>The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.</p>
          <p>The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.</p>
          <p>The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.</p>
          <p>The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.</p>
          <p>The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.</p>
          <p>The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.</p>
          <p>The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">5. Indemnification:</h2>
          <p>The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">6. Governing Law:</h2>
          <p>This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of [Jurisdiction].</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">7. Entire Agreement:</h2>
          <p>This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">8. Signatures:</h2>
          <div className="mb-4">
            <p>Rental Company: CarR Inc.</p>
            <p>Signature: ___________________________</p>
            <p>Print Name: __________________________</p>
            <p>Date: _______________________________</p>
          </div>
          <div>
            <p>Renter: Kyle Rasinger</p>
            <p>Signature: ___________________________</p>
            <p>Print Name: __________________________</p>
            <p>Date: _______________________________</p>
          </div>
        </div>
      </div>

    </div>
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
