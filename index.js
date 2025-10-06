const express = require('express');
const empRouter = require('./emp');
const userRouter = require('./users');
const errorHandlerMiddleware = require('./errorHandlerMiddleware');
const mongoose = require('mongoose');

const app = express();
const SERVER_PORT = process.env.PORT || 3000;

// ✅ MongoDB Atlas connection
const uri = "mongodb+srv://khalidwasimalam_db_user:nY4t7XRShYRE49kG@cluster0.ufukitq.mongodb.net/comp3123_lab5?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB BEFORE starting the server
mongoose.connect(uri)
  .then(() => {
    console.log("✅ MongoDB Atlas connected successfully");

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const loggerMiddleware = (req, res, next) => {
      console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
      next();
    };

    // Apply middleware
    app.use('/user', loggerMiddleware);
    app.use('/user', userRouter);
    app.use('/emp', empRouter);

    // Error endpoint
    app.get('/error', (req, res) => {
      throw new Error('This is a forced error');
    });

    // Error handling middleware
    app.use(errorHandlerMiddleware);

    // Start server AFTER DB connection
    app.listen(SERVER_PORT, () => {
      console.log(`Server is running on port ${SERVER_PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
