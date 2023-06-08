import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/WasherList.css';

const WasherList = () => {
  const [washers, setWashers] = useState([]);
  const [selectedWasher, setSelectedWasher] = useState(null);

  useEffect(() => {
    fetchWashers();
  }, []);

  const fetchWashers = async () => {
    try {
      const response = await axios.get('http://localhost:9004/washer/allwashers');
      setWashers(response.data);
    } catch (error) {
      console.error('Error fetching washers:', error);
    }
  };

  const deleteWasher = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:9004/washer/delete/${id}`);
      if (response.status === 200) {
        // Refresh the washer list after successful deletion
        fetchWashers();
        console.log(response.data); // Print the success message from the API response
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error deleting washer:', error.response.data);
      } else {
        console.error('Error deleting washer:', error.message);
      }
    }
  };
  

  const handleView = (washer) => {
    setSelectedWasher(washer);
  };

  const handleViewClose = () => {
    setSelectedWasher(null);
  };

  return (
    <div>
      <h1>Washer List</h1>
      <table className="washer-table">
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Name</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {washers.map((washer, index) => (
            <tr key={washer.id}>
              <td>{index + 1}</td>
              <td>{washer.name}</td>
              <td>{washer.location}</td>
              <td className="actions">
                <button className="view-button" onClick={() => handleView(washer)}>View</button>
                <button className="delete-button" onClick={() => deleteWasher(washer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedWasher && (
        <div>
          <h2>View Washer Details</h2>
          <p>ID: {selectedWasher.id}</p>
          <p>Name: {selectedWasher.name}</p>
          <p>Location: {selectedWasher.location}</p>
          <button onClick={handleViewClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default WasherList;
