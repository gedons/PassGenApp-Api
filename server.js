const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require("cors");
const { errorHandler } = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');

dotenv.config();

const corsOptions = {
    origin: 'https://easypassword-gen.vercel.app', 
    //origin: 'http://localhost:5173', 
    credentials: true,
  };
  

connectDB();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(rateLimiter);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/passwords', require('./routes/passwordRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
