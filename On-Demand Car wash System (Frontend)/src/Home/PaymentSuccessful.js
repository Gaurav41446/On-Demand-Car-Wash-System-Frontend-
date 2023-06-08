import React from 'react';
import '../CSS/pay_done.css';

function PaymentSuccessful() {
  const handleGoBack = () => {
    window.location.href = "http://localhost:3000/AfterLogin";
  };

  const handleRating=()=>{
    window.location.href="http://localhost:3000/AfterLogin/Rating"
  };

  return (
    <div className="container">
      <div className="payment-success">
        <div className="card">
          <div className="card-body">
            <p className="card-text">Thank you for your payment. Your transaction was successful.</p>
          </div>
        </div>
        <div className="alert alert-success" role="alert">
          <p className="mb-0">Payment Successful</p>
        </div>
        <button className="btn btn-primary" onClick={handleGoBack}>Go Back</button>
        <button className="btn btn-primary" onClick={handleRating}> Give Rating </button>
      </div>
    </div>
  );
}

export default PaymentSuccessful;
