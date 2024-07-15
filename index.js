const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const institutionRoutes = require('./routes/institutionRoutes'); // Import the institution routes

const app = express();
const port = 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a root route
app.get('/', (req, res) => {
  res.send('Welcome to the User Profile App');
});

// Use user routes for endpoints starting with /users
app.use('/users', userRoutes);

// Use institution routes for endpoints starting with /institutions
app.use('/institutions', institutionRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
