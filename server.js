const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

// Initialize the app
const app = express();

// Use CORS middleware
app.use(cors()); 

// Middleware to parse JSON data
app.use(bodyParser.json());

// MongoDB connection URI
const mongoURI = 'mongodb+srv://sumit3972:Sumit3972@cluster0.uqlpsgc.mongodb.net/contact';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});

// Define a Schema for the contact form data
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true }
});

// Create a Model from the schema (this will create the "contacts" collection in MongoDB)
const Contact = mongoose.model('Contact', contactSchema, "contacts");

// POST route to handle form submission
app.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate input fields
    if (!name || !email || !subject || !message) {
      return res.status(400).send('All fields are required.');
    }

    console.log(`Received: ${name}, ${email}, ${subject}, ${message}`);

    // Create a new contact entry
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    // Save the contact entry to MongoDB
    await newContact.save();

    res.status(200).send('Message submitted successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error submitting message: ' + error);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
