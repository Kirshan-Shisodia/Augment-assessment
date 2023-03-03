const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an instance of the express app
const app = express();

// Use middleware for parsing JSON data
app.use(express.json());

// Use middleware for handling CORS requests
app.use(cors());

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://admin:admin@atlascluster.poiarfr.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to the MongoDB database'))
.catch((error) => console.error(error));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
