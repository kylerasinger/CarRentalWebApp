import emailjs from 'emailjs-com'; // Import EmailJS library
import { useRouter } from 'next/router';
import { useState } from 'react';

const PaymentPage = () => {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    recipientEmail: '', // Remove default recipient email address
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Perform payment processing logic here
    console.log('Processing payment:', paymentData);

    try {
      // Send confirmation email using EmailJS
      await sendConfirmationEmail(paymentData);
      console.log('Confirmation email sent successfully');

      // Clear form fields after payment
      setPaymentData({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        recipientEmail: '', // Reset recipient email address
      });
      // Route to the confirmation page after successful payment
      router.push('/confirmation');
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  const sendConfirmationEmail = async (paymentData) => {
    try {
      await emailjs.send(
        'service_5xlexf6', // Replace with your EmailJS service ID
        'template_pu5jk61', // Replace with your EmailJS template ID
        {
          cardNumber: paymentData.cardNumber,
          expirationDate: paymentData.expirationDate,
          cvv: paymentData.cvv,
          to_email: paymentData.recipientEmail, // Specify the recipient email dynamically
        },
        '6BAZqDaHdXK1S8aNC' // Replace with your EmailJS user ID
      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="container mx-auto mt-10 mb-20">
      <h2 className="text-3xl font-bold mb-4">Payment</h2>

      <div className="max-w-lg py-8 px-10 bg-white shadow-lg rounded-lg text-center mx-auto">
        <form className="max-w-md mx-auto" onSubmit={handlePayment}>
          <div className="mb-6">
            <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="recipientEmail"
              name="recipientEmail"
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter email address"
              value={paymentData.recipientEmail}
              onChange={handleChange}
              required
            />
          </div>
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
