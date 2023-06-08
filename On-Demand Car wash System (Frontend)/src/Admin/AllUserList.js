import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/AllUserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8181/user/allusers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8181/user/delete/${id}`);
      console.log(response.data);
      // Refresh the user list after successful deletion
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalVisible(false);
  };

  return (
    <div>
      <h1>User List</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>
              <button className="view-button" onClick={() => openModal(user)}>View</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>User Details</h2>
            {selectedUser && (
              <div>
                <p><strong>Serial Number:</strong> {users.indexOf(selectedUser) + 1}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                {/* Add more user details as needed */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
