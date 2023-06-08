import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/PaymentList.css'; // Import the CSS file for styling

function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:9003/allpayments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleViewPayment = (payment) => {
    // Set the selected payment and open the modal
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Payment List</h1>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="payment-table">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Username</th>
              <th>Card Number</th>
              <th>Expiration Month</th>
              <th>Expiration Year</th>
              <th>CVV</th>
              <th>Email</th> {/* Added Email column */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment.id}>
                <td>{index + 1}</td>
                <td>{payment.username}</td>
                <td>{payment.cardNumber}</td>
                <td>{payment.expirationMonth}</td>
                <td>{payment.expirationYear}</td>
                <td>{payment.cvv}</td>
                <td>{payment.email}</td> {/* Display Email value */}
                <td>
                  <div className="action-bar">
                    <button onClick={() => handleViewPayment(payment)}>View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedPayment && (
        <div className="modal">
          <div className="modal-content">
            <h2>Payment Details</h2>
            <p>Username: {selectedPayment.username}</p>
            <p>Card Number: {selectedPayment.cardNumber}</p>
            <p>Expiration Month: {selectedPayment.expirationMonth}</p>
            <p>Expiration Year: {selectedPayment.expirationYear}</p>
            <p>CVV: {selectedPayment.cvv}</p>
            <p>Email: {selectedPayment.email}</p> {/* Display Email value */}
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentList;
