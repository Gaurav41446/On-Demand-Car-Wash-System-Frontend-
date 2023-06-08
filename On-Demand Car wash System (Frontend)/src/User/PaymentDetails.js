import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../CSS/UserPdf.css';

const PaymentDetails = () => {
//   const [payment, setPayment] = useState(null);
  const userId = localStorage.getItem('userId');
  const PaymentId =localStorage.getItem('id');
  const [Payment,setPayment]=useState('');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9003/allpayment/${userId}`);
        setPayment(response.data);
        // console.log(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentDetails();

  }, [userId]);

  if(!Payment){
    return <div>"No Payment available"</div>
  }

  return (
    <div>
      <h1>Payment Details</h1>
      {Payment ? (
        <table>
          <thead>
            <tr>
              <th>Serial No</th>
              {/* <th>ID</th> */}
              <th>Username</th>
              <th>Email</th>
              <th>Card Number</th>
              <th>Expiration Month</th>
              <th>Expiration Year</th>
              <th>CVV</th>
             
            </tr>
          </thead>
          <tbody>
            {Payment.map ((Payment,index)=>
            <tr key={Payment.id}>
            <td>{index + 1}</td>
             
              {/* <td>{Payment.id}</td> */}
              <td>{Payment.username}</td>
              <td>{Payment.email}</td>
              <td>{Payment.cardNumber}</td>
              <td>{Payment.expirationMonth}</td>
              <td>{Payment.expirationYear}</td>
              <td>{Payment.cvv}</td>
             
            </tr>

             )}

          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default PaymentDetails;
