import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/UserPdf.css';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8181/user/allusers/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8181/user/delete/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
  };

  if (!user) {
    return <div>No User Found  .....</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <div className="actions">
                  <button onClick={() => handleView(user)} className="view-button">
                    View
                  </button>
                  <button onClick={() => deleteUser(user.id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <div>
          <h2>Selected User</h2>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedUser.email}</td>
                <td>{selectedUser.password}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => setSelectedUser(null)} className="cancel-button">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;
