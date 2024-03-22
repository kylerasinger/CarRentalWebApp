import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const ReservationPage = ({ selectedCar, onSubmit, onClose }) => {
  const [isReservationConfirmed, setIsReservationConfirmed] = useState(false);
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
    branchLocation: '4825 Sherbrooke St W, Westmount, Quebec H3Z 1G6'
  });

  

  const { data: session } = useSession();
  const router = useRouter();

  const imageSrc = `http://localhost:3001/api/cars/images/${selectedCar._id}`;
  const today = new Date().toISOString().split('T')[0];

  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    setIsReservationConfirmed(true);
  };

  //redirect user 500ms after they confirm reservation
  useEffect(() => {
    if (isReservationConfirmed) {
      const redirectDelay = 500; // 0.5 seconds
      const timer = setTimeout(() => {
        router.push('/Check-In/CheckInView');
      }, redirectDelay);

      return () => clearTimeout(timer);
    }
  }, [isReservationConfirmed, router]);

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

  // useEffect(() => {
  //   console.log("user id updates 1");
  //   if (userId) {
  //     console.log("user id updates2 ");
  //     setRentalData((prevData) => ({
  //       ...prevData,
  //       userId: userId,
  //     }));
  //   }
  // }, [userId]);

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
        console.log("userId: " + data.userId);

        setRentalData((prevData) => ({
          ...prevData,
          userId: data.userId,
        }));

        //this might show the wrong id, its due to async functions. should work
        console.log("Rental Data: " + JSON.stringify(rentalData, null, 2)) 

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
    console.log("Pickupdate: " + formData.pickupDate);
    const pickupDate = new Date(formData.pickupDate);
    console.log("returndate:" + formData.returnDate)
    const returnDate = new Date(formData.returnDate);
  
    const differenceInMilliseconds = returnDate - pickupDate;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  
    return differenceInDays;
  };

  return (
    <div className="container mx-auto mt-10">
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
            <h3 className="text-3xl font-bold text-gray-900">{selectedCar.name}</h3>
            <p className="text-lg text-gray-700 mb-2">Price: {selectedCar.price}</p>
            <p className="text-lg text-gray-700 mb-2">Description: {selectedCar.description}</p>

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
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="yyyy/mm/dd"
                  value={formData.returnDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 focus:outline-none"
              >
                Confirm Reservation
              </button>
              <button
                onClick={console.log(rentalData)}
                className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 focus:outline-none"
              >
                check rental data
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;



