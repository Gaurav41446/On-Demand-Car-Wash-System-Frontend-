import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8181/user/allusers');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8181/user/adduser', { email, password });
      // Clear form inputs
      setEmail('');
      setPassword('');
      // Refresh user list
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      await axios.put(`http://localhost:8181/user/update/${id}`, { email, password });
      // Clear form inputs
      setEmail('');
      setPassword('');
      // Refresh user list
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8181/user/delete/${id}`);
      // Refresh user list
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
    <header>
        <label htmlFor="check">
          <i className="fas fa-bars" id="sidebar_btn" onClick={toggleSidebar}></i>
        </label>
        <div className="left_area">
          <h3>
            <span>Cleen</span>
          </h3>
        </div>
        
      </header>
      
      <h2>User List</h2>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
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
                <Button color="primary" size="sm" onClick={() => handleUpdateUser(user.id)}>
                  Edit
                </Button>{' '}
                <Button color="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Add User</h2>
      <Form onSubmit={handleAddUser}>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Add User</Button>
      </Form>
  
    </>
  );
};

export default UserListPage;
