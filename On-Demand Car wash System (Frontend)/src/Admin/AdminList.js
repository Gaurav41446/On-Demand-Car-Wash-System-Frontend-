import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Container, Row, Col } from 'reactstrap';
import '../CSS/AdminList.css';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:9090/admin/alladmins');
      setAdmins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewAdmin = (admin) => {
    setSelectedAdmin(admin);
  };

  const deleteAdmin = async (adminId) => {
    try {
      const response = await axios.delete(`http://localhost:9090/admin/deleteadmin/${adminId}`);
      console.log(response.data);
      fetchAdmins(); // Refresh the admin list after deleting
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="admin-list-container">
      <Row>
        <Col>
          <h2 className="admin-heading">Admins</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                <Button color="primary" size="sm" onClick={() => handleViewAdmin(admin)}>
                  View
                </Button>
              </td>
              <td>
                <Button color="danger" size="sm" onClick={() => deleteAdmin(admin.id)}>
                  Delete
                </Button>
              </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {selectedAdmin && (
        <Row>
          <Col>
            <div className="admin-details-container">
              <h2>Admin Details</h2>
              <p>
                <strong>ID:</strong> {selectedAdmin.id}
              </p>
              <p>
                <strong>Name:</strong> {selectedAdmin.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedAdmin.email}
              </p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdminList;
