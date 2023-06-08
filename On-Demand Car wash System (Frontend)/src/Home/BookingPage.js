
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../CSS/Booking.css';

function BookingPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [washPacks, setWashPacks] = useState('');
  const [carName, setCarName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId');
  const userEmail=localStorage.getItem('email');

  

  useEffect(() => {
    fetchBookings();
    
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8181/user/AllBooking');
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  
  
  const validatePhoneNumber = (phoneNumber) => {
    return /^\d+$/.test(phoneNumber);
  };

  const validatePreferredTime = (preferredTime) => {
    const isTimeSlotBooked = bookings.some((booking) => booking.time === preferredTime);

    if (isTimeSlotBooked) {
      const currentTime = new Date().getTime();
      const preferredTimeMs = new Date(date + ' ' + preferredTime).getTime();
      const timeDifferenceHours = Math.abs((currentTime - preferredTimeMs) / 36e5);

      if (timeDifferenceHours >= 3) {
        // Allow booking if the preferred time is available after a 3-hour gap
        return true;
      } else {
        // Deny booking if the preferred time is not available within a 3-hour gap
        return false;
      }
    }

    return true;
  };

  const submitBooking = async (e) => {
    e.preventDefault();

    // const emailRegex = /^\S+@\S+\.\S+$/;
    // if (!emailRegex.test(email)) {
    //   setMessage('Please enter a valid email address.');
    //   return;
    // }
    
    
    

    if (!validatePhoneNumber(phone)) {
      setMessage('Phone number should contain only numbers');
      return;
    }

    if (!validatePreferredTime(time)) {
      const currentTime = new Date().getTime();
      const availableTimeSlots = bookings.filter((booking) => {
        const bookingTimeMs = new Date(booking.date + ' ' + booking.time).getTime();
        const timeDifferenceHours = Math.abs((currentTime - bookingTimeMs) / 36e5);
        return timeDifferenceHours >= 3;
      });

      if (availableTimeSlots.length > 0) {
        const suggestedTime = availableTimeSlots[0].time;
        setMessage(
          `The preferred time slot is already booked. Please choose a different time at least 3 hours ahead. Available time slot: ${suggestedTime}`
        );
      } else {
        setMessage('The preferred time slot is already booked. Please choose a different time.');
      }
      return;
    }

    const newBooking = {
      name: name,
      phone: phone,
      email: localStorage.getItem('email'),
      date: date,
      time: time,
      washPacks: washPacks,
      carName: carName,
      location: location,
    };

    

    try {

      const response1=await axios.get("http://localhost:8181/user/foundSubscription/"+localStorage.getItem('email'));
      console.log(response1.data);
      
      

      if(response1.data==="found"){

       

      const response = await axios.post('http://localhost:8181/user/AddBooking', newBooking);
      console.log(response.data);
      console.log(newBooking);
      
      setMessage(response.data);
      fetchBookings();
        window.location.href = 'http://localhost:3000/AfterLogin/BookingSuccessful';

      }
        

      else{

        window.location.href = 'http://localhost:3000/AfterLogin/PaymentForm';

      }

    

      setName('');
      setPhone('');
      setEmail('');
      setDate('');
      setTime('');
      setWashPacks('');
      setCarName('');
      setLocation('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container style={{ width:'80%',height:'100vh', display: 'flex', flexDirection:'column'}}>
      <h1>On-Demand Car Wash Booking</h1>
     
      <Form style={{ display: 'flex'}} onSubmit={submitBooking}>
        <Row style={{ width: '100%',  display: 'flex', flexDirection: 'column' }}>
          <Col>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input placeholder='Name' type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone:</Label>
              <Input placeholder='Phone number' type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input placeholder='Email' type="email" id="email" value={localStorage.getItem('email')}disabled  />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="date">Preferred Date:</Label>
              <Input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </FormGroup>
            <FormGroup>
              <Label for="time">Preferred Time:</Label>
              <Input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </FormGroup>
            <FormGroup>
              <Label for="washPacks">Wash Packs:</Label>
              <Input
                style={{ padding: 10 , borderRadius:8}}
                type="select"
                id="washPacks"
                value={washPacks}
                onChange={(e) => setWashPacks(e.target.value)}
                required
              >
                <option value="">Select a Wash Pack</option>
                <option value="normal">Normal Wash (200 Rs)</option>
                <option value="medium">Medium Wash (400 Rs)</option>
                <option value="premium">Premium Wash (600 Rs)</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="carName">Car Name:</Label>
              <Input style={{ padding: 10, borderRadius: 8 }} type="select" id="carName" value={carName} onChange={(e) => setCarName(e.target.value)} required>
                <option value="">Select a Car</option>
                <option value="SUV">SUV</option>
                <option value="SEDAN">SEDAN</option>
                <option value="COUPE">COUPE</option>
                <option value="DACIA">DACIA</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="location">Location:</Label>
              <Input style={{ padding: 10, borderRadius: 8 }} type="select" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required>
                <option value="">Select a Location</option>
                <option value="Bhopal">Bhopal</option>
                <option value="Indore">Indore</option>
                <option value="Jabalpur">Jabalpur</option>
              </Input>
            </FormGroup>
          </Col>
        <Button type="submit" color="primary">Book Now</Button>
        </Row>
      </Form>
      <div id="message" style={{ color: 'green' }}>
        {message}
      </div>
    </Container>
  );
}

export default BookingPage;







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
// import '../CSS/Booking.css';

// function BookingPage() {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [washPacks, setWashPacks] = useState('');
//   const [carName, setCarName] = useState('');
//   const [location, setLocation] = useState('');
//   const [message, setMessage] = useState('');
//   const [bookings, setBookings] = useState([]);
//   const SubscriptionId =localStorage.getItem('id');
//   // const [Subscription,setSubscription]=useState('');
//   const PaymentId =localStorage.getItem('id');
//   // const [Payment,setPayment]=useState('');

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get('http://localhost:8181/user/AllBooking');
//       setBookings(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const validatePhoneNumber = (phoneNumber) => {
//     return /^\d+$/.test(phoneNumber);
//   };

//   const validatePreferredTime = (preferredTime) => {
//     const isTimeSlotBooked = bookings.some((booking) => booking.time === preferredTime);

//     if (isTimeSlotBooked) {
//       const currentTime = new Date().getTime();
//       const preferredTimeMs = new Date(date + ' ' + preferredTime).getTime();
//       const timeDifferenceHours = Math.abs((currentTime - preferredTimeMs) / 36e5);

//       if (timeDifferenceHours >= 3) {
//         // Allow booking if the preferred time is available after a 3-hour gap
//         return true;
//       } else {
//         // Deny booking if the preferred time is not available within a 3-hour gap
//         return false;
//       }
//     }

//     return true;
//   };

//  // ...

//  const submitBooking = async (e) => {
//   e.preventDefault();

//   if (!validatePhoneNumber(phone)) {
//     setMessage('Phone number should contain only numbers');
//     return;
//   }

//   if (!validatePreferredTime(time)) {
//     const currentTime = new Date().getTime();
//     const availableTimeSlots = bookings.filter((booking) => {
//       const bookingTimeMs = new Date(booking.date + ' ' + booking.time).getTime();
//       const timeDifferenceHours = Math.abs((currentTime - bookingTimeMs) / 36e5);
//       return timeDifferenceHours >= 3;
//     });

//     if (availableTimeSlots.length > 0) {
//       const suggestedTime = availableTimeSlots[0].time;
//       setMessage(
//         `The preferred time slot is already booked. Please choose a different time at least 3 hours ahead. Available time slot: ${suggestedTime}`
//       );
//     } else {
//       setMessage('The preferred time slot is already booked. Please choose a different time.');
//     }
//     return;
//   }

//   const newBooking = {
//     name: name,
//     phone: phone,
//     email: email,
//     date: date,
//     time: time,
//     washPacks: washPacks,
//     carName: carName,
//     location: location,
//   };

//   try {
//     const response = await axios.post('http://localhost:8181/user/AddBooking', newBooking);
//     console.log(response.data);
//     setMessage(response.data);
//     fetchBookings();
//     // window.location.href = 'http://localhost:3000/AfterLogin/PaymentForm';

//     // Check if the user is already a subscriber and has made a payment
//     const isSubscriber = response.data.subscriber; // Update this with the correct property of the response
//     const hasMadePayment = response.data.paymentMade; // Update this with the correct property of the response

//     if (isSubscriber && hasMadePayment) {
     
//       // Show booking successful message
//       setMessage('Booking successful. Payment already made.');
//     } else if (isSubscriber && !hasMadePayment) {
     
//       window.location.href = 'http://localhost:3000/AfterLogin/PaymentForm';
//     } else {
//       // Redirect to booking successful page
//       window.location.href = 'http://localhost:3000/AfterLogin/BookingSuccessful';
//     }

//     // Reset the form fields
//     setName('');
//     setPhone('');
//     setEmail('');
//     setDate('');
//     setTime('');
//     setWashPacks('');
//     setCarName('');
//     setLocation('');
//   } catch (error) {
//     console.error(error);
//   }
// };

// // ...

  

//   return (
//     <Container style={{ width:'80%',height:'100vh', display: 'flex', flexDirection:'column'}}>
//       <h1>On-Demand Car Wash Booking</h1>
     
//       <Form style={{ display: 'flex'}} onSubmit={submitBooking}>
//         <Row style={{ width: '100%',  display: 'flex', flexDirection: 'column' }}>
//           <Col>
//             <FormGroup>
//               <Label for="name">Name:</Label>
//               <Input placeholder='Name' type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
//             </FormGroup>
//             <FormGroup>
//               <Label for="phone">Phone:</Label>
//               <Input placeholder='Phone number' type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//             </FormGroup>
//             <FormGroup>
//               <Label for="email">Email:</Label>
//               <Input placeholder='Email' type="email" id="email" value={localStorage.getItem('email')} disabled/>
//             </FormGroup>
//           </Col>
//           <Col>
//             <FormGroup>
//               <Label for="date">Preferred Date:</Label>
//               <Input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//             </FormGroup>
//             <FormGroup>
//               <Label for="time">Preferred Time:</Label>
//               <Input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />
//             </FormGroup>
//             <FormGroup>
//               <Label for="washPacks">Wash Packs:</Label>
//               <Input
//                 style={{ padding: 10 , borderRadius:8}}
//                 type="select"
//                 id="washPacks"
//                 value={washPacks}
//                 onChange={(e) => setWashPacks(e.target.value)}
//                 required
//               >
//                 <option value="">Select a Wash Pack</option>
//                 <option value="normal">Normal Wash (200 Rs)</option>
//                 <option value="medium">Medium Wash (400 Rs)</option>
//                 <option value="premium">Premium Wash (600 Rs)</option>
//               </Input>
//             </FormGroup>
//             <FormGroup>
//               <Label for="carName">Car Name:</Label>
//               <Input style={{ padding: 10, borderRadius: 8 }} type="select" id="carName" value={carName} onChange={(e) => setCarName(e.target.value)} required>
//                 <option value="">Select a Car</option>
//                 <option value="SUV">SUV</option>
//                 <option value="SEDAN">SEDAN</option>
//                 <option value="COUPE">COUPE</option>
//                 <option value="DACIA">DACIA</option>
//               </Input>
//             </FormGroup>
//             <FormGroup>
//               <Label for="location">Location:</Label>
//               <Input style={{ padding: 10, borderRadius: 8 }} type="select" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required>
//                 <option value="">Select a Location</option>
//                 <option value="Bhopal">Bhopal</option>
//                 <option value="Indore">Indore</option>
//                 <option value="Jabalpur">Jabalpur</option>
//               </Input>
//             </FormGroup>
//           </Col>
//         <Button type="submit" color="primary">Book Now</Button>
//         </Row>
//       </Form>
//       <div id="message" style={{ color: 'green' }}>
//         {message}
//       </div>
//     </Container>
//   );
// }

// export default BookingPage;