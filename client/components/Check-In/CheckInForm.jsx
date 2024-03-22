import PaymentView from './PaymentView';

// Modify CheckInPage to accept props
const CheckInPage = ({ id }) => {
  console.log("CheckInPage: " + id);
  return (
    <>
      {/* Pass the id as a prop to PaymentView */}
      <PaymentView id={id} />
    </>
  );
};

export default CheckInPage;
