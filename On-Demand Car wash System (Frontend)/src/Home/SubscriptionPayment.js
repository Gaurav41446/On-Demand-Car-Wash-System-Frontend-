





import React, { useState, useRef } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import '../CSS/Subscription.css';
import { Row, Col } from 'reactstrap';


function SubscriptionPayment() {
  const [subscriptionType, setSubscriptionType] = useState('Monthly');
  const [username, setUsername] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('MM');
  const [expirationYear, setExpirationYear] = useState('YY');
  const [cvv, setCVV] = useState('');
  const [message, setMessage] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [subscriptionStartDate, setSubscriptionStartDate] = useState(null);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const invoiceRef = useRef(null);



  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpirationMonthChange = (event) => {
    setExpirationMonth(event.target.value);
  };

  const handleExpirationYearChange = (event) => {
    setExpirationYear(event.target.value);
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !cardNumber || expirationMonth === 'MM' || expirationYear === 'YY' || !cvv) {
      setMessage('Please fill in all the required fields.');
      return;
    }

    const currentDate = new Date();
    setSubscriptionStartDate(currentDate.toLocaleDateString());

    let endDate;
    if (subscriptionType === 'Monthly') {
      endDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    } else if (subscriptionType === 'Quarterly') {
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 0);
    }
    setSubscriptionEndDate(endDate.toLocaleDateString());

    try {
      const response = await axios.post('http://localhost:9003/payment', {
        subscriptionType,
        username,
        cardNumber,
        expirationMonth,
        expirationYear,
        cvv,
        email,
      });
      console.log(response.data);
      setPaymentConfirmed(true);
    } catch (error) {
      console.error(error);
      setMessage('Payment failed. Please try again.');
    }
  };

  const getDescription = (type) => {
    if (type === 'Monthly') {
      return 'Monthly subscription includes a basic car wash per month.';
    } else if (type === 'Quarterly') {
      return 'Quarterly subscription includes a deluxe car wash every three months.';
    } else {
      return '';
    }
  };

  const handleConfirm = () => {
    setPaymentConfirmed(true);
    setMessage('');

    const description = getDescription(subscriptionType);
    setDescription(description);
  };

  const generateInvoicePDF = () => {
    const opt = {
      margin: 1,
      filename: 'subscription_invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
  
    const invoiceContent = document.createElement('div');
    invoiceContent.className = 'invoice';
    invoiceContent.innerHTML = `
  
      <style>
        /* Add your CSS styles here */
        .invoice-container {
          background-color: #fff;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 4px;
          text-align: center;
          margin: 0 auto;
          max-width: 500px;
        }
        .invoice-container h4 {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .invoice-container .invoice-field {
          margin-bottom: 10px;
        }
        .invoice-container .invoice-label {
          font-weight: bold;
          margin-right: 10px;
        }
        .invoice-container .left-corner {
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 12px;
        }
        .logo {
          display: flex;
          align-items: center;
          font-size: 60px;
        }
        
        .logo a {
          text-decoration: none;
          color: black;
          display: flex;
          align-items: center;
        }
        
        .logo a span {
          font-weight: bolder;
          font-size: 5.2em;
        }
        
      </style>
      <div className="logo">
  <a className="navbar-brand" href="/">
    <span style={{ fontWeight: 'bolder', fontSize: '50px' }}>C</span>leen
  </a>
</div>



      <div class="invoice-container">
        
        <h4 class="invoice-title">Subscription Invoice</h4>
        <div class="invoice-details">
          <div class="invoice-field">
            <span class="invoice-label">Subscription Type:</span>
            <span class="invoice-value">${subscriptionType}</span>
          </div>
          <div class="invoice-field">
            <span class="invoice-label">Description:</span>
            <span class="invoice-value">${getDescription(subscriptionType)}</span>
          </div>
          ${subscriptionStartDate ? `
            <div class="invoice-field">
              <span class="invoice-label">Subscription Start Date:</span>
              <span class="invoice-value">${subscriptionStartDate}</span>
            </div>
          ` : ''}
          ${subscriptionEndDate ? `
            <div class="invoice-field">
              <span class="invoice-label">Subscription End Date:</span>
              <span class="invoice-value">${subscriptionEndDate}</span>
            </div>
          ` : ''}
          ${username ? `
            <div class="invoice-field">
              <span class="invoice-label">Username:</span>
              <span class="invoice-value">${username}</span>
            </div>
          ` : ''}
          ${email ? `
            <div class="invoice-field">
              <span class="invoice-label">Email:</span>
              <span class="invoice-value">${email}</span>
            </div>
          ` : ''}
          ${cardNumber ? `
            <div class="invoice-field">
              <span class="invoice-label">Card Number:</span>
              <span class="invoice-value">**** **** **** ${cardNumber.slice(-4)}</span>
            </div>
          ` : ''}
          ${cvv ? `
            <div class="invoice-field">
              <span class="invoice-label">CVV:</span>
              <span class="invoice-value">***</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  
    html2pdf().set(opt).from(invoiceContent).save();
  };
  
  
  

  return (
    <div className="container">
      <h1 className="heading">Subscription Payment</h1>
      <div className="subscription-payment" style={{ marginTop: '20px' }}>
        {!paymentConfirmed ? (
          <>
            <article className="card-body mx-auto" style={{ maxWidth: '400px' }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardNumber"
                    placeholder="Enter card number"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-sm-8">
                    <div className="form-group">
                      <label>Expiration Date</label>
                      <div className="row">
                        <div className="col">
                          <select
                            className="form-control"
                            value={expirationMonth}
                            onChange={handleExpirationMonthChange}
                            required
                          >
                            <option>MM</option>
                            <option>01 - January</option>
                            <option>02 - February</option>
                            <option>03 - March</option>
                            <option>04 - April</option>
                            <option>05 - May</option>
                            <option>06 - June</option>
                            <option>07 - July</option>
                            <option>08 - August</option>
                            <option>09 - September</option>
                            <option>10 - October</option>
                            <option>11 - November</option>
                            <option>12 - December</option>
                          </select>
                        </div>
                        <div className="col">
                          <select
                            className="form-control"
                            value={expirationYear}
                            onChange={handleExpirationYearChange}
                            required
                          >
                            <option>YY</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2023</option>
                            <option>2027</option>
                            <option>2028</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        placeholder="CVV"
                        value={cvv}
                        onChange={handleCVVChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subscriptionType">Subscription Type</label>
                  <select
                    className="form-control"
                    id="subscriptionType"
                    value={subscriptionType}
                    onChange={(e) => setSubscriptionType(e.target.value)}
                    required
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Confirm Payment
                  </button>
                </div>
                {message && <p className="text-center text-danger">{message}</p>}
              </form>
            </article>
          </>
        ) : (
          <>
            <h3 id="thank-you-message" style={{ marginLeft: '20px', marginBottom: '10px' }}>
              Thank you for confirming your subscription!
            </h3>
          </>
        )}
      </div>
      <div className="submitted-data">
  <div ref={invoiceRef} className="invoice-container">
    <h4>Subscription Invoice</h4>
    <p>Subscription Type: {subscriptionType}</p>
    <p>{getDescription(subscriptionType)}</p>
    {subscriptionStartDate && <p>Subscription Start Date: {subscriptionStartDate}</p>}
    {subscriptionEndDate && <p>Subscription End Date: {subscriptionEndDate}</p>}

    
  </div>
  <button onClick={generateInvoicePDF} style={{ marginTop: '10px' }}>
    Download Invoice PDF
  </button>
</div>

    </div>
  );
}

export default SubscriptionPayment;
