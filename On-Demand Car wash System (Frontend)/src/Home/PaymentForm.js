// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faCreditCard, faQuestionCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// const PaymentForm = () => {
//   const [username, setUsername] = useState('');
//   const [cardNumber, setCardNumber] = useState('');
//   const [expirationMonth, setExpirationMonth] = useState('MM');
//   const [expirationYear, setExpirationYear] = useState('YY');
//   const [cvv, setCvv] = useState('');
//   const [email, setEmail] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [invoiceData, setInvoiceData] = useState(null);

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handleCardNumberChange = (event) => {
//     setCardNumber(event.target.value);
//   };

//   const handleExpirationMonthChange = (event) => {
//     setExpirationMonth(event.target.value);
//   };

//   const handleExpirationYearChange = (event) => {
//     setExpirationYear(event.target.value);
//   };

//   const handleCvvChange = (event) => {
//     setCvv(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     const paymentData = {
//       username,
//       cardNumber,
//       expirationMonth,
//       expirationYear,
//       cvv,
//       email,
//     };

//     axios
//       .post('http://localhost:9003/payment', paymentData)
//       .then((response) => {
//         console.log('Payment created:', response.data);
//         // Handle successful payment creation here
//         generateInvoice();
//         window.location.href = "http://localhost:3000/AfterLogin/paymentSuccessfull";
//       })
//       .catch((error) => {
//         console.log('Error creating payment:', error);
//         // Handle payment creation error here
//       });
//   };

//   const validateForm = () => {
//     if (!username || !cardNumber || expirationMonth === 'MM' || expirationYear === 'YY' || !cvv || !email) {
//       setErrorMessage('Please fill in all the required fields.');
//       return false;
//     }
//     setErrorMessage('');
//     return true;
//   };

//   const generateInvoice = () => {
//     const Invoice = () => (
//       <Document>
//         <Page style={styles.page}>
//           <View style={styles.section}>
//             <Text>Payment Details:</Text>
//             <Text>Username: {username}</Text>
//             <Text>Card Number: {cardNumber}</Text>
//             <Text>Expiration Month: {expirationMonth}</Text>
//             <Text>Expiration Year: {expirationYear}</Text>
//             <Text>CVV: {cvv}</Text>
//             <Text>Email: {email}</Text>
//           </View>
//         </Page>
//       </Document>
//     );

//     const styles = StyleSheet.create({
//       page: {
//         flexDirection: 'row',
//         backgroundColor: '#E4E4E4',
//       },
//       section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1,
//       },
//     });

//     setInvoiceData(<Invoice />);
//   };

//   return (
//     <div className="container d-flex justify-content-center">
//       <div className="row">
//         <aside className="col text-center p-4">
//           <h3>Payment Form</h3>

//           <article className="card">
//             <div className="card-body p-5">
//               <form role="form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="username">Full name (on the card)</label>
//                   <div className="input-group">
//                     <div className="input-group-prepend">
//                       <span className="input-group-text">
//                         <FontAwesomeIcon icon={faUser} />
//                       </span>
//                     </div>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="username"
//                       placeholder=""
//                       value={username}
//                       onChange={handleUsernameChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="cardNumber">Card number</label>
//                   <div className="input-group">
//                     <div className="input-group-prepend">
//                       <span className="input-group-text">
//                         <FontAwesomeIcon icon={faCreditCard} />
//                       </span>
//                     </div>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="cardNumber"
//                       placeholder=""
//                       value={cardNumber}
//                       onChange={handleCardNumberChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-sm-8">
//                     <div className="form-group">
//                       <label>
//                         <span className="hidden-xs">Expiration</span>
//                       </label>
//                       <div className="form-inline">
//                         <select
//                           className="form-control"
//                           style={{ width: '45%' }}
//                           value={expirationMonth}
//                           onChange={handleExpirationMonthChange}
//                         >
//                           <option>MM</option>
//                           <option>01 - January</option>
//                           <option>02 - February</option>
//                           <option>03 - March</option>
//                           <option>04 - April</option>
//                           <option>05 - May</option>
//                           <option>06 - June</option>
//                           <option>07 - July</option>
//                           <option>08 - August</option>
//                           <option>09 - September</option>
//                           <option>10 - October</option>
//                           <option>11 - November</option>
//                           <option>12 - December</option>
//                         </select>
//                         <span style={{ width: '10%', textAlign: 'center' }}>/</span>
//                         <select
//                           className="form-control"
//                           style={{ width: '45%' }}
//                           value={expirationYear}
//                           onChange={handleExpirationYearChange}
//                         >
//                           <option>YY</option>
//                           <option>2022</option>
//                           <option>2023</option>
//                           <option>2024</option>
//                           <option>2025</option>
//                           <option>2023</option>
//                           <option>2027</option>
//                           <option>2028</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-sm-4">
//                     <div className="form-group">
//                       <label
//                         data-toggle="tooltip"
//                         title=""
//                         data-original-title="3 digits code on back side of the card"
//                       >
//                         CVV <FontAwesomeIcon icon={faQuestionCircle} />
//                       </label>
//                       <input
//                         className="form-control"
//                         required
//                         type="text"
//                         value={cvv}
//                         onChange={handleCvvChange}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <div className="input-group">
//                     <div className="input-group-prepend">
//                       <span className="input-group-text">
//                         <FontAwesomeIcon icon={faEnvelope} />
//                       </span>
//                     </div>
//                     <input
//                       type="email"
//                       className="form-control"
//                       name="email"
//                       placeholder=""
//                       value={email}
//                       onChange={handleEmailChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

//                 <button className="subscribe btn btn-primary btn-block" type="submit">
//                   Confirm
//                 </button>
//               </form>
//             </div>
//           </article>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default PaymentForm;



import React, { useState } from 'react';
import { ReactDOM } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCreditCard, faQuestionCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PaymentForm = () => {
  const [username, setUsername] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('MM');
  const [expirationYear, setExpirationYear] = useState('YY');
  const [cvv, setCvv] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);
 

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

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const paymentData = {
      username,
      cardNumber,
      expirationMonth,
      expirationYear,
      cvv,
      email,
    };

    axios
      .post('http://localhost:9003/payment', paymentData)
      .then((response) => {
        console.log('Payment created:', response.data);
        // Handle successful payment creation here
        // generateInvoice();
        window.location.href = "http://localhost:3000/AfterLogin/paymentSuccessfull";
      })
      .catch((error) => {
        console.log('Error creating payment:', error);
        // Handle payment creation error here
      });
  };

  const validateForm = () => {
    if (!username || !cardNumber || expirationMonth === 'MM' || expirationYear === 'YY' || !cvv || !email) {
      setErrorMessage('Please fill in all the required fields.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const generateInvoice = () => {
  const opt = {
    margin: 1,
    filename: 'subscription_invoice.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  const Invoice = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Payment Details:</Text>
          <Text>Username: {username}</Text>
          <Text>Card Number: {cardNumber}</Text>
          <Text>Expiration Month: {expirationMonth}</Text>
          <Text>Expiration Year: {expirationYear}</Text>
          <Text>CVV: {cvv}</Text>
          <Text>Email: {email}</Text>
        </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  const generatePDF = () => {
    const element = <Invoice />;
    const pdfContainer = document.createElement('div');
    ReactDOM.render(element, pdfContainer);

    html2pdf()
      .from(pdfContainer)
      .set(opt)
      .save()
      .then(() => {
        console.log('Invoice generated successfully.');
      })
      .catch((error) => {
        console.error('Error generating invoice:', error);
      });
  };

  generatePDF();
};

   
  return (
    <div className="container d-flex justify-content-center">
      <div className="row">
        <aside className="col text-center p-4">
          <h3>Payment Form</h3>

          <article className="card">
            <div className="card-body p-5">
              <form role="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Full name (on the card)</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder=""
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder=""
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber">Card number</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faCreditCard} />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="cardNumber"
                      placeholder=""
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-8">
                    <div className="form-group">
                      <label>
                        <span className="hidden-xs">Expiration</span>
                      </label>
                      <div className="form-inline">
                        <select
                          className="form-control"
                          style={{ width: '45%' }}
                          value={expirationMonth}
                          onChange={handleExpirationMonthChange}
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
                        <span style={{ width: '10%', textAlign: 'center' }}>/</span>
                        <select
                          className="form-control"
                          style={{ width: '45%' }}
                          value={expirationYear}
                          onChange={handleExpirationYearChange}
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
                  
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label
                        data-toggle="tooltip"
                        title=""
                        data-original-title="3 digits code on back side of the card"
                      >
                        CVV <FontAwesomeIcon icon={faQuestionCircle} />
                      </label>
                      <input
                        className="form-control"
                        required
                        type="text"
                        value={cvv}
                        onChange={handleCvvChange}
                      />
                    </div>
                  </div>
                </div>

                

                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

                <button className="subscribe btn btn-primary btn-block" type="submit">
                  Confirm
                </button>
              </form>
              {invoiceData && (
                <PDFDownloadLink document={invoiceData} fileName="invoice.pdf">
                  {({ blob, url, loading, error }) =>
                    loading ? 'Generating Invoice...' : 'Download Invoice'
                  }
                </PDFDownloadLink>
              )}
            </div>
          </article>
        </aside>
      </div>
    </div>
  );
};

export default PaymentForm;

