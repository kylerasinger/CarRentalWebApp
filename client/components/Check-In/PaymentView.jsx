import emailjs from 'emailjs-com'; // Import EmailJS library
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

const PaymentPage = ({id}) => {
  console.log(id);
  const router = useRouter();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    recipientEmail: '', // Remove default recipient email address
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleSpeak = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // Stop speaking
      setIsSpeaking(false);
    } else {
      const speechText = `
        Enter your email address, card number, expiration date and CVV for billing of your rental.`;

      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.onend = () => setIsSpeaking(false); // Update state when speaking ends
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true); // Update state to reflect that speaking has started
    }
  };

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
      const emailSent = await sendConfirmationEmail(paymentData);
      console.log('Confirmation email sent successfully:', emailSent);
  
      // Clear form fields after payment
      setPaymentData({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        recipientEmail: '', // Reset recipient email address
      });
      // Route to the confirmation page after successful payment
      router.push(`/rentals/${id}`); //CHANGECHANGECHANGE
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      setErrorMessage('An error occurred while processing your payment. Please try again.');
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
        'J1wfMGny36el3WSRe' // Replace with your EmailJS user ID
      );
      // If email sent successfully, return true or any value to indicate success
      return true;
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      // If email failed to send, return false or any value to indicate failure
      return false;
    }
  };
  
  return (
    <div className="container mx-auto mt-10 mb-20">
      <div className="flex justify-center">
        <h2 className="text-3xl font-bold mb-9">Payment</h2>
      </div>
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
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter CVV"
              value={paymentData.cvv}
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
              Pay Now
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
