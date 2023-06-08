import React, { useState } from 'react';
import '../CSS/franchise.css';

function FranchiseApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    contactNumber: '',
    emailAddress: '',
    permanentAddress: '',
    currentAddress: '',
  });

  const [formError, setFormError] = useState({
    fullName: '',
    dob: '',
    gender: '',
    contactNumber: '',
    emailAddress: '',
    permanentAddress: '',
    currentAddress: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation before submitting the form
    if (validateForm()) {
      // Submit the form data
      console.log(formData);
      alert('Thank you for submitting the application. We will contact you soon.');
      event.target.reset(); // Reset the form
      window.location.href="http://localhost:3000"
    } else {
      alert('Please fill in all the required fields.');
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      fullName: '',
      dob: '',
      gender: '',
      contactNumber: '',
      emailAddress: '',
      permanentAddress: '',
      currentAddress: '',
    };

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key].trim() === '') {
        isValid = false;
        errors[key] = 'This field is required.';
      }
    }

    // Validate email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailAddress)) {
      isValid = false;
      errors.emailAddress = 'Invalid email address.';
    }

    setFormError(errors);
    return isValid;
  };

  return (
    <div className="container">
      <h1 className="heading">Franchise Application Form</h1>
      <form id="franchiseForm" onSubmit={handleSubmit} className="form-grid">
        <div className="card">
          <h2 className="section-heading">Personal Information:</h2>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-input"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {formError.fullName && <span className="error-message">{formError.fullName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="form-input"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            {formError.dob && <span className="error-message">{formError.dob}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              className="form-input"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {formError.gender && <span className="error-message">{formError.gender}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              className="form-input"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
            {formError.contactNumber && <span className="error-message">{formError.contactNumber}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="emailAddress">Email Address:</label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              className="form-input"
              value={formData.emailAddress}
              onChange={handleChange}
              required
            />
            {formError.emailAddress && <span className="error-message">{formError.emailAddress}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="permanentAddress">Permanent Address:</label>
            <textarea
              id="permanentAddress"
              name="permanentAddress"
              className="form-input"
              value={formData.permanentAddress}
              onChange={handleChange}
              required
            />
            {formError.permanentAddress && <span className="error-message">{formError.permanentAddress}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="currentAddress">
              Current Address (if different from permanent address):
            </label>
            <textarea
              id="currentAddress"
              name="currentAddress"
              className="form-input"
              value={formData.currentAddress}
              onChange={handleChange}
            />
            {formError.currentAddress && <span className="error-message">{formError.currentAddress}</span>}
          </div>
        </div>

        <input type="submit" value="Submit Application" className="submit-button" />
      </form>
    </div>
  );
}

export default FranchiseApplicationForm;
