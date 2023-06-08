import React, { useState } from "react";
import axios from "axios";

function AddAdmin() {
  const [admin, setAdmin] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [adminId, setAdminId] = useState("");

  const handleChange = (event) => {
    setAdmin({ ...admin, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9090/admin/addadmin", admin)
      .then((response) => {
        setMessage("Admin added successfully");
        setError("");
        setAdminId(response.data.id);
        setAdmin({ name: "", email: "", password: "" });
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
        } else if (error.request) {
          setError("Something went wrong with the server");
        } else {
          setError("Something went wrong while sending the request");
        }
        setMessage("");
      });
  };

  return (
    <div>
      <h2>Add Admin</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={admin.name}
          onChange={handleChange}
          required
        /><br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={admin.email}
          onChange={handleChange}
          required
        /><br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={admin.password}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Add Admin</button>
      </form>
      {message && <div>{message}</div>}
      {error && <div>{error}</div>}
      {adminId && <div>New Admin ID: {adminId}</div>}
    </div>
  );
}

export default AddAdmin;
