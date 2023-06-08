import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDemo = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', password: '' });
  const [editIndex, setEditIndex] = useState(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8181/user/allusers');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handle form submission for adding a new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8181/user/adduser', newUser);
      console.log(response.data); // Assuming the response contains the newly created user
      setNewUser({ email: '', password: '' });
      setUsers([...users, response.data]); // Add the new user to the list
    } catch (error) {
      console.error(error);
    }
  };

  // Set the index of the user to edit
  const setEditUser = (index) => {
    setEditIndex(index);
  };

  // Handle form submission for updating a user
  const handleUpdate = async (e, index) => {
    e.preventDefault();

    try {
      const updatedUsers = [...users];
      const updatedUser = { email: updatedUsers[index].email, password: updatedUsers[index].password };
      await axios.put(`http://localhost:8181/user/update/${updatedUsers[index].id}`, updatedUser);
      console.log(`User updated with index ${index}`);
      setEditIndex(null);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a user
  const deleteUser = async (index) => {
    try {
      await axios.delete(`http://localhost:8181/user/delete/${users[index].id}`);
      console.log(`User deleted with index ${index}`);
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                {editIndex === index ? (
                  <form onSubmit={(e) => handleUpdate(e, index)}>
                    <input
                      type="email"
                      name="email"
                      value={users[index].email}
                      onChange={(e) => {
                        const updatedUsers = [...users];
                        updatedUsers[index].email = e.target.value;
                        setUsers(updatedUsers);
                      }}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      value={users[index].password}
                      onChange={(e) => {
                        const updatedUsers = [...users];
                        updatedUsers[index].password = e.target.value;
                        setUsers(updatedUsers);
                      }}
                      required
                    />
                    <button type="submit">Save</button>
                  </form>
                ) : (
                  <>
                    <button onClick={() => setEditUser(index)}>Edit</button>
                    <button onClick={() => deleteUser(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default UserDemo;
