import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/AdminDetails.css';

const AdminDetails = () => {
  const [admin, setAdmin] = useState({});
  const [adminId, setAdminId] = useState('');

  const fetchAdminById = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/admin/alladmins/${adminId}`);
      setAdmin(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Admin Details</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Admin ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={fetchAdminById}>View Admin</button>
      </div>

      {Object.keys(admin).length > 0 && (
        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <td>{admin.id}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{admin.name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{admin.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDetails;
