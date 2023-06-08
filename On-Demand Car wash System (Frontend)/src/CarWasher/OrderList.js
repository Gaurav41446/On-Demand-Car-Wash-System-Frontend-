import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:9002/order/allorders');
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>All Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Car Name</th>
            <th>Car Model</th>
            <th>Washer Name</th>
            <th>Wash Pack ID</th>
            <th>Date</th>
            <th>Phone No</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.orderId}>
              <td>{index + 1}</td>
              <td>{order.carName}</td>
              <td>{order.carModel}</td>
              <td>{order.washerName}</td>
              <td>{order.washpackId}</td>
              <td>{order.date}</td>
              <td>{order.phoneNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
