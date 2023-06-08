// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../CSS/Subscription.css';

// function SubscriptionDetails({ id }) {
//   const [subscription, setSubscription] = useState(null);
//     const userId = localStorage.getItem('userId');
//   const SubscriptionId = localStorage.getItem('id');

//   useEffect(() => {
//     fetchSubscription(id);
//   }, [id]);

//   const fetchSubscription = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:8181/user/allSubscription/${userId}`);
//       setSubscription(response.data);
    
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!subscription) {
//     return <div>No Subscription available ....</div>;
//   }

//   return (
//     <div>
//       <h1>Subscription Details</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Serial No</th>
//             {/* <th>ID</th> */}
//             <th>Subscription Type</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subscription.map((subscription,index)=>
//           <tr key={subscription.id}>
//           <td>{index + 1}</td>
//             {/* <td>{subscription.id}</td> */}
//             <td>{subscription.subscriptionType}</td>
//             <td>{subscription.name}</td>
//             <td>{subscription.email}</td>
//             <td>{subscription.phone}</td>
//           </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default SubscriptionDetails;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/Subscription.css';

function SubscriptionDetails({ id }) {
  const [subscription, setSubscription] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null); // Track the selected subscription for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Track the visibility of the modal
  const userId = localStorage.getItem('userId');
  const subscriptionId = localStorage.getItem('id');

  useEffect(() => {
    fetchSubscription(id);
  }, [id]);

  const fetchSubscription = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8181/user/allSubscription/${userId}`);
      setSubscription(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelSubscription = async (subscriptionId) => {
    try {
      await axios.delete(`http://localhost:8181/user/CancelSubscription/${subscriptionId}`);
      console.log('Subscription canceled successfully');
      fetchSubscription(id);
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    }
  };

  const openModal = (subscription) => {
    setSelectedSubscription(subscription); // Set the selected subscription for the modal
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (!subscription) {
    return <div>No Subscription available ....</div>;
  }

  return (
    <div>
      <h1>Subscription Details</h1>
      <table className='table-subscription'>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Subscription Type</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscription.map((subscription, index) => (
            <tr key={subscription.id}>
              <td>{index + 1}</td>
              <td>{subscription.subscriptionType}</td>
              <td>{subscription.name}</td>
              <td>{subscription.email}</td>
              <td>{subscription.phone}</td>
              <td>
                <button onClick={() => openModal(subscription)} className="view-button">
                  View
                </button>
                <button onClick={() => cancelSubscription(subscription.id)} className="cancel-button">
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          {/* Render the subscription details in the modal */}
          <h2>Subscription Details</h2>
          <p>Subscription Type: {selectedSubscription.subscriptionType}</p>
          <p>Name: {selectedSubscription.name}</p>
          <p>Email: {selectedSubscription.email}</p>
          <p>Phone: {selectedSubscription.phone}</p>
        </Modal>
      )}
    </div>
  );
}

// Modal component
function Modal({ closeModal, children }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}

export default SubscriptionDetails;
