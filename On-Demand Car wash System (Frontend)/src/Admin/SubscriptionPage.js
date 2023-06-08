import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/SubscriptionPage.css';

function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('http://localhost:8181/user/allSubscription');
      setSubscriptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (subscriptions.length === 0) {
    return <div>Loading...</div>;
  }

  const openModal = (subscription) => {
    setSelectedSubscription(subscription);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSubscription(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Subscriptions</h1>

      <table className="subscription-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subscription Type</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription.id}>
              <td>{subscription.id}</td>
              <td>{subscription.subscriptionType}</td>
              <td>{subscription.name}</td>
              <td>{subscription.email}</td>
              <td>{subscription.phone}</td>
              <td>
                <button onClick={() => openModal(subscription)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Subscription Details</h2>
            {selectedSubscription && (
              <div>
                <p>ID: {selectedSubscription.id}</p>
                <p>Subscription Type: {selectedSubscription.subscriptionType}</p>
                <p>Name: {selectedSubscription.name}</p>
                <p>Email: {selectedSubscription.email}</p>
                <p>Phone: {selectedSubscription.phone}</p>
              </div>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubscriptionPage;
