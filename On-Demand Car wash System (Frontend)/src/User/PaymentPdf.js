import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import '../CSS/UserPdf.css';

const PaymentPdf = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const [userPayment, setUserPayment] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`http://localhost:9003/allpayment/${userId}`);
      setUserPayment(response.data);
      // setLoading(false);
    } catch (error) {
      console.log('Error fetching payments:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!userPayment || Object.keys(userPayment).length === 0) {
  //   return <div>No payment data found.</div>;
  // }

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      paddingTop: 30,
      paddingLeft: 60,
      paddingRight: 60,
      paddingBottom: 30,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 30,
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 15,
    },
    header: {
      marginBottom: 20,
    },
    section: {
      marginBottom: 10,
    },
    label: {
      fontWeight: 'bold',
    },
    value: {
      marginLeft: 10,
    },
    table: {
      display: 'table',
      width: 'auto',
      marginBottom: 30,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#000',
      paddingBottom: 5,
    },
    tableHeader: {
      fontWeight: 'bold',
    },
    tableCell: {
      width: '25%',
      borderWidth: 0,
      padding: 5,
    },
    actionBar: {
      marginTop: 20,
      display: 'flex',
      justifyContent: 'center',
    },
    downloadButton: {
      padding: '10px 20px',
      background: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: 5,
      textDecoration: 'none',
      cursor: 'pointer',
      fontSize: 16,
    },
  });
  

  const generatePdf = () => {
    const InvoiceDocument = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>Payment Receipt</Text>
            <Text style={styles.subtitle}>Order ID: {userPayment.orderId}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Customer Information:</Text>
            <Text style={styles.value}>Name: {userPayment.username}</Text>
            <Text style={styles.value}>Email: {userPayment.email}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Payment Details:</Text>
            <Text style={styles.value}>Card Number: {userPayment.cardNumber}</Text>
            <Text style={styles.value}>Expiration: {userPayment.expirationMonth}/{userPayment.expirationYear}</Text>
            <Text style={styles.value}>CVV: {userPayment.cvv}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Booking Summary:</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Booking</Text>
                </View>
                <View style={[styles.tableCell, styles.tableHeader]}>
                  <Text>Price</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Booking Name</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>500 RS</Text>
                </View>
              </View>
              {/* Add additional rows for other products if needed */}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Total Amount Paid:</Text>
            <Text style={styles.value}>500 RS</Text>
          </View>
        </Page>
      </Document>
    );

    return <InvoiceDocument />;
  };
  return (
    <div>
      <h3 style={{ textAlign: 'center' }}> Payments </h3>

      <table >
        <thead>
          <tr>
            <th style={styles.tableHeader}>Username</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Card Number</th>
            <th style={styles.tableHeader}>Expiration Month</th>
            <th style={styles.tableHeader}>Expiration Year</th>
            <th style={styles.tableHeader}>CVV</th>
          </tr>
        </thead>
        <tbody>
          <tr key={userPayment.id}>
            <td>{userPayment.username}</td>
            <td>{userPayment.email}</td>
            <td>{userPayment.cardNumber}</td>
            <td>{userPayment.expirationMonth}</td>
            <td>{userPayment.expirationYear}</td>
            <td>{userPayment.cvv}</td>
          </tr>
        </tbody>
      </table>

      <div className="action-bar" style={styles.actionBar}>
        <PDFDownloadLink document={generatePdf()} fileName="payment_details.pdf">
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download Payment Details PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default PaymentPdf;
