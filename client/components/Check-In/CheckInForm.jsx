import ReservationPage from '../RESERVATION/ReservationPage';
import PaymentView from './PaymentView';

const CheckInPage = () => {
  // Mock data for selected car (replace with actual data)
  //const selectedCar = {
  //  name: 'Toyota Camry',
  //  price: '$50/day',
  //  description: 'A comfortable and reliable sedan.',
  //  imageSrc: 'car-image-url.jpg',
  //  imageAlt: 'Toyota Camry',
  //};

  return (


    <>
      <ReservationPage selectedCar />
      <PaymentView />
    </>


  );
};

export default CheckInPage;
