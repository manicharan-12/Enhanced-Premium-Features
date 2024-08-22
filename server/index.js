//server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const planRoutes=require('./routes/plans')
// Create Express app
const app = express();

// Connect to database
connectDB();

// Middleware
//https://enhanced-premium-features.vercel.app
//http://localhost:3000
app.use(cors({
  origin: 'https://enhanced-premium-features.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use("/", planRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));