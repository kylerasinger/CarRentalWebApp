import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

const ReservationPage = ({ selectedCar, onSubmit, onClose }) => {
  console.log(selectedCar);
  
  const [isReservationConfirmed, setIsReservationConfirmed] = useState(false);
  const [reservationId, setReservationId] = useState(''); 
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    pickupDate: '',
    returnDate: ''
  });

  const [rentalData, setRentalData] = useState ({
    userId: userId,
    carId: selectedCar._id,
    lengthOfRental: 0,
    ccNumber: '374245455400126', //mock amex card
    ccExpiry: '0526', // 05/2026
    branchLocation: '4825 Sherbrooke St W, Westmount, Quebec H3Z 1G6',
    checkIn: false,
    checkOut: false
  });  

  const imageSrc = `http://localhost:3001/api/cars/images/${selectedCar._id}`;
  const today = new Date().toISOString().split('T')[0];

  const { data: session } = useSession();
  const router = useRouter();

  const toggleSpeak = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // Stop speaking
      setIsSpeaking(false);
    } else {
      const speechText = `
        Reserving a ${selectedCar.brand.name} ${selectedCar.name} for ${selectedCar.dailyRentalRate} dollars a day.
        Enter your full name, email address, phone number, and return date.  `;

      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.onend = () => setIsSpeaking(false); // Update state when speaking ends
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true); // Update state to reflect that speaking has started
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleConfirmReservation = async (e) => {
    e.preventDefault();
    const rentalLength = calculateRentalDays();

    setRentalData(prevData => ({
      ...prevData,
      lengthOfRental: rentalLength,
    }));

    setIsReservationConfirmed(true);

    // send the HTTP POST request to backend to create a new rental with data provided
    try {
      const response = await fetch(`http://localhost:3001/api/rentals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rentalData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setReservationId(data._id); // Set the reservation ID for redirection

    } catch (error) {
      console.error('Failed to post rental:', error);
    }
  };

  // Redirect user 1 second after they confirm reservation
  useEffect(() => {
    if (isReservationConfirmed && reservationId) { // Check if reservationId is set
      const redirectDelay = 1000; // 1 second
      const timer = setTimeout(() => {
        router.push(`/Check-In/CheckInView/${reservationId}`);
      }, redirectDelay);

      return () => clearTimeout(timer);
    }
  }, [isReservationConfirmed, reservationId, router]);

  //auto populates the form with users session data
  useEffect(() => {
    if(session?.user){
      setFormData((prevData) => ({
        ...prevData,
        fullName: session.user.name,
        email: session.user.email
      }))
    }
  }, [session]);

  //gets the users ID by searching their email in the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = session.user.email; 
        const response = await fetch(`http://localhost:3001/api/users/${userEmail}`)
        if(!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setRentalData((prevData) => ({
          ...prevData,
          userId: data.userId,
        }));

      } catch (error) {
        console.error('Failed to fetch user by email:', error);
      }
    };
    fetchData();
  }, [session]);

  useEffect(() => {
    setRentalData((prevData) => ({
      ...prevData,
      lengthOfRental: calculateRentalDays(),
    }));
    // console.log("Rental Data: " + JSON.stringify(rentalData, null, 2))
  }, [formData]);

  const calculateRentalDays = () => {
    const pickupDate = new Date(today);
    console.log("pickupDate: " + pickupDate);
    const returnDate = new Date(formData.returnDate);
    console.log("returnData: " + returnDate);
  
    const differenceInMilliseconds = returnDate - pickupDate;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    
    console.log("length of rental: " + differenceInDays)
    return differenceInDays;
  };

  return (
    <div className="container mx-auto mb-5">
      <h2 className="text-3xl font-bold mb-4">Car Reservation</h2>

      {isReservationConfirmed ? (
        <div className="text-center">
          <p className="text-xl font-bold text-orange-600 mb-4">Reservation Confirmed!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="aspect-w-1 aspect-h-1">
            <img src={imageSrc} alt={"Car"} className="object-cover object-center rounded-lg" />
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-900 ml-10">{selectedCar.brand.name} {selectedCar.name}</h3>
            <p className="text-lg text-gray-700 mb-5 ml-10">Price: {selectedCar.dailyRentalRate}$/day</p>

            <form className="max-w-lg mx-auto" onSubmit={handleConfirmReservation}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="123-456-7890"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">
                  Pickup Date
                </label>
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  className="mt-1 p-2 w-full border rounded-md"
                  min={today}
                  max={today}
                  placeholder="yyyy/mm/dd"
                  value={formData.pickupDate || today}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">
                  Return Date
                </label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  min={today}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="yyyy/mm/dd"
                  value={formData.returnDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={toggleSpeak}
                  className="inline-flex items-center justify-center bg-blue-500 text-white px-5 py-4 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  {isSpeaking ? (
                    <>
                      <SpeakerXMarkIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                      Stop Reading
                    </>
                  ) : (
                    <>
                      <SpeakerWaveIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                      Read Aloud
                    </>
                  )}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-blue-500 text-white px-5 py-4 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;



