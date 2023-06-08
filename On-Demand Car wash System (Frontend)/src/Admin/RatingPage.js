import React, { useState } from "react";
import axios from "axios";
import "../CSS/RatingPage.css";

const RatingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRating = {
      washerName: name,
      email: email,
      rating: parseInt(rating),
      feedback: feedback,
    };

    try {
      const response = await axios.post(
        "http://localhost:9090/admin/addrating",
        newRating
      );
      console.log(response.data);
      setSubmitted(true);
      window.location.href="http://localhost:3000"
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>On-Demand Car Wash Rating Form</h1>

      {submitted ? (
        <div className="thank-you-message">Thank you for your rating and feedback!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Rating:</label>
          <div className="rating-stars-horizontal">
            <input
              type="radio"
              id="rating1"
              name="rating"
              value="1"
              checked={rating === "1"}
              onChange={() => setRating("1")}
            />
            <label htmlFor="rating1">&#9733;</label>

            <input
              type="radio"
              id="rating2"
              name="rating"
              value="2"
              checked={rating === "2"}
              onChange={() => setRating("2")}
            />
            <label htmlFor="rating2">&#9733;</label>

            <input
              type="radio"
              id="rating3"
              name="rating"
              value="3"
              checked={rating === "3"}
              onChange={() => setRating("3")}
            />
            <label htmlFor="rating3">&#9733;</label>

            <input
              type="radio"
              id="rating4"
              name="rating"
              value="4"
              checked={rating === "4"}
              onChange={() => setRating("4")}
            />
            <label htmlFor="rating4">&#9733;</label>

            <input
              type="radio"
              id="rating5"
              name="rating"
              value="5"
              checked={rating === "5"}
              onChange={() => setRating("5")}
            />
            <label htmlFor="rating5">&#9733;</label>
          </div>

          <label htmlFor="feedback">Feedback:</label>
          <textarea
           id="feedback"
           name="feedback"
           rows="4"
           value={feedback}
           onChange={(e) => setFeedback(e.target.value)}
          />


          <input type="submit" value="Submit Rating" />
        </form>
      )}
    </div>
  );
};

export default RatingPage;
