// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS package

// Initialize the app
const app = express();

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON data
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sumit3972:Sumit3972@cluster0.uqlpsgc.mongodb.net/').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});

// Define a Schema for the contact form data
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});

// Create a Model from the schema
const Contact = mongoose.model('Contact', contactSchema);

// POST route to handle form submission
app.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(name,email,subject,message);

  // Create a new contact entry
  const newContact = new Contact({
    name,
    email,
    subject,
    message
  });

  // Save the contact entry to MongoDB
  newContact.save()
    .then(() => {
      res.status(200).send('Message submitted successfully');
    })
    .catch((error) => {
      res.status(500).send('Error submitting message: ' + error);
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
