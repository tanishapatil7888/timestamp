require('dotenv').config();
const express = require('express');
const app = express();

// ✅ Route for Timestamp Microservice
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;
  let date;

  // If no date is provided, return current date
  if (!dateParam) {
    date = new Date();
  } else {
    // If the parameter is a number (timestamp)
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Handle invalid dates
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Send response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

module.exports = app;
