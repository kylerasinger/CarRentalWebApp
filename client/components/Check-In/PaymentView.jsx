import { useRouter } from 'next/router';
import { useState } from 'react';

const PaymentPage = () => {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Perform payment processing logic here
    console.log('Processing payment:', paymentData);
    // Clear form fields after payment
    setPaymentData({
      cardNumber: '',
      expirationDate: '',
      cvv: '',
    });
    // Route to the confirmation page after successful payment
    router.push('/confirmation');
  };

  return (
    <div className="container mx-auto mt-10 mb-20"> {/* Added mb-20 for extra space at the bottom */}
      <h2 className="text-3xl font-bold mb-4">Payment</h2>

      <div className="max-w-lg py-8 px-10 bg-white shadow-lg rounded-lg text-center mx-auto"> {/* Made the box wider and added more padding */}
        <form className="max-w-md mx-auto" onSubmit={handlePayment}>
          <div className="mb-6">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter card number"
              value={paymentData.cardNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
              Expiration Date
            </label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="MM/YY"
              value={paymentData.expirationDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter CVV"
              value={paymentData.cvv}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 focus:outline-none"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
