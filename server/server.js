// -----------------------------
// Required Packages
// -----------------------------
require('express-async-errors');
require('dotenv').config();
require('colors');

const express = require('express');
const app = express();
const path = require('path');

const connectDatabase = require('./dbConfig/databaseConfig');
const morgan = require('morgan');
const cors = require('cors');

// -----------------------------
// Configurations
// -----------------------------
const PORT = process.env.PORT || 5000;
const dbUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/link-shortening';

// -----------------------------
// Routers
// -----------------------------
const urlRouter = require('./routes/urlRoutes');

// -----------------------------
// Middlewares
// -----------------------------

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://linkshortener.onrender.com'
        :  process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -----------------------------
// Routes
// -----------------------------
app.use(urlRouter);

// Default Route
app.get('/', (req, res) => {
  res.send('Hello from Link Shortening server.... :)');
});


// PRODUCTION SETUP
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get(/.*/, (_, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// -----------------------------
// Error Handling
// -----------------------------

// 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found!' });
});

// Server Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something is broke!' });
});

// -----------------------------
// Server Initialization
// -----------------------------

(async () => {
  try {
    await connectDatabase(dbUrl);
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`.rainbow.bgWhite.bold);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
})();