import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserPayments() {
//   const [paymentData, setPaymentData] = useState(null);
  const [UserPayments, setUserPayments] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      const response = await axios.get(`http://localhost:9003/AllPayments/${userId}`);
    //   setPaymentData(response.data);
      setUserPayments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (UserPayments === null) {
    return <div>Loading...</div>;
  }

  if (!UserPayments) {
    return <div>No payment data available</div>;
  }

  return (
    <div>
      <h1>User Payments</h1>

      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{UserPayments.userId}</td>
            <td>{UserPayments.amount}</td>
            <td>{UserPayments.date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserPayments;
