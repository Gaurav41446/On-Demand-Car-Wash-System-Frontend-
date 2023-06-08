import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/BookingList.css'; // Import the CSS file for styling

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8181/user/AllBooking');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Booking List</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Booking ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Wash Packs</th>
              <th>Car Name</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.bookingId}>
                <td>{index + 1}</td>
                <td>{booking.bookingId}</td>
                <td>{booking.name}</td>
                <td>{booking.phone}</td>
                <td>{booking.email}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.washPacks}</td>
                <td>{booking.carName}</td>
                <td>{booking.location}</td>
                <td>
                  <button
                    onClick={() => handleViewBooking(booking)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedBooking && (
        <div className="modal">
          <div className="modal-content">
            <h2>Booking Details</h2>
            <p>Booking ID: {selectedBooking.bookingId}</p>
            <p>Name: {selectedBooking.name}</p>
            <p>Phone: {selectedBooking.phone}</p>
            <p>Email: {selectedBooking.email}</p>
            <p>Date: {selectedBooking.date}</p>
            <p>Time: {selectedBooking.time}</p>
            <p>Wash Packs: {selectedBooking.washPacks}</p>
            <p>Car Name: {selectedBooking.carName}</p>
            <p>Location: {selectedBooking.location}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingList;
