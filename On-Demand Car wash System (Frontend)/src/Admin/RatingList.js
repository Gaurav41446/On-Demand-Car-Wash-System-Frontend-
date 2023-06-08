import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/RatingsList.css';

const RatingsList = () => {
  const [ratings, setRatings] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get('http://localhost:9090/admin/allratings');
      setRatings(response.data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const handleViewRating = (rating) => {
    setSelectedRating(rating);
  };

  return (
    <div>
      <h1>Ratings List</h1>
      <table className="ratings-table">
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Washer Name</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Feedback</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((rating, index) => (
            <tr key={rating.id}>
              <td>{index + 1}</td>
              <td>{rating.washerName}</td>
              <td>{rating.email}</td>
              <td>{rating.rating}</td>
              <td>{rating.feedback}</td>
              <td>
                <button onClick={() => handleViewRating(rating)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRating && (
        <div className="rating-details">
          <h2>Rating Details</h2>
          <p><strong>Serial No:</strong> {ratings.indexOf(selectedRating) + 1}</p>
          <p><strong>Washer Name:</strong> {selectedRating.washerName}</p>
          <p><strong>Email:</strong> {selectedRating.email}</p>
          <p><strong>Rating:</strong> {selectedRating.rating}</p>
          <p><strong>Feedback:</strong> {selectedRating.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default RatingsList;
