import ReservationPage from '../RESERVATION/ReservationPage';

const CheckInPage = () => {
  // Mock data for selected car (replace with actual data)
  const selectedCar = {
    name: 'Toyota Camry',
    price: '$50/day',
    description: 'A comfortable and reliable sedan.',
    imageSrc: 'car-image-url.jpg',
    imageAlt: 'Toyota Camry',
  };

  return (
    <div>
      <h1>Confirmation Page</h1>
      <ReservationPage selectedCar={selectedCar} />
    </div>
  );
};

export default CheckInPage;
