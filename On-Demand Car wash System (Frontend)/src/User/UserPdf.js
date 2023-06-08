import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import '../CSS/UserPdf.css';

const COMPANY_NAME = 'Cleen Car Wash';
const COMPANY_DESCRIPTION = 'Keep Your Car Wash Cleen. We provide professional car wash services to keep your vehicle spotless and shining. Our team of experts ensures top-notch cleaning with attention to detail. Experience the difference with Cleen Car Wash today.';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: '1cm',
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue', // Add color to the title
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 10, // Add spacing between each booking
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

function UserPdf() {
  const [bookingData, setBookingData] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(`http://localhost:8181/user/AllBooking/${userId}`);
      setBookingData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:8181/user/CancelBooking/${bookingId}`);
      console.log('Booking canceled successfully');
      fetchBookingData();
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };
  

  const generatePDF = () => {
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>{COMPANY_NAME}</Text>
            <Text style={styles.text}>{COMPANY_DESCRIPTION}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Booking Details:</Text>
            <View style={styles.text}>
              {bookingData.map((booking, index) => (
                <View key={booking._id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>Serial No: {index + 1}</Text>
                  <Text style={styles.tableCell}>Name: {booking.name}</Text>
                  <Text style={styles.tableCell}>Phone: {booking.phone}</Text>
                  <Text style={styles.tableCell}>Email: {booking.email}</Text>
                  <Text style={styles.tableCell}>Date: {booking.date}</Text>
                  <Text style={styles.tableCell}>Time: {booking.time}</Text>
                  <Text style={styles.tableCell}>Wash Packs: {booking.washPacks}</Text>
                  <Text style={styles.tableCell}>Car Name: {booking.carName}</Text>
                  <Text style={styles.tableCell}>Location: {booking.location}</Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );
  
    return MyDocument;
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
   
  };

  if (bookingData === null) {
    return <div>Loading...</div>;
  }

  if (!bookingData) {
    return <div>No booking available</div>;
  }

  return (
    <div className="user-pdf-container">
      <h1>Booking</h1>

      <table className="table-booking" >
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>WashPacks</th>
            <th>Car Name</th>
            <th>Location</th>
            <th>Actions</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((booking, index) => (
            <tr key={booking._id}>
              <td>{index + 1}</td>
              <td>{booking.name}</td>
              <td>{booking.phone}</td>
              <td>{booking.email}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.washPacks}</td>
              <td>{booking.carName}</td>
              <td>{booking.location}</td>
              <td>
                <button onClick={() => openModal(booking)} className="view-button">
                  View
                </button>
                <button onClick={() => cancelBooking(booking._id)} className="cancel-button">
                  Cancel
                </button>
               
              </td>
              <td>
                <PDFDownloadLink document={generatePDF()} fileName="booking.pdf">
                  Download PDF
                </PDFDownloadLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render the modal using the selectedBooking state */}
      {selectedBooking && (
        <div className="modal">
          
          <div className="modal-content">
            <h2>Booking Details</h2>
            <p>Name: {selectedBooking.name}</p>
            <p>Phone: {selectedBooking.phone}</p>
            <p>Email: {selectedBooking.email}</p>
           
            <button onClick={() => setSelectedBooking(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPdf;
